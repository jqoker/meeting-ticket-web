<template>
  <div class="meet-container">
    <el-row class="header">
      <router-link to="/hailoooo/e/meet/list" tag="div">
        <el-button type="text" icon="el-icon-tickets">查看列表</el-button>
      </router-link>
    </el-row>
    <div class="content">
      <el-tabs>
        <el-tab-pane label="创建嘉宾"><AddBatchAuthor :authors="authors"/></el-tab-pane>
        <el-tab-pane label="创建主题"><AddBatchTheme :themes="themes"/></el-tab-pane>
        <el-tab-pane label="创建会议"><AddBatchMeet :meet="meet"/></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import AddBatchMeet from '../../../components/forms/batch/AddBatchMeet.vue';
  import AddBatchAuthor from '../../../components/forms/batch/AddBatchAuthor.vue';
  import AddBatchTheme from '../../../components/forms/batch/AddBatchTheme.vue';
  import { model, modelObject } from '../../../model/meet.js';
  import {
    model as themeModel,
    modelObject as themeModelObject,
  } from '../../../model/theme.js';
  import {
    model as authorModel,
    modelObject as authorModelObject,
  } from '../../../model/author.js';

  export default {
    data() {
      return {
        meet: [modelObject],
        themes: [Object.assign({}, themeModelObject)],
        authors: [Object.assign({}, authorModelObject)],
      };
    },
    methods: {},
    components: {
      AddBatchAuthor,
      AddBatchTheme,
      AddBatchMeet,
    }
  }
</script>

<style>
  .meet-container .header {
    display: inline-block;
    margin: 10px 0;
  }
  .meet-container .content {
    /* padding: 15px 0px; */
    /* border: 1px solid #ebeef5; */
    border-radius: 2px;
  }
  .meet-container .content .content-navigator {
    margin-bottom: 40px;
  }
  .input-form {
    padding: 26px 0 10px 0;
    background-color: #fff;
    border-radius: 2px;
    margin-bottom: 20px;
  }
  .upload-img {
    width: 360px;
  }
  .el-upload__tip {
    color: #ff334d;
  }
</style>
