/**
 * @Author: yuhongliang
 * @Date:   2018-08-07T14:32:24+08:00
 * @Email:  yuhongliang900@163.com
 * @Filename: request.js
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-08-07T14:32:35+08:00
 */

 // 服务端统一下发数据格式为
 // {
 //  "code": ...,
 //  "message": ...,
 //  "data": ....
 // }
 // 返回的promise.then函数入参为data

// import { Loading } from 'element-ui';
import axios from 'axios';
import config from '../config.js';
import auth from './auth.js';
import router from '../router/router.js';

const {
  ajax: {
    host,
    suffix: {
      e,
    }
  }
} = config;
const TIMEOUT = 5000;
const http = axios.create({
    baseURL: `${host}/${e}`,
    timeout: TIMEOUT,
});

export default (option) => {
  const {
    url,
    method = 'get',
    data = {},
  } = option;

  try {
    Object.keys(data || {}).forEach((key) => {
      if (typeof data[key] === 'undefined') {
        delete data[key];
      }
    });
  } catch (e) { console.log(e); }

  let requestCfg = {
    url,
    method,
    // headers: {
    //   'Authorization': auth.getToken(),
    // },
    withCredentials: true,
  };
  requestCfg[method === 'get' ? 'params' : 'data'] = data;

  // let loadingInst = Loading.service({
  //   fullscreen: false,
  // });
  return http.request(requestCfg)
            .then((res) => {
              // 去除axios封装
              return (res || {}).data || {};
            })
            .then((r) => {
              const { code, data } = r;
              switch (code) {
                case 0:
                  return data;
                case 1:
                  throw new Error('code != 0');
                  break;
                case 403:
                  router.replace('/login');
                  throw new Error('no authorization.');
                  break;
                default:
                  return data;
              }
            });
};
