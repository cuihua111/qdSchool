<template>
  <div class="courseManage">
    <div class="table">
      <ul class="header">
        <li v-for="(day, key) in dayList" :key="key">
          <p>{{day.day}}日</p>
          <p>{{day.week}}</p>
        </li>
      </ul>
      <div class="body">
        <div class="columns" v-if="courseData.length>0" v-for="(item, index) in courseData" :key="index">
          <div
            class="rows"
            v-if="item.list_course_period.length>0"
            v-for="(item1, index1) in 3"
            :key="index1"
          >
            <div class="hasCourse" v-if="item.list_course_period[index1]">
              <span>{{item.list_course_period[index1].subjectName}}</span>
              <span class="course_desc">{{item.list_course_period[index1].course_desc}}</span>
              <span>{{item.list_course_period[index1].nickname_teacher}}</span>
              <s
                @click="$router.push({path:`/CourseInfo/${item.list_course_period[index1].id}`,query:{currentClass}})"
              >查看</s>
              <div class="operationBox">
                <span class="delete" @click="deleteCourse(item.list_course_period[index1].id)"></span>
                <span class="edit" @click="editCourse(item.list_course_period[index1], item)"></span>
              </div>
            </div>
            <div v-if="!item.list_course_period[index1]" class="rows noCouresCh">
              <p @click="addCourse(item)">
                <img src="/static/images/file.png" alt>
                <span>添加</span>
              </p>
            </div>
          </div>
          <div
            class="rows noCoures"
            v-if="item.list_course_period.length==0"
            v-for="(item2, index2) in 3"
            :key="index2+'2'"
          >
            <p @click="addCourse(item)">
              <img src="/static/images/file.png" alt>
              <span>添加</span>
            </p>
          </div>
        </div>
        <div class="columns" v-if="courseData.length==0" v-for="(item, index) in 7" :key="index">
          <div class="rows noCoures" v-for="(item2, index2) in 3" :key="index2+'2'">
            <p @click="addCourse(item)">
              <img src="/static/images/file.png" alt>
              <span>添加</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <el-button @click="releaseCourse" class="waitPublishCourses" type="primary">待发布({{toBeReleased.length}})</el-button>
  </div>
</template>

