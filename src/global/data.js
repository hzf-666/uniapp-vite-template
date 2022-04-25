/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-19 13:34:02
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-21 20:17:20
 */
import { typeOf, deepCopy, dateFormat } from '@u';
import caches from '@u/caches.js';
import { useApiLoading } from '@h';

export default {
  typeOf, deepCopy, dateFormat,
  caches,
  useApiLoading,
  regs: {
    phone: /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[1|3|5|6|8|9]))\d{8}$/,
    idCard: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/,
    telephone: /(^((0\d{2,3}))?-?(\d{7,8})$)|(^(4|8)00\d-?\d{3}-?\d{3}$)/,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
  },
  setProxy(prefix, url) {
    url = prefix + url.replace(/https?:\/\/[^/]*/, '');
    return url;
  },
};
