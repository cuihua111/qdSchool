<template>
    <!-- 内容区头部组件 -->
    <div class="mianheader-wrap">
        <div class="back" @click="$router.go(-1)">
            <span class="el-icon-arrow-left"></span>
            <span>返回</span>
        </div>
        <div class="title">
            {{title}}
        </div>
    </div>
</template>

<script>
export default {
  name: 'MianHeader',
  props: ['title']
}
</script>

<style lang="scss" scoped>
.mianheader-wrap {
    width: 100%;
    height: 60px;
    line-height: 60px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    .back {
        position: absolute;
        width: 100px;
        left: 0;
        top: 0;
        height: 60px;
        line-height: 60px;
        text-align: left;
        padding-left: 30px;
        cursor: pointer;
        .el-icon-arrow-left {
            font-weight: 700;
            font-size: 20px;
            vertical-align: middle;
        }
    }
    .title {
        width: 100%;
        font-size: 18px;
        text-align: center;
    }
}
</style>
