<template>
  <div class="classSchedule">
    <div class="container">
      <div class="title">
        <div class="back">
          <img src="/static/images/back_blue.png" alt>
          <span>返回</span>
        </div>课程表
      </div>
      <div class="content">
        <div class="classList">
          <div>当前班级：</div>
          <div>{{currentClass}}</div>
          <ul>
            <li
              :class="{checked:liCheckedIndex==index}"
              v-for="(item,index) in classList"
              :key="index"
              @click="chooseClass(index,item.classID,item.className)"
            >{{item.className}}</li>
          </ul>
        </div>
        <div class="tableBox">
          <el-container>
            <el-aside class="aside">
              <div class="classDate">
                <span>{{nowDate.year}}年</span>
                <span><i @click="prevDate" class="el-icon-arrow-left changeLeft"></i>{{nowDate.month}}月<i @click="nextDate" class="el-icon-arrow-right changeRight"></i></span>
              </div>
              <div class="classTime">
                <div>
                  <p>上午</p>
                  <p>08:30</p>
                  <p>12:00</p>
                </div>
                <div class="middleTime">
                  <p>下午</p>
                  <p>14:30</p>
                  <p>18:00</p>
                </div>
                <div>
                  <p>晚上</p>
                  <p>19:30</p>
                  <p>22:00</p>
                </div>
              </div>
            </el-aside>
            <el-main>
              <curriculum :currentClass="currentClass" :classID="classID" :date="nowDate"></curriculum>
            </el-main>
          </el-container>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSessionStorage, prevMonth, nextMonth } from "@/utils/mixin";
import moment from "moment";

