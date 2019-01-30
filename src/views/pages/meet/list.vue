<template>
  <div class="meet-list-container">
    <el-row class="meet-top">
      <router-link to="/hailoooo/e/meet/create" tag="div">
        <el-button type="text" icon="el-icon-edit">新增会议</el-button>
      </router-link>
    </el-row>
    <el-tabs>
      <el-tab-pane label="会议列表"><MeetTableList/></el-tab-pane>
      <el-tab-pane label="嘉宾列表" lazy><AuthorTableList/></el-tab-pane>
      <el-tab-pane label="主题列表" lazy><ThemeTableList/></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
  import MeetTableList from '../../../components/table/MeetTableList.vue';
  import AuthorTableList from '../../../components/table/AuthorTableList.vue';
  import ThemeTableList from '../../../components/table/ThemeTableList.vue';

  export default {
    computed: {},
    components: {
      MeetTableList,
      AuthorTableList,
      ThemeTableList,
    }
  }
</script>

<style>
</style>
