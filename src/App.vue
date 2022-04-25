<!--
 * @Descripttion:
 * @version:
 * @Author: hzf
 * @Date: 2022-04-21 11:35:39
 * @LastEditors: hzf
 * @LastEditTime: 2022-04-25 22:13:38
-->
<script>
export default {
  onLaunch() {
    ['navigateTo', 'redirectTo', 'switchTab', 'navigateBack'].forEach(type => { // 监听跳转
      uni.addInterceptor(type, {
        success: () => {
          this.watchRouter();
        }
      });
    });
  },
  onShow() {},
  onHide() {},
  methods: {
    watchRouter() {
      document && (document.title = '\u200E');
    },
  },
};
</script>

<style>
/* 每个页面公共css */
</style>
