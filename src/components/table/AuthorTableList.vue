<template>
  <div class="author-table-list">
    <el-table
      :data="authors"
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
        prop="name"
        label="姓名"
        width="100"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="avatarImgUrl"
        label="头像"
        align="center"
        width="100"
        >
        <template slot-scope="scope">
          <img alt="" :src="scope.row.avatarImgUrl" class="avatar-img"/>
        </template>
      </el-table-column>
      <el-table-column
        prop="positionalTitle"
        label="职称"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="summary"
        label="简介"
        align="center"
        width="400"
        >
      </el-table-column>
      <el-table-column
        prop="profession"
        label="从事行业"
        align="center"
        >
      </el-table-column>
      <el-table-column
        prop="company"
        label="任职公司"
        align="center"
        >
      </el-table-column>
      <!-- <el-table-column
        prop="blogSiteUrl"
        label="博客地址"
        align="center"
        >
        <template slot-scope="scope">
          <a :href="scope.row.blogSiteUrl" target="_blank" class="site-url">
            {{scope.row.blogSiteUrl}}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        prop="githubSiteUrl"
        label="github"
        align="center"
        >
        <template slot-scope="scope">
          <a :href="scope.row.githubSiteUrl" target="_blank" class="site-url">
            {{scope.row.githubSiteUrl}}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        prop="interest"
        label="兴趣爱好"
        align="center"
        >
      </el-table-column> -->
      <!-- <el-table-column
         -   prop="status"
         -   label="状态"
         -   align="center"
         -   width="100"
         -   >
         -   <template slot-scope="scope">
         -     <el-tag size="medium" type="success">
         -       {{ scope.row.status }}正常
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

    <!-- 详情 -->
    <el-dialog title="嘉宾详情" :visible.sync="author.detailModel" top="2vh">
      <AuthorDetail
        :author="author.data"
        v-if="author.detailModel"
      >
      </AuthorDetail>
    </el-dialog>

    <!-- 更新 -->
    <el-dialog title="更新嘉宾" :visible.sync="author.updateModel" top="2vh">
      <UpdateAuthor
        :author="author.data"
        v-if="author.updateModel"
      >
      </UpdateAuthor>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  import { createNamespacedHelpers } from 'vuex';
  import { isArray } from '../../util/index.js';
  import Alert from '../Alert.js';
  import constants from '../../store/constants.js';
  import AuthorDetail from '../detail/AuthorDetail.vue';
  import UpdateAuthor from '../update/UpdateAuthor.vue';
  const {
    mapState,
    mapActions,
  } = createNamespacedHelpers(constants.MODULE_NAME.AUTHOR);

  export default {
    data() {
      return {
        author: {
          show: false,
          data: {},
        },
      };
    },
    computed: {
      ...mapState({
        authors: (state) => {
          const {
            query: {
              list,
            },
          } = state;
          return list;
        },
      }),
    },
    methods: {
      ...mapActions([
        'queryAll',
        'delAuthorById'
      ]),
      del(row) {
        Alert.confirm({
          title: '删除后，不可恢复。确定删除吗？',
          ok: () => {
            const { id = 0 } = row || {};
            this.delAuthorById(id);
          }
        });
      },
      detail(row) {
        this.author = {
          detailModel: true,
          data: row,
        };
      },
      update(row) {
        this.author = {
          updateModel: true,
          data: Object.assign({}, row),
        };
      },
    },
    created() {
      this.queryAll();
    },
    components: {
      AuthorDetail,
      UpdateAuthor,
    },
  }
</script>

<style>
  .author-top {
    display: inline-block;
    margin: 10px 0;
  }
  .avatar-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .site-url {
    color: #999;
    text-decoration: underline;
    cursor: pointer;
  }
  .pagination {
    margin: 20px 0;
    text-align: center;
  }
</style>
