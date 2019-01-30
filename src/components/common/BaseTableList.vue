<template lang="html">
  <el-table
    :data="data"
    border
    style="width: 100%"
    size="small"
    stripe
    >
    <el-table-column
      v-for="(column, index) in config.columns"
      :prop="column.id"
      :label="column.label"
      :width="column.width"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      align="center"
      width="100"
      >
      <template slot-scope="scope">
        <el-tag size="medium" type="success">
          {{ scope.row.status }}正常
        </el-tag>
      </template>
    </el-table-column>
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
</template>

<script>
  export default {
    props: [
      'data',
      'config'
    ],
    data() {
      return {};
    },
    mounted() {
      console.log(this.config);
    }
  }
</script>

<style lang="css">
</style>
