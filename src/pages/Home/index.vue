<!--
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-21 11:35:39
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-26 19:55:44
-->
<script>
const count = computed(() => $store.get('count'));

export default {
  name: 'Home',
  onLoad() {},
  onShow() {},
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
    {{ count }}
    首页
  </Layout>
</template>


<style lang="scss" scoped>

</style>
