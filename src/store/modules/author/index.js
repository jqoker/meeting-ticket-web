/**
 * @Author: yuhongliang
 * @Date:   2018-08-22T15:26:43+08:00
 * @Email:  yuhongliang900@163.com
 * @Filename: index.js
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-08-22T15:27:20+08:00
 */

import {
  mutations,
  actions,
} from './list-action.js';


/**
 * 默认状态
 * @type {Object}
 */
const state = {
  loading: false,
  query: {
    list: [],
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters: {}
};
