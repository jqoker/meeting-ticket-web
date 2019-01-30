/**
 * @Author: yuhongliang
 * @Date:   2018-08-06T18:59:56+08:00
 * @Email:  yuhongliang900@163.com
 * @Filename: auth.js
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-09-04T15:31:09+08:00
 */

/**
 * 登录相关处理
 */

import request from './request.js';
import {
  LOGIN_URL,
  LOGOUT_URL,
} from '../api/index.js';
import { LOGIN_U_ID, cache } from './cache.js';

export default {
  async login(email, password, cb, failCb) {
    // TODO: add login logic
    try {
      const { u = '' } = await request({
                          method: 'POST',
                          url: LOGIN_URL,
                          data: {
                            email,
                            password,
                          }
                      });
      u && cache.set(LOGIN_U_ID, u);
      cb && cb();
    } catch(e) {
      failCb && failCb();
      console.error(e);
    }
  },
  async ulogout(cb) {
    try {
      const res = await request({
        url: LOGOUT_URL,
      });
      cb && cb();
    } catch(e) {
      console.error(e);
    }
  },
}
