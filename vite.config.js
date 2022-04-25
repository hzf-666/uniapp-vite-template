/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-21 11:35:39
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-25 22:25:22
 */
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import AutoImport from 'unplugin-auto-import/vite';
import VueComponents from 'unplugin-vue-components/vite';

const path = require('path'), resolve = dir => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default ({ mode }) => {
  const dev = mode === 'development';

  return defineConfig({
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
            switch (name) {
              case '$g':
                return '@/global/data.js';
              case '$http':
                return '@/http/index.js';
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
