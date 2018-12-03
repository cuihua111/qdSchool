import axios from 'axios';
import router from '@/router';

import {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage
} from '@/utils/mixin';
import {Loading,Message} from 'element-ui'

let loadingInstance;
let BASE_URL = 'http://123.207.88.200:9000';
let httpConfig = {
  //请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉httpConfig中的url
  url: '/singcampus',
  // 请求方法同上
  method: 'get', // default
  // 基础url前缀
  baseURL: BASE_URL,
  headers: {
          'Content-Type':'application/json',
          'token':getSessionStorage('token'),
          'uid':getSessionStorage('uid'),
          'terminal-Type':'2'
  },
  //parameter参数
  params: {},
  //post参数，使用axios.post(url,{},config);如果没有额外的也必须要用一个空对象，否则会报错
  data: {},
  //设置超时时间
  timeout: 5000,
  //返回数据类型
  responseType: 'json', // default

}
/*
 ** 依照原来重写
 *axiosArgument:{url:xxxxx,data:{xxx:xxx}}
 **/
 function postAxios(axiosArgument){
  loadingInstance = Loading.service({text:'加载中...'});
  axios.defaults.timeout =  10000;
  return new Promise(function(resolve,reject){
      axios.post(BASE_URL+axiosArgument.url,axiosArgument.data ,httpConfig)
          .then(function (response) {
              loadingInstance.close();
              if (response.data.code === 0) { //请求成功
                return resolve(response.data.data)
              } else {
                // if (response.data.code === 2) { //未登录
                //   //   router.push('/Login')
                // }
                Message({
                  message:response.data.message,
                  type:'error',
                });
                return reject(response.data)
              }
          })
          .catch(function (error) {
            console.log(error)
              Message({
                message:'网络错误,请刷新重试',
                type:'error',
              });
              loadingInstance.close();
              return reject(error)
          });
  })
};

export default postAxios;
