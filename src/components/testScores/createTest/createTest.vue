<template>
    <!-- 创建考试页 -->
    <div class="createTest-wrap">
        <el-form
            :model="createTestForm"
            :rules="rules"
            ref="createTestFormRef"
            label-width="150px"
            size="small"
            class="form-wrap">
            <!-- 考试信息 -->
            <div class="form-testInfo">
                <div class="label-info">
                    考试信息
                </div>
                <el-form-item
                    class="form-item"
                    label="考试名称："
                    prop="title">
                    <el-input class="form-item-value" v-model="createTestForm.title" placeholder="例如：6月份月考"></el-input>
                </el-form-item>
                <el-form-item
                    class="form-item"
                    label="考试科目："
                    prop="subjectList">
                    <el-checkbox-group 
                        class="form-item-value subjects"
                        v-model="createTestForm.subjectList"
                        fill="#FEB834"
                        :max="3">
                        <el-checkbox name="subjectList" v-for="(item, index) in subjectOptions" :label="item" :key="item.subjectID">{{item.subtitle}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <!-- 考试设置 -->
            <div class="form-testSet">
                <div class="label-info">
                    考试设置
                </div>
                <el-form-item
                    class="form-item"
                    label="重本分数线："
                    prop="score_important">
                    <el-input class="form-item-value" v-model="createTestForm.score_important" placeholder="例如：统考重本线160"></el-input>
                </el-form-item>
                <el-form-item
                    class="form-item"
                    label="本科分数线："
                    prop="score_normal">
                    <el-input class="form-item-value" v-model="createTestForm.score_normal" placeholder="例如：统考本科线140"></el-input>
                </el-form-item>
                <el-form-item
                    class="form-item"
                    label="统考合格线："
                    prop="score_qualified">
                    <el-input class="form-item-value" v-model="createTestForm.score_qualified" placeholder="例如：统考合格线120"></el-input>
                </el-form-item>
                <el-form-item
                    class="form-item"
                    label="参考班级："
                    prop="selectedClasses">
                    <el-button size="mini" style="width: 80px" @click="$refs.SelectClassDialogRef.open()">
                        <span v-if="createTestForm.selectedClasses.length === 0">添加</span>
                        <span v-if="createTestForm.selectedClasses.length > 0">继续添加</span>
                    </el-button>
                    <span style="padding-left: 20px;">
                        已选择{{selectedBigClassCount}}个班级，包括{{createTestForm.selectedClasses.length}}个子班级
                    </span>
                    <div>
                        <span class="selected-tag"
                            v-for="(item, index) in createTestForm.selectedClasses"
                            :key="index">{{item.title}}
                        </span>
                    </div>
                    <SelectClassDialog ref="SelectClassDialogRef"
                        @select="handleSelectClasses"
                        :checked="createTestForm.selectedClasses">
                    </SelectClassDialog>
                </el-form-item>
            </div>
            <el-form-item class="form-item submit-wrap">
                <el-button class="submit-btn" type="primary" size="small" @click="handleClickCreate">
                    <span v-if="!this.query">创建完成</span>
                    <span v-if="this.query">保存</span>
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import SelectClassDialog from './SelectClassDialog'

const SUBJECT_OPTIONS = [
  { subjectID: 1, subtitle: '素描静物' },
  { subjectID: 2, subtitle: '素描头像' },
  { subjectID: 3, subtitle: '色彩静物' },
  { subjectID: 4, subtitle: '色彩头像' },
  { subjectID: 5, subtitle: '人物速写' },
  { subjectID: 6, subtitle: '风景速写' }
]

export default {
  name: 'createTest',
  components: { SelectClassDialog },
  props: [],
  data () {
    let queryData = this.$route.query.data ? JSON.parse(this.$route.query.data) : null
    return {
      query: queryData,
      subjectOptions: SUBJECT_OPTIONS,
      createTestForm: {
        title: queryData ? queryData.title : '',
        subjectList: queryData ? queryData.subjectList.map(v => {
          return { subjectID: v.id_subject, subtitle: v.title_subject }
        }) : [],
        score_important: queryData ? queryData.score_important : '',
        score_normal: queryData ? queryData.score_normal : '',
        score_qualified: queryData ? queryData.score_qualified : '',
        selectedClasses: queryData ? queryData.classList.map(v => {
          return { id: v.id_class, title: v.title_class }
        }) : []
      },
      selectedBigClassCount: queryData ? queryData.numof_bigclass : 0,
      rules:{
        title:[
          { required: true, message: '不能为空'},
        ],
        subjectList:[
          { required: true, message: '不能为空'},
        ],
        score_important:[
          { required: true, message: '不能为空'},
        ],
        score_normal:[
          { required: true, message: '不能为空'},
        ],
        score_qualified:[
          { required: true, message: '不能为空'},
        ]
      }
    }
  },
  created () {
    this.SET_HEADER_TITLE('创建考试')
    if (this.query) this.SET_HEADER_TITLE('编辑考试')
  },
  methods: {
    ...mapMutations('testScores', ['SET_HEADER_TITLE']),
    ...mapActions('testScores', ['CreateTest', 'ModifyTest']),
    /**
     * 确认选择班级后接受已选班级传值
     */
    handleSelectClasses ({ selectedBigClass, selectedSmallClass }) {
      this.selectedBigClassCount = selectedBigClass.length
      this.createTestForm.selectedClasses = [ ...selectedSmallClass ]
    },

    /**
     * 点击创建/保存按钮时触发
     */
    handleClickCreate () {
      let { title, subjectList, score_important, score_normal, score_qualified } = this.createTestForm
      let classList = this.createTestForm.selectedClasses.map(v => {
        return { classID: v.id, className: v.title }
      })
      let numof_bigclass = this.selectedBigClassCount
      let schoolID = 1
      let params = {
        title,
        subjectList,
        score_important,
        score_normal,
        score_qualified,
        numof_bigclass,
        schoolID,
        classList
      }
      if (!this.query) this.CreateTest(params) // 创建
      if (this.query) { // 修改
        params.testID = this.query.id
        this.ModifyTest(params)
      }
      
    }
  }
}
</script>

<style lang="scss" scoped>
.createTest-wrap {
    box-sizing: border-box;
    height: 718px;
    .form-wrap {
        height: 100%;
        position: relative;
        .label-info {
            height: 40px;
            line-height: 40px;
            background-color: #f6f6f6;
            margin-top: 20px;
            color: #666;
            padding: 0 0 0 15px;
            font-size: 14px;
        }
        .form-item {
            margin-top: 30px;
            margin-bottom: 0;
            .form-item-value {
                color: #666;
                width: 400px;
                &.subjects {
                    width: 100%;
                }
            }
            .selected-tag {
                display: inline-block;
                width: 90px;
                height: 30px;
                border-radius: 4px;
                background-color: #d2eafb;
                color: #10a9e9;
                text-align: center;
                margin: 15px 10px 0 0;
            }
            .submit-btn {
                width: 100px;
            }
        }
        .submit-wrap {
            width: 100%;
            box-sizing: border-box;
            border-top: 1px solid #e5e5e5;
            margin-top: 0;
            height: 60px;
            padding-top: 10px;
            position: absolute;
            bottom: 0;
            text-align: right;
        }
    }
}
</style>
<style lang="scss">
.createTest-wrap {
    .el-form-item__label,
    .form-item-value,
    .el-checkbox__label {
        font-size: 16px;
    }
    .el-form-item__label {
        color: #333;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
        background-color: #feb834;
        border-color: #feb834;
    }
    .el-checkbox__inner {
        transform: scale(1.5);
        border-radius: 50%
    }
    .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
        vertical-align: -12px;
        font-size: 30px;
        padding-right: 10px;
    }
}
</style>

