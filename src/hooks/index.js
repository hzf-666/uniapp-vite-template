/*
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-02 16:12:40
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-20 10:55:07
 */
export function useApiLoading(api) {
  const loading = ref(false);
  return [loading, (option) => {
    return api({ setLoading: val => {
      loading.value = val;
    }, ...option });
  }];
}
