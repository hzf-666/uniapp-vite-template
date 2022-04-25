<!--
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-21 11:35:39
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-25 20:51:10
-->
<script>
export default {
  name: 'Layout',
  onLoad() {},
  onShow() {},
  onReady() {},
  onHide() {},
  onUnload() {},
};
</script>

<script setup>

</script>

<template>
  <div style="display: flex;flex-direction: column;height: 100%;">
    <!-- <div style="flex: 0 0 auto;"></div> -->
    <div style="flex: 1 1 auto;overflow: auto;">
      <slot />
    </div>
    <!-- <div style="flex: 0 0 auto;"></div> -->
  </div>
</template>

<style lang="scss" scoped>

</style>
