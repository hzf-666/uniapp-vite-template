/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-18 17:39:41
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-26 17:47:28
 */
import * as global from './index.js';
import * as vue from 'vue';
import * as vueRouter from 'vue-router';

export default function(app) {
  [global, vue, vueRouter].forEach((m, i) => {
    Object.keys(m).forEach(k => {
      app.config.globalProperties[(i ? '' : '$') + k] = m[k];
    });
  });
}
