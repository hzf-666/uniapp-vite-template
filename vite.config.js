/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-21 11:35:39
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-26 20:47:45
 */
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImport from 'unplugin-auto-import/vite';
import VueComponents from 'unplugin-vue-components/vite';
import globalData from './src/global/data.js';

const path = require('path'), resolve = dir => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default ({ mode }) => {
  const dev = mode === 'development';

  return defineConfig({
    server: {
      port: 6000,
    },
    base: dev ? '/' : '/h5/',
    resolve: {
      alias: {
        '@': resolve('src'),
        '@a': resolve('src/assets'),
        '@c': resolve('src/components'),
        '@h': resolve('src/hooks'),
        '@p': resolve('src/plugins'),
        '@u': resolve('src/utils'),
      }
    },
    plugins: [
      uni(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [
          name => {
            for (const _name of globalData) {
              if (name === '$' + _name) {
                return {
                  from: '@/global',
                  name: _name,
                };
              }
            }
          },
        ],
      }),
      VueComponents(),
    ],
    css: {
      postcss: {
        plugins: [
          require('autoprefixer')({ // 前缀追加
            grid: true,
          }),
          require('postcss-flexbugs-fixes'), // flexbug修复
        ],
      },
    },
  });
};
