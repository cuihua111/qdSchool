<template>
  <div class="courseInfo">
    <div class="container">
      <bread-header :titleInfo="titleInfo"></bread-header>
      <div class="content">
        <div class="aside">
          <div
            class="font20"
          >星期{{getDateW(currentDate.date)}}({{$moment(currentDate.date).format('HH')>12?'下午':'上午'}})</div>
          <div class="font16 one">{{$moment(currentDate.date).format('YYYY年MM月DD日')}}</div>
          <div class="font16 two">所在班级</div>
          <div class="font20">{{currentClass}}</div>
        </div>
        <div class="main">
          <div class="formBox">
            <el-form label-width="90px" :model="courseForm">
              <el-form-item label="上课科目：">
                <!-- <div v-if="!isEdit">{{courseDetails.subjectName}}</div> -->
                <el-radio-group v-model="courseForm.subjectID">
                  <el-radio
                    v-for="item in courseList"
                    :key="item.name"
                    :label="item.id"
                    :value="item.id"
                  >{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="上课时间：">
                <el-select v-model="timeChoose" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任课老师：">
                <div class="selecteditems" @click="showTeacherList">
                  {{selectTearcherName}}
                  <i class="iconarrow el-icon-arrow-down"></i>
                </div>
                <!-- courseForm.teacherID -->
              </el-form-item>
              <el-form-item label="上课班级：">
                <div class="selecteditems" @click="showClassList">
                  {{selectClassName}}
                  <i class="iconarrow el-icon-arrow-down"></i>
                </div>
                <!-- courseForm.classIDList -->
                <!-- <el-select multiple v-model="courseForm.classIDList" placeholder="请选择">
                  <el-option
                    v-for="item in classList"
                    :key="item.classID"
                    :label="item.className"
                    :value="item.classID"
                  ></el-option>
                </el-select>-->
              </el-form-item>
              <el-form-item label="上课内容：">
                <el-input v-model="courseForm.course_desc" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-upload
                  class="uploadEle"
                  action="http://upload-z2.qiniup.com"
                  :on-success="uploadSuccess"
                  :before-upload="beforeAvatarUpload"
                  :data="{token:tokenOption.token}"
                  :disabled="limit==true?true:false"
                >
                  <el-button :disabled="limit==true?true:false" type="primary">
                    请选择视频或者图片
                    <i class="el-icon-upload el-icon--right"></i>
                  </el-button>
                </el-upload>
                <el-button
                  type="primary"
                  :disabled="limit==true?true:false"
                  @click="showCourseware"
                >
                  请选择课件
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
                <div>支持添加图片、课件、视频,不超过50M且不超过9个</div>
              </el-form-item>
              <el-form-item>
                <ul class="imglist">
                  <li
                    class="el-upload-list__item is-success"
                    v-for="(item,index) in uploadArr"
                    :key="index"
                  >
                    <img v-if="item.type_material==0" :src="item.accessoryURL" alt>
                    <video v-else controls="controls" :src="item.accessoryURL"></video>
                    <label class="el-upload-list__item-status-label">
                      <i class="el-icon-upload-success el-icon-check"></i>
                    </label>
                    <i class="el-icon-close" @click="deleteUploadImg(index)"></i>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </div>
          <div class="operationBtnList" :style="isRelease==false?styleObj:''">
            <div class="threeBtn">
              <el-button class="saveForm" @click="cancel">保存</el-button>
              <el-button class="confirm publishForm" type="primary" @click="save">发布</el-button>
              <!-- <el-button @click="isEdit=!isEdit">编辑</el-button>
              <el-button @click="deleteCourse">删除</el-button>-->
            </div>
            <!-- <div v-show="!isRelease" class="oneBtn">
              <span>发布</span>
            </div>-->
          </div>
        </div>
      </div>
    </div>
    <!-- 选择老师组件 -->
    <choose-teacher
      @chageDialogVisible="chageTearcherDialogVisible"
      @confirmTearcherList="confirmTearcherList"
      :dialogVisible="tdialogVisible"
      :chooseArr="chooseArr"
      :tearchList="teacherList"
    ></choose-teacher>
    <!-- 选择老师组件 -->
    <!-- 选择班级组件 -->
    <chooseClass
      @choosenClassChange="choosenClassChange"
      @chageDialogVisible="chageDialogVisibleChooseClass"
      @confirmClassList="confirmClassListChooseClass"
      :dialogVisible="dialogVisibleChooseClass"
      :choosenClassArr="choosenClassArr"
      :classList="classList"
    ></chooseClass>
    <!-- 选择班级组件 -->
    <!-- 选择课件组件 -->
    <chooseClass
      @choosenCourseware="choosenCourseware"
      @chageDialogVisible="chageDialogVisibleCourseware"
      @confirmClassList="confirmClassListCourseware"
      :dialogVisible="courseware.dialogVisibleCourseware"
      :choosenClassArr="courseware.choosenCoursewareArr"
      :classList="courseware.list"
    ></chooseClass>
    <!-- 选择课件组件 -->
  </div>
</template>
<script>
import { getSessionStorage } from "@/utils/mixin";
export default {
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
      tdialogVisible: false, //教师弹窗显隐
      dialogVisibleChooseClass: false,
      chooseArr: [],
      choosenClassArr: [], //组件已选数据
      editClassArr: [],
      selectTearcherName: "",
      selectClassName: "", //已选班级名称
      titleInfo: {
        centerTitle: "新建课程"
      },
      courseDetails: {},
      isRelease: true, //是否发布
      isEdit: false, // 是否编辑
      chooseTeacher: [], //选择的老师
      uploadArr: [], //添加的图片
      chooseClass: [], //选择的班级
      teacherList: [], //所有的老的列表
      classList: [], //班级列表
      classContent: "", //上课内容
      statusImgUrl: "", //状态图片
      tokenOption: null, //七牛云配置
      courseList: [
        { name: "素描静物", id: 1 },
        { name: "素描头像", id: 2 },
        { name: "色彩静物", id: 3 },
        { name: "色彩头像", id: 4 },
        { name: "人物速写", id: 5 },
        { name: "风景速写", id: 6 }
      ],
      styleObj: {
        justifyContent: "space-between"
      },
      options: [
        {
          value: "8:30-12:00",
          label: "8:30-12:00"
        },
        {
          value: "14:30-18:00",
          label: "14:30-18:00"
        },
        {
          value: "19:30-22:00",
          label: "19:30-22:00"
        }
      ],
      timeChoose: "", //上课时间选择
      courseForm: {
        startTime: "",
        endTime: "",
        subjectID: 1,
        teacherID: [],
        classIDList: [],
        course_desc: "",
        accessoryList: [],
        kejianList: [0],
        is_topublish: 0
      },
      initData: null,
      currentDate: null
    };
  },
  components: {
    breadHeader: () => import("@/components/breadHeader/breadHeader.vue"),
    chooseTeacher: () => import("@/components/classSchedule/chooseTeacher.vue"),
    chooseClass: () => import("@/components/chooseClass/index.vue")
    // curriculum: () => import('@/components/curriculum')
  },
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
          this.uploadArr.push({ accessoryURL: item.url_cover, type_material: 0 });
        } else {
          this.$message.warning('同一节课程不能重复添加相同的课件')
        }
      });
      this.courseForm.kejianList = this.courseware.editCoursewareArr;
    },
    /**
     * @description 选择课件相关韩素    结束
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
      this.courseForm.teacherID = this.chooseArr;
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
      this.editClassArr = [];
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
      this.courseForm.classIDList = this.editClassArr;
    },
    /*
      end choose class
    */
    cancel() {
      this.$router.go(-1);
    },
    save() {
      this.courseForm.startTime = this.timeChoose.split("-")[0];
      this.courseForm.startTime =
        this.currentDate.split(" ")[0] +
        " " +
        this.courseForm.startTime +
        ":00";
      this.courseForm.endTime = this.timeChoose.split("-")[1];
      this.courseForm.endTime =
        this.currentDate.split(" ")[0] + " " + this.courseForm.endTime + ":00";
      this.$store.dispatch("CreateCourse", this.courseForm).then(res => {
        this.$router.go(-1);
      });
    },
    getCourseDetails() {
      this.$store
        .dispatch("GetCourseDetails", { courseID: this.$route.params.id })
        .then(res => {
          this.courseDetails = res;
          this.isRelease = res.is_published == 0 ? false : true;
          this.titleInfo.rightTitle.isRelease =
            res.is_published == 0 ? false : true;
          this.titleInfo.rightTitle.statusImgUrl =
            res.is_published == 0
              ? "/static/images/weifabu.png"
              : "/static/images/fabuSuccess.png";
          this.statusImgUrl =
            res.is_published == 0
              ? "/static/images/weifabu.png"
              : "/static/images/fabuSuccess.png";
        });
    },
    //计算周几
    getDateW(time) {
      let week = ["一", "二", "三", "四", "五", "六", "日"];
      let dateStr = this.$moment(time).format("E");
      return week[dateStr - 1];
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
          this.classList = res.list_class;
        });
      // let _this = this;
      // this.$store
      //   .dispatch("GetAllSubClassList", {
      //     schoolID: JSON.parse(getSessionStorage("userInfo")).schoolId
      //   })
      //   .then(res => {
      //     console.log(res);
      //     this.classList = res.subClassList;
      //   });
    },
    //删除课程
    deleteCourse() {
      this.$store
        .dispatch("DelCourse", { courseID: this.courseDetails.courseID })
        .then(res => {
          console.log(res);
        });
    },
    //上传图片成功回调
    uploadSuccess(res, file, lll) {
      if (this.limit) {
        return;
      }
      this.uploadArr.push({
        accessoryURL: this.tokenOption.bucketUrl + "/" + res.key,
        type_material: file.raw.type.includes("image") ? 0 : 1,
      });
      this.courseForm.accessoryList.push({
        type_material: file.raw.type.includes("image") ? 0 : 1,
        accessoryURL: this.tokenOption.bucketUrl + "/" + res.key
      });
    },
    //获取七牛云token
    getUploadToken() {
      this.$store.dispatch("GetUploadToken").then(res => {

        this.tokenOption = res;
      });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 50;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  },
  watch: {
    uploadArr: {
      handler(newValue, oldValue) {
        console.log(newValue,1111)
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
    this.getAllTeachersOfSchool();
    this.getAllSubClassList();
    this.getCoursewareList();
    // }
    this.getUploadToken();
  },
  created() {
    this.addData = this.$route.query.addData || null;
    this.currentClass = this.$route.query.currentClass || null;
    if (this.addData) {
      this.currentDate = this.addData;
    }
  }
};
</script>
<style lang="scss">
.container {
  width: 1200px;
  margin: 20px auto 0;
  border: 1px solid #ddd;
  box-shadow: 0px 0px 20px -5px #53a8ff;
  .content {
    display: flex;
    height: calc(100% - 61px);
    background-color: #fff;
    .aside {
      width: 186px;
      border-right: 1px solid #e6e6e6;
      box-sizing: border-box;
      text-align: center;
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
          & > .iconarrow {
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
        .kejianList {
          display: flex;
          flex-wrap: wrap;
          .upload {
            display: flex;
            .el-upload-list--picture-card {
              display: flex;
              .el-upload-list__item {
                width: 125px;
                height: 172px;
              }
            }
            .el-upload--picture-card {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
              width: 125px;
              height: 172px;
              line-height: 25px;
              border: 1px solid #e6e6e6;
              padding: 20px 0;
              i {
                color: #f84c4c;
              }
            }
            img {
              width: 125px;
              height: 172px;
              border-radius: 4px;
              margin-right: 10px;
              &.uploadImg {
                width: 26px;
                height: 26px;
                margin-right: 0;
              }
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
            &.confirm {
              background: #40b9e6;
              border-color: #40b9e6;
            }
            &:nth-of-type(2) {
              margin: 0 15px;
            }
            &:nth-of-type(3) {
              color: #f84c4c;
            }
          }
          .saveForm {
            background-color: #fff;
            border: 1px solid #40b9e6;
            color: #40b9e6;
          }
          .publishForm {
            background-color: #40b9e6;
            color: #fff;
          }
        }
        .oneBtn {
          width: 88px;
          height: 32px;
          text-align: center;
          font-size: 14px;
          border-radius: 4px;
          background-color: #40b9e6;
          color: #fff;
          line-height: 30px;
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
  }
  .uploadEle {
    display: inline-block;
    &:nth-of-type(2) {
      margin-left: 20px;
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
