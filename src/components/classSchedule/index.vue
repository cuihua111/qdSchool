<template>
  <div class="classSchedule">
    <div class="container">
      <div class="title">
        <div class="back">
          <img src="../../assets/image_art/back.png" alt>
          <span>返回</span>
        </div>课程表
      </div>
      <div class="content">
        <div class="classList">
          <div>当前班级：</div>
          <div>重点2班</div>
          <ul>
            <li
              :class="{checked:liCheckedIndex==index}"
              v-for="(item,index) in classList"
              :key="index"
            >{{item.className}}</li>
          </ul>
        </div>
        <div class="tableBox">
          <el-container>
            <el-aside class="aside">
              <div class="classDate">
                <span>10月</span>
                <span>第7周</span>
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
              <curriculum></curriculum>
              <!-- <div style="overflow-x:scroll">
                <div class="headerDiv">
                  <div v-for="(item,index) in dayList" :key="index">
                    <span>{{item}}</span>
                    <span>{{item}}</span>
                  </div>
                </div>
                <div class="mainDiv">
                  <ul v-for="(item,index) in courseList" :key="index">
                    <li
                      class="canSee"
                      v-for="(itemSub,indexSub) in item.list_course_period"
                      :key="indexSub"
                      v-if="item.list_course_period.length!=0"
                    >
                      <p>
                        <span>{{itemSub.subjectName}}</span>
                        <span>{{itemSub.course_desc}}</span>
                        <span>{{itemSub.nickname_teacher}}</span>
                        <s @click="$router.push({path:`/CourseInfo/${itemSub.id}`})">查看</s>
                      </p>
                      <div class="operationBox">
                        <span class="delete"></span>
                        <span class="edit"></span>
                      </div>
                    </li>
                    <li
                      class="add"
                      v-if="item.list_course_period.length==0"
                      v-for="item1 in 3"
                      :key="item1"
                    >
                      <p>
                        <img src="/static/images/file.png" alt>
                        <span>添加</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div> -->
            </el-main>
          </el-container>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getSessionStorage } from "@/utils/mixin";
import moment from "moment";

export default {
  data() {
    return {
      classList: [],
      courseList: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      dayList: [],
      liCheckedIndex: 0
    };
  },
  components: {
		// breadHeader: () => import('@/components/breadHeader/breadHeader.vue'),
		curriculum: () => import('@/components/classSchedule/curriculum')
	},
  methods: {
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
      });
    },
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
      console.log(this.dayList, sssss);
    },
    //获取课程
    getClass(id) {
      this.$store
        .dispatch("GetAllCourseForClass", {
          classID: 28,
          date_start: "2018-10-10",
          date_end: "2018-12-01"
        })
        .then(res => {
          console.log(res);
          this.courseList = res.courseList;
        });
    }
  },
  mounted() {
    this.schoolID = JSON.parse(getSessionStorage("userInfo")).schoolId;
    this.getAllSubClassList(this.schoolID);
    this.getClass();
    this.getMounth();
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
          li {
            height: 44px;
            line-height: 44px;
            color: #666;
            text-align: center;
            background-color: #f4f4f4;
            position: relative;
            &.checked {
              background-color: #4dc2fd;
              color: #fff;
            }
          }
        }
      }
      .tableBox {
        width: calc(100% - 186px);
        margin-left: 45px;
        margin-top: 40px;

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
            }
          }
        }
        .el-container {
          display: -webkit-box;
          border: 1px solid #e6e6e6;
          box-sizing: border-box;
        }
        .el-main {
          padding: 0;
        }
        .mainDiv {
          height: 100%;
          overflow: hidden;
          display: flex;
          -ms-overflow-style: none;
          overflow: -moz-scrollbars-none;
          &::-webkit-scrollbar {
            width: 0 !important;
          }
          ul {
            flex: 0 0 120px;
            border-right: 1px solid #e6e6e6;
            border-top: 0;
            border-left: 0;
            box-sizing: border-box;
            li {
              height: 165px;
              flex: 0 0 100px;
              margin: 0;
              overflow: hidden;
              border-bottom: 1px solid #e6e6e6;
              position: relative;
              &.canSee {
                .operationBox {
                  display: none;
                  span {
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    bottom: 10px;
                    cursor: pointer;
                    &.delete {
                      background-image: url("/static/images/deleteIcon.png");
                      right: 40px;
                    }
                    &.edit {
                      background-image: url("/static/images/editIcon.png");
                      right: 10px;
                    }
                  }
                }
                &:hover {
                  transition: all 1s;
                  background-color: rgba(0, 0, 0, 0.5);
                  s {
                    display: block;
                    color: #fff;
                  }
                  .operationBox {
                    display: block;
                  }
                }
              }
              &.add {
                p {
                  display: none;
                }
                &:hover {
                  transition: all 1s;
                  p {
                    display: flex;
                  }
                }
              }
              p {
                height: 100%;
                display: flex;
                padding: 35px 0;
                flex-direction: column;
                align-items: center;
                box-sizing: border-box;
                justify-content: space-around;
                s {
                  display: none;
                  position: absolute;
                  text-decoration: none;
                  color: #fff;
                  font-size: 18px;
                  cursor: pointer;
                }
              }
            }
          }
        }
        .headerDiv {
          height: 90px;
          display: flex;
          -ms-overflow-style: none;
          overflow: -moz-scrollbars-none;
          border-bottom: 1px solid #e6e6e6;
          box-sizing: border-box;
          background-color: #f0fcff;
          &::-webkit-scrollbar {
            width: 0 !important;
          }
          div {
            height: 90px;
            display: flex;
            flex: 0 0 120px;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            padding: 10px 0;
            box-sizing: border-box;
            border-right: 1px solid #e6e6e6;
          }
        }
      }
    }
  }
}
</style>
