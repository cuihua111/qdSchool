<template>
  <div class="courseInfo">
    <div class="container">
      <div class="title">
        <div class="back">
          <img src="/static/images/back.png" alt>
          <span>返回</span>
        </div>课程详情
        <div class="status">
          <span>{{isRelease?'已发布':'未发布'}}</span>
          <img :src="statusImgUrl" alt>
        </div>
      </div>
      <div class="content">
        <div class="aside">
          <div
            class="font20"
          >星期{{getDateW(courseDetails.startTime)}}({{$moment(courseDetails.startTime).format('HH')>12?'下午':'上午'}})</div>
          <div class="font16 one">{{$moment(courseDetails.startTime).format('YYYY年MM月DD日')}}</div>
          <div class="font16 two">所在班级</div>
          <div class="font20">sadasd</div>
        </div>
        <div class="main">
          <div class="formBox">
            <el-form label-width="90px" :model="courseDetails">
              <el-form-item label="上课科目：">
                <div v-if="!isEdit">{{courseDetails.subjectName}}</div>
                <el-radio-group v-else v-model="radioValue">
                  <el-radio
                    v-for="item in courseList"
                    :key="item.name"
                    :label="item.name"
                  >{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="上课时间：">
                <div
                  v-if="!isEdit"
                >{{$moment(courseDetails.startTime).format('HH:mm')}} - {{$moment(courseDetails.endTime).format('HH:mm')}}</div>
                <el-select v-else v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="任课老师：">
                <div v-if="!isEdit">
                  <span v-for="(item,index) in courseDetails.teacherNameList" :key="index">
                    {{item}}
                    <b v-if="index!=courseDetails.teacherNameList.length-1">、</b>
                  </span>
                </div>
                <el-select v-else multiple v-model="chooseTeacher" placeholder="请选择">
                  <el-option
                    v-for="item in teacherList"
                    :key="item.uid"
                    :label="item.nickname"
                    :value="item.uid"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上课班级：">
                <div v-if="!isEdit">
                  <span v-for="(item,index) in courseDetails.classNameList" :key="index">
                    {{item.className}}
                    <b v-if="index!=courseDetails.classNameList.length-1">、</b>
                  </span>
                </div>
                <el-select v-else multiple v-model="chooseClass" placeholder="请选择">
                  <el-option
                    v-for="item in classList"
                    :key="item.classID"
                    :label="item.className"
                    :value="item.classID"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上课内容：">
                <div v-if="!isEdit">{{courseDetails.course_desc}}</div>
                <el-input :value="classContent" v-else type="textarea"></el-input>
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
                  <div v-for="(item,index) in courseDetails.kejianList" :key="'kj'+index">
                    <img :src="item.url_cover" alt>
                  </div>
                  <div v-for="(item,index) in courseDetails.course_picList" :key="'pic'+index">
                    <img :src="item" alt>
                  </div>
                  <div v-for="(item,index) in courseDetails.course_videoList" :key="'video'+index">
                    <img :src="item" alt>
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="operationBtnList" :style="isRelease==false?styleObj:''">
            <div class="threeBtn">
              <el-button>复制</el-button>
              <el-button @click="isEdit=!isEdit">编辑</el-button>
              <el-button @click="deleteCourse">删除</el-button>
            </div>
            <div v-show="!isRelease" class="oneBtn">
              <span>发布</span>
            </div>
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
      radioValue: "素描静物",
      styleObj: {
        justifyContent: "space-between"
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  methods: {
    getCourseDetails() {
      this.$store
        .dispatch("GetCourseDetails", { courseID: this.$route.params.id })
        .then(res => {
          console.log(res);
          this.courseDetails = res;
          this.isRelease = res.is_published == 0 ? false : true;
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
      console.log(res, file, lll);
      this.uploadArr.push(this.tokenOption.bucketUrl + res.key);
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
    this.getCourseDetails();
    // if (this.isEdit) {
    this.getAllTeachersOfSchool();
    this.getAllSubClassList();
    // }
    this.getUploadToken();
  }
};
</script>
<style lang="scss">
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
      .operationBtnList {
        display: flex;
        justify-content: flex-end;
        padding: 10px 20px;
        margin-bottom: 50px;
        background-color: #ccc;
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
