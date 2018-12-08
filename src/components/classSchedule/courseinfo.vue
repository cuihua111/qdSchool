<template>
  <div class="courseInfo">
    <div class="container">
      <div class="title">
        <div class="back" @click="backToCourse">
          <img src="/static/images/back_blue.png" alt>
          <span>返回</span>
        </div>课程详情
        <div class="status">
          <span>{{isRelease?'已发布':'未发布'}}</span>
          <img :src="statusImgUrl" alt>
        </div>
      </div>
      <div class="content">
        <div class="aside">
          <div class="font20">星期{{getDateW(courseDetails.startTime)}}({{$moment(courseDetails.startTime).format('HH')>12?'下午':'上午'}})</div>
          <div class="font16 one">{{$moment(courseDetails.startTime).format('YYYY年MM月DD日')}}</div>
          <div class="font16 two">所在班级</div>
          <div class="font20">{{$route.query.currentClass}}</div>
        </div>
        <div class="main">
          <div class="formBox">
            <el-form label-width="90px" :model="courseDetails">
              <el-form-item label="上课科目：">
                <div v-if="!isEdit">{{courseDetails.subjectName}}</div>
                <el-radio-group v-else v-model="courseDetails.subjectID">
                  <el-radio v-for="item in courseList" :key="item.name" :label="item.id">{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="上课时间：">
                <div v-if="!isEdit">{{$moment(courseDetails.startTime).format('HH:mm')}} - {{$moment(courseDetails.endTime).format('HH:mm')}}</div>
                <el-select v-else v-model="chooseTime" placeholder="请选择">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任课老师：">
                <div v-if="!isEdit">
                  <span v-for="(item,index) in courseDetails.teacherNameList" :key="index">
                      {{item}}
                      <b v-if="index!=courseDetails.teacherNameList.length-1">、</b>
                    </span>
                </div>
                <div class="selecteditems" v-else @click="showTeacherList">
                  {{selectTearcherName}}
                  <i class="iconarrow el-icon-arrow-down"></i>
                </div>
              </el-form-item>
              <el-form-item label="上课班级：">
                <div v-if="!isEdit">
                  <span v-for="(item,index) in courseDetails.classNameList" :key="index">
                      {{item.className}}
                      <b v-if="index!=courseDetails.classNameList.length-1">、</b>
                    </span>
                </div>
                <div class="selecteditems" v-else @click="showClassList">
                  {{selectClassName}}
                  <i class="iconarrow el-icon-arrow-down"></i>
                </div>
                <!-- <el-select v-else multiple v-model="courseDetails.classIDList" placeholder="请选择">
                    <el-option
                      v-for="item in classList"
                      :key="item.classID"
                      :label="item.className"
                      :value="item.classID"
                    ></el-option>
                  </el-select>-->
              </el-form-item>
              <el-form-item label="上课内容：">
                <div v-if="!isEdit">{{courseDetails.course_desc}}</div>
                <el-input v-model="courseDetails.course_desc" v-else type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-upload class="uploadEle" action="http://upload-z2.qiniup.com" :on-success="uploadSuccess" :before-upload="beforeAvatarUpload" :data="{token:tokenOption.token}" :disabled="limit==true?true:false">
                  <el-button :disabled="limit==true?true:false" type="primary">
                    请选择视频或者图片
                    <i class="el-icon-upload el-icon--right"></i>
                  </el-button>
                </el-upload>
                <el-button type="primary" :disabled="limit==true?true:false" @click="showCourseware">
                  请选择课件
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
                <div>支持添加图片、课件、视频,不超过50M且不超过9个</div>
              </el-form-item>
              <el-form-item>
                <ul class="imglist">
                  <li class="el-upload-list__item is-success" v-for="(item,index) in uploadArr" :key="index">
                    <img v-if="item.type_material==0" :src="item.accessoryURL" alt>
                    <video v-else controls="controls" :src="item.accessoryURL"></video>
                    <label v-show="isEdit" class="el-upload-list__item-status-label">
                        <i class="el-icon-upload-success el-icon-check"></i>
                      </label>
                    <i v-show="isEdit" class="el-icon-close" @click="deleteUploadImg(index)"></i>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </div>
          <div v-if="!isEdit" class="operationBtnList" :style="isRelease==false?styleObj:''">
            <div class="threeBtn">
              <el-button @click="cloneCourse">复制</el-button>
              <el-button @click="isEdit=!isEdit">编辑</el-button>
              <el-button @click="deleteCourse">删除</el-button>
            </div>
            <div v-show="!isRelease" class="oneBtn">
              <el-button @click="releaseCourse" type="primary">发布</el-button>
            </div>
          </div>
          <div style="text-align:right; margin-bottom: 50px;" v-else>
            <el-button @click="isEdit=!isEdit">取消</el-button>
            <el-button @click="editCpurse" type="primary">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="选择复制至日期" :visible.sync="dialogVisible" @before-close="beforeClose" width="30%">
      <Calendar ref="Calendar" :sundayStart="true" :markDateMore="markDateMore" :markDate="markDate" @choseDay="clickDay" @changeMonth="changeDate"></Calendar>
      <span slot="footer" class="dialog-footer">
          <el-button @click="cancelUpdate">取 消</el-button>
          <el-button type="primary" @click="confirmUpdateDate">确 定</el-button>
        </span>
    </el-dialog>
  
    <!-- 选择老师组件 -->
    <choose-teacher v-if="tdialogVisible" @chageDialogVisible="chageTearcherDialogVisible" @confirmTearcherList="confirmTearcherList" :dialogVisible="tdialogVisible" :chooseArr="chooseArr" :tearchList="tearchList"></choose-teacher>
    <!-- 选择老师组件 -->
    <!-- 选择班级组件 -->
    <chooseClass v-if="dialogVisibleChooseClass" @choosenClassChange="choosenClassChange" @chageDialogVisible="chageDialogVisibleChooseClass" @confirmClassList="confirmClassListChooseClass" :dialogVisible="dialogVisibleChooseClass" :choosenClassArr="choosenClassArr"
      :classList="classList"></chooseClass>
    <!-- 选择班级组件 -->
    <!-- 选择课件组件 -->
    <chooseClass @choosenCourseware="choosenCourseware" @chageDialogVisible="chageDialogVisibleCourseware" @confirmClassList="confirmClassListCourseware" :dialogVisible="courseware.dialogVisibleCourseware" :choosenClassArr="courseware.choosenCoursewareArr"
      :classList="courseware.list"></chooseClass>
    <!-- 选择课件组件 -->
  </div>
</template>

<script>
  import {
    getSessionStorage
  } from "@/utils/mixin";
  import {
    zh
  } from "vuejs-datepicker/dist/locale";
  export default {
    components: {
      chooseTeacher: () =>
        import ("@/components/classSchedule/chooseTeacher.vue"),
      Calendar: () =>
        import ("@/components/calendarComponents"),
      chooseClass: () =>
        import ("@/components/chooseClass/index.vue")
    },
    data() {
      return {
        limit: false,
        //课件
        courseware: {
          list: [],
          dialogVisibleCourseware: false,
          choosenCoursewareArr: [], //组件已选数据
          editCoursewareArr: []
        },
        dialogVisible: false, //日期弹窗显隐
        markDateMore: [],
        markDate: [],
        tdialogVisible: false, //教师弹窗显隐
        tearchList: [],
        chooseArr: [],
        choosenClassArr: [], //组件已选数据
        editClassArr: [],
        selectTearcherName: "",
        selectClassName: "",
        zh,
        courseDetails: {},
        chooseTime: "", //时间
        isRelease: true, //是否发布
        isEdit: false, // 是否编辑
        uploadArr: [], //添加的图片
        teacherList: [], //所有的老的列表
        classList: [], //班级列表
        statusImgUrl: "", //状态图片
        tokenOption: null, //七牛云配置
        courseList: [{
            name: "素描静物",
            id: 1
          },
          {
            name: "素描头像",
            id: 2
          },
          {
            name: "色彩静物",
            id: 3
          },
          {
            name: "色彩头像",
            id: 4
          },
          {
            name: "人物速写",
            id: 5
          },
          {
            name: "风景速写",
            id: 6
          }
        ],
        radioValue: "素描静物",
        styleObj: {
          justifyContent: "space-between"
        },
        options: [{
            label: "8:30 - 12:00"
          },
          {
            label: "14:30 - 18:00"
          },
          {
            label: "19:30 - 22:00"
          }
        ],
        //修改提交
        submitForm: {
          startTime: "",
          endTime: "",
          subjectID: "",
          teacherID: [],
          classIDList: [],
          course_desc: "",
          accessoryList: [],
          kejianList: [0],
          is_topublish: 0,
          courseID: ""
        },
        currentDate: "", //格式化时间
        dialogVisibleChooseClass: false, //班级弹窗显隐
        choosenClass: [] //已选择的班级
      };
    },
    computed: {},
    methods: {
      /**
       * @description 选择课件相关韩素    start
       */
      deleteUploadImg(index) {
        this.uploadArr.splice(index, 1);
      },
      getCoursewareList() {
        this.$store.dispatch("GetAllMyMaterialkejian", {}).then(res => {
          this.courseware.list = res.MyMaterialkejianList;
          console.log(res, 22222);
        });
      },
      showCourseware() {
        this.courseware.dialogVisibleCourseware = true;
      },
      choosenCourseware(val) {},
      chageDialogVisibleCourseware() {
        this.courseware.dialogVisibleCourseware = false;
      },
      confirmClassListCourseware(val) {
        this.chageDialogVisibleCourseware();
        console.log(val, 33333);
        // this.courseware.choosenCoursewareArr = [];
        val.map(item => {
          if (this.courseware.editCoursewareArr.indexOf(item.id) < 0) {
            this.courseware.editCoursewareArr.push(item.id);
            //存入上传列表中
            if (this.limit) return;
            this.uploadArr.push({
              accessoryURL: item.url_cover,
              type_material: 0
            });
          } else {
            this.$message.warning("同一节课程不能重复添加相同的课件");
          }
        });
        this.courseForm.kejianList = this.courseware.editCoursewareArr;
      },
      /**
       * @description 选择课件相关韩素    结束
       */
      /* 
        start clone course
      */
      cancelUpdate() {
        this.dialogVisible = false;
      },
      //复制课程
      confirmUpdateDate() {
        let copyDate = [];
        this.markDate.map(item => {
          copyDate.push(this.formatsDate(item));
        });
        let params = {
          courseID: this.$route.params.id,
          dates_publish: copyDate
        };
        if (copyDate.length == 0) {
          this.$message.error("请选择日期");
          return;
        }
        this.$store.dispatch("CopyCourse", params).then(res => {
          this.$message.success("复制课程成功");
          this.dialogVisible = false;
        });
      },
      beforeClose(done) {},
      formatsDate(date) {
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
      },
      clickDay(data) {
        let index = this.markDate.indexOf(data);
        if (index < 0) {
          this.markDate.push(data);
        } else {
          this.markDate.splice(this.markDate.indexOf(data), 1);
        }
        console.log(data, this.markDate);
      },
      /* 
      end clone course
     */
      /* 
        start choose tearcher
      */
      showTeacherList() {
        this.tdialogVisible = true;
      },
      confirmTearcherList(val) {
        this.chageTearcherDialogVisible();
        let selectTearcherNameArr = [];
        this.chooseArr = [];
        val.map(item => {
          this.chooseArr.push(item.uid);
          selectTearcherNameArr.push(item.nickname);
        });
        this.selectTearcherName = selectTearcherNameArr.join(", ");
      },
      chageTearcherDialogVisible() {
        this.tdialogVisible = false;
      },
      /* 
        choose tearcher end
      */
      /* 
      start choose class 
     */
      showClassList() {
        this.dialogVisibleChooseClass = true;
      },
      chageDialogVisibleChooseClass() {
        this.dialogVisibleChooseClass = false;
      },
      choosenClassChange(val) {},
      confirmClassListChooseClass(val) {
        this.chageDialogVisibleChooseClass();
        let selectClassNameArr = [];
        // this.editClassArr = [];
        this.choosenClassArr = [];
        val.map(item => {
          if (this.editClassArr.indexOf(item.id) < 0) {
            this.editClassArr.push(item.id);
          }
          this.choosenClassArr.push({
            id: item.id,
            title: item.title
          });
          selectClassNameArr.push(item.title);
        });
        this.selectClassName = selectClassNameArr.join(", ");
      },
      /* 
      end choose class
    */
      changeDate() {},
      cloneCourse() {
        this.dialogVisible = true;
      },
      backToCourse() {
        this.$router.go(-1);
      },
      //获取课程详情
      getCourseDetails() {
        this.$store
          .dispatch("GetCourseDetails", {
            courseID: this.$route.params.id
          })
          .then(res => {
            console.log(res, "sssss");
            this.courseDetails = res;
            //已选择教师数组赋值
            res.teacherIDList.map((item, index) => {
              this.chooseArr.push(item);
            });
            this.selectTearcherName = res.teacherNameList.join(", ");
            //创建历史数组用来做班级数据回显
            let tempArr = [];
            res.classNameList.map((item, index) => {
              tempArr.push(item.className);
              this.choosenClassArr.push({
                id: item.classID,
                title: item.className
              });
            });
            this.selectClassName = tempArr.join(", ");
            //end class
            this.chooseTime =
              this.$moment(res.startTime).format("HH:mm") +
              " - " +
              this.$moment(res.endTime).format("HH:mm");
            this.isRelease = res.is_published == 0 ? false : true;
            this.currentDate = this.$moment(this.courseDetails.startTime).format(
              "YYYY-MM-DD"
            );
            this.statusImgUrl =
              res.is_published == 0 ?
              "/static/images/weifabu.png" :
              "/static/images/fabuSuccess.png";
  
            /**
             * @description 整理图片列表
             */
            res.kejianList.map(item => {
              this.uploadArr.push({
                accessoryURL: item.url_cover,
                type_material: 0
              });
            });
            res.course_picList.map(item => {
              this.uploadArr.push({
                accessoryURL: item,
                type_material: 0
              });
            });
            res.course_videoList.map(item => {
              this.uploadArr.push({
                accessoryURL: item.videoUrl,
                type_material: 1
              });
            });
          });
      },
      //计算周几
      getDateW(time) {
        let week = ["一", "二", "三", "四", "五", "六", "日"];
        let dateStr = this.$moment(time).format("E");
        return week[dateStr - 1];
      },
      //不改变班级处理
      noChangeClass(oldArr) {
        let tempArray = []
        oldArr.map((item) => {
          tempArray.push(item.id)
        })
        return tempArray
      },
      //编辑课程
      editCpurse() {
        console.log(this.choosenClass, this.chooseArr, "qqqqq");
        let tempObj = {
          accessoryList: this.uploadArr,
          startTime: "",
          endTime: "",
          subjectID: this.courseDetails.subjectID,
          teacherID: this.chooseArr,
          classIDList: this.editClassArr.length == 0 ? this.noChangeClass(this.choosenClassArr) : this.editClassArr,
          course_desc: this.courseDetails.course_desc,
          is_topublish: 0,
          courseID: this.$route.params.id
        };
        tempObj.startTime =
          this.currentDate.split(" ")[0] +
          " " +
          this.chooseTime.split(" - ")[0] +
          ":00";
        tempObj.endTime =
          this.currentDate.split(" ")[0] +
          " " +
          this.chooseTime.split(" - ")[1] +
          ":00";
        this.submitForm = { ...this.submitForm,
          ...tempObj
        };
  
        this.$store.dispatch("ModifyCourse", this.submitForm).then(res => {
          this.$router.go(-1);
          this.$message.success("编辑课程成功");
        });
      },
      //获取老师列表
      getAllTeachersOfSchool() {
        this.$store
          .dispatch("GetAllTeachersOfSchool", {
            schoolId: JSON.parse(getSessionStorage("userInfo")).schoolId
          })
          .then(res => {
            console.log(res);
            this.teacherList = res.teacherList;
            this.tearchList = res.teacherList;
          });
      },
      //获取当前学校所有班级
      getAllSubClassList() {
        let _this = this;
        this.$store
          .dispatch("GetAllOrganizationForSchool", {
            schoolID: JSON.parse(getSessionStorage("userInfo")).schoolId
          })
          .then(res => {
            console.log(res);
            this.classList = res.list_class;
          });
      },
      //删除课程
      deleteCourse() {
        this.$confirm("确定删除该课程？", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.$store
              .dispatch("DelCourse", {
                courseID: this.courseDetails.courseID
              })
              .then(res => {
                console.log(res);
                this.$message.success("成功删除课程");
                this.$router.go(-1);
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      //上传图片成功回调
      uploadSuccess(res, file, lll) {
        if (this.limit) {
          return;
        }
        console.log(res, file, lll, this.tokenOption.bucketUrl);
        this.uploadArr.push({
          accessoryURL: this.tokenOption.bucketUrl + "/" + res.key,
          type_material: file.raw.type.includes("image") ? 0 : 1,
        });
        console.log(this.uploadArr, 1233213);
      },
      //获取七牛云token
      getUploadToken() {
        this.$store.dispatch("GetUploadToken").then(res => {
          console.log(res);
          this.tokenOption = res;
        });
      },
      //图片上传前
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 50;
  
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isLt2M;
      },
      //发布课程
      releaseCourse() {
        this.$store
          .dispatch("PublishCourses", {
            courseList: [Number(this.$route.params.id)]
          })
          .then(res => {
            this.$message.success("发布课程成功");
            this.getCourseDetails();
          });
      }
    },
    watch: {
      uploadArr: {
        handler(newValue, oldValue) {
          if (newValue.length == 9) {
            this.$message.warning("视频、图片、课件总数不能超过9个");
            this.limit = true;
          } else {
            this.limit = false;
          }
        },
        deep: true
      }
    },
    mounted() {
      // if (this.isEdit) {
      this.getAllSubClassList();
      this.getCoursewareList();
      // }
      this.getUploadToken();
    },
    created() {
      this.getAllTeachersOfSchool();
      this.getCourseDetails();
      this.isEdit = this.$route.query.isEdit || null;
    }
  };
</script>

<style lang="scss">
  .courseInfo {
    .container {
      width: 1200px;
      margin: 20px auto 0;
      border: 1px solid #ddd;
      box-shadow: 0px 0px 20px -5px #53a8ff;
      .title {
        height: 60px;
        font-size: 20px;
        line-height: 60px;
        border-bottom: 1px solid #e5e5e5;
        color: #333;
        text-align: center;
        position: relative;
        background-color: #fff;
        .back,
        .status {
          position: absolute;
          color: #4dc2fd;
          font-size: 14px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
          img {
            width: 10px;
            height: 18px;
            margin-right: 10px;
            vertical-align: sub;
          }
        }
        .back {
          left: 30px;
        }
        .status {
          color: #333;
          right: 30px;
          img {
            width: 20px;
            height: 20px;
            margin-left: 10px;
          }
        }
      }
      .content {
        display: flex;
        height: calc(100% - 61px);
        .aside {
          width: 186px;
          border-right: 1px solid #e6e6e6;
          box-sizing: border-box;
          padding-left: 20px;
          background-color: #fff;
          .font20 {
            font-size: 20px;
            color: #333;
            &:first-of-type {
              margin-top: 55px;
            }
          }
          .font16 {
            color: #666;
            &.one {
              margin-top: 15px;
            }
            &.two {
              margin: 35px 0 10px 0;
            }
          }
        }
        .main {
          width: calc(100% - 186px);
          background-color: #fff;
          padding: 55px 65px 0;
          .formBox {
            .selecteditems {
              cursor: pointer;
              width: 195px;
              position: relative;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              -webkit-appearance: none;
              background-color: #fff;
              border-radius: 4px;
              border: 1px solid #dcdfe6;
              box-sizing: border-box;
              color: #606266;
              font-size: inherit;
              height: 40px;
              line-height: 40px;
              outline: none;
              padding: 0 15px;
              &>.iconarrow {
                position: absolute;
                line-height: 40px;
                width: 25px;
                text-align: center;
                height: 100%;
                right: 5px;
                top: 0;
                text-align: center;
                color: #c0c4cc;
                transition: all 0.3s;
                pointer-events: none;
              }
            }
            .imglist {
              display: flex;
              flex-wrap: wrap;
              li {
                width: 125px;
                height: 172px;
                border-radius: 4px;
                margin-right: 10px;
                border: 1px solid #e6e6e6;
                margin-right: 10px;
                img {
                  width: 100%;
                  height: 100%;
                }
                video {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
          .operationBtnList {
            display: flex;
            justify-content: flex-end;
            padding: 10px 20px;
            margin-bottom: 50px;
            .threeBtn {
              .el-button {
                display: inline-block;
                width: 88px;
                height: 30px;
                border: 1px solid #ccc;
                background-color: #fff;
                font-size: 14px;
                border-radius: 4px;
                line-height: 30px;
                padding: 0;
                &:nth-of-type(2) {
                  margin: 0 15px;
                }
                &:nth-of-type(3) {
                  color: #f84c4c;
                }
              }
            }
            .oneBtn {
              .el-button {
                width: 88px;
                height: 32px;
                text-align: center;
                font-size: 14px;
                border-radius: 4px;
                color: #fff;
                line-height: 30px;
                padding: 0;
              }
            }
          }
        }
      }
      .datePicker_M {
        background-color: red;
        .vdp-datepicker__calendar {
          border: 0 !important;
        }
      }
      .el-dialog__header {
        background-color: #40b9e6 !important;
        color: #fff;
      }
      .uploadEle {
        display: inline-block;
        &:nth-of-type(2) {
          margin-left: 20px;
        }
      }
    }
    .el-upload-list {
      display: none;
    }
    .el-upload-list__item {
      overflow: hidden;
      z-index: 0;
      background-color: #fff;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      margin-top: 10px;
      height: 92px;
    }
    .el-upload-list__item-status-label {
      position: absolute;
      right: -17px;
      top: -7px;
      width: 46px;
      height: 26px;
      background: #13ce66;
      text-align: center;
      transform: rotate(45deg);
      box-shadow: 0 1px 1px #ccc;
      color: #fff;
    }
    .el-upload-list__item-status-label i {
      font-size: 12px;
      margin-top: 12px;
      transform: rotate(-45deg);
    }
    .el-upload-list__item .el-icon-check {
      color: #fff;
    }
  }
</style>
