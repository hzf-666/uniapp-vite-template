/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-18 17:39:41
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-25 22:20:29
 */
import * as vue from 'vue';
import * as vueRouter from 'vue-router';
import http from '@/http';
import g from './data.js';

export default function(app) {
  Object.keys(vue).forEach(k => {
    app.config.globalProperties[k] = vue[k];
  });
  Object.keys(vueRouter).forEach(k => {
    app.config.globalProperties[k] = vueRouter[k];
  });
  app.config.globalProperties.uni = uni;
  app.config.globalProperties.$http = http;
  app.config.globalProperties.$g = g;
}
