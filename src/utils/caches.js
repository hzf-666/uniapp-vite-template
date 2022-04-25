/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-08 11:20:39
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-21 20:16:53
 */
export default function() {
  return {
    get(key) {
      return uni.getStorageSync(key);
    },
    getInfo() {
      return uni.getStorageInfoSync();
    },
    set(key, value) {
      uni.setStorageSync(key, value);
    },
    remove(key) {
      uni.removeStorageSync(key);
    },
    clear() {
      uni.clearStorageSync();
    },
  };
}
