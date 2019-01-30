/**
 * @Author: yuhongliang
 * @Date:   2018-08-19T09:05:50+08:00
 * @Email:  yuhongliang900@163.com
 * @Filename: index.js
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-08-19T12:53:57+08:00
 */

import {
  mutations as listMutations,
  actions,
} from './list-action.js';
import {
  mutations as createMutations,
} from './create-action.js';


/**
 * 默认状态
 * @type {Object}
 */
const state = {
  loading: false,
  query: {
    list: [],
  },
  detailModel: false,
  updateModel: false,
  create: {
    title: '',
    imgUrl: '',
    time: '',
    ticketPrice: '',
    addr: '',
    summary: '',
    themes: [{
      title: '',
      content: '',
      author: {
        name: '',
        avatarImgUrl: '',
        summary: '',
      }
    }],
    sponsor: '',
    coSponsor: '',
    publish: true,
  }
};

export default {
  namespaced: true,
  state,
  mutations: {
    ...listMutations,
    ...createMutations,
  },
  actions,
  getters: {}
};
