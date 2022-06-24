/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-08 11:17:04
 * @LastEditors: hzf
 * @LastEditTime: 2022-06-24 14:34:27
 */
import Fly from '@p/flyio.js';
import interceptor from './interceptor.js';

const flyio = new Fly(),
  env = import.meta.env,
  proxy = {
    '/api': {
      target: env.VITE_API_URL,
      // rewrite: path => path.replace(/^\/api/, '')
    },
  },
  setProxy = url => {
    let baseURL = '';
    Object.keys(proxy).forEach(k => {
      const reg = new RegExp(`^${ k }`);
      if (reg.test(url)) {
        baseURL = proxy[k].target;
        if (proxy[k].rewrite) {
          url = proxy[k].rewrite(url);
        }
      }
    });
    return baseURL;
  };

interceptor(flyio, function(options = {}) {
  const _flyio = new Fly();
  _flyio.config.baseURL = setProxy(options.url);
  return _flyio.request(options);
});

async function request(method, url, options = {}) {
  flyio.config.baseURL = setProxy(url);

  options = {
    message: true,
    successMsg: '',
    failMsg: '',
    timeout: 20000,
    ...options,
  };
  const _options = $deepCopy(options);

  ['message', 'successMsg', 'failMsg'].forEach(k => {
    delete _options[k];
  });

  if (options.setLoading) {
    delete _options.setLoading;
    options.setLoading(true);
  }

  const result = await flyio.request({
    method,
    url,
    ..._options,
  }).then(res => {
    const data = res.data;
    if (data.code == 200) {
      data.type = 'success';
      options.successMsg && (data.message = options.successMsg);
    } else {
      data.type = 'fail';
      options.failMsg && (data.message = options.failMsg);
    }
    if (data.code == 401) {
      // 用户没有登录
    }
    if (data.code == 403) {
      // 用户权限过期
    }
    return data;
  }).catch(err => {
    const data = {
      code: 0,
      message: '',
      data: {},
      type: 'fail'
    };
    if (err.response) { // 请求已发出，但服务器使用状态代码进行响应
      data.code = err.response.status;
      data.message = '请求服务器出错！错误状态码：' + err.response.status;
    } else if (err.__CANCEL__) { // 主动取消所有请求
      data.message = err.message;
    } else if (err.code == 'ECONNABORTED') {
      data.message = '请求服务器超时！';
    } else {
      data.message = '无法连接服务器！';
    }
    return data;
  });

  if (options.setLoading) {
    options.setLoading(false);
  }

  options.message && showMsg(result);
  return result;
}

function showMsg(res, options = {}) {
  if (res && res.message) {
    uni.showToast({
      title: res.message,
      icon: res.type === 'success' ? 'success' : 'none',
      ...options,
    });
  }
}

function all(arr, {
  message = true,
  successMsg = '',
  failMsg = '',
} = {}) {
  return new Promise(resolve => {
    const result = {
      code: 200,
      message: '',
      data: [],
      type: 'success',
    };
    if (arr.length) {
      Promise.all(arr).then(res => {
        for (let i = 0; i < res.length; i++) {
          result.data.push(res[i].data);
          if (res[i].code != 200) {
            if (result.code == 200) {
              result.code = 0;
              result.type = 'fail';
            }
            if (result.message) {
              result.message += `\n${ res[i].message }`;
            } else {
              result.message += res[i].message;
            }
          }
        }
        if (result.code == 200) {
          successMsg && (result.message = successMsg);
        } else {
          failMsg && (result.message = failMsg);
        }
        message && showMsg(result);
        resolve(result);
      });
    } else {
      result.code = 0;
      result.type = 'fail';
      resolve(result);
    }
  });
}

export default {
  setProxy,
  get(url, options = {}) {
    return request('get', url, options);
  },
  post(url, options = {}) {
    return request('post', url, options);
  },
  put(url, options = {}) {
    return request('put', url, options);
  },
  delete(url, options = {}) {
    return request('delete', url, options);
  },
  request,
  showMsg,
  all,
};
