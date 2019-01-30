<template>
  <el-container>
    <el-header class="hailo-navigator" height="24px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hailoooo/e/def' }">管理面板</el-breadcrumb-item>
        <el-breadcrumb-item>嘉宾管理</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="hailo-navigator-content">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style media="screen">
  .hailo-navigator {
    padding: 10px 18px;
  }
  .hailo-navigator-content {
    padding: 10px 20px;
  }
</style>
