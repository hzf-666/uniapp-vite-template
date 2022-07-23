/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-02 17:18:09
 * @LastEditors: hzf
 * @LastEditTime: 2022-07-21 19:41:22
 */
export function typeOf(target) {
  const getProtoStr = Object.prototype.toString,
    map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    };
  return map[getProtoStr.call(target)];
}

export function deepCopy(target) { // 数据深拷贝
  let result;
  switch (typeOf(target)) {
    case 'array':
      result = [];
      break;
    case 'object':
      result = {};
      break;
    default:
      result = target;
      return result;
  }
  for (const i in target) {
    result[i] = typeOf(target[i]) === 'array' || typeOf(target[i]) === 'object' ? deepCopy(target[i]) : target[i];
  }
  return result;
}

export function dateFormat(fmt, d) {
  const date = d ? new Date(d) : new Date(),
    o = {
      'M+': date.getMonth() + 1, // 月份
      'D+': date.getDate(), // 日
      'H+': date.getHours(), // 小时，24小时制
      'h+': date.getHours() > 12 ? date.getHours() - 12 : date.getHours(), // 小时，12小时制
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    },
    y = /(Y+)/g,
    w = ['日', '一', '二', '三', '四', '五', '六'],
    W = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  if (y.test(fmt)) {
    fmt.match(y).forEach(item => {
      fmt = fmt.replace(item, (date.getFullYear() + '').substring(4 - item.length));
    });
  }
  for (const k in o) {
    const reg = new RegExp('(' + k + ')', 'g');
    if (reg.test(fmt)) {
      fmt.match(reg).forEach(item => {
        fmt = fmt.replace(item, item.length == 1 ? o[k] : ('00' + o[k]).substring(('' + o[k]).length));
      });
    }
  }
  fmt = fmt.replace('{w}', w[date.getDay()]);
  fmt = fmt.replace('{W}', W[date.getDay()]);
  return fmt;
}

export async function toDuration(p, delay = 0) {
  const results = await Promise.all([p,
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, delay);
    }),
  ]);
  return results[0];
}

export function dataURL2File(dataurl, filename = 'file') {
  const arr = dataurl.split(','),
    type = arr[0].match(/:(.*?);/)[1],
    bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], { type });

  return new File([blob], filename, { lastModified: Date.now(), type });
}
