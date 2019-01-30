<template lang="html">
  <div class="batch-theme">
    <div class="batch-item" v-for="(theme, index) in list">
      <div class="batch-item-order" v-if="!isUpdateModel">{{index+1}}</div>
      <AddTheme :theme="theme"/>
      <BatchItemBottomGroup v-if="!isUpdateModel">
        <el-button-group class="btn-float-right">
          <el-button type="primary" plain icon="el-icon-circle-plus" @click="addTheme">继续添加</el-button>
          <el-button type="danger" plain icon="el-icon-delete" @click="delTheme(index)">删除</el-button>
        </el-button-group>
      </BatchItemBottomGroup>
    </div>
    <SubmitButton>
      <el-button v-if="isShowSubmitButton" type="primary" class="btn-large" :loading="loading" @click="submit()">
        {{ isUpdateModel ? '立即更新该主题' : '立即创建主题' }}
      </el-button>
    </SubmitButton>
  </div>
</template>

<script>
  import { Loading } from 'element-ui';
  import AddTheme from '../AddTheme.vue';
  import BatchItemBottomGroup from '../../common/BatchItemBottomGroup.vue';
  import SubmitButton from '../../common/SubmitButton.vue';
  import { model, modelObject } from '../../../model/theme.js';
  import Alert from '../../Alert.js';
  import { ajaxSubmit } from '../../ajax-submit.js';
  import {
    CREATE_THEME_URL,
    UPDATE_THEME_URL
  } from '../../../api/index.js';

  export default {
    props: [
      'update',
      'themes'
    ],
    data() {
      const isUpdateModel = (this.update === 'true' ? true : false);
      const { themes } = this;
      const updateTheme = themes[0] || {};
      if (isUpdateModel) {
        updateTheme.authorId = (updateTheme.author || {}).name;
      }
      return {
        loading: false,
        list: this.themes,
        isUpdateModel,
      };
    },
    computed: {
      isShowSubmitButton() {
        return this.list.length !== 0;
      },
    },
    methods: {
      addTheme() {
        this.list.push({ ...modelObject });
      },
      delTheme(index) {
        Alert.confirm({
          title: '主题数据删除后不可恢复，确定删除吗？',
          ok: () => {
            this.list.splice(index, 1);
          }
        });
      },
      submit() {
        const requestUrl = this.isUpdateModel ? UPDATE_THEME_URL : CREATE_THEME_URL;
        const successFlash = this.isUpdateModel ? '主题更新成功.' : '主题创建成功.';
        const failFlash = this.isUpdateModel ? '主题更新失败.' : '主题创建失败.';
        const postData = this.isUpdateModel ? this.list[0] : this.list;
        /// 更新模式下，authorId未发生变化
        /// 这里为了保证select元素正常显示，先将authorId赋值为authorName
        /// 提交数据时再将authorId转换回来
        if (this.isUpdateModel) {
          const originAuthorName = (postData.author || {}).name;
          const originAuthorId = (postData.author || {}).id;
          const currentAuthorId = postData.authorId;
          if (originAuthorName === currentAuthorId) {
            postData.authorId = originAuthorId;
          }
        }
        // 删除author数据，减少数据量
        try {
          delete postData.author;
        } catch(e) {}
        const ajax = ajaxSubmit({
                  url: requestUrl,
                  data: postData,
                  model,
                });
        if (!ajax) return;
        this.loading = true;
        ajax.then(() => {
          this.loading = false;
          if (this.isUpdateModel) {
            /// ajax请求
            let loadingInstance = Loading.service({ text: `${successFlash}.即将跳转至会议列表...`, });
            setTimeout(() => {
              loadingInstance.close();
              location.reload();  // 刷新页面
            }, 1000);
          } else {
            Alert.message.success('主题创建成功.');
          }
        }).catch((e) => {
          console.error(e);
          this.loading = false;
          Alert.message.error(failFlash);
        });
      }
    },
    components: {
      AddTheme,
      BatchItemBottomGroup,
      SubmitButton,
    }
  }
</script>

<style lang="css">
</style>
