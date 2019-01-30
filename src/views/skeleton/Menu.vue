<template>
  <el-card shadow="never" class="hailo-menu-list">
      <div slot="header" class="header-content">
        当前登录账户
        <span class="header-login-account">
          {{u}}
        </span>
      </div>
      <!-- <router-link to="/hailoooo/e/default" tag="div" class="menu">
        <i class="el-icon-menu"></i>
        <span class="menu-title">管理面板</span>
      </router-link>
      <router-link to="/hailoooo/e/author" tag="div" class="menu">
        <i class="el-icon-service"></i>
        <span class="menu-title">嘉宾管理</span>
      </router-link> -->
      <router-link to="/hailoooo/e/meet" tag="div" class="menu">
        <i class="el-icon-document"></i>
        <span class="menu-title">会议管理</span>
      </router-link>
      <!-- <router-link to="/hailoooo/e/privilege" tag="div" class="menu">
        <i class="el-icon-edit"></i>
        <span class="menu-title">权限管理</span>
      </router-link>
      <router-link to="/hailoooo/e/party" tag="div" class="menu">
        <i class="el-icon-rank"></i>
        <span class="menu-title">用户管理</span>
      </router-link>
      <router-link to="/hailoooo/e/system" tag="div" class="menu">
        <i class="el-icon-setting"></i>
        <span class="menu-title">系统管理</span>
      </router-link> -->
  </el-card>
</template>

<script type="text/javascript">
  import { LOGIN_U_ID, cache } from '../../util/cache.js';
  export default {
    data() {
      return {
        u: '',
      };
    },
    methods: {},
    mounted() {
      this.u = cache.get(LOGIN_U_ID) || '';
    }
  }
</script>

<style>
  .hailo-menu-list {
    border: none;
    border-radius: 0;
    text-align: center;
    padding-bottom: 10px;
  }
  .hailo-menu-list .el-card__header {
    width: 100%;
    background-color: #409EFF;
    color: #FFF;
    border: 0px;
    margin-bottom: 10px;
    font-size: 14px;
  }
  .hailo-menu-list .el-card__header .header-content {}
  .hailo-menu-list .el-card__header .header-content .header-login-account {
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 5px 0;
    text-align: center;
  }
  .hailo-menu-list .el-card__body { padding: 0; }
  .menu {
    position: relative;
    width: 100%;
    display: inline-block;
    font-size: 16px;
    padding: 10px 0;
    box-sizing: border-box;
    cursor: pointer;
  }
  .menu-title {
    margin-left: 4px;
  }

  /* vue router样式 */
  .router-link-exact-active,
  .router-link-active {
    color: #2f3033;
    background-color: #e1edfa;
  }
  .router-link-exact-active:after,
  .router-link-active:after {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    content: '';
    width: 4px;
    height: 100%;
    background-color: #409EFF;
  }
</style>
