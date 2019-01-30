<template lang="html">
  <div class="image-upload">
    <el-upload
      class="upload"
      action="http://upload.qiniup.com/"
      multiple
      drag
      :on-success="onSuccess"
      :on-exceed="onExceed"
      :on-error="onError"
      :on-remove="onRemove"
      :before-upload="beforeUpload"
      :limit="1"
      :data="uploadData"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text" v-html="uploadTipMsg"></div>
      <!-- <div slot="tip" class="el-upload__tip"></div> -->
    </el-upload>
  </div>
</template>

<script>
  import { genUploadUrl, } from '../../util/index.js';
  import request from '../../util/request.js';
  import Alert from '../Alert.js';

  // 图片要求
  const allowImgFormat = {
    types: ['image/jpeg', 'image/gif', 'image/png', 'image/jpg'],
    size: 1024 * 1024,  // 1M
  };

  export default {
    props: [
      'onImgUploadSuccess',
      'onImgRemove',
      'tip'
    ],
    computed: {
      uploadTipMsg() {
        return this.tip || '拖拽图片<em>或点击上传</em>';
      },
    },
    data() {
      return {
        imageUrl: '',
        uploadData: {
          key: '',
          token: ''
        },
      };
    },
    methods: {
      onExceed(files, fileList) {
        Alert.message.warning('已超出最大上传图片数量限制,请移除当前图片后再次上传.');
      },
      onSuccess(res, file, fileList) {
        const { onImgUploadSuccess } = this;
        onImgUploadSuccess && onImgUploadSuccess(res, file, fileList);
        Alert.message.success('图片上传成功.');
      },
      onError(err, file, fileList) {
        Alert.message.error('图片上传出错了.');
      },
      onRemove(file, fileList) {
        const { onImgRemove } = this;
        Alert.confirm({
          title: '确定删除该图片吗？',
          ok: () => {
            try {
              onImgRemove && onImgRemove(file, fileList);
              Alert.message.success('图片删除成功.');
            } catch (e) {
              Alert.message.success('图片删除失败.');
              console.error(e);
            }
          },
        });
      },
      check(file) {
        const { type: imgType, size: imgSize, } = file;
        const { types: allowImgTypes, size: allowMaxSize, } = allowImgFormat;
        if (!~allowImgTypes.indexOf(imgType)) {
          Alert.message.warning(`图片格式错误.只允许上传${allowImgType.join('、')}中的格式图片`);
          return false;
        }
        if (imgSize > allowMaxSize) {
          Alert.message.warning('图片大小不能超过1M,请优化图片后再次上传.');
          return false;
        }
        return true;
      },
      beforeUpload(file) {
        const key = genUploadUrl(file); // 生成图片URL
        const { check } = this;
        if (!check(file)) {
          return false;
        }
        return request({
          url: 'qiniu/upload/token',
        }).then((data) => {
          const { token } = data;
          this.uploadData = { key, token, };
        }).catch(e => {
          Alert.message.error('上传令牌获取失败,请重试.')
        });
      }
    }
  }
</script>

<style lang="css">
</style>
