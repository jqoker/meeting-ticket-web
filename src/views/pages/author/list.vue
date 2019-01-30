<template>
  <div class="author-list-container">
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
        prop="summary"
        label="简介"
        align="center"
        width="200"
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
      <el-table-column
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
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        align="center"
        >
        <template slot-scope="scope">
          <el-tag size="medium" type="success">
            {{ scope.row.state }}正常
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="相关操作"
        width="220"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            @click="off(scope.row)"
          >
            拉黑
          </el-button>
          <el-button
            size="mini"
            type="success"
            @click="put(scope.row)"
          >
            漂白
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
  </div>
</template>

<script type="text/javascript">
  import { createNamespacedHelpers } from 'vuex';
  import { isArray } from '../../../util/index.js';
  import Alert from '../../../components/Alert.js';
  import constants from '../../../store/constants.js';
  const {
    mapState,
    mapActions,
  } = createNamespacedHelpers(constants.MODULE_NAME.AUTHOR);

  export default {
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
      ]),
      off(row) {
        console.log('offAuthor', row);
      },
      put(row) {
        console.log('putAuthor', row);
      },
      del(row) {
        Alert.confirm({
          title: '删除后，不可恢复。确定删除吗？',
          ok: () => {
            const { id = 0 } = row || {};
            // TODO: delete author
          }
        });
      }
    },
    created() {
      this.queryAll();
    }
  }
</script>

<style>
  .author-top {
    display: inline-block;
    margin: 10px 0;
  }
  .avatar-img {
    width: 80px;
    height: 80px;
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
