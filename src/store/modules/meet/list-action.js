/**
 * @Author: yuhongliang
 * @Date:   2018-08-19T09:16:50+08:00
 * @Email:  yuhongliang900@163.com
 * @Filename: action.js
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-08-19T12:53:41+08:00
 */

import request from '../../../util/request.js';
import { isArray } from '../../../util/index.js';
import Alert from '../../../components/Alert.js';
import {
  FETCH_MEET_LIST_URL,
  DELETE_MEET_URL,
} from '../../../api/index.js';

/**
 * 查询会议
 * @type {String}
 */
export const FETCH_MEET_LIST = 'FETCH_MEET_LIST';
export const FETCH_MEET_LIST_SUCCESS = 'FETCH_MEET_LIST_SUCCESS';
export const FETCH_MEET_LIST_FAIL = 'FETCH_MEET_LIST_FAIL';

/**
 * 删除会议
 * @type {Object}
 */
export const DELETE_MEET = 'DELETE_MEET';
export const DELETE_MEET_SUCCESS = 'DELETE_MEET_SUCCESS';
export const DELETE_MEET_FAIL = 'DELETE_MEET_FAIL';

// 更新会议渲染数据，用于更新会议数据回填
export const UPDATE_MEET_RENDER_DATA = 'UPDATE_MEET_RENDER_DATA';

/**
 * 更新会议
 * @type {String}
 */
export const UPDATE_MEET = 'UPDATE_MEET';
export const UPDATE_MEET_SUCCESS = 'UPDATE_MEET_SUCCESS';
export const UPDATE_MEET_FAIL = 'UPDATE_MEET_FAIL';

/**
 * 上线会议
 * @type {Object}
 */
export const PUT_MEET = 'PUT_MEET';
export const PUT_MEET_SUCCESS = 'PUT_MEET_SUCCESS';
export const PUT_MEET_FAIL = 'PUT_MEET_FAIL';

/**
 * 下线会议
 * @type {Object}
 */
export const OFF_MEET = 'OFF_MEET';
export const OFF_MEET_SUCCESS = 'OFF_MEET_SUCCESS';
export const OFF_MEET_FAIL = 'OFF_MEET_FAIL';

// 操作模式
export const DETAIL_MODEL = 'DETAIL_MODEL';
export const UPDATE_MODEL = 'UPDATE_MODEL';

/**
 * mutations
 */
export const mutations = {
  /// 查询
  [FETCH_MEET_LIST](state) {
    state.loading = true;
  },
  [FETCH_MEET_LIST_SUCCESS](state, payload) {
    // const {
    //   query: {
    //     list: currentList,
    //   }
    // } = state;
    const { meets = [] } = payload || {};
    const list = isArray(meets) ? meets : [];
    state.loading = false;
    state.query.list = list; //[...currentList, ...list];
  },
  [FETCH_MEET_LIST_FAIL](state) {
    state.loading = true;
    state.query.list = [];
  },

  /// 删除
  [DELETE_MEET](state) {
    state.loading = true;
  },
  [DELETE_MEET_SUCCESS](state, payload) {
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
      Alert.message.success('会议删除成功.');
    } catch(e) { console.error(e); }
  },
  [DELETE_MEET_FAIL](state) {
    state.loading = false;
    Alert.message.error('会议删除失败.');
  },

  // 更新会议渲染数据，用于更新会议数据回填
  [UPDATE_MEET_RENDER_DATA](state, payload) {
    const {
      query: {
        list,
      },
    } = state;
    const { id } = payload || {};
    let index = 0;
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i].id === id) {
        index = i;
      }
    }
    const currMeet = list[index] || {};
    let ids = [];
    // 时间转换为数组
    currMeet['time'] = (currMeet['time'] || []).split('~');
    currMeet['themes'].forEach((theme, i) => {
      ids.push(theme.id);
    });
    currMeet['ids'] = ids;  /// 已选择主题
    currMeet['publish'] = !!currMeet['publish'];
    // state.query.list =
  },

  // 更新
  [UPDATE_MEET](state) {
    state.loading = true;
  },
  [UPDATE_MEET_SUCCESS](state, payload) {

  },
  [UPDATE_MEET_FAIL](state) {
    state.loading = false;
  },

  /// 上线
  [PUT_MEET](state) {
    state.loading = true;
  },
  [PUT_MEET_SUCCESS](state) {
    // TODO: success
    state.loading = false;
  },
  [PUT_MEET_FAIL](state) {
    // TODO: fail
    state.loading = false;
  },

  /// 下线
  [OFF_MEET](state) {
    state.loading = true;
  },
  [OFF_MEET_SUCCESS](state) {
    // TODO: success
    state.loading = false;
  },
  [OFF_MEET_FAIL](state) {
    // TODO: fail
    state.loading = false;
  },

  [DETAIL_MODEL](state) {
    state.detailModel = true;
  },
  [UPDATE_MODEL](state) {
    state.updateModel = true;
  },
}

/**
 * 异步处理
 */
export const actions = {
  async queryAll({ commit }) {
    try {
      commit(FETCH_MEET_LIST);
      const payload = await request({
        url: FETCH_MEET_LIST_URL,
      });
      commit(FETCH_MEET_LIST_SUCCESS, payload);
    } catch(e) {
      commit(FETCH_MEET_LIST_FAIL);
    }
  },
  async deleteMeetById({ commit }, id) {
    try {
      commit(DELETE_MEET);
      const payload = await request({
        url: DELETE_MEET_URL,
        data: {
          id,
        }
      });
      commit(DELETE_MEET_SUCCESS, payload);
    } catch(e) {
      commit(DELETE_MEET_FAIL);
    }
  }
}
