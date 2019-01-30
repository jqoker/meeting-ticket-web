/**
 * @Author: yuhongliang
 * @Date:   2018-08-06T14:31:20+08:00
 * @Email:  yuhongliang900@163.com
 * @Filename: router.js
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-08-07T10:33:41+08:00
 */

///
/// 暂只开放会议管理模块
/// 登录态交由服务端维护
///

import VueRouter from 'vue-router';
import Main from '../views/skeleton/Main.vue';
import Login from '../views/pages/auth/login.vue';
// import Default from '../views/pages/default/index.vue';
// import Sysm from '../views/pages/system/index.vue';
import NotFound from '../views/pages/404.vue';

// 会议管理
const Meet = () => import(/* webpackChunkName: "meet" */ '../views/pages/meet/index.vue');
const CreateMeet = () => import(/* webpackChunkName: "meet" */ '../views/pages/meet/create.vue');
const ListMeet = () => import(/* webpackChunkName: "meet" */ '../views/pages/meet/list.vue');

// 嘉宾管理
// const Author = () => import(/* webpackChunkName: "author" */ '../views/pages/author/index.vue');
// const CreateAuthor = () => import(/* webpackChunkName: "author" */ '../views/pages/author/create.vue');
// const ListAuthor = () => import(/* webpackChunkName: "author" */ '../views/pages/author/list.vue');

// routes
const loginRoute = { path: '/login', component: Login, };
const hailooooRoute = {
  path: '/hailoooo/e',
  component: Main,
  children: [
    // { path: 'default', component: Default },
    // { path: 'system', component: Sysm },
    {
      path: 'meet',
      component: Meet,
      children: [
        { path: 'list', component: ListMeet },
        { path: 'create', component: CreateMeet },
        { path: '', component: ListMeet }
      ]
    }
    // {
    //   path: 'author',
    //   component: Author,
    //   children: [
    //     { path: 'list', component: ListAuthor },
    //     { path: 'create', component: CreateAuthor },
    //     { path: '', component: ListAuthor }
    //   ]
    // }
  ],
  // meta: {
  //   requiresAuth: true,
  // }
};
const wildcardRoute = { path: '*', component: NotFound }; // not found
const routes = [loginRoute, hailooooRoute, wildcardRoute];
const router = new VueRouter({ routes });

export default router;
