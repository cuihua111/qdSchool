import {
    getAllCollegeList,
    getAllOrganizationForSchool,
    exportMemberListInExamHelper,
} from '@/service/getData'

const artAssistant = {
    actions: {
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

export default artAssistant