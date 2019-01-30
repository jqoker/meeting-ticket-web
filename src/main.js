/**
 * @Author: yuhongliang
 * @Date:   2018-08-05T10:21:36+08:00
 * @Email:  yuhongliang900@163.com
 * @Filename: main.js
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-08-07T12:20:13+08:00
 */

import Vue from 'vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'es6-promise/auto';
import Vuex from 'vuex'

// css
import './assets/css/global.css';

/// component
import App from './App.vue';
import router from './router/router.js';
import store from './store/index.js';

Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
