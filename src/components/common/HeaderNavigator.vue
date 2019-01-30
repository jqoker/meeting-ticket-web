<template lang="html">
  <el-row class="navigator-header">
    <el-col :span="24">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
}
</script>

<style lang="css">
  .navigator-header {
    /* margin: 40px 0 20px 0; */
    text-align: center;
  }
</style>
