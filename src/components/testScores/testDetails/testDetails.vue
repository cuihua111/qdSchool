<template>
    <!-- 考试成绩详情页 -->
    <div class="testDetails-wrap">
        <div class="header">
            <span class="header-title">{{query.title}}</span>
            <span class="header-statistics">
                已导入{{query.numof_member_imported}}条成绩数据，
                {{query.numof_member_imported}}/{{query.numof_member_all}}人参考
            </span>
            <span class="released-text" v-if="query.is_released === 1">发布成功</span>
            <div class="btn-group">
                <el-button size="mini" class="btn">预览</el-button>
                <el-button size="mini" class="btn" type="primary" v-if="query.is_released !== 1" @click="handleClickRelease">发布</el-button>
            </div>
        </div>
        <div class="handlers">
            <!-- 0-已导入，未发布状态 || 2-未导入 -->
            <div class="not-released" v-if="query.is_released !== 1">
                <el-button size="mini" class="btn" @click="hanldeClcikImport">重新导入</el-button>
                <el-button size="mini" class="btn" @click="handleClickModify">编辑考试</el-button>
                <el-button size="mini" type="danger" plain>删除</el-button>
            </div>
            <!-- 1-已发布状态 -->
            <div class="released" v-if="query.is_released === 1">
                <el-select v-model="selectedClass" size="small">
                  <el-option
                      v-for="(item, index) in query.classList"
                      :key="index"
                      :label="item.title_class"
                      :value="item.id_class">
                  </el-option>
                </el-select>
                <div class="btn-group">
                    <el-button size="mini" type="danger" plain class="btn">删除</el-button>
                    <el-button size="mini" type="primary" class="btn">导出表格</el-button>
                </div>
            </div>
        </div>
        <div class="scoreList">
            <!-- 考试成绩列表 -->
            <el-table
                :data="rankList"
                style="width: 100%"
                size="small">
                <el-table-column type="selection" width="55" v-if="query.is_released !== 1"></el-table-column>
                <el-table-column prop="nickname" label="姓名" align="center"></el-table-column>
                <el-table-column prop="title_class" label="班级" align="center"></el-table-column>
                <el-table-column
                    v-for="(item, index) in rankList[0].subject_scoreList"
                    :key="index"
                    prop="score"
                    :label="item.subjectName"
                    align="center">
                    <template slot-scope="scope">
                        <span>{{rankList[scope.$index].subject_scoreList[index].score}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="score_total" label="总分" align="center"></el-table-column>
                <el-table-column prop="rank_class" label="班级排名" align="center"></el-table-column>
                <el-table-column prop="rank_school" label="全校排名" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex"

export default {
  name: 'testDetails',
  components: {},
  props: [],
  data () {
    return {
      query: JSON.parse(this.$route.query.data),
      selectedClass: 999999
    }
  },
  created () {
    this.SET_HEADER_TITLE('考试成绩')
    this.query.classList.unshift({ title_class: '全部', id_class: 999999 })
    if (this.query.is_released !== 2) {
      this.GetTotalStrengthRankList({
        testID: this.query.id
      })
    }
  },
  watch: {
    selectedClass (val) {
      if (val === 999999) { // 查看全部班级
        this.GetTotalStrengthRankList({
          testID: this.query.id
        })
      } else {
        this.GetTotalStrengthRankListOfClass({
          testID: this.query.id,
          classID: val
        })
      }
    }
  },
  computed: {
    ...mapState('testScores', ['rankList'])
  },
  methods: {
    ...mapMutations('testScores', ['SET_HEADER_TITLE']),
    ...mapActions('testScores', ['GetTotalStrengthRankList', 'GetTotalStrengthRankListOfClass', 'ReleaseTest']),
    /**
     * 点击编辑考试触发
     */
    handleClickModify () {
      this.$router.push({
        path: '/home/testScores/modifyTest',
        query: {
          data: JSON.stringify(this.query)
        }
      })
    },

    /**
     * 点击导入成绩按钮触发
     */
    hanldeClcikImport () {
      this.$confirm('选择重新导入成绩，之前导入的考试成绩信息和成绩分析报告将全部清空！是否需要继续重新导入？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          path: '/home/testScores/importScores',
          query: {
            data: JSON.stringify(this.query)
          }
        })
      }).catch(() => {})
    },

    /**
     * 点击发布按钮触发
     */
    handleClickRelease () {
      this.ReleaseTest({ testID: this.query.id })
    }
  }
}
</script>

<style lang="scss" scoped>
.testDetails-wrap {
    box-sizing: border-box;
    .header {
        box-sizing: border-box;
        height: 64px;
        line-height: 64px;
        padding: 0 30px 0 15px;
        color: #666;
        font-size: 16px;
        position: relative;
        .header-title {
            font-weight: 600;
        }
        .header-statistics {
            padding-left: 20px;
        }
        .released-text {
            position: absolute;
            left: 50%;
            transform: translateX(-50%)
        }
        .btn-group {
            position: absolute;
            top: 0;
            right: 0;
            .btn {
                width: 100px;
            }
        }
    }
    .handlers {
        height: 52px;
        line-height: 52px;
        padding: 0 20px 0 15px;
        background-color: #f6f6f6;
        .released {
            .btn-group {
                float: right;
                .btn {
                    width: 100px;
                }
            }
        }
    }
}
</style>
<style lang="scss">
.testDetails-wrap {
    .el-table__header {
        .cell {
            color: #333;
        }
    }
}

</style>

