/**
 * @Author: yuhongliang
 * @Date:   2018-08-28T19:34:34+08:00
 * @Email:  yuhongliang900@163.com
 * @Filename: index.js
 * @Last modified by:   yuhongliang
 * @Last modified time: 2018-08-28T19:37:10+08:00
 */

/**
 * 接口定义
 */

// 嘉宾
export const FETCH_AUTHOR_LIST_URL = 'author/list';
export const CREATE_AUTHOR_URL = 'author/create';
export const DELETE_AUTHOR_URL = 'author/delete';
export const SUGGEST_AUTHOR_URL = 'author/suggest';
export const UPDATE_AUTHOR_URL = 'author/update';

/// 主题
export const FETCH_THEME_LIST_URL = 'theme/list';
export const FETCH_AVAILABLE_THEME_LIST_URL = 'theme/list_available';
export const CREATE_THEME_URL = 'theme/create';
export const DELETE_THEME_URL = 'theme/delete';
export const UPDATE_THEME_URL = 'theme/update';

/// 会议
export const FETCH_MEET_LIST_URL = 'meet/list';
export const FETCH_MEET_LIST_IN_CATEGORY_URL = 'meet/category';
export const CREATE_MEET_URL = 'meet/create';
export const DELETE_MEET_URL = 'meet/delete';
export const UPDATE_MEET_URL = 'meet/update';

///登录
export const LOGIN_URL = 'u/login';
export const LOGOUT_URL = 'u/logout';
