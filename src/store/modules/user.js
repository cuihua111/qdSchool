import {
  login,
  getQRCodePic,
  getAdminList,
  addAdmin,
  forbideAdmin,
  updateAdmin,
  getCollegeList,
  getUploadToken,
  addOneCollege,
  publishOneCollege,
  publishSomeColleges,
  setAttentionNumForCollege,
  deleteOneCollege,
  getOneCollege,
  getBookletListForCollege,
  addBookletForCollege,
  getTopicListForCollege,
  addTopicForCollege,
  addHighScoreForCollege,
  getHighScoreListForCollege,
  delOneBooklet,
  delOneTopic,
  delOneHighScore,
  updateOneCollege,
  getOneArticleContentOfCollegeInfo,
  getAllGuideContentForCollege,
  getPlaceListForCollege,
  addPlaceForCollege,
  setRangeForOneCollege,
  setProfessionSubjectForOneCollege,
  setProvinceScheduleForOneCollege,
  setPrincipleForOneCollege,
  getProfessionTimeListForCollege,
  updateTimeForCollegeProfession,
  setSmallScoreLimitForOneCollege,
  delPlaceForCollege,
  getAllCollegeList,
  getAllOrganizationForSchool,
  getAllSubClassList,
  getAllCourseForClass,
  getCourseDetails,
  getAllTeachersOfSchool,
  delCourse,
  modifyCourse,
  createCourse,
  copyCourse,
  exportMemberListInExamHelper
} from '@/service/getData';
import {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
} from '@/utils/mixin';
const user = {
  state: {
    token: null,
    uid: null
  },
  mutations: {
    SET_UID(state, uid) {
      state.uid = uid
    },
    SET_USERINFO(state,userInfo){
      state.userInfo=1
      // console.log(state.userInfo)
    }
  },
  actions: {
    //登录
    Login({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        login(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    GetQRCodePic({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getQRCodePic(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 获取管理员列表
     * */
    GetAdminList({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getAdminList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 增加管理员
     *
     * */
    AddAdmin({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        addAdmin(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 禁用/启用管理员
     * */
    ForbideAdmin({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        forbideAdmin(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 编辑管理员
     * */
    UpdateAdmin({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        updateAdmin(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询院校列表
     * */
    GetCollegeList({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getCollegeList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 获取七牛token
     * */
    GetUploadToken({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getUploadToken(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 增加一个院校
     * */
    AddOneCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        addOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 发布一个院校
     * */
    PublishOneCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        publishOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 披量发布院校
     * */
    PublishSomeColleges({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        publishSomeColleges(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 设置一个院校不同省份的关注量
     * */
    SetAttentionNumForCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        setAttentionNumForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 删除一个院校
     * */
    DeleteOneCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        deleteOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询一个院校
     * */
    GetOneCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询一个院校的“招生简章”列表
     * */
    GetBookletListForCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getBookletListForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 添加一篇“招生简章”的文章
     * */
    AddBookletForCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        addBookletForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询一个院校的“历史考题”列表
     * */
    GetTopicListForCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getTopicListForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 添加一篇“历史考题”的文章
     * */
    AddTopicForCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        addTopicForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 添加一篇“高分卷”的文章
     * */
    AddHighScoreForCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        addHighScoreForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询一个院校的“高分卷”列表
     * */
    GetHighScoreListForCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getHighScoreListForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 删除一篇“招生简章”
     * */
    DelOneBooklet({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        delOneBooklet(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 删除一篇“历史考题
     * */
    DelOneTopic({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        delOneTopic(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 删除一篇“高分卷”
     * */
    DelOneHighScore({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        delOneHighScore(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 编辑一个院校
     * */
    UpdateOneCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        updateOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 编辑一个院校
     * */
    GetOneArticleContentOfCollegeInfo({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getOneArticleContentOfCollegeInfo(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询学校报考指南信息
     * */
    getAllGuideContentForCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getAllGuideContentForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询学校考试地点
     * */
    GetPlaceListForCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getPlaceListForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询学校考试地点
     * */
    AddPlaceForCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        addPlaceForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 设置一个院校的招生范围
     * */
    SetRangeForOneCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        setRangeForOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 设置一个院校的招生范围
     * */
    SetProfessionSubjectForOneCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        setProfessionSubjectForOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 设置一个院校不同省份的招生计划
     * */
    SetProvinceScheduleForOneCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        setProvinceScheduleForOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 设置一个院校不同省份的招生计划
     * */
    SetPrincipleForOneCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        setPrincipleForOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 设置一个院校不同省份的招生计划
     * */
    SetSmallScoreLimitForOneCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        setSmallScoreLimitForOneCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询一个院校每个专业的报名时间、确认时间和考试时间
     * */
    GetProfessionTimeListForCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getProfessionTimeListForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 查询一个院校每个专业的报名时间、确认时间和考试时间
     * */
    UpdateTimeForCollegeProfession({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        updateTimeForCollegeProfession(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 删除考试地点
     * */
    DelPlaceForCollege({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        delPlaceForCollege(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 艺考助手获取全部院校
     * */
    GetAllCollegeList({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getAllCollegeList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 艺考助手获取院校全部班级
     * */
    GetAllOrganizationForSchool({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getAllOrganizationForSchool(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 获取当前学校的所有二级班级
     * */
    GetAllSubClassList({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getAllSubClassList(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 获取班级课程表
     * */
    GetAllCourseForClass({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getAllCourseForClass(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 获取课程详情
     * */
    GetCourseDetails({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getCourseDetails(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 获取全校老师
     * */
    GetAllTeachersOfSchool({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        getAllTeachersOfSchool(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 删除课程
     * */
    DelCourse({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        delCourse(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 编辑课程
     * */
    ModifyCourse({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        modifyCourse(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
     /*
     * 创建课程
     * */
    CreateCourse({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        createCourse(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
     /*
     * copy课程
     * */
    CopyCourse({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        copyCourse(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
    /*
     * 导出excel
     * */
    ExportMemberListInExamHelper({ commit, state }, parameterData) {
      return new Promise((resolve, reject) => {
        exportMemberListInExamHelper(parameterData).then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
      })
    },
  }
}

export default user
