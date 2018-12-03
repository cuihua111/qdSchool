import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/login'
import Register from '@/components/register/index'
import Register1 from '@/components/register/register1/register1'
import Register2 from '@/components/register/register2/register2'
import Register3 from '@/components/register/register3/register3'
import AddressBook from '@/components/addressBook/index'
import AddressHeader from '@/components/addressBook/addressHeader/addressHeader'
import Classa from '@/components/addressBook/classa/classa'
import ClassAdd from '@/components/addressBook/classAdd/classAdd'
import ClassSet from '@/components/addressBook/classSet/classSet'
import PeopleAdd from '@/components/addressBook/peopleAdd/peopleAdd'
import PeopleSet from '@/components/addressBook/peopleSet/peopleSet'
import Department from '@/components/addressBook/department/department'
import ImportAndExport from '@/components/addressBook/importAndExport'
import ExcelSuccess from '@/components/addressBook/excelSuccess'
import ExcelError from '@/components/addressBook/excelError'
import ExcelError2 from '@/components/addressBook/excelError2'

import MemberAdd from '@/components/addressBook/memberAdd/memberAdd'
import MemberInfo from '@/components/addressBook/memberInfo/memberInfo'
import MemberSet from '@/components/addressBook/memberSet/memberSet'
import Home from '@/components/home/index'
import SchoolIndex from '@/components/home/schoolIndex/schoolIndex'
import TimeStatistics from '@/components/home/timeStatistics/timeStatistics'
import AdminSetting from '@/components/home/adminSetting/adminSetting'
import SignUpGuide from '@/components/home/signUpGuide/index'
import AddSchool from '@/components/home/addSchool/index'
import SchoolInfo from '@/components/home/addSchool/info/schoolInfo'
import Guide from '@/components/home/addSchool/info/guide'
import SchoolIntro from '@/components/home/addSchool/info/schoolIntro'
import SetExamSiteAndSpecialty from '@/components/home/addSchool/setExamSiteAndSpecialty/index'
import TestScores from '@/components/testScores/index'
import TestList from '@/components/testScores/testList/testList'
import TestDetails from '@/components/testScores/testDetails/testDetails'
import createTest from '@/components/testScores/createTest/createTest'
import modifyTest from '@/components/testScores/createTest/createTest'
import importScores from '@/components/testScores/importScores/importScores'
import importResult from '@/components/testScores/importScores/importResult'

//艺考助手 
import ArtAssistant from '@/components/artAssistant/index'

