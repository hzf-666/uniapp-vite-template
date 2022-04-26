/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-26 16:20:42
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-26 20:05:22
 */
const modules = import.meta.globEager('./modules/*.js'),
  reg = /^\.\/modules\/(.*)\.js$/,
  space = {};

Object.keys(modules).map(k => {
  space[k.replace(reg, '$1')] = modules[k].default;
});

const store = reactive({
    count: 0,
  }),
  spacedStore = reactive({
    ...space,
  });

export default {
  get(key) {
    const arr = key.split('/');
    if (arr.length == 1) {
      return store[key];
    } else {
      return spacedStore[arr[0]][arr[1]];
    }
  },
  set(key, value) {
    const arr = key.split('/');
    if (arr.length == 1) {
      store[key] = value;
    } else {
      spacedStore[arr[0]][arr[1]] = value;
    }
  },
};
