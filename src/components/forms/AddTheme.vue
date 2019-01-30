<template lang="html">
  <div class="input-form">
    <el-form size="small" :model="theme" ref="inputForm" label-width="70px">
      <el-form-item label="主题名称" prop="name">
        <el-input type="text" placeholder="(必填)" v-model="theme.title"></el-input>
      </el-form-item>
      <el-form-item label="主题内容" prop="content">
        <el-input
          type="textarea"
          :rows="10"
          placeholder="(必填)"
          v-model="theme.content"
        ></el-input>
      </el-form-item>
      <el-form-item label="选择嘉宾" prop="authorId">
        <el-select
          v-model="theme.authorId"
          filterable
          remote
          reserve-keyword
          placeholder="(必填)"
          :remote-method="ajaxSearchAuthor"
          :loading="loading">
          <el-option
            v-for="author in fetchedAuthor"
            :key="author.id"
            :label="author.name"
            :value="author.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import request from '../../util/request.js';
  import { SUGGEST_AUTHOR_URL } from '../../api/index.js';

  export default {
    props: [
      'theme'
    ],
    data() {
      return {
        fetchedAuthor: [],
        loading: false,
      }
    },
    computed: {},
    methods: {
      async ajaxSearchAuthor(query) {
        if (query !== '') {
          this.loading = true;
          try {
            const { list } = await request({
              url: SUGGEST_AUTHOR_URL,
              method: 'get',
              data: {
                name: query,
              },
            });
            this.fetchedAuthor = list;
            this.loading = false;
          } catch(e) {
            this.fetchedAuthor = [];
          }
        }
      }
    },
    components: {
    }
  }
</script>

<style lang="css">
  .theme-title {
    margin: 5px 0;
  }
  .theme-content {
    height: 157px;
  }
</style>