<script>
import moment from "moment";
import {
  getDayCountOfYear,
  getFirstDayOfMonth,
  getDayCountOfMonth,
  prevYear,
  nextYear
} from "@/utils/mixin";
export default {
  props: ["classID", "currentClass", "date"],
  data() {
    return {
      courseData: [],
      toBeReleased: [] //待发布
    };
  },
  computed: {
    startDate() {
      // return getStartDateOfMonth(this.year, this.month);
    },
    year() {
      return new Date().getFullYear();
    },
    month() {
      return new Date().getMonth();
    },
    week() {
      return getFirstDayOfMonth(new Date(this.date.year, this.date.month, this.date.day));
    },
    WEEKS() {
      return [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
      ];
    },
    // 计算每周起始时间对象
    getWeekRange(){
      let startStop = []
      let currDate = new Date(this.date.year, this.date.month - 1, this.date.day)
      let week = currDate.getDay() //今天是周几
      let millisecond = 1000 * 60 * 60 * 24;
      //减去的天数
      let minusDay = week != 0 ? week - 1 : 6;
      //本周 周一
      let monday = new Date(currDate.getTime() - (minusDay * millisecond));
      //本周 周日
      let sunday = new Date(monday.getTime() + (6 * millisecond));
      //添加本周时间
      startStop.push(monday); //本周起始时间
      startStop.push(sunday)
      return startStop
    },
    getWeekRangeArr(){
      let millisecond = 1000 * 60 * 60 * 24;  //一天毫秒数
      let monday = this.getWeekRange[0]  //时间戳
      let sunday = this.getWeekRange[1]
      let res = []
      for(let i = 0; i< 7; i++){
        res.push(new Date(monday.getTime() + (i*millisecond)))
      }
      return res
    },
    dayList() {
      let res = [];
      this.WEEKS.map((item, index)=>{
        res.push({
          day: this.getWeekRangeArr[index].getDate(),
          week: item
        })
      })
      // for (let i = 0; i < getDayCountOfMonth(this.date.year, this.date.month); i++) {
      //   res.push({
      //     day: i + 1,
      //     week: this.WEEKS[
      //       this.week + i < 7 ? this.week + i : (this.week + i) % 7
      //     ]
      //   });
      // }
      return res;
    }
  },
  watch: {
    classID() {
      this.getClass();
    },
    "date.year"() {
      this.getClass();
    },
    "date.month"() {
      this.getClass();
    }
  },
  methods: {
    getLength(u) {
      if (u >= 3) {
        return 0;
      } else {
        return 3 - u;
      }
    },
    addCourse(data) {
      console.log(data);
      this.$router.push({
        path: "/AddCourse",
        query: {
          addData: data.date,
          currentClass: this.currentClass
        }
      });
    },
    getClass(id) {
      let firstDayOfWeek= this.getWeekRange[0].getDate()<10?('0'+this.getWeekRange[0].getDate()):this.getWeekRange[0].getDate()
      let lastDayOfWeek=this.getWeekRange[1].getDate()<10?('0'+this.getWeekRange[1].getDate()):this.getWeekRange[1].getDate()
      this.$store
        .dispatch("GetAllCourseForClass", {
          classID: this.classID,
          date_start: `${this.date.year}-${this.date.month}-${firstDayOfWeek}`,
          date_end: `${this.date.year}-${this.date.month}-${lastDayOfWeek}`
        })
        .then(res => {
          this.courseData = res.courseList;
          // this.courseData = res.courseList.filter(item => {
          //   return new Date(item.date).getMonth() == new Date().getMonth();
          // });
          res.courseList.map(item=>{
            if(item.list_course_period.length!=0){
              item.list_course_period.map(itemSub=>{
                if(itemSub.is_published==0){
                  this.toBeReleased.push(itemSub.id)
                }
              })
            }
          })
          console.log(this.toBeReleased)
        });
    },
     //发布课程
    releaseCourse() {
      this.$store
        .dispatch("PublishCourses", {
          courseList: this.toBeReleased
        })
        .then(res => {
          this.$message.success("发布课程成功");
          this.getClass();
        });
    },
    //编辑
    editCourse(data, time) {
      data.isEdit = true;
      this.$router.push({
        path: `/CourseInfo/${data.id}`,
        query: {
          currentClass: this.currentClass,
          isEdit: data.isEdit
        }
      });
    },
    //删除课程
    deleteCourse(id) {
      this.$confirm("确定删除该课程？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store
            .dispatch("DelCourse", {
              courseID: id
            })
            .then(res => {
              console.log(res);
              this.$message.success("成功删除课程");
              this.getClass(id);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    // this.getClass();
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.table {
  display: block;
  margin: 0 auto;
  overflow: hidden;
  border-left: 0;
  .header {
    display: flex;
    align-content: center;
    flex-wrap: nowrap;
    border-bottom: 1px solid #e6e6e6;
    li {
      display: flex;
      flex-direction: column;
      height: 89px;
      flex: 0 0 120px;
      border-right: 1px solid #e6e6e6;
      background-color: #f0fcff;
      text-align: center;
      padding: 20px 0;
      box-sizing: border-box;
      justify-content: space-between;
      &:last-child {
        border-right: 0;
      }
    }
  }
  .body {
    display: flex;
    width: 100%;
    max-height: 498px;
    .columns {
      width: 120px;
      // flex: 0 0 120px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      border-right: 1px solid #e6e6e6;
      box-sizing: border-box;
      .rows {
        border-bottom: 1px solid #e6e6e6;
        height: 165px;
        position: relative;
        background-color: #fff;
        // &:first-child {
        //   border-top: 1px solid #e6e6e6;
        // }
        .hasCourse {
          margin: 0;
          padding: 35px 0;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          img {
            width: 20px;
            height: 20px;
          }
          span {
            color: #666;
            font-size: 14px;
            &:first-of-type {
              font-size: 18px;
              color: #333;
            }
            &.course_desc {
              max-width: 110px;
              display: -webkit-box;
              overflow: hidden; //2.设置元素超出隐藏
              text-overflow: ellipsis; //3.设置超出样式为省略号
              -webkit-line-clamp: 1; //4.设置2行应用省略
              -webkit-box-orient: vertical;
            }
          }
          s {
            display: none;
            position: absolute;
            text-decoration: none;
            color: #fff;
            font-size: 18px;
            cursor: pointer;
          }
          .operationBox {
            display: none;
            span {
              position: absolute;
              width: 16px;
              height: 16px;
              bottom: 10px;
              cursor: pointer;
              // z-index: 1;
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
            transition: all 0.5s;
            background-color: rgba(0, 0, 0, 0.5);
            s {
              display: block;
              color: #fff;
            }
            .operationBox {
              display: block;
              color: #fff;
            }
          }
        }
        // .hasCourse:hover + .operationBox {
        //   display: block;
        // }
        &.noCoures {
          p {
            margin: 0;
            padding: 35px 0;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            display: none;
          }
          &:hover {
            // transition: all 1s;
            p {
              display: flex;
              cursor: pointer;
            }
          }
        }
        &.noCouresCh {
          p {
            margin: 0;
            padding: 35px 0;
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            display: none;
          }
          &:hover {
            transition: all 1s;
            p {
              display: flex;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>

