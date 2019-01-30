<template lang="html">
  <!-- 列表 -->
  <div class="meet-table-list">
    <el-table
      :data="meets"
      border
      style="width: 100%"
      size="small"
      stripe
      >
      <el-table-column
        prop="id"
        label="编号"
        width="100"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="title"
        label="主题"
        width="180"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="ticketPrice"
        label="票价"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="sponsor"
        label="主办方"
        align="center"
        >
      </el-table-column>
      <!-- <el-table-column
         -   prop="id"
         -   label="状态"
         -   align="center"
         -   width="100"
         -   >
         -   <template slot-scope="scope">
         -     <el-tag size="medium" type="success">
         -       {{ scope.row.state }}正常
         -     </el-tag>
         -   </template>
         - </el-table-column> -->
      <el-table-column
        label="相关操作"
        width="280"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            plain
            @click="detail(scope.row)"
          >
            查看详情
          </el-button>
          <el-button
            size="mini"
            type="primary"
            plain
            @click="update(scope.row)"
          >
            更新
          </el-button>
          <el-button
            size="mini"
            type="danger"
            plain
            @click="del(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="20"
      :total="1000"
      @current-change="onCurrentPageChange"
      @prev-click="onTapPrevBtn"
      @next-click="onTapNextBtn"
      class="pagination"
      >
    </el-pagination>

    <!-- 详情 -->
    <el-dialog title="会议详情" :visible.sync="meet.detailModel" top="2vh">
      <MeetDetail
        :meet="meet.data"
        v-if="meet.detailModel"
      >
      </MeetDetail>
    </el-dialog>

    <!-- 更新 -->
    <el-dialog title="会议更新" :visible.sync="meet.updateModel" top="2vh">
      <UpdateMeet
        :meet="meet.data"
        v-if="meet.updateModel"
      >
      </UpdateMeet>
    </el-dialog>

  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  import { isArray } from '../../util/index.js';
  import Alert from '../Alert.js';
  import constants from '../../store/constants.js';
  import MeetDetail from '../detail/MeetDetail.vue';
  import UpdateMeet from '../update/UpdateMeet.vue';
  const {
    mapState,
    mapActions,
    mapMutations,
  } = createNamespacedHelpers(constants.MODULE_NAME.MEET);
  import { model, modelObject } from '../../model/meet.js';
  import {
    UPDATE_MEET_RENDER_DATA,
    UPDATE_MODEL,
    DETAIL_MODEL,
  } from '../../store/modules/meet/list-action.js';

  export default {
    data() {
      return {
        meet: {
          detailModel: false,
          updateModel: false,
          data: {},
        },
      };
    },
    computed: {
      ...mapState({
        meets: (state) => {
          const {
            query: {
              list,
            },
          } = state;
          return list;
        },
        updateModel: (state) => state.updateModel,
        detailModel: (state) => state.detailModel,
      })
    },
    methods: {
      // ...mapMutations({
      //   updateMeetRenderData: UPDATE_MEET_RENDER_DATA,
      //   detailMeet: DETAIL_MODEL,
      //   updateMeet: UPDATE_MODEL,
      // }),
      ...mapActions([
        'queryAll',
        'deleteMeetById'
      ]),
      // 删除
      del(row) {
        Alert.confirm({
          title: '删除后，不可恢复。确定删除吗？',
          ok: () => {
            const { id = 0 } = row || {};
            this.deleteMeetById(id);
          }
        });
      },
      // 详情
      detail(row) {
        // this.detailMeet();
        this.meet = {
          detailModel: true,
          data: Object.assign({}, row),
        };
      },
      // 更新
      update(row) {
        // this.updateMeet();
        this.meet = {
          updateModel: true,
          data: Object.assign({}, row),
        };
        // this.updateMeetRenderData({ id: row.id });
      },
      onCurrentPageChange(page) {
        console.log('change', page);
      },
      onTapPrevBtn(page) {
        console.log('prev', page);
      },
      onTapNextBtn(page) {
        console.log('next', page);
      },
    },
    created() {
      this.queryAll();
    },
    components: {
      MeetDetail,
      UpdateMeet,
    }
  }
</script>

<style lang="css">
  .meet-top {
    display: inline-block;
    margin: 10px 0;
  }
  .radio-group {
    text-align: center;
  }
  .pagination {
    margin: 20px 0;
    text-align: center;
  }
  /* .cell {
    position: relative;
    height: 46px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .cell::after {
    position: absolute;
    right: 3%;
    bottom: 0;
    content: '...';
  } */
</style>
