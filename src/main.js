/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-21 11:35:39
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-25 22:49:44
 */
import {
  createSSRApp
} from 'vue';
import App from './App.vue';
import './scss/index.scss';
import global from './global';
import Layout from '@c/Layout.vue';

export function createApp() {
  const app = createSSRApp(App);

  global(app);
  app.component('Layout', Layout);

  return {
    app,
  };
}
