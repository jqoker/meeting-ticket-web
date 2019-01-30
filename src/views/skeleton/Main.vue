<template>
  <el-container class="hailo-cms">
    <el-header class="hailo-header" height="80px">
      <div class="hailo-slogan">
        Hailoooo
      </div>
      <div class="hailo-slogan-right">
        <el-button type="text" icon="el-icon-news" class="btn-color-gray" @click="ulogout">退出</el-button>
        <!-- <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            快捷设置<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改个人信息</el-dropdown-item>
            <el-dropdown-item>权限配置</el-dropdown-item>
            <el-dropdown-item>系统设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </div>
    </el-header>
    <el-container>
      <el-aside v-show="!collapse" width="200px" class="hailo-aside">
        <Menu />
      </el-aside>
      <el-main class="hailo-content">
        <router-view></router-view>
      </el-main>
      <div class="hailo-menu-collapse" @click="changeCollapse">
        <i :class="iconCls"></i>
      </div>
    </el-container>
  </el-container>
</template>

<script>
  import Menu from './Menu.vue';
  import Auth from '../../util/auth';

  export default {
    data() {
      return {
        collapse: false,
      };
    },
    computed: {
      iconCls() {
        return this.collapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left';
      },
    },
    methods: {
      changeCollapse() {
        this.collapse = !this.collapse;
      },
      ulogout() {
        Auth.ulogout(() => {
          this.$router.replace({
            path: '/login',
          });
        });
      },
    },
    components: {
      Menu,
    }
  }
</script>

<style>
  .hailo-cms {
    background-color: #fafafa;
  }
  .hailo-header {
    color: #fff;
    background-color: #fff;
    font-size: 28px;
    line-height: 80px;
    padding: 0;
    margin-bottom: 20px;
    overflow: hidden;
  }
  .hailo-header .hailo-slogan {
    position: relative;
    width: 200px;
    height: 100%;
    background-color: #409EFF;
    text-align: center;
    font-weight: 600;
    float: left;
  }
  .hailo-content {
    background-color: #fff;
    padding: 10px;
    margin: 0 10px;
  }
  .hailo-slogan-right {
    float: right;
    height: 100%;
    padding-right: 60px;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .hailo-menu-collapse {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin-bottom: 40px;
    font-size: 21px;
    cursor: pointer;
    background-color: #409EFF;
    color: #fff;
    font-weight: 600;
  }
</style>
