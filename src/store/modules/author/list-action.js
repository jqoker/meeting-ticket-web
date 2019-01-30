/**
 * @Author: yuhongliang
 * @Date:   2018-08-22T15:27:31+08:00
 * @Email:  yuhongliang900@163.com
 * @Filename: list-action.js
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-08-22T15:27:57+08:00
 */

import request from '../../../util/request.js';
import { isArray } from '../../../util/index.js';
import Alert from '../../../components/Alert.js';
import constants from '../../../const.js';
import {
  FETCH_AUTHOR_LIST_URL,
  DELETE_AUTHOR_URL,
} from '../../../api/index.js';

/**
 * 查询嘉宾
 */
export const FETCH_AUTHOR = 'FETCH_AUTHOR';
export const FETCH_AUTHOR_SUCCESS = 'FETCH_AUTHOR_SUCCESS';
export const FETCH_AUTHOR_FAIL = 'FETCH_AUTHOR_FAIL';

/**
 * 删除嘉宾
 */
export const DELETE_AUTHOR = 'DELETE_AUTHOR';
export const DELETE_AUTHOR_SUCCESS = 'DELETE_AUTHOR_SUCCESS';
export const DELETE_AUTHOR_FAIL = 'DELETE_AUTHOR_FAIL';

export const mutations = {
  [FETCH_AUTHOR](state) {
    state.loading = true;
  },
  [FETCH_AUTHOR_SUCCESS](state, payload) {
    // const {
    //   query: {
    //     list: currentList,
    //   }
    // } = state;
    const { authors = [] } = payload || {};
    const list = isArray(authors) ? authors : [];
    state.loading = false;
    state.query.list = list; //[...currentList, ...list];
  },
  [FETCH_AUTHOR_FAIL](state) {
    state.loading = false;
    Alert.message.error(constants.HTTP_REQUEST_FAIL_TIP);
  },
  [DELETE_AUTHOR](state) {
    state.loading = true;
  },
  [DELETE_AUTHOR_SUCCESS](state, payload) {
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
      Alert.message.success('嘉宾删除成功.');
    } catch(e) { console.error(e); }
  },
  [DELETE_AUTHOR_FAIL](state) {
    state.loading = false;
    Alert.message.error('嘉宾删除失败.');
  },
};

export const actions = {
  async queryAll({ commit }) {
    try {
      commit(FETCH_AUTHOR);
      const payload = await request({
        url: FETCH_AUTHOR_LIST_URL,
      });
      commit(FETCH_AUTHOR_SUCCESS, payload);
    } catch(e) {
      commit(FETCH_AUTHOR_FAIL);
    }
  },
  async delAuthorById({ commit }, id) {
    try {
      commit(DELETE_AUTHOR);
      const payload = await request({
        url: DELETE_AUTHOR_URL,
        data: {
          id,
        },
      });
      commit(DELETE_AUTHOR_SUCCESS, payload);
    } catch(e) {
      commit(DELETE_AUTHOR_FAIL);
    }
  }
}
