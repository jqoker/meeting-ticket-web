<template lang="html">
  <div class="batch-author">
    <div class="batch-item" v-for="(author, index) in authors">
      <div class="batch-item-order" v-if="!isUpdateModel">{{index+1}}</div>
      <AddAuthor :author="author"/>
      <BatchItemBottomGroup v-if="!isUpdateModel">
        <el-button-group class="btn-float-right">
          <el-button type="primary" plain icon="el-icon-circle-plus" @click="addAuthor">继续添加</el-button>
          <el-button type="danger" plain icon="el-icon-delete" @click="delAuthor(index)">删除</el-button>
        </el-button-group>
      </BatchItemBottomGroup>
    </div>
    <SubmitButton>
      <el-button type="primary" class="btn-large" :loading="loading" @click="submit">
        {{ isUpdateModel ? '立即更新嘉宾' : '立即创建嘉宾' }}
      </el-button>
    </SubmitButton>
  </div>
</template>

<script>
  import { Loading } from 'element-ui';
  import AddAuthor from '../AddAuthor.vue';
  import BatchItemBottomGroup from '../../common/BatchItemBottomGroup.vue';
  import SubmitButton from '../../common/SubmitButton.vue';
  import { model, modelObject } from '../../../model/author.js';
  import Alert from '../../Alert.js';
  import { ajaxSubmit } from '../../ajax-submit.js';
  import {
    CREATE_AUTHOR_URL,
    UPDATE_AUTHOR_URL,
  } from '../../../api/index.js';

  export default {
    props: [
      'authors',
      'update'
    ],
    data() {
      return {
        loading: false,
        isUpdateModel: (this.update === 'true' ? true : false),
        // authors: [],
      };
    },
    computed: {},
    methods: {
      addAuthor() {
        console.log(modelObject);
        const { authors: list } = this;
        list.push({ ...modelObject });
      },
      delAuthor(index) {
        const { authors: list } = this;
        Alert.confirm({
          title: '嘉宾数据删除后不可恢复，确定删除吗？',
          ok: () => {
            list.splice(index, 1);
          }
        });
      },
      submit() {
        const requestUrl = this.isUpdateModel ? UPDATE_AUTHOR_URL : CREATE_AUTHOR_URL;
        const successFlash = this.isUpdateModel ? '嘉宾更新成功.' : '嘉宾创建成功.';
        const failFlash = this.isUpdateModel ? '嘉宾更新失败.' : '嘉宾创建失败.';
        const postData = this.isUpdateModel ? this.authors[0] : this.authors;
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
              location.reload(); // 刷新页面
            }, 1000);
          } else {
            Alert.message.success('嘉宾创建成功.');
          }
        }).catch((e) => {
          console.error(e);
          this.loading = false;
          Alert.message.error(failFlash);
        });
      }
    },
    components: {
      AddAuthor,
      BatchItemBottomGroup,
      SubmitButton,
    }
  }
</script>

<style lang="css">
</style>
