/**
 * @Author: yuhongliang
 * @Date:   2018-08-20T18:02:22+08:00
 * @Email:  yuhongliang900@163.com
 * @Filename: create-action.js
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-08-20T18:02:32+08:00
 */

/// 对于表单操作，不建议使用该方式
/// 使用v-model方式会更好，另外表单部分可以组件化
/// 组件的data值也具有封装性（一般是对象），利用子组件改变引用值
/// 父组件中的值也会改变这一原理，可以很方便的将表单组件化
/// 并且极易获取到表单值

import request from '../../../util/request.js';
import { isArray } from '../../../util/index.js';
import Alert from '../../../components/Alert.js';

/**
 * 输入项更新
 * @type {String}
 */
export const UPDATE_TITLE = 'UPDATE_TITLE';
export const UPDATE_IMG_URL = 'UPDATE_IMG_URL';
export const UPDATE_TIME = 'UPDATE_TIME';
export const UPDATE_TICKET_PRICE = 'UPDATE_TICKET_PRICE';
export const UPDATE_ADDR = 'UPDATE_ADDR';
export const UPDATE_SUMMARY = 'UPDATE_SUMMARY';
export const UPDATE_THEME = 'UPDATE_THEME';
export const UPDATE_SPONSOR = 'UPDATE_SPONSOR';
export const UPDATE_CO_SPONSOR = 'UPDATE_CO_SPONSOR';
export const UPDATE_PUBLISH_STATUS = 'UPDATE_PUBLISH_STATUS';

/**
 * 创建会议
 * @type {String}
 */
export const CREATE_MEET = 'CREATE_MEET';
export const CREATE_MEET_SUCCESS = 'CREATE_MEET_SUCCESS';
export const CREATE_MEET_FAIL = 'CREATE_MEET_FAIL';

export const mutations = {
  [UPDATE_TITLE](state, payload) {
    state.title = payload;
  },
  [UPDATE_IMG_URL](state, payload) {
    state.imgUrl = payload;
  },
  [UPDATE_TIME](state, payload) {
    state.time = payload;
  },
  [UPDATE_TICKET_PRICE](state, payload) {
    state.ticketPrice = payload;
  },
  [UPDATE_ADDR](state, payload) {
    state.addr = payload;
  },
  [UPDATE_SUMMARY](state, payload) {
    state.summary = payload;
  },
  [UPDATE_THEME](state, payload) {
    state.themes.push(payload);
  },
  [UPDATE_SPONSOR](state, payload) {
    state.sponsor = payload;
  },
  [UPDATE_CO_SPONSOR](state, payload) {
    state.coSponsor = payload;
  },
  [UPDATE_PUBLISH_STATUS](state, payload) {
    state.publish = payload;
  },
};
export const actions = {

};
