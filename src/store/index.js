import Vue from 'vue';
import Vuex from 'vuex';
import meet from './modules/meet/index.js';
import author from './modules/author/index.js';
import theme  from './modules/theme/index.js';
import constants from './constants.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  modules: {
    [constants.MODULE_NAME.MEET]: meet,
    [constants.MODULE_NAME.AUTHOR]: author,
    [constants.MODULE_NAME.THEME]: theme,
  },
  strict: process.env.NODE_ENV !== 'production'
});

export default store;
