<!--
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-21 11:35:39
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-26 17:51:08
-->
<script>
import { getCaptcha, uploadFile } from '@/api';

const [loadingCaptcha, toGetCaptcha] = $useApiLoading(getCaptcha);
const count = computed(() => $store.get('count'));
const doGetCaptcha = function() {
    toGetCaptcha().then(res => {
      console.log(res);
    });
  },
  upload = () => {
    uni.chooseImage({
      success({ tempFilePaths }) {
        $http.all(tempFilePaths.map(filePath => {
          return uploadFile({
            showTip: false,
            url: '/api/userSystem/common/file',
            filePath,
          });
        }), {
          successTip: '上传成功！',
        }).then(res => {
          console.log(res);
        });
      }
    });
  };

export default {
  name: 'Login',
  onLoad() {},
  onShow() {
    doGetCaptcha();
  },
  onReady() {},
  onHide() {},
  onUnload() {},
};
</script>

<script setup>
//
</script>

<template>
  <Layout>
    {{ loadingCaptcha }}
    {{ count }}
    登录页面
    <button @click="upload">上传</button>
    <button @click="$store.set('count', count + 1)">计数</button>
  </Layout>
</template>


<style lang="scss" scoped>

</style>
