<template>
    <div class="home-box">
        <div class="left">
            <div>
                <img src="" alt="">
                <span>教育</span>
            </div>
            <ul>
                <li>
                    <span>教师人数</span>
                    <span>15人</span>
                </li>
                <li>
                    <span>学生人数</span>
                    <span>504人</span>
                </li>
                <li>
                    <span>未激活</span>
                    <span>86人</span>
                </li>
            </ul>
        </div>
        <div class="right">
            <div class="top">
                <img src="https://img.alicdn.com/imgextra/i1/95/O1CN014DHDDC1CZY6dqqyQY_!!95-0-luban.jpg_q100.jpg_.webp" alt="" v-show="imgShow == true">
                <h1 v-show="imgShow == false">3步开启奇点校园之旅</h1>
                <span class="top-close" v-show="imgShow == false" @click="imgShow = true">关闭示例<img src="/static/images/schoolClose.png" alt=""></span>
                <div v-show="imgShow == false">
                    <ul>
                        <li><img src="/static/images/schoolTop1.png" alt=""></li>
                        <li>下载奇点<br>校园手机版</li>
                        <li>立即下载</li>
                    </ul>
                    <ul>
                        <li><img src="/static/images/schoolTop2.png" alt=""></li>
                        <li>可创建班级和部门<br>批量导入学生和老师</li>
                        <li>批量导入 ></li>
                    </ul>
                    <ul>
                        <li><img src="/static/images/schoolTop3.png" alt=""></li>
                        <li>提高管理效率<br>考勤、考试成绩分析等</li>
                        <li></li>
                    </ul>
                </div>
            </div>
            <div class="bottom">
                <h1>常用入口</h1>
                <ul>
                    <router-link :to="{name:'Home'}">
                        <img src="/static/images/schoolBottom1.png" alt="">
                        <span>考勤统计</span>
                    </router-link>
                     <router-link :to="{name:'Home'}">
                        <img src="/static/images/schoolBottom2.png" alt="">
                        <span>考试成绩</span>
                    </router-link>
                    <router-link :to="{name:'ArtAssistant'}">
                        <img src="/static/images/schoolBottom3.png" alt="">
                        <span>艺考助手</span>
                    </router-link>
                     <router-link :to="{name:'Home'}">
                        <img src="/static/images/schoolBottom4.png" alt="">
                        <span>课件</span>
                    </router-link>
                     <router-link :to="{name:'ClassSchedule'}">
                        <img src="/static/images/schoolBottom5.png" alt="">
                        <span>课程表</span>
                    </router-link>
                     <router-link :to="{name:'Home'}">
                        <img src="/static/images/schoolBottom1.png" alt="">
                        <span>请假审批</span>
                    </router-link>
                     <router-link :to="{name:'Home'}">
                        <img src="/static/images/schoolBottom7.png" alt="">
                        <span>我的资料</span>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        imgShow:false
      }
    },
    mounted(){
      // singcampus/getSchoolOverview  请求参数 "schoolId": 1
      //   返回参数 "numof_teachers": 0,
        // "numof_students": 14,
        //  "numof_status": 5
       eventBus.$emit("header", { index: 9999, headerActive: "active" });
    }
  }
</script>
