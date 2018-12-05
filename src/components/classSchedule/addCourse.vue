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
                <el-select multiple v-model="courseForm.teacherID" placeholder="请选择">
                  <el-option
                    v-for="item in teacherList"
                    :key="item.uid"
                    :label="item.nickname"
                    :value="item.uid"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上课班级：">
                <el-select multiple v-model="courseForm.classIDList" placeholder="请选择">
                  <el-option
                    v-for="item in classList"
                    :key="item.classID"
                    :label="item.className"
                    :value="item.classID"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上课内容：">
                <el-input v-model="courseForm.course_desc" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="kejianList">
                  <div>
                    <el-upload
                      class="upload"
                      action="http://upload-z2.qiniup.com"
                      :on-success="uploadSuccess"
                      accept="image/jpeg, image/gif, image/png, image/bmp"
                      :before-upload="beforeAvatarUpload"
                      :data="{token:tokenOption.token}"
                      list-type="picture-card"
                    >
                      <i v-if="uploadArr.length!=1" style="font-size:26px;" class="el-icon-upload"></i>
                      <div class="el-upload__text">支持添加图片、课件、视频,不超过50M</div>
                      <!-- <img :src="uploadArr[0]" alt=""> -->
                    </el-upload>
                  </div>
                </div>
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
  </div>
</template>
<script>
import { getSessionStorage } from "@/utils/mixin";
export default {
  data() {
    return {
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
        subjectID: "",
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
    breadHeader: () => import("@/components/breadHeader/breadHeader.vue")
    // curriculum: () => import('@/components/curriculum')
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    save() {
      console.log(this.timeChoose);
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
          console.log(res);
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
        .dispatch("GetAllSubClassList", {
          schoolID: JSON.parse(getSessionStorage("userInfo")).schoolId
        })
        .then(res => {
          console.log(res);
          this.classList = res.subClassList;
        });
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
      console.log(res, file, lll, this.tokenOption.bucketUrl);
      this.uploadArr.push(this.tokenOption.bucketUrl + "/" + res.key);
      this.courseForm.accessoryList.push({
        type_material: file.raw.type == "image/png" ? 0 : 1,
        accessoryURL: this.tokenOption.bucketUrl + "/" + res.key
      });
      console.log(this.uploadArr.length);
    },
    //获取七牛云token
    getUploadToken() {
      this.$store.dispatch("GetUploadToken").then(res => {
        console.log(res);
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
  mounted() {
    // if (this.isEdit) {
    this.getAllTeachersOfSchool();
    this.getAllSubClassList();
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
              width: 125px;
              height: 172px;
              line-height: 35px;
              border: 1px solid #e6e6e6;
            }
            img {
              width: 125px;
              height: 172px;
              border-radius: 4px;
              margin-right: 10px;
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
            }
            &:nth-of-type(2) {
              margin: 0 15px;
            }
            &:nth-of-type(3) {
              color: #f84c4c;
            }
          }
          .saveForm{
            background-color: #fff;
            border: 1px solid #40b9e6;
            color: #40b9e6;
          }
          .publishForm{
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
    }
  }
}
</style>
