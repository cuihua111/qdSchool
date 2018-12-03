/* 考试成绩 */

import {
  getTestList,
  getDetailsOfTest,
  getTotalStrengthRankList,
  getTotalStrengthRankListOfClass,
  getClassList,
  createTest,
  modifyTest,
  importSocre,
  releaseTest
} from '@/service/getData'

import { DeepCloneArr } from '@/utils/clone'

const testScores = {

  namespaced: true,

  state: {
    headerTitle: '考试成绩', // 头部标题
    testList: [], // 考试列表
    testDetail: {}, // 考试详情
    rankList: [{ subject_scoreList: [] }], // 考试成绩列表
    classList: [] // 一级和二级班级列表
  },

  getters: {
    classTreeList (state) {
      let _list = DeepCloneArr(state.classList)
      if (_list.length === 0) return
      _list.forEach((v, i) => {
        if (v.list_subclass && v.list_subclass.length > 0) {
          v.list_subclass.forEach((item, index) => {
            _list[i].list_subclass[index].parentId = v.id
          })
        }
      })
      return _list
    }
  },

  mutations: {
    // 设置头部标题
    SET_HEADER_TITLE (state, data) {
      state.headerTitle = data
    },
    // 考试列表
    SET_TEST_LIST (state, data) {
      state.testList = data
    },
    // 考试详情
    SET_TEST_DETAIL (state, data) {
      state.testDetail = data
    },
    // 全校总分榜
    SET_RANK_LIST (state, data) {
      data.forEach((v, i) => {
        data[i].subject_scoreList = [
          { score: 100 + i, subjectName: '语文' },
          { score: 99 + i, subjectName: '数学' }
        ]
      })
      state.rankList = data
    },
    // 一级和二级班级列表
    SET_CLASS_LIST (state, data) {
      state.classList = data
    },
  },

  actions: {
    // 获取考试列表
    GetTestList ({ state, commit, rootState }, parameterData) {
      return new Promise((resolve, reject) => {
        getTestList(parameterData).then(res => {
          commit('SET_TEST_LIST', res.testList)
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    },
    
    // 根据考试id获取考试详情
    GetDetailsOfTest ({ state, commit, rootState }, parameterData) {
      return new Promise((resolve, reject) => {
        getDetailsOfTest(parameterData).then(res => {
          commit('SET_TEST_DETAIL', res)
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    },
    
    // 查询全校总分的实力榜
    GetTotalStrengthRankList ({ state, commit, rootState }, parameterData) {
      return new Promise((resolve, reject) => {
        getTotalStrengthRankList(parameterData).then(res => {
          commit('SET_RANK_LIST', res.studentList)
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    },
    
    // 查询全校总分的实力榜
    GetTotalStrengthRankListOfClass ({ state, commit, rootState }, parameterData) {
      return new Promise((resolve, reject) => {
        getTotalStrengthRankListOfClass(parameterData).then(res => {
          commit('SET_RANK_LIST', res.studentList)
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    },
    
    // 获取一级和二级班级列表
    GetClassList ({ state, commit, rootState }, parameterData) {
      return new Promise((resolve, reject) => {
        getClassList(parameterData).then(res => {
          commit('SET_CLASS_LIST', res.list_class)
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    },
    
    // 创建一个考试
    CreateTest ({ state, commit, rootState }, parameterData) {
      return new Promise((resolve, reject) => {
        createTest(parameterData).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    },
    
    // 修改一个考试
    ModifyTest ({ state, commit, rootState }, parameterData) {
      return new Promise((resolve, reject) => {
        modifyTest(parameterData).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    },

    // 导入考试成绩
    ImportSocre ({ state, commit, rootState }, parameterData) {
      return new Promise((resolve, reject) => {
        importSocre(parameterData).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    },

    // 发布一个考试
    ReleaseTest ({ state, commit, rootState }, parameterData) {
      return new Promise((resolve, reject) => {
        releaseTest(parameterData).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      })
    }
  }

}

export default testScores
