<template>
<div class="register3">
    <img src="/static/images/registerSuccess.png" alt="">
    <h3>恭喜您，新学校注册成功</h3>
    <h5>下载奇点校园APP，随时随地都能管理学校</h5>
    <router-link :to="{name:'Home'}">
        <el-button type="primary">完成</el-button>
    </router-link>

</div>
</template>
<script>
  import postAxios from '@/utils/http';
  export default {
    data() {
    return {

      }
    },
    created(){
        this.$store.state.register.setStyle = 'z-index: 1;right:-150%;';
        this.$store.state.register.setClass2 = '';
    },
    methods: {
    },
  }
</script>

<style>
    .register{
        min-height: 495px;
    }
</style>
