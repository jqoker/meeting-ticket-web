<template lang="html">
  <div class="update-theme">
    <div class="update-item-select">
      <AddBatchTheme
        :themes="data"
        update="true"
      >
      </AddBatchTheme>
    </div>
  </div>
</template>

<script>
  import AddBatchTheme from '../forms/batch/AddBatchTheme.vue';
  export default {
    props: [
      'themes'
    ],
    data() {
      return {
        data: [this.themes],
      };
    },
    components: {
      AddBatchTheme,
    },
  }
</script>
