<template>
    <!-- 导入成绩结果页 显示正常或异常的结果 -->
    <div class="importResult-wrap">
        <!-- 导入模板错误 -->
        <div class="main template-error" v-if="false">
            <div class="img-box">
                <span class="img img-warn"></span>
            </div>
            <p class="tip-box tip1">成绩导入模板有误</p>
            <p class="tip-box tip2">请下载指定模板后再次上传</p>
            <el-button class="import-again-btn" type="primary" @click="$router.go(-1)">重新导入</el-button>
        </div>
        <!-- 导入成绩异常 -->
        <div class="main import-abnormal" v-if="true">
            <div class="img-box">
                <span class="img img-warn"></span>
            </div>
            <div class="tip-box">
                <p class="tip tip1">一共导入12条数据，2条异常</p>
                <p class="tip tip2">以下为异常列表</p>
            </div>
            <div class="btn-box">
                <el-button class="import-again-btn" @click="$router.go(-1)">重新导入</el-button>
            </div>
            <!-- 异常列表 -->
            <el-table
                class="errorTable"
                :data="errRecordList"
                style="width: 100%"
                size="small">
                <el-table-column
                    v-for="(item, index) in errRecordList[0].scoreList"
                    :key="index"
                    prop="score"
                    :label="item.subjectName"
                    align="center">
                    <template slot-scope="scope">
                        <span>{{errRecordList[scope.$index].scoreList[index].score}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="reason_err" label="异常原因" align="center">
                    <template slot-scope="scope">
                        <span style="color: #f25643">{{scope.row.reason_err}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 导入成功 -->
        <div class="main import-success" v-if="false">
            <div class="img-box">
                <span class="img img-success"></span>
            </div>
            <p class="tip1">一共成功导入12条数据</p>
            <div class="btn-box">
                <el-button class="import-again-btn">重新导入</el-button>
                <el-button class="check-btn" type="primary">查看</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'importResult',
  components: {},
  props: [],
  data () {
    return {
      query: JSON.parse(this.$route.query.data),
      errRecordList: [
        { reason_err: '123123', scoreList: [ { subjectName: '语文', score: 100 }, { subjectName: '数学', score: 90 } ] },
        { reason_err: 'adaasd', scoreList: [ { subjectName: '语文', score: 101 }, { subjectName: '数学', score: 93 } ] },
        { reason_err: '324sd阿萨德', scoreList: [ { subjectName: '语文', score: 50 }, { subjectName: '数学', score: 33 } ] }
      ]
    }
  },
  methods: {
    /**
     *
     */
    fn () {
    }
  }
}
</script>

<style lang="scss" scoped>
.importResult-wrap {
    text-align: center;
    .tip {
        margin: 0;
    }
    .tip1 {
        box-sizing: border-box;
        font-size: 22px;
        color: #333;
    }
    .tip2 {
        box-sizing: border-box;
        font-size: 16px;
        color: #666;
    }
    .btn-box {
        height: 52px;
        box-sizing: border-box;
        background-color: #f6f6f6;
        text-align: right;
        padding: 10px 20px 0 0;
        .check-btn,
        .import-again-btn {
            width: 120px;
            height: 34px;
            line-height: 10px;
            font-size: 16px;
        }
    }
    .main {
        margin: 50px auto;
        &.template-error {
            .tip {
                margin: 0;
            }
            .tip1 {
                margin-top: 20px;
            }
            .tip2 {
                margin-top: 10px;
            }
            .import-again-btn {
                width: 260px;
                height: 34px;
                line-height: 10px;
                margin-top: 50px;
                font-size: 16px;
            }
        }
        &.import-abnormal {
            .img-box {
                display: inline-block;
            }
            .tip-box {
                display: inline-block;
                text-align: left;
                vertical-align: top;
                margin-left: 20px;
                .tip2 {
                    margin-top: 10px;
                }
            }
            .btn-box {
                margin-top: 50px;
            }
            .errorTable {
                margin-top: 20px;
            }
        }
        &.import-success {
            .tip1 {
                margin-top: 15px;
            }
            .btn-box {
                margin-top: 40px;
                .import-again-btn {
                }
            }
        }
    }
    .img-box {
        .img {
            display: inline-block;
            width: 60px;
            height: 60px;
            &.img-warn {
                background-image: url('../../../../static/images/import-abnormal.png')
            }
            &.img-success {
                background-image: url('../../../../static/images/import-success.png')
            }
        }
    }
}
</style>
<style lang="scss">
.importResult-wrap {
    .el-table__header {
        .cell {
            color: #333;
        }
    }
    th {
        background-color: rgba(163, 181, 194, .8);
    }
}
</style>
