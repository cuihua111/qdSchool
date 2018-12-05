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
          <div class="font20">{{$route.query.currentClass}}</div>
        </div>
        <div class="main">
          <div class="formBox">
            <el-form label-width="90px" :model="courseDetails">
              <el-form-item label="上课科目：">
                <div v-if="!isEdit">{{courseDetails.subjectName}}</div>
                <el-radio-group v-else v-model="courseDetails.subjectID">
                  <el-radio
                    v-for="item in courseList"
                    :key="item.name"
                    :label="item.id"
                  >{{item.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="上课时间：">
                <div
                  v-if="!isEdit"
                >{{$moment(courseDetails.startTime).format('HH:mm')}} - {{$moment(courseDetails.endTime).format('HH:mm')}}</div>
                <el-select v-else v-model="chooseTime" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label"
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
                <el-select v-else multiple v-model="courseDetails.teacherIDList" placeholder="请选择">
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
                <el-select v-else multiple v-model="courseDetails.classIDList" placeholder="请选择">
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
                <el-input :value="courseDetails.course_desc" v-else type="textarea"></el-input>
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
          <div v-if="!isEdit" class="operationBtnList" :style="isRelease==false?styleObj:''">
            <div class="threeBtn">
              <el-button>复制</el-button>
              <el-button @click="isEdit=!isEdit">编辑</el-button>
              <el-button @click="deleteCourse">删除</el-button>
            </div>
            <div v-show="!isRelease" class="oneBtn">
              <el-button type="primary">发布</el-button>
            </div>
          </div>
          <div style="text-align:right; margin-bottom: 50px;" v-else>
            <el-button @click="isEdit=!isEdit">取消</el-button>
            <el-button @click="editCpurse" type="primary">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="选择复制至日期" :visible.sync="dialogVisible" width="30%">
      <Datepicker class="datePicker_M" :language="zh" :inline="true"></Datepicker>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getSessionStorage } from "@/utils/mixin";
import Datepicker from "vuejs-datepicker";
import { zh } from "vuejs-datepicker/dist/locale";
export default {
  components: {
    Datepicker
  },
  data() {
    return {
      zh,
      dialogVisible: false,
      courseDetails: {},
      chooseTime: "", //时间
      isRelease: true, //是否发布
      isEdit: false, // 是否编辑
      uploadArr: [], //添加的图片
      teacherList: [], //所有的老的列表
      classList: [], //班级列表
      statusImgUrl: "", //状态图片
      tokenOption: null, //七牛云配置
      courseList: [
        {
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
      options: [
        {
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
      currentDate: "" //格式化时间
    };
  },
  methods: {
    //获取课程详情
    getCourseDetails() {
      this.$store
        .dispatch("GetCourseDetails", {
          courseID: this.$route.params.id
        })
        .then(res => {
          console.log(res, "sssss");
          this.courseDetails = res;
          this.chooseTime =
            this.$moment(res.startTime).format("HH:mm") +
            " - " +
            this.$moment(res.endTime).format("HH:mm");
          this.isRelease = res.is_published == 0 ? false : true;
          this.currentDate = this.$moment(this.courseDetails.startTime).format(
            "YYYY-MM-DD"
          );
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
    //编辑课程
    editCpurse() {
      let tempObj = {
        startTime: "",
        endTime: "",
        subjectID: this.courseDetails.subjectID,
        teacherID: this.courseDetails.teacherIDList,
        classIDList: this.courseDetails.classIDList,
        course_desc: this.courseDetails.course_desc,
        kejianList: [0],
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
      this.submitForm = { ...this.submitForm, ...tempObj };

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
      console.log(res, file, lll);
      this.uploadArr.push(this.tokenOption.bucketUrl + "/" + res.key);
      this.submitForm.accessoryList.push({
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
  created(){
    this.getCourseDetails();
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
  }
}
</style>
