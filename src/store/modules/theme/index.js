/**
 * @Author: yuhongliang
 * @Date:   2018-09-07T16:05:21+08:00
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-09-07T16:06:46+08:00
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
