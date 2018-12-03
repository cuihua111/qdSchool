<template>
    <!-- 导入文件进度条组件 -->
    <div class="progress-wrap">
        <span class="label">导入中</span>
        <el-progress class="el-progress"
            :stroke-width="14"
            :show-text="false"
            :percentage="percentage">
        </el-progress>
        <span class="percentage-text">{{percentage}}%</span>
    </div>
</template>

<script>
export default {
  name: 'Progress',
  props: ['percentage']
}
</script>

<style lang="scss" scoped>
.progress-wrap {
    width: 345px;
    height: 70px;
    line-height: 70px;
    background-color: rgba(208, 242, 255, .8);
    font-size: 14px;
    padding-left: 20px;
    .el-progress {
        width: 180px;
        display: inline-block;
        vertical-align: middle;
        margin: 0 20px;
    }
}
</style>
<style lang="scss">
.progress-wrap {
    .el-progress-bar__outer {
        background-color: #fff;
        border-radius: 0;
    }
    .el-progress-bar__inner {
        border-radius: 0;
    }
}
</style>
