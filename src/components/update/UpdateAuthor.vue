<template lang="html">
  <div class="update-author">
    <div class="update-item-select">
      <AddBatchAuthor
        :authors="data"
        update="true"
      >
      </AddBatchAuthor>
    </div>
  </div>
</template>

<script>
  import AddBatchAuthor from '../forms/batch/AddBatchAuthor.vue';
  export default {
    props: [
      'author'
    ],
    data() {
      return {
        data: [this.author],
      };
    },
    components: {
      AddBatchAuthor,
    },
  }
</script>