//课程表
import ClassSchedule from '@/components/classSchedule/index'
import CourseInfo from '@/components/classSchedule/courseInfo'
import AddCourse from '@/components/classSchedule/addCourse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {keepAlive: false},
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      redirect: '/register/Register1',
      meta: {keepAlive: false},
      children: [
        {
          path: 'register1',
          name: 'Register1',
          component: Register1,
          meta: {keepAlive: false},
        },
        {
          path: 'register2',
          name: 'Register2',
          component: Register2,
          meta: {keepAlive: false},
        },
        {
          path: 'register3',
          name: 'Register3',
          component: Register3,
          meta: {keepAlive: false},
        },
      ]
    },
    {
      path: '/addressBook',
      name: 'AddressBook',
      component: AddressBook,
      // redirect: '/addressBook/classa',
      meta: {keepAlive: false},
      children: [
        {
          path: 'addressHeader',
          name: 'AddressHeader',
          component: AddressHeader,
        },
        {
          path: 'classa',
          name: 'Classa',
          component: Classa,
          meta: {keepAlive: false},
        },
        {
          path: 'classAdd',
          name: 'ClassAdd',
          component: ClassAdd,
          meta: {keepAlive: false},
        },
        {
          path: 'classSet',
          name: 'ClassSet',
          component: ClassSet,
          meta: {keepAlive: false},
        },
        {
          path: 'peopleAdd',
          name: 'PeopleAdd',
          component: PeopleAdd,
          meta: {keepAlive: false},
        },
        {
          path: 'peopleSet',
          name: 'PeopleSet',
          component: PeopleSet,
          meta: {keepAlive: false},
        },
        {
          path: 'department',
          name: 'Department',
          component: Department,
          meta: {keepAlive: false},
        },
        {
          path: 'memberAdd',
          name: 'MemberAdd',
          component: MemberAdd,
          meta: {keepAlive: false},
        },
        {
          path: 'memberInfo',
          name: 'MemberInfo',
          component: MemberInfo,
          meta: {keepAlive: false},
        },
        {
          path: 'memberSet',
          name: 'MemberSet',
          component: MemberSet,
          meta: {keepAlive: false},
        },
      ]
    },
    // 失误将导入导出看错 所以没和通讯录放一起
    {
      path: '/addressBook/importAndExport',
      name: 'ImportAndExport',
      component: ImportAndExport,
      meta: {keepAlive: false},
    },
    {
      path: '/addressBook/excelSuccess',
      name: 'ExcelSuccess',
      component: ExcelSuccess,
      meta: {keepAlive: false},
    },
    {
      path: '/addressBook/excelError',
      name: 'ExcelError',
      component: ExcelError,
      meta: {keepAlive: false},
    },
    {
      path: '/addressBook/excelError2',
      name: 'ExcelError2',
      component: ExcelError2,
      meta: {keepAlive: false},
    },
    // {
    //   path: '/register/register2',
    //   name: 'register2',
    //   component: register2,
    // },
    // {
    //   path: '/register3/register3',
    //   name: 'Register3',
    //   component: Register3,
    // },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/home/schoolIndex',
      children: [
        {
          path: 'schoolIndex',
          name: 'SchoolIndex',
          component: SchoolIndex,
          meta: {keepAlive: false}
        },
        {
          path: 'timeStatistics',
          name: 'TimeStatistics',
          component: TimeStatistics,
          meta: {keepAlive: false}
        },
        {
          path: 'adminSetting',
          name: 'AdminSetting',
          component: AdminSetting,
          meta: {keepAlive: true}
        },
        {
          path: 'signUpGuide',
          name: 'SignUpGuide',
          component: SignUpGuide,
          meta: {keepAlive: false}
        },
        {
          path:'/ArtAssistant',
          name:'ArtAssistant',
          component:ArtAssistant,
          meta:{keepAlive:true}
        },
        {
          path:'/ClassSchedule',
          name:'ClassSchedule',
          component:ClassSchedule,
          meta:{keepAlive:true}
        },
        {
          path:'/AddCourse',
          name:'AddCourse',
          component:AddCourse,
          meta:{keepAlive:false}
        },
        {
          path:'/CourseInfo/:id',
          name:'CourseInfo',
          component:CourseInfo,
          meta:{keepAlive:true}
        },
        {
          path: 'addSchool',
          name: 'AddSchool',
          component: AddSchool,
          redirect: '/home/addSchool/schoolInfo',
          meta: {keepAlive: true},
          children:[
            {
              path: 'schoolInfo',
              name: 'SchoolInfo',
              component: SchoolInfo,
              meta: {keepAlive: false}
            },
            {
              path: 'guide',
              name: 'Guide',
              component: Guide,
              meta: {keepAlive: true}
            },
            {
              path: 'schoolIntro',
              name: 'SchoolIntro',
              component: SchoolIntro,
              meta: {keepAlive: true}
            },
          ]
        },
        {
          path: 'editSchool',
          name: 'EditSchool',
          component: AddSchool,
          redirect: '/home/editSchool/schoolInfo',
          meta: {keepAlive: true},
          children:[
            {
              path: 'schoolInfo',
              name: 'editSchoolInfo',
              component: SchoolInfo,
              meta: {keepAlive: false}
            },
            {
              path: 'guide',
              name: 'editGuide',
              component: Guide,
              meta: {keepAlive: false}
            },
            {
              path: 'schoolIntro',
              name: 'editSchoolIntro',
              component: SchoolIntro,
              meta: {keepAlive: false}
            },
          ]
        },
        {
          path:'setExamSiteAndSpecialty',
          name:'SetExamSiteAndSpecialty',
          component:SetExamSiteAndSpecialty,
          meta: {keepAlive:true}
        },
        {
          path: 'testScores',
          name: 'testScores',
          component: TestScores,
          redirect: '/testScores/testList',
          meta: { keepAlive: false },
          children: [
            {
              path: 'testList',
              name: 'testList',
              component: TestList,
              meta: { keepAlive: false }
            },
            {
              path: 'TestDetails',
              name: 'TestDetails',
              component: TestDetails,
              meta: { keepAlive: false }
            },
            {
              path: 'createTest',
              name: 'createTest',
              component: createTest,
              meta: { keepAlive: false }
            },
            {
              path: 'modifyTest',
              name: 'modifyTest',
              component: modifyTest,
              meta: { keepAlive: false }
            },
            {
              path: 'importScores',
              name: 'importScores',
              component: importScores,
              meta: { keepAlive: false }
            },
            {
              path: 'importResult',
              name: 'importResult',
              component: importResult,
              meta: { keepAlive: false }
            }
          ]
        }
      ]
    },
  ]
})
