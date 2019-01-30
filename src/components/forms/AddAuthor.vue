<template>
  <div class="input-form">
    <el-form size="small" :model="author" label-width="80px">
      <el-form-item label="*嘉宾姓名">
        <el-input type="text" placeholder="(必填)" v-model="author.name"></el-input>
      </el-form-item>
      <el-form-item label="*嘉宾简介"">
        <el-input type="textarea"
          :rows="10"
          placeholder="(必填)"
          v-model="author.summary"
        ></el-input>
      </el-form-item>
      <el-form-item label="嘉宾头像">
        <div class="upload-img">
          <ImageUpload
            :on-img-upload-success="onImgUploadSuccess"
            :on-img-remove="onImgRemove"
          />
        </div>
      </el-form-item>
      <el-form-item label="*从事行业">
        <el-input type="text" placeholder="(必填)" v-model="author.profession"></el-input>
      </el-form-item>
      <el-form-item label="职称">
        <el-input type="text" v-model="author.positionalTitle"></el-input>
      </el-form-item>
      <el-form-item label="*任职公司">
        <el-input type="text" placeholder="(必填)" v-model="author.company"></el-input>
      </el-form-item>
      <el-form-item label="博客地址">
        <el-input type="text" v-model="author.blogSiteUrl"></el-input>
      </el-form-item>
      <el-form-item label="github">
        <el-input type="text" v-model="author.githubSiteUrl"></el-input>
      </el-form-item>
      <el-form-item label="兴趣爱好">
        <el-input type="text" v-model="author.interest"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input type="text" v-model="author.telephone"></el-input>
      </el-form-item>
      <el-form-item label="*邮箱">
        <el-input type="text" placeholder="请输入正确格式邮箱(必填)" v-model="author.email"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import config from '../../config.js';
  import ImageUpload from '../common/ImageUpload.vue';

  export default {
    props: [
      'author',
    ],
    data() {
      return {};
    },
    methods: {
      onImgUploadSuccess(res, file, fileList) {
        const {
          cdn: {
            imgUploadHost,
          }
        } = config;
        this.author.avatarImgUrl = `${imgUploadHost}/${res.key}`;
      },
      onImgRemove(file, fileList) {
        this.author.avatarImgUrl = '';
      }
    },
    components: {
      ImageUpload,
    }
  }
</script>


<style>

</style>
