<template lang="html">
  <div class="theme-table-list">
    <el-table
      :data="themes"
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
        prop="content"
        label="主题内容"
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
          <!-- <el-button
            size="mini"
            type="info"
            plain
            @click="detail(scope.row)"
          >
            查看详情
          </el-button> -->
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
      class="pagination"
      >
    </el-pagination>

    <!-- 更新 -->
    <el-dialog title="主题更新" :visible.sync="theme.updateModel" top="2vh">
      <UpdateTheme
        :themes="theme.data"
        v-if="theme.updateModel"
      >
      </UpdateTheme>
    </el-dialog>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';
  import { isArray } from '../../util/index.js';
  import Alert from '../Alert.js';
  import constants from '../../store/constants.js';
  const {
    mapState,
    mapActions,
  } = createNamespacedHelpers(constants.MODULE_NAME.THEME);
  import UpdateTheme from '../update/UpdateTheme.vue';

  export default {
    data() {
      return {
        theme: {
          updateModel: false,
          data: {},
        },
      };
    },
    computed: {
      ...mapState({
        themes: (state) => {
          const {
            query: {
              list,
            },
          } = state;
          return list;
        },
      })
    },
    methods: {
      ...mapActions([
        'queryAll',
        'deleteThemeById'
      ]),
      del(row) {
        Alert.confirm({
          title: '删除后，不可恢复。确定删除吗？',
          ok: () => {
            const { id = 0 } = row || {};
            this.deleteThemeById(id);
          },
        });
      },
      update(row) {
        this.theme = {
          updateModel: true,
          data: Object.assign({}, row),
        };
      }
    },
    created() {
      this.queryAll();
    },
    components: {
      UpdateTheme,
    },
  }
</script>

<style lang="css">
  .theme-top {
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
</style>
