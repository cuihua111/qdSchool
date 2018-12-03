<template>
    <!-- 考试成绩入口 -->
    <div class="testScores-wrap">
        <MainHeader :title="headerTitle"></MainHeader>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import MainHeader from './components/MainHeader'

export default {
  name: 'testScores',
  components: { MainHeader },
  computed: {
    ...mapState('testScores', ['headerTitle'])
  }
}
</script>

<style lang="scss" scoped>
.testScores-wrap {
    width: 1200px;
    height: 800px;
    box-sizing: border-box;
    margin: 20px auto 0;
    background: #fff;
    border: 1px solid #ddd;
    .content {
        height: calc(100% - 60px);
        box-sizing: border-box;
        padding: 0 30px;
        overflow: hidden;
        overflow-y: auto;
    }
}
</style>
