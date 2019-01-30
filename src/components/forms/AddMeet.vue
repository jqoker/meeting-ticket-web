<template>
  <div class="input-form">
    <el-form size="small" :model="meet" label-width="70px">
      <el-form-item label="会议标题" prop="title">
        <el-input type="text" placeholder="(必填)" v-model="meet.title"></el-input>
      </el-form-item>
      <el-form-item label="主题图片" prop="imgUrl">
        <div class="upload-img">
          <ImageUpload
            :on-img-upload-success="onImgUploadSuccess"
            :on-img-remove="onImgRemove"
          />
        </div>
      </el-form-item>
      <el-form-item label="会议时间" prop="time">
        <el-date-picker
          v-model="meet.time"
          type="datetimerange"
          start-placeholder="开始"
          end-placeholder="截止"
          value-format="yyyy-MM-dd HH:mm"
          >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="举办地址" prop="addr">
        <el-input type="text" placeholder="(必填)" v-model="meet.addr"></el-input>
      </el-form-item>
      <el-form-item label="会议门票" prop="ticketPrice">
        <el-input type="text" placeholder="(必填)" v-model="meet.ticketPrice"></el-input>
      </el-form-item>
      <el-form-item label="会议简介" prop="summary">
        <el-input type="textarea" :rows="10" placeholder="(必填)" v-model="meet.summary"></el-input>
      </el-form-item>
      <el-form-item label="会议主题" prop="themes">
        <el-select
          v-model="meet.ids"
          multiple
          placeholder="请选择主题(可多选)"
        >
          <el-option
            v-for="theme in themePool"
            :key="theme.id"
            :label="theme.title"
            :value="theme.id">
          </el-option>
        </el-select>
        <el-button icon="el-icon-refresh" :loading="loading" @click="refresh">刷新</el-button>
      </el-form-item>
      <el-form-item label="主办方" prop="sponsor">
        <el-input type="text" placeholder="(必填)" v-model="meet.sponsor"></el-input>
      </el-form-item>
      <el-form-item label="协办方" prop="coSponsor">
        <el-input type="text" placeholder="(必填)" v-model="meet.coSponsor"></el-input>
      </el-form-item>
      <el-form-item label="是否上线" prop="publish">
        <el-switch v-model="meet.publish"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import config from '../../config.js';
  import request from '../../util/request.js';
  import ImageUpload from '../common/ImageUpload.vue';
  import {
    FETCH_AVAILABLE_THEME_LIST_URL,
  } from '../../api/index.js';
  import Alert from '../../components/Alert.js';

  export default {
    props: [
      'meet',
    ],
    data() {
      return {
        loading: false,
        themePool: [],
      };
    },
    methods: {
      onImgUploadSuccess(res, file, fileList) {
        this.meet.imgUrl = `${config.cdn.imgUploadHost}/${res.key}`;
      },
      onImgRemove(file, fileList) {
        this.meet.imgUrl = '';
      },
      async refresh(reload) {
        this.loading = reload;
        try {
          const { meet } = this;
          const { themes: selectedThemes = [] } = meet || {};
          const { themes } = await request({
                    url: FETCH_AVAILABLE_THEME_LIST_URL,
                    method: 'GET',
                  });
          this.loading = false;
          this.themePool = [...selectedThemes, ...themes];
          reload && Alert.message.success('刷新成功.');
        } catch(e) {
          this.loading = false;
          console.error(e);
          reload && Alert.message.fail('刷新失败,请重试.');
        }
      },
    },
    created() {
      this.refresh(false);
    },
    components: {
      ImageUpload,
    },
  }
</script>
