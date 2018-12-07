<template>
  <div class="artAssistant">
    <div class="container">
      <div class="title">
        <div class="back" @click="backToHome">
          <img src="../../assets/image_art/back.png" alt>
          <span>返回</span>
        </div>艺考助手
      </div>
      <div class="formBox">
        <el-form>
          <el-form-item label="导出院校：">
            <el-dropdown @command="dropdownChoose" trigger="click" :hide-on-click="false">
              <el-button>选择</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item,index) in schoolList"
                  :key="index"
                  :command="item"
                >{{item.title_college}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span class="exportTip">{{tipText1}}</span>
          </el-form-item>
          <el-form-item>
            <span
              class="chosenSchool"
              v-for="(item,index) in choosenSchool"
              :key="index"
            >{{item.title_college}}</span>
          </el-form-item>
          <el-form-item label="导出班级：">
            <el-button @click="dialogVisible=true">选择</el-button>
            <span class="exportTip">请选择导出班级范围</span>
          </el-form-item>
          <el-form-item>
            <span
              class="chosenSchool"
              v-for="(item,index) in choosenClass"
              :key="index"
            >{{item.title}}</span>
          </el-form-item>
          <el-form-item>
            <el-button class="exportBtn" type="primary" @click="exportExcel">导出</el-button>
            <el-button
            v-if="false"
              class="viewProgress"
              type="primary"
              @click="progressDialogVisible = true"
            >查看导出进度</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <chooseClass
      @choosenClassChange="choosenClassChange"
      @chageDialogVisible="chageDialogVisible"
      @confirmClassList="confirmClassList"
      :dialogVisible="dialogVisible"
      :classList="classList"
    ></chooseClass>
    <el-dialog :visible.sync="progressDialogVisible" width="30%">
      <el-progress :percentage="70"></el-progress>
      <span slot="footer" class="dialog-footer">
        <el-button @click="progressDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getSessionStorage } from "@/utils/mixin";
import chooseClass from "@/components/chooseClass/index.vue";
export default {
  components: {
    chooseClass
  },
  data() {
    return {
      dialogVisible: false, //是否显示弹框
      schoolList: [],
      tipText1: "请选择需要导出表格的院校",
      schoolID: null,
      progressDialogVisible: false, //进度条显示
      classList: [], //所有班级列表
      choosenClass: [], //已选择的班级
      choosenSchool: [] //存已选择的院校
    };
  },

  methods: {
    confirmClassList(val) {
      this.chageDialogVisible();
      this.choosenClass = val;
    },
    backToHome() {
      this.$router.go(-1);
    },
    //获取所有院校
    getCollegeList() {
      this.$store.dispatch("GetAllCollegeList").then(res => {
        this.schoolList = res.collegeList;
      });
    },
    //获取当前学校所有班级
    getAllOrganizationForSchool(id) {
      let _this = this;
      this.$store
        .dispatch("GetAllOrganizationForSchool", { schoolID: id })
        .then(res => {
          console.log(res);
          this.classList = res.list_class;
        });
    },
    dropdownChoose(command) {
      this.choosenSchool.push(command);
      console.log(this.choosenSchool, "asas");
      let set = new Set(this.choosenSchool);
      this.choosenSchool = Array.from(set);
      this.tipText1 = `已选择${this.choosenSchool.length}个院校`;
    },
    //子像父传弹框是否显示
    chageDialogVisible() {
      this.dialogVisible = false;
    },
    //子像父传递已选择班级
    choosenClassChange(val) {
      // console.log(val, 11111);
      // this.choosenClass = val;
    },
    //导出表格
    exportExcel() {
      let collegeidArr = [],
        classidArr = [],
        params = {};
      this.choosenSchool.map(item => {
        collegeidArr.push(item.id_college);
      });
      this.choosenClass.map(item => {
        classidArr.push(item.id);
      });
      if (collegeidArr.length == 0) {
        this.$message.error("请选择导出院校");
        return;
      }
      if (classidArr.length == 0) {
        this.$message.error("请选择导出班级");
        return;
      }
      console.log(collegeidArr, classidArr);
      // return
      params = {
        list_collegeID: collegeidArr,
        list_classID: classidArr
      };
      this.$store.dispatch("ExportMemberListInExamHelper", params).then(res => {
        console.log(res);
        this.$message.success('(PC端）艺考助手导出表格成功')
        location.href=res
      });
    }
  },
  mounted() {
    this.schoolID = JSON.parse(getSessionStorage("userInfo")).schoolId;
    this.getCollegeList();
    this.getAllOrganizationForSchool(this.schoolID);
  }
};
</script>
<style lang="scss">
.artAssistant {
  margin-top: 60px;
  overflow: hidden;
  .container {
    width: 60%;
    height: 600px;
    margin: 20px auto 0;
    border: 1px solid #ddd;
    background-color: #fff;
    .title {
      height: 60px;
      font-size: 20px;
      line-height: 60px;
      border-bottom: 1px solid #e5e5e5;
      color: #333;
      text-align: center;
      position: relative;
      .back {
        position: absolute;
        color: #666;
        font-size: 14px;
        left: 30px;
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
    }
    .formBox {
      margin: 60px 0 0 70px;
      .el-form-item {
        margin-bottom: 25px;
        .chosenSchool {
          display: inline-block;
          height: 28px;
          font-size: 14px;
          line-height: 28px;
          text-align: center;
          padding: 0 20px;
          color: #10a9e9;
          background-color: #d2eafb;
          border-radius: 4px;
          margin: 0 12px 10px 0;
        }
        .el-button {
          font-size: 16px;
        }
        .el-form-item__label {
          font-size: 16px;
        }
        .exportTip {
          color: #666;
          margin-left: 20px;
          font-size: 16px;
        }
        .exportBtn {
          width: 95px;
          height: 32px;
          line-height: 8px;
          background-color: rgba(64, 185, 230, 0.6);
          border: 1px solid rgba(64, 185, 230, 0.6);
          border-radius: 4px;
        }
        .viewProgress {
          height: 32px;
          line-height: 8px;
          background-color: #fff;
          border: 1px solid #333;
          border-radius: 4px;
          color: #333;
        }
      }
    }
  }
}
</style>