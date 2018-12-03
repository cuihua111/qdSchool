<template>
  <div id="home">
        <my-headers></my-headers>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
  import {getSessionStorage} from '@/utils/mixin'
  export default {
    data() {
      return {
        permissionsList: [],//权限数组
        isSuper: false,//是否超管
      }
    },
    mounted(){
      /*
        头部标识
       */
      eventBus.$emit("header", { index: 999, headerActive: "active" });
      /*
       * 判断 权限数组是否为空
       * */
      if (getSessionStorage('permissionsList') !== '{}') {
        this.permissionsList = JSON.parse(getSessionStorage('permissionsList'));
        this.isSuper = Number(getSessionStorage('isSuper'))
      }
    }
  }
</script>
<style scoped lang="scss">
</style>
