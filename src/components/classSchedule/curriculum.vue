<template>
  <div class="courseManage">
    <div class="table">
      <ul class="header">
        <li v-for="(day, key) in dayList" :key="key">
          <p>{{day.day}}</p>
          <p>{{day.week}}</p>
        </li>
      </ul>
      <div class="body">
        <div class="columns" v-for="(item, index) in courseData" :key="index">
          <div
            class="rows hasCourse"
            v-if="item.list_course_period.length>0"
            v-for="(item1, index1) in item.list_course_period"
            :key="index1"
          >
            <p>
              <span>{{item1.subjectName}}</span>
              <span class="course_desc">{{item1.course_desc}}</span>
              <span>{{item1.nickname_teacher}}</span>
              <s @click="$router.push({path:`/CourseInfo/${item1.id}`})">查看</s>
            </p>
            <div class="operationBox">
              <span class="delete"></span>
              <span class="edit" @click="editCourse(item1, item)"></span>
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
      </div>
    </div>
  </div>
</template>
<script>
import {
  getDayCountOfYear,
  getFirstDayOfMonth,
  getDayCountOfMonth,
  prevYear,
  nextYear
} from "@/utils/mixin";
export default {
  data() {
    return {
      courseData: []
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
      return getFirstDayOfMonth(new Date());
    },
    WEEKS() {
      return [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
    },
    dayList() {
      let res = [];
      for (let i = 0; i < getDayCountOfMonth(this.year, this.month); i++) {
        res.push({
          day: i + 1,
          week: this.WEEKS[
            this.week + i < 7 ? this.week + i : (this.week + i) % 7
          ]
        });
      }
      return res;
    }
  },
  methods: {
    addCourse(data) {
      this.$router.push({ path: "/AddCourse", query: {addData: data.date}});
    },
    getClass(id) {
      this.$store
        .dispatch("GetAllCourseForClass", {
          classID: 28,
          date_start: "2018-12-01",
          date_end: "2018-12-31"
        })
        .then(res => {
          // this.courseData = res.courseList;
          this.courseData = res.courseList.filter(item => {
            return new Date(item.date).getMonth() == new Date().getMonth();
          });
        });
    },
    //编辑
    editCourse(data, time) {
      data.isEdit = true;
      this.$router.push({
        path: "/AddCourse",
        query: {
          editData: JSON.stringify(data),
          addData: time.date
        }
      });
    }
  },
  mounted() {
    this.getClass();
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.table {
  width: 1200px;
  display: block;
  margin: 0 auto;
  overflow: hidden;
  overflow-x: auto;
  border: 1px solid #e6e6e6;
  border-left: 0;
  .header {
    display: flex;
    align-content: center;
    flex-wrap: nowrap;
    li {
      display: flex;
      flex-direction: column;
      height: 89px;
      flex: 0 0 120px;
      border-right: 1px solid #e6e6e6;
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
        &:first-child {
          border-top: 1px solid #e6e6e6;
        }
        p {
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
        }
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
        &.hasCourse {
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
        &.noCoures {
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
      }
    }
  }
}
</style>

