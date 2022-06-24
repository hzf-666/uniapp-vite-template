/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-02 16:12:40
 * @LastEditors: hzf
 * @LastEditTime: 2022-06-24 14:32:26
 */
export function useApiLoading(api) {
  const loading = ref(false);
  return [loading, (...args) => {
    let index = 0;
    if (args.length > 1) {
      index = args[args.length - 1];
    }
    args[index] = {
      setLoading(val) {
        loading.value = val;
      },
      ...args[index],
    };
    return api(...args);
  }];
}
