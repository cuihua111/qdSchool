import Http from '@/utils/axios';

//login
export const login = (params) => new Http().require({ api: 'http://118.24.7.249:5000/mock/11/login', param: params }); //登录
export const getQRCodePic = (params) => new Http().require({ api: 'http://123.207.88.200:9000/singcampus/getQRCodePic', param: params }); //扫码登录
export const getUploadToken = (params) => new Http().require({ api: '/getUploadToken', param: params }); //获取七牛token

export const getAdminList = (params) => new Http().require({ api: '/getAdminList', param: params }); //管理员列表
export const addAdmin = (params) => new Http().require({ api: '/addAdmin', param: params }); //添加管理员
export const forbideAdmin = (params) => new Http().require({ api: '/forbideAdmin', param: params }); //禁用/启用管理员
export const updateAdmin = (params) => new Http().require({ api: '/updateAdmin', param: params }); //编辑管理员

//
export const getCollegeList = (params) => new Http().require({ api: '/getCollegeList', param: params }); //查询院校列表
export const addOneCollege = (params) => new Http().require({ api: '/addOneCollege', param: params }); //增加一个院校
export const publishOneCollege = (params) => new Http().require({ api: '/publishOneCollege', param: params }); //发布一个院校
export const publishSomeColleges = (params) => new Http().require({ api: '/publishSomeColleges', param: params }); //批量发布院校
export const setAttentionNumForCollege = (params) => new Http().require({ api: '/setAttentionNumForCollege', param: params }); //设置一个院校不同省份的关注量
export const deleteOneCollege = (params) => new Http().require({ api: '/deleteOneCollege', param: params }); //删除一个院校
export const getOneCollege = (params) => new Http().require({ api: '/getOneCollege', param: params }); //查询一个院校
export const updateOneCollege = (params) => new Http().require({ api: '/updateOneCollege', param: params }); //编辑一个院校


export const getBookletListForCollege = (params) => new Http().require({ api: '/getBookletListForCollege', param: params }); //查询一个院校的“招生简章”列表
export const addBookletForCollege = (params) => new Http().require({ api: '/addBookletForCollege', param: params }); //添加一篇“招生简章”的文章

export const getTopicListForCollege = (params) => new Http().require({ api: '/getTopicListForCollege', param: params }); //查询一个院校的“历史考题”列表
export const addTopicForCollege = (params) => new Http().require({ api: '/addTopicForCollege', param: params }); //添加一篇“历史考题”的文章

export const addHighScoreForCollege = (params) => new Http().require({ api: '/addHighScoreForCollege', param: params }); //添加一篇“高分卷”的文章
export const getHighScoreListForCollege = (params) => new Http().require({ api: '/getHighScoreListForCollege', param: params }); //查询一个院校的“高分卷”列表


export const delOneBooklet = (params) => new Http().require({ api: '/delOneBooklet', param: params }); //删除一篇“招生简章”
export const delOneTopic = (params) => new Http().require({ api: '/delOneTopic', param: params }); //删除一篇“历史考题”
export const delOneHighScore = (params) => new Http().require({ api: '/delOneHighScore', param: params }); //删除一篇“高分卷”

export const getOneArticleContentOfCollegeInfo = (params) => new Http().require({ api: '/getArticleContentOfCollegeInfo', param: params }); //查询一篇文章详情


export const getAllGuideContentForCollege = (params) => new Http().require({ api: '/getAllGuideContentForCollege', param: params }); //查询学校报考指南信息

export const getPlaceListForCollege = (params) => new Http().require({ api: '/getPlaceListForCollege', param: params }); //查询一个院校所有考试地点
export const addPlaceForCollege = (params) => new Http().require({ api: '/addPlaceForCollege', param: params }); //添加考试地点


export const setRangeForOneCollege = (params) => new Http().require({ api: '/setRangeForOneCollege', param: params }); //设置一个院校的招生范围
export const setProfessionSubjectForOneCollege = (params) => new Http().require({ api: '/setProfessionSubjectForOneCollege', param: params }); //设置一个院校的招生专业考试科目
export const setProvinceScheduleForOneCollege = (params) => new Http().require({ api: '/setProvinceScheduleForOneCollege', param: params }); //设置一个院校不同省份的招生计划
export const setPrincipleForOneCollege = (params) => new Http().require({ api: '/setPrincipleForOneCollege', param: params }); //设置一个院校的录取原则
export const setSmallScoreLimitForOneCollege = (params) => new Http().require({ api: '/setSmallScoreLimitForOneCollege', param: params }); //设置一个院校的录取原则


export const getProfessionTimeListForCollege = (params) => new Http().require({ api: '/getProfessionTimeListForCollege', param: params }); //查询一个院校每个专业的报名时间、确认时间和考试时间
export const updateTimeForCollegeProfession = (params) => new Http().require({ api: '/updateTimeForCollegeProfession', param: params }); //设置院校某个专业的报名时间、确认时间和考试时间
export const delPlaceForCollege = (params) => new Http().require({ api: '/delPlaceForCollege', param: params }); //删除考试地点


//艺考助手相关接口
export const getAllCollegeList = (params) => new Http().require({ api: '/getAllCollegeList', params })//所有院校列表
export const getAllOrganizationForSchool = (params) => new Http().require({ api: '/getAllOrganizationForSchool', param: params }); //获取当前学校的所有班级
export const exportMemberListInExamHelper = (params) => new Http().require({ api: '/exportMemberListInExamHelper', param: params }); //导出excel


// 考试成绩相关接口
export const getTestList = (params) => new Http().require({ api: '/getTestList', param: params }); // 获取考试列表
export const getDetailsOfTest = (params) => new Http().require({ api: '/getDetailsOfTest', param: params }); // 根据考试id获取考试详情
export const getTotalStrengthRankList = (params) => new Http().require({ api: '/getTotalStrengthRankList', param: params }); // 查询全校总分的实力榜
export const getTotalStrengthRankListOfClass = (params) => new Http().require({ api: '/getTotalStrengthRankListOfClass', param: params }); // 获取指定班级考试成绩列表
export const getClassList = (params) => new Http().require({ api: '/getAllOrganizationForSchool', param: params }); // 获取一级和二级班级列表
export const createTest = (params) => new Http().require({ api: '/createTest', param: params }); // 创建考试
export const modifyTest = (params) => new Http().require({ api: '/modifyTest', param: params }); // 编辑考试
export const importSocre = (params) => new Http().require({ api: '/importSocreOfManager', param: params }); // 导入考试成绩Excel文件
export const releaseTest = (params) => new Http().require({ api: '/releaseTest', param: params }); // 发布一个考试

//课程表
export const getAllSubClassList = (params) => new Http().require({ api: '/getAllSubClassList', param: params }); //获取当前学校的所有二级班级
export const getAllCourseForClass = (params) => new Http().require({ api: '/getAllCourseForClass', param: params }); //获取班级课程表
export const getCourseDetails = (params) => new Http().require({ api: '/getCourseDetails', param: params }); //获取课程详情
export const getAllTeachersOfSchool = (params) => new Http().require({ api: '/getAllTeachersOfSchool', param: params }); //获取全校老师
export const delCourse = (params) => new Http().require({ api: '/delCourse', param: params }); //删除课程
export const modifyCourse = (params) => new Http().require({ api: '/modifyCourse', param: params }); //编辑课程
export const createCourse = (params) => new Http().require({ api: '/createCourse', param: params }); //创建课程
export const copyCourse = (params) => new Http().require({ api: '/copyCourse', param: params }); //copy课程
