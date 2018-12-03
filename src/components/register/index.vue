<template>
  <div>
    <header class="register-header">
        <img src="/static/images/logo.png" alt="" class="register-logo">
        <span class="register-title">奇点校园</span>
    </header>
    <div class="register">
        <div class="el-steps el-steps--horizontal">
            <div class="el-step is-horizontal is-center" style="flex-basis: 25%; margin-right: 0px;">
                <div class="el-step__main">
                    <div class="el-step__title is-finish">
                        填写手机号
                    </div>
                </div>
                <div class="el-step__head is-finish">

                    <div class="el-step__line" :style="this.$store.state.register.setStyle">
                        <i class="el-step__line-inner" style="transition-delay: 0ms; width: 100%;">
                        </i>
                    </div>
                    <div class="el-step__icon is-text">
                        <div class="el-step__icon-inner">
                            1
                        </div>
                    </div>
                </div>
            </div>
            <div class="el-step is-horizontal is-center" style="flex-basis: 25%; margin-right: 0px;">
                <div class="el-step__main">
                    <div class="el-step__title is-finish">
                        完善信息
                    </div>
                </div>
                <div class="el-step__head is-finish">
                    <div class="el-step__line" style="left: 0%;">
                        <i class="el-step__line-inner" style="transition-delay: 150ms;width: 0%;">
                        </i>
                    </div>
                    <div class="el-step__icon is-text" :class="this.$store.state.register.setClass">
                        <div  class="el-step__icon-inner">
                            2
                        </div>
                    </div>
                </div>
            </div>
            <div class="el-step is-horizontal is-center" style="flex-basis: 25%; margin-right: 0px;">
                <div class="el-step__main">
                    <div class="el-step__title is-process">
                        注册成功
                    </div>
                </div>
                <div class="el-step__head is-process">
                    <div class="el-step__icon is-text" :class="this.$store.state.register.setClass2">
                        <div class="el-step__icon-inner">
                            3
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</div>
</template>
<script>
    import postAxios from '@/utils/http';
    import {    mapGetters,    mapMutations  } from 'vuex';
    export default {
        data() {
            return {
                setStyle:'',
                setClass:'',
            }
        },
        created(){
            this.SET_STYLE = 'z-index: 1;right:0%;';
            this.SET_CLASS = 'steps-gray';
        },
        methods: {
            ...mapMutations([
                'SET_STYLE',
                'SET_CLASS'
            ]),
        }
  }
</script>
<style>
    #app{
        background: #f5f5f5;
    }
</style>

