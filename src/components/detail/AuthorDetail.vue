<template lang="html">
  <div class="author-detail">
    <el-row v-for="(label, index) in labelMap">
      <el-col :span="2">
        <div class="grid-content">{{label.value}}</div>
      </el-col>
      <el-col v-if="label.name === 'avatarImgUrl'" :span="22">
        <div class="grid-content">
          <img :src="author[label.name]" alt="头像" class="author-avatar" />
        </div>
      </el-col>
      <el-col v-else-if="label.name === 'blogSiteUrl' || label.name === 'githubSiteUrl'" :span="22">
        <div class="grid-content">
          <a v-if="author[label.name]" :href="author[label.name]" target="_blank" class="url">{{label.desc}}</a>
          <span v-else>暂无</span>
        </div>
      </el-col>
      <el-col v-else :span="22">
        <div class="grid-content">{{author[label.name] || '暂无'}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  const labelMap = [
    {
      name: 'name',
      value: '姓名',
    },
    {
      name: 'summary',
      value: '简介',
    },
    {
      name: 'avatarImgUrl',
      value: '头像',
    },
    {
      name: 'positionalTitle',
      value: '职称',
    },
    {
      name: 'profession',
      value: '行业',
    },
    {
      name: 'company',
      value: '公司',
    },
    {
      name: 'blogSiteUrl',
      value: '博客',
      desc: '查看嘉宾博客地址',
    },
    {
      name: 'githubSiteUrl',
      value: 'github',
      desc: '查看嘉宾github地址',
    },
    {
      name: 'interest',
      value: '爱好',
    }
  ];
  export default {
    props: [
      'author'
    ],
    data() {
      return {
        labelMap,
      };
    },
  }
</script>

<style lang="css">
  .author-detail {
    border: 1px solid #ebeef5;
    color: #6e6d6d;
    line-height: 1.5;
  }
  .author-detail .el-row {
    padding: 14px;
    border-bottom: 1px solid #ebeef5;
  }
  .author-detail .el-row:last-child {
    border-bottom: none;
  }
  .author-detail .author-avatar {
    width: 100px;
    height: 100px;
  }
  .author-detail .url {
    color: #409EFF;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
