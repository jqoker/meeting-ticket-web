/**
 * @Author: yuhongliang
 * @Date:   2018-09-07T16:05:28+08:00
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-09-07T16:07:50+08:00
 */

import request from '../../../util/request.js';
import { isArray } from '../../../util/index.js';
import Alert from '../../../components/Alert.js';
import {
  FETCH_THEME_LIST_URL,
  DELETE_THEME_URL,
} from '../../../api/index.js';

/**
 * 查询主题
 * @type {String}
 */
export const FETCH_THEME_LIST = 'FETCH_THEME_LIST';
export const FETCH_THEME_LIST_SUCCESS = 'FETCH_THEME_LIST_SUCCESS';
export const FETCH_THEME_LIST_FAIL = 'FETCH_THEME_LIST_FAIL';

/**
 * 删除主题
 * @type {Object}
 */
export const DELETE_THEME = 'DELETE_THEME';
export const DELETE_THEME_SUCCESS = 'DELETE_THEME_SUCCESS';
export const DELETE_THEME_FAIL = 'DELETE_THEME_FAIL';

/**
 * mutations
 */
export const mutations = {
  /// 查询
  [FETCH_THEME_LIST](state) {
    state.loading = true;
  },
  [FETCH_THEME_LIST_SUCCESS](state, payload) {
    // const {
    //   query: {
    //     list: currentList,
    //   }
    // } = state;
    const { themes = [] } = payload || {};
    const list = isArray(themes) ? themes : [];
    state.loading = false;
    state.query.list = list; //[...currentList, ...list];
  },
  [FETCH_THEME_LIST_FAIL](state) {
    state.loading = true;
    state.query.list = [];
  },

  /// 删除
  [DELETE_THEME](state) {
    state.loading = true;
  },
  [DELETE_THEME_SUCCESS](state, payload) {
    try {
      const {
        id: deleteId,
      } = payload;
      const {
        query: {
          list,
        },
      } = state;
      let index = 0;
      for (let i = 0, len = list.length; i < len; i++) {
        const {
          id = 0,
        } = list[i] || {};
        if (deleteId === id) {
          index = i;
          break;
        }
      }
      state.loading = false;
      state.query.list.splice(index, 1);
      Alert.message.success('主题删除成功.');
    } catch(e) { console.error(e); }
  },
  [DELETE_THEME_FAIL](state) {
    state.loading = false;
    Alert.message.error('主题删除失败.');
  },
}

/**
 * 异步处理
 */
export const actions = {
  async queryAll({ commit }) {
    try {
      commit(FETCH_THEME_LIST);
      const payload = await request({
        url: FETCH_THEME_LIST_URL,
      });
      commit(FETCH_THEME_LIST_SUCCESS, payload);
    } catch(e) {
      commit(FETCH_THEME_LIST_FAIL);
    }
  },
  async deleteThemeById({ commit }, id) {
    try {
      commit(DELETE_THEME);
      const payload = await request({
        url: DELETE_THEME_URL,
        data: {
          id,
        }
      });
      commit(DELETE_THEME_SUCCESS, payload);
    } catch(e) {
      commit(DELETE_THEME_FAIL);
    }
  }
}
