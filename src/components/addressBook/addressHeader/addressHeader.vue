<template>
    <div class="my-header">
            <a href="javascript:history.go(-1)"><i class="back"></i>返回</a>
            {{title}}
    </div>
</template>
<script>
  export default {
    data() {
      return {
        title:''
      }
    },
    props:{
        title:''
    }
  }
</script>
<style scoped lang="scss">
.my-header{
            position: relative;
            width: 100%;
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 20px;
            color: #666666;
            border-bottom:1px solid #e6e6e6;
            a{
                position: absolute;
                left:30px;
                color: #666666;
                font-size: 14px;
                .back{
                    width: 15px;
                    height: 15px;
                    margin-right: 5px;
                    display: inline-block;
                    background: url(/static/images/back.png);
                    background-repeat: no-repeat;
                    background-size: 10px 15px;
                    vertical-align: middle;
                }
            }
        }
</style>
