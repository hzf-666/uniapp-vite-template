/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-21 11:35:39
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-26 15:12:35
 */
import {
  createSSRApp
} from 'vue';
import App from './App.vue';
import './scss/index.scss';
import setGlobal from './global/vueSet.js';
import Layout from '@c/Layout.vue';

export function createApp() {
  const app = createSSRApp(App);

  setGlobal(app);
  app.component('Layout', Layout);

  return {
    app,
  };
}
