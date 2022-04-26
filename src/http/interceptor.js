/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-08 11:17:53
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-26 20:50:14
 */
const whiteList = [];

const mpLoginMax = 5, // 小程序登录获取code最大次数
  loginMax = 5, // 调用登录接口获取token最大次数
  loginFlags = {
    isLock: false,
    failed: false,
  },
  lockedHttps = {}; // 并发401/403的接口请求

export default function(flyio, flyioRequest) {
  flyio.interceptors.request.use(req => {
    const token = $caches().get('token');
    if (token && !whiteList.includes(req.url)) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      req.headers.Authorization = token;
    }
    req.headers['Cache-Control'] = 'no-cache';
    req.headers.Pragma = 'no-cache';
    return req;
  }, err => {
    return Promise.reject(err);
  });

  flyio.interceptors.response.use(async res => {
    if (res.data.code == 401 || res.data.code == 403) { // 没有传 token 或者 token 失效
      /* #ifdef MP */
      // 小程序静默登录
      // if (loginFlags.failed) {
      //   res.data.message = '请重新进入小程序！';
      //   return res;
      // }
      // if (loginFlags.isLock) {
      //   const httpKey = 'http' + Object.keys(lockedHttps).length;
      //   lockedHttps[httpKey] = res.request;
      //   const getIsLock = async() => {
      //       return await new Promise((resolve) => {
      //         setTimeout(() => {
      //           resolve(loginFlags.isLock);
      //         }, 10);
      //       });
      //     },
      //     waitLocking = async() => {
      //       let locking = await getIsLock();
      //       while (locking) {
      //         locking = await getIsLock();
      //       }
      //     };
      //   await waitLocking();
      //   if ($caches().get('token')) res = flyio.request(lockedHttps[httpKey]);
      //   delete lockedHttps[httpKey];
      //   return res;
      // }

      // flyio.lock();
      // loginFlags.isLock = true;
      // let mpLoginCount = 0, loginCount = 0;
      // const mpLogin = () => {
      //     mpLoginCount++;
      //     return new Promise((resolve) => {
      //       uni.login({
      //         success: ({ code, errMsg }) => {
      //           if (errMsg == 'login:ok') {
      //             resolve({
      //               code,
      //               pass: true,
      //               errMsg,
      //             });
      //           } else {
      //             if (mpLoginCount < mpLoginMax) {
      //               resolve({
      //                 pass: false,
      //                 errMsg,
      //               });
      //             } else {
      //               resolve({
      //                 pass: true,
      //                 errMsg,
      //               });
      //             }
      //           }
      //         },
      //         fail: ({ errMsg }) => {
      //           if (mpLoginCount < mpLoginMax) {
      //             resolve({
      //               pass: false,
      //               errMsg,
      //             });
      //           } else {
      //             resolve({
      //               pass: true,
      //               errMsg,
      //             });
      //           }
      //         }
      //       });
      //     });
      //   },
      //   getMpLoginCode = async() => {
      //     let target = await mpLogin();
      //     while (!target.pass) {
      //       uni.showToast({ title: '静默登录失败！' + target.errMsg, icon: 'none' });
      //       target = await new Promise((resolve) => {
      //         setTimeout(async() => {
      //           resolve(await mpLogin());
      //         }, 1500);
      //       });
      //     }
      //     return target;
      //   },
      //   { code } = await getMpLoginCode();
      // if (code) {
      //   const getToken = function() {
      //     loginCount++;
      //     // TODO: 调用登录接口获取并返回token
      //     return flyioRequest({
      //       // method: 'post',
      //       // url: '/api/userSystem/login',
      //       // body: {
      //       //   accountName: '13049107471',
      //       //   captcha: '123123',
      //       //   type: 1,
      //       //   loginType: 2,
      //       // }
      //     }).then(resp => {
      //       const { code, data } = resp.data;
      //       if (code == 200) {
      //         return data.token;
      //       }
      //       return '';
      //     }).catch(() => {
      //       return '';
      //     });
      //   };
      //   let token = await getToken();
      //   while (!token) {
      //     if (loginCount < loginMax) {
      //       token = await getToken();
      //     } else {
      //       uni.showToast({ title: `获取token已达${ loginMax }次，请重新进入小程序！`, icon: 'none', duration: 2500 });
      //       res = await new Promise((resolve) => {
      //         setTimeout(() => {
      //           resolve(res);
      //         }, 2500);
      //       });
      //       break;
      //     }
      //   }
      //   if (token) $caches().set('token', token);
      // } else {
      //   uni.showToast({ title: `静默登录已达${ mpLoginMax }次，请重新进入小程序！`, icon: 'none', duration: 2500 });
      //   res = await new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve(res);
      //     }, 2500);
      //   });
      // }
      // loginFlags.isLock = false;
      // flyio.unlock();
      // if ($caches().get('token')) {
      //   res = await flyio.request(res.request);
      // } else {
      //   loginFlags.failed = true;
      // }
      /* #endif */
    }
    return res;
  }, err => {
    return Promise.reject(err);
  });
}
