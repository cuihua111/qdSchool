<template>
  <div id="login">
    <div class="logo">

    </div>
    <header class="login-header">
        <div class="header-left">
            <img :src="qrcodeUrl" alt="">
            <span>管理后台系统</span>
        </div>
        <router-link :to="{name: 'Register'}" class="header-right">
            <el-button type="primary" round>学校注册</el-button>
        </router-link>
    </header>
    <div class="login-form">
        <div class="login-box">
        </div>
        <div class="login-box2">
                <el-tabs v-model="activeName" @tab-click="handleClick" class="login-tab">
                    <el-tab-pane label="扫码登录"  class="form-1" name="form1">
                        <img :src="qrcodeUrl" alt="">
                        <span>请使用扫码登录</span>
                    </el-tab-pane>
                    <el-tab-pane label="奇点账户登录" class="form-2" name="form2">
                        <el-form label-position="left" label-width="80px" :model="form">
                            <el-form-item label="手机号码">
                                <el-input v-model="form.mobile"  placeholder="请输入手机号码"></el-input>
                            </el-form-item>
                            <el-form-item label="登录密码">
                                <el-input v-model="form.password"  placeholder="请输入登录密码"></el-input>
                            </el-form-item>
                            <el-button type="primary" size="medium" @click="login">登录</el-button>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
        </div>
    </div>
    <footer class="login-footer">
        <span>国家首家通过IS27001:2013信息安全认证</span>
        <span>通讯地址:广州市番禺区解放西路时代创客主场</span>
    </footer>
  </div>
</template>
<script>
  import {
    checkMobile,
    setSessionStorage,
  } from '@/utils/mixin'
  import {
    mapGetters,
    mapMutations
  } from 'vuex';
  import postAxios from '@/utils/http';
  export default {
    data() {
      return {
        form: {
          mobile: '18613974745',
          password: '123456'
        },
        qrcodeUrl:'',
        isDisabled: false,
        activeName: 'form1'
      }
    },
    created(){
        this.qrcode();
        setInterval((this.qrcode()),3000)
    },
    methods: {
      ...mapMutations([
        'SET_TOKEN',
        'SET_UID',
        'SET_USERINFO'
      ]),
      handleClick(tab, event) {
        console.log(tab, event);
      },
      /*
       * 校验密码
       * */
      checkPassword() {

      },
      /*
       * 扫码登录
       * */
      qrcode(){
        postAxios({url:'/singcampus/getQRCodePic'})
        .then((res) => {
            this.qrcodeUrl =    res.data.url_qrcode;
        })
        .catch((error)=>{
            // 'https://img.alicdn.com/imgextra/i2/80/O1CN01l9kH7J1CSgAByoY16_!!80-0-luban.jpg_q100.jpg_.webp';
             console.log(1)
        })
      },
      /*
       * 登录方法
       * */
      login() {
        if (!checkMobile(this.form.mobile)) {
          this.$message({
            message: '手机号格式错误,请检查输入。',
            type: 'error'
          });
          return false;
        }
        if (this.checkPassword(this.form.password)) {
          this.$message({
            message: '密码格式错误,请检查输入。',
            type: 'error'
          });
          return false;
        }
        postAxios({url:'/singcampus/login',data: {phonenum: this.form.mobile, password: this.form.password}})
        .then((res) => {
          this.SET_TOKEN(res.token);
          this.SET_UID(res.id);
          setSessionStorage('userInfo',res)
          setSessionStorage('token', res.token)
          setSessionStorage('uid', res.id)
          setSessionStorage('isSuper', res.isSuper)
          setSessionStorage('permissionsList', res.list_permissions);
          /*
          * 判断超级管理员，决定跳转地址
          * */
//          if(Number(res.isSuper)){
//
//          }
          this.$router.push({name:'Home'});
        })
      }
    }
  }
</script>
<style  lang="scss">
.login-box2{
    .is-top{
        margin: 0px;
        width: 100%;
        text-align: center;
        .el-tabs__item{
            padding:0px;
            width: 50%;
        }
    }
    .el-tabs__nav{
        height:90px;
        display: flex;
        align-items: center;
        // .el-tabs__active-bar{
        //     width: 20px!important;
        // }
        div{
            font-size: 20px;
            color: #666666;
        }
    }
    .el-tabs__nav-wrap::after{
        background-color: #f5f5f5;
    }
    .form-2{
        .el-form-item__label{
            font-size: 16px;
        }
    }
}
</style>
<style scoped lang="scss">
  #login {
    // width: 500px;
    // margin: 0 auto;
    // padding-top: 150px;
    .logo {
      text-align: center;
      img {
        width: 170px;
      }
    }
    .login-header{
        display:flex;
        align-items: center;
        justify-content: space-between;
        margin: auto;
        width:1920px;
        height:110px;
        img{
            width:50px;
        }
        .header-left{
            padding-left:390px;
            font-size:20px;
            color:#666666;
            img{
                margin-right:15px;
                width:36px;
                height:36px;
                vertical-align: middle;
            }
        }
        .header-right{
            padding-right:330px;
            button{
                background: white;
                color: #40b9e6;
            }
        }
    }
    .login-form {
        position: relative;
        margin: auto;
        width: 1920px;
        height:735px;
        background:url('/static/images/loginBg.jpg');
        // background-size:100%;
        background-repeat:no-repeat;
      .title {
        font-size: 30px;
        color: #4D4D4D;
        text-align: center;
      }
    }
    .login-box{
        position: absolute;
        right:150px;
        top:110px;
        width:440px;
        height:498px;
        background:rgba(255,255,255,0.26);
        border-radius:8px;
    }
    .login-box2{
        position: absolute;
        right:170px;
        top:130px;
        width:400px;
        height:458px;
        border-radius:8px;
        background:white;
        box-shadow: 0 0 0.3rem 1px rgba(2,2,2,.2);
        button{
            width:100%
        }
        .form-1{
            text-align: center;
            img{
                display:block;
                margin:30px auto;
                width: 245px;
                height:245px;
            }
        }
        .form-2{
            margin:auto;
            padding-top:48px;
            width:85%;
            .el-form-item{
                margin-bottom:40px;
            }
            .el-input{
                font-size:16px;
            }
            .el-button {
                margin-top:8px;
                height:48px;
            }
        }
    }
    .login-footer{
        margin:auto;
        padding-top:30px;
        width:100%;
        font-size:16px;
        color:#999999;
        text-align: center;
        span{
            margin-right:50px;
        }
    }
  }
</style>
