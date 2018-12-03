<template>
    <header class="project-header">
        <div>
            <div>
              <img src="/static/images/logo.png" alt="" class="address-logo">
              <span class="address-title">奇点校园</span>
            </div>
            <div>
                <a  v-for="(item,index) in headerBar"
                    href="javascript:void(0)"
                    @click="goRouter(item.headerHref)"
                    :key="index"
                    :class="item.headerActive" >
                    {{ item.headerTitle }}
                </a>
            </div>
            <div>
                <a href="javascript:void(0);">退出</a>
            </div>
        </div>
    </header>
</template>
<script>
  import {removeSessionStorage} from '@/utils/mixin'
  export default{
    data () {
        return {
            headerBar:[
                      {
                          headerTitle:'通讯录',
                          headerHref:'/addressBook/classa',
                          headerActive:''

                      },{
                          headerTitle:'校园管理',
                          headerHref:'/home',
                          headerActive:''

                      },{
                          headerTitle:'校园主页',
                          headerHref:'/addressBook/importAndExport',
                          headerActive:''

                      }
                ],
        }
    },
    mounted:function(){
          eventBus.$on('header', function(header) {
              this.headerBar[header.index].headerActive = header.headerActive;
          }.bind(this));
    },
    methods: {
      goRouter(url){
            this.$router.push(url)
      },
      logOut(){
        removeSessionStorage('uid')
        removeSessionStorage('token')
        removeSessionStorage('editId')
        removeSessionStorage('isSuper')
        removeSessionStorage('permissionsList')
        removeSessionStorage('schoolId');
        this.$router.push('/login');
        window.location.reload();
      }
    }
  }
</script>
<style scoped lang="scss">
.project-header{
        width: 100%;
        background:white;
        height: 64px;
        >div{
            display: flex;
            align-items: center;
            color: #333333;
            font-size: 16px;
            width:1200px;
            margin: auto;
            div{
                height: 64px;
                line-height: 64px;
            }
            div:first-child{
                width: 350px;
            }
            div:nth-child(2){
                width: 758px;
                padding-left: 60px;
                a{
                    margin-right: 110px;
                    text-decoration: none;
                    color: #333333;
                    height:64px;
                    width: 120px;
                    display: inline-block;
                    text-align: center;
                }
                .active{
                    position: relative;
                    color: #40b9e6;
                    &:after{
                        content:'';
                        position: absolute;
                        width: 120px;
                        height: 4px;
                        bottom:0;
                        left:0;
                        background: #40b9e6;
                    }
                }
            }
            div:last-child{
                a{
                    color: #333333;
                    text-decoration: none;
                }
            }
        }
        .address-logo{
            width: 42px;
            height: 42px;
            vertical-align: middle;
            margin-right: 15px;
         }
    }
</style>
