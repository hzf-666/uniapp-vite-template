/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-08 12:07:28
 * @LastEditors: hzf
 * @LastEditTime: 2022-06-24 14:36:30
 */
const baseUrl = '/api/userSystem/common';

export async function getCaptcha(options = {}) { // 获取验证码
  options = {
    successMsg: '',
    failMsg: '',
    ...options,
  };
  return await $http.get(`${ baseUrl }/captcha`, options);
}

export async function uploadFile(options = {}) { // 上传文件
  options = {
    message: true,
    successMsg: '',
    failMsg: '',
    name: 'file',
    timeout: 20000,
    ...options,
  };
  const token = $caches().get('token'),
    _options = $deepCopy(options);

  ['message', 'successMsg', 'failMsg'].forEach(k => {
    delete _options[k];
  });

  let result = {
    code: 0,
    message: '',
    data: {},
    type: 'fail'
  };
  return await new Promise(resolve => {
    if (token) {
      _options.header = {
        Authorization: token,
        ..._options.header,
      };
    }
    _options.url = $http.setProxy(options.url) + options.url;
    uni.uploadFile({
      ..._options,
      success({ statusCode, data }) {
        if (statusCode == 200) {
          result = {
            ...JSON.parse(data),
          };
          result.type = result.code == 200 ? 'success' : 'fail';
        } else {
          result.message = `上传失败！状态码：${ statusCode }`;
        }
      },
      fail({ errMsg }) {
        result.message = `上传失败！错误信息：${ errMsg }`;
      },
      complete() {
        if (result.code == 200) {
          options.successMsg && (result.message = options.successMsg);
        } else {
          options.failMsg && (result.message = options.failMsg);
        }
        options.message && $http.showMsg(result);
        resolve(result);
      },
    });
  });
}
