/* 课程表 */

import {
    getAllSubClassList,
    getAllCourseForClass,
    getCourseDetails,
    getAllTeachersOfSchool,
    delCourse,
    modifyCourse,
    createCourse,
    copyCourse,
    publishCourses
} from '@/service/getData'
const classScheduleCard = {
    actions: {
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
        * 发布课程
        * */
       PublishCourses({ commit, state }, parameterData) {
        return new Promise((resolve, reject) => {
            publishCourses(parameterData).then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
        })
    },
    }
}
export default classScheduleCard