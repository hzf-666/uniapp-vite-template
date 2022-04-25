<!--
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-21 11:35:39
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-25 23:11:53
-->
<script setup>
//
</script>

<script>
import { getCaptcha, uploadFile } from '@/api';

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

const doGetCaptcha = function() {
    getCaptcha().then(res => {
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
</script>

<template>
  <Layout>
    登录页面
    <button @click="upload">上传</button>
  </Layout>
</template>


<style lang="scss" scoped>

</style>
