<template>
    <!-- 考试列表页 -->
    <div class="testList-wrap">
        <div class="header">
            <span>操作步骤：创建考试 - 批量导入 - 数据分析</span>
            <el-button type="primary" size="small" class="createTest-btn" @click="$router.push('createTest')">创建考试</el-button>
        </div>
        <div class="main">
            <div class="testCard"
                v-for="(item, index) in testList"
                :key="index">
                <div class="testCard-header">
                    <h3 class="title">{{item.title}}</h3>
                    <span class="releaseStatus" v-if="item.is_released === 0">发布成绩</span>
                    <span class="releaseStatus success" v-if="item.is_released === 1">发布成功</span>
                    <span class="releaseStatus" v-if="item.is_released === 2">导入成绩</span>
                </div>
                <div class="testCard-main" @click="handleClickTestCard(item)">
                    <p class="subjects">
                        <span>考试科目:</span>
                        <span class="subjects-item" v-for="(subject, i) in item.subjectList" :key="i">{{subject.title_subject}}</span>
                    </p>
                    <div class="scoreLines">
                        <div class="scoreLines-item">
                            <span class="title">重本分数线</span>
                            <span class="line">{{item.score_important}}</span>
                        </div>
                        <div class="scoreLines-item">
                            <span class="title">本科分数线</span>
                            <span class="line">{{item.score_normal}}</span>
                        </div>
                        <div class="scoreLines-item">
                            <span class="title">统考分数线</span>
                            <span class="line">{{item.score_qualified}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"

export default {
  name: "testList",
  components: {},
  props: [],
  data() {
    return {
    }
  },
  created () {
    this.SET_HEADER_TITLE('考试列表')
    this.GetTestList({
      schoolID: 1
    })
  },
  computed: {
    ...mapState('testScores', ['testList'])
  },
  methods: {
    ...mapMutations('testScores', ['SET_HEADER_TITLE']),
    ...mapActions('testScores', ['GetTestList']),
    /**
     * 点击考试卡片内容区时触发
     */
    handleClickTestCard (item) {
      console.log(item)
      this.$router.push({
        path: '/home/testScores/testDetails',
        query: {
          data: JSON.stringify(item)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.testList-wrap {
  height: 700px;
  margin-top: 20px;
  .header {
    height: 52px;
    line-height: 52px;
    background-color: #f6f6f6;
    padding: 0 30px;
    .createTest-btn {
        float: right;
        margin-top: 10px;
        width: 100px;
    }
  }
  .main {
      padding: 20px 0 20px 0;
      box-sizing: border-box;
      .testCard {
          width: 340px;
          height: 190px;
          box-shadow: 5px 5px 10px rgba(0, 0, 0, .05);
          float: left;
          margin: 0 0 30px 30px;
          box-sizing: border-box;
          .testCard-header {
              height: 50px;
              line-height: 50px;
              background-color: #f6f6f6;
              padding: 0 20px;
              position: relative;
              box-sizing: border-box;
              border-bottom: 1px solid #e5e5e5;
              .title {
                  font-size: 18px;
                  font-weight: 500;
                  color: #333;
                  margin: 0;
              }
              .releaseStatus {
                  display: block;
                  position: absolute;
                  color: #40b9e6;
                  top: 0;
                  right: 20px;
                  font-size: 16px;
                  &.success {
                      color: #999
                  }
              }
          }
          .testCard-main {
              height: 140px;
              background-color: #fff;
              padding: 20px;
              box-sizing: border-box;
              color: #666;
              font-size: 14px;
              .subjects {
                  margin: 0;
                  .subjects-item {
                      padding-left: 20px;
                  }
              }
              .scoreLines {
                  margin-top: 20px;
                  .scoreLines-item {
                      float: left;
                      text-align: center;
                      margin-left: 40px;
                      &:first-child {
                          margin-left: 0;
                      }
                      .title {
                          display: block;
                      }
                      .line {
                          display: block;
                          font-size: 18px;
                          padding-top: 20px;
                      }
                  }
              }
          }
      }
  }
}
</style>
