/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-21 11:35:39
 * @LastEditors: hzf
 * @LastEditTime: 2022-06-24 14:32:02
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
      host: '0.0.0.0',
    },
    base: dev ? '/' : '/h5/',
    resolve: {
      alias: {
        '@': resolve('src'),
        '@a': resolve('src/assets'),
        '@c': resolve('src/components'),
        '@p': resolve('src/plugins'),
        '@u': resolve('src/utils'),
      }
    },
    plugins: [
      uni(),
      AutoImport({
        imports: ['vue', 'vue-router', {
          vue: ['defineEmits', 'defineExpose', 'defineProps', 'defineCustomElement'],
        }],
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
            if (name.startsWith('$use')) {
              return {
                from: '@/hooks',
                name: name.replace('$', ''),
              };
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