export default {
  data() {
    return {
      classList: [],//所有班级
      // courseList: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      dayList: [],
      liCheckedIndex: 0, //侧面班级高亮索引
      classID:'',//班级id
      currentClass:'',//当前班级
      date: {},
      nowDate: {
        year: '',
        month: ''
      }
    };
  },
  components: {
		// breadHeader: () => import('@/components/breadHeader/breadHeader.vue'),
		curriculum: () => import('@/components/classSchedule/curriculum')
	},
  methods: {
    prevDate(){
      let date = new Date(this.nowDate.year, this.nowDate.month, '')
      this.nowDate.year = prevMonth(date).getFullYear()
      this.nowDate.month = prevMonth(date).getMonth() + 1
      
    },
    nextDate(){
      let date = new Date(this.nowDate.year, this.nowDate.month, '')
      this.nowDate.year = nextMonth(date).getFullYear()
      this.nowDate.month = nextMonth(date).getMonth() + 1
    },
    loadRepeat() {
      var self = this;
      if (!self.loadFreeze && self.showAmount > self.curAmount) {
        self.loadFreeze = true;
        self.addMonth();
        setTimeout(() => {
          self.loadFreeze = false;
          self.loadRepeat();
        }, 20);
      }
    },
    //获取当前学校所有班级
    getAllSubClassList(id) {
      let _this = this;
      this.$store.dispatch("GetAllSubClassList", { schoolID: id }).then(res => {
        this.classList = res.subClassList;
        this.classID=res.subClassList[0].classID
        this.currentClass=res.subClassList[0].className
      });
    },
    //获取月份
    getMounth() {
      let dt = new Date(),
        flag =
          (this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0,
        day_count = [
          31,
          flag ? 29 : 28,
          31,
          30,
          31,
          30,
          31,
          31,
          30,
          31,
          30,
          31
        ];
      dt.setFullYear(this.year);
      dt.setMonth(this.month - 1); //month:0--11
      dt.setDate(1);
      let week = dt.getDay(); //求得该月1号为周几
      let cells = day_count[this.month - 1] + week; //总共需打印单元格数
      let row = Math.ceil(cells / 7); //计算打印的行数
      let count = 0;
      let sssss = [];
      for (let i = 1; i <= row; i++) {
        //打印本月日历
        for (let j = 0; j < 7; j++) {
          count++;
          if (count <= week) {
          } else {
            sssss.push(
              this.year + "年" + (this.month + 1) + "月" + (count - week) + "日"
            );
            this.dayList.push(count - week);
          }
        }
      }
    },
    //点击切换班级
    chooseClass(index,classID,name){
      this.liCheckedIndex=index;
      this.classID=classID
      this.currentClass=name
    },
    getDate(str){
      if(str){
        return new Date(str)
      }
      return new Date()
    }
    //上传图片成
  },
  mounted() {
    this.schoolID = JSON.parse(getSessionStorage("userInfo")).schoolId;
    this.getAllSubClassList(this.schoolID);
    // this.getClass();
    // this.getMounth();
  },
  created(){
    let date = this.getDate()
    this.nowDate.year = date.getFullYear()
    this.nowDate.month = date.getMonth() + 1
  }
};
</script>
<style lang="scss">
p {
  margin: 0;
}
.classSchedule {
  .container {
    width: 1200px;
    height: 800px;
    margin: 20px auto 0;
    border: 1px solid #ddd;
    .title {
      height: 60px;
      font-size: 20px;
      line-height: 60px;
      border-bottom: 1px solid #e5e5e5;
      color: #333;
      text-align: center;
      position: relative;
      background-color: #fff;
      .back {
        position: absolute;
        color: #4dc2fd;
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
    .content {
      display: flex;
      height: calc(100% - 60px);
      overflow-x: scroll;
      .classList {
        height: calc(100% - 1px);
        flex: 0 0 186px;
        background-color: #fff;
        border-right: 1px solid #e6e6e6;
        box-sizing: border-box;
        div {
          padding-left: 20px;
          box-sizing: border-box;
          color: #999;
          font-size: 14px;
          &:first-of-type {
            margin-top: 20px;
            margin-bottom: 10px;
          }
          &:last-of-type {
            margin-bottom: 20px;
            font-size: 16px;
          }
        }
        ul {
          max-height: 647px;
          overflow-y: scroll;
          // box-shadow:inset 0px 40px 55px -25px #4dc2fd;
          li {
            height: 44px;
            line-height: 44px;
            color: #666;
            text-align: center;
            background-color: #f4f4f4;
            position: relative;
            cursor: pointer;
            &.checked {
              background-color: #4dc2fd;
              color: #fff;
            }
          }
        }
      }
      .tableBox {
        width: calc(100% - 271px);
        height: 701px;
        padding:  38px 40px 0 45px;
        position: relative;
        background-color: #fff;
        .aside {
          border-right: 1px solid #e6e6e6;
          width: 90px !important;
          .classDate {
            height: 90px;
            border-bottom: 1px solid #e6e6e6;
            box-sizing: border-box;
            background-color: #fff1d9;
            color: #43a7ed;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            padding: 10px 0;
            i.changeLeft{
              cursor: pointer;
            }
            i.changeRight{
              cursor: pointer;
            }
          }
          .classTime {
            height: calc(100% - 60px);
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            div {
              display: flex;
              flex: 1;
              height: 166px;
              background-color: #f0fcff;
              width: 90px;
              align-items: center;
              flex-direction: column;
              justify-content: space-around;
              padding: 35px 0;
              box-sizing: border-box;
              &.middleTime {
                border-top: 1px solid #e6e6e6;
                border-bottom: 1px solid #e6e6e6;
                box-sizing: border-box;
              }
              &:last-of-type{
                border-bottom: 1px solid #e6e6e6;
              }
            }
          }
        }
        .el-container {
          display: -webkit-box;
          border: 1px solid #e6e6e6;
          border-bottom: 0;
          box-sizing: border-box;
        }
        .el-main {
          padding: 0;
        }
        .waitPublishCourses{
          position: absolute;
          right: 40px;
          bottom: 40px;
        }
      }
    }
  }
}
</style>
