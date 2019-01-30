<template lang="html">
  <div class="batch-author">
    <div class="batch-item" v-for="(meet, index) in list">
      <AddMeet :meet="meet"></AddMeet>
    </div>
    <SubmitButton>
      <el-button type="primary" class="btn-large" @click="submit">
        {{ isUpdateModel ? '更新会议并回到列表' : '创建会议并回到列表' }}
      </el-button>
    </SubmitButton>
  </div>
</template>

<script>
  import { Loading } from 'element-ui';
  import AddMeet from '../AddMeet.vue';
  import SubmitButton from '../../common/SubmitButton.vue';
  import { model, modelObject } from '../../../model/meet.js';
  import Alert from '../../Alert.js';
  import { ajaxSubmit } from '../../ajax-submit.js';
  import {
    CREATE_MEET_URL,
    UPDATE_MEET_URL,
  } from '../../../api/index.js';

  ///
  /// tab为第几步
  /// operateModel 模式（添加|更新）
  /// meet 会议模型

  export default {
    props: [
      'meet',
      'update'
    ],
    data() {
      const { meet, update } = this;
      const isUpdateModel = (update === 'true');
      const updateMeet = meet[0] || {}; // Object.assign({}, (meet[0] || {}));
      /// 更新情形
      /// 重新拷贝一份数据，避免污染全局数据
      if (isUpdateModel) {
        let ids = [];
        // 时间转换为数组
        updateMeet['time'] = (updateMeet['time'] || []).split('~');
        updateMeet['themes'].forEach((theme, i) => {
          ids.push(theme.id);
        });
        updateMeet['ids'] = ids;  /// 已选择主题
        updateMeet['publish'] = !!updateMeet['publish'];
      }
      return {
        list: meet, // isUpdateModel ? [updateMeet] : meet,
      };
    },
    computed: {
      isUpdateModel() {
        return this.update === 'true';
      },
    },
    methods: {
      submit() {
        const {
          list,
          isUpdateModel,
        } = this;
        const requestURL = isUpdateModel ? UPDATE_MEET_URL : CREATE_MEET_URL;
        const successFlash = `会议${!isUpdateModel ? '创建' : '更新'}成功`;
        const failFlash = `会议${!isUpdateModel ? '创建' : '更新'}失败`;
        const currMeet = list[0] || {};
        /// 拷贝数据
        const data = Object.assign({}, currMeet, {
          publish: currMeet.publish ? 1 : 0,
          time: (currMeet.time || []).join('~'),
        });
        // 重新计算有效主题id
        // 发送数据格式
        // ids: [{
        //   id: ..., 主题id
        //   meetId: ..., 主题对应的会议id
        // }]
        const currMeetId = data.id || 0;
        const currMeetThemeIds = (data.themes || []).map(theme => theme.id);
        const selectIds = (data.ids || []);
        const combineIds = [...currMeetThemeIds, ...selectIds].filter((id, i, self) => {
          return self.indexOf(id) === i;
        });
        const createIds = selectIds.map((id, i) => {
          return { id, meetId: currMeetId };
        });
        let updateIds = [];
        /// 更新模式需要重新赋值ids
        if (isUpdateModel) {
          combineIds.forEach((id, i) => {
            let meetId = 0;
            if (selectIds.indexOf(id) !== -1) {
              meetId = currMeetId;
            }
            updateIds.push({ id, meetId });
          });
        }
        /// 添加|更新
        const postIds = isUpdateModel ? updateIds : createIds;
        /// 删除themes，减少数据量
        delete data['themes'];
        const ajax = ajaxSubmit({
          url: requestURL,
          data: {
            ...data,
            ids: postIds,
          },
          model,
        });
        if (!ajax) return;  /// 不符合要求，直接退出
        /// ajax请求
        ajax.then(() => {
          /// ajax请求
          let loadingInstance = Loading.service({ text: `${successFlash}.即将跳转至会议列表...`, });
          /// 延迟1s跳转
          setTimeout(() => {
            loadingInstance.close();
            /// 更新模式
            if (isUpdateModel) {
              location.reload();
              return;
            }
            Alert.message.success('会议创建成功.');
            this.$router.replace({
              path: '/hailoooo/e/meet/list',
            });
            location.reload();
          }, 1000);
        }).catch((e) => {
          Alert.message.error(failFlash);
          console.error(e);
        });
      }
    },
    components: {
      AddMeet,
      SubmitButton,
    },
  }
</script>

<style lang="css">
</style>
