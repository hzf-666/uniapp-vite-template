/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-08 12:07:28
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-26 10:07:07
 */
const baseUrl = '/api/userSystem/common';

export async function getCaptcha(options = {}) { // 获取验证码
  options = {
    successTip: '',
    failTip: '',
    ...options,
  };
  return await $http.get(`${ baseUrl }/captcha`, options);
}

export async function uploadFile(options = {}) { // 上传文件
  options = {
    showTip: true,
    successTip: '',
    failTip: '',
    name: 'file',
    timeout: 20000,
    ...options,
  };
  const token = $caches().get('token'),
    _options = $deepCopy(options);

  ['showTip', 'successTip', 'failTip'].forEach(k => {
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
          options.successTip && (result.message = options.successTip);
        } else {
          options.failTip && (result.message = options.failTip);
        }
        options.showTip && $http.tip(result);
        resolve(result);
      },
    });
  });
}
