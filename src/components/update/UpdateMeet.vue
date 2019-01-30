<template lang="html">
  <div class="update-meet">
    <div class="update-item-select">
      <AddBatchMeet
        :meet="data"
        update="true"
      >
      </AddBatchMeet>
    </div>
  </div>
</template>

<script>
  import AddBatchMeet from '../forms/batch/AddBatchMeet.vue';
  export default {
    props: [
      'meet'
    ],
    data() {
      return {
        data: [this.meet],
      };
    },
    components: {
      AddBatchMeet,
    },
  }
</script>

<style lang="css">
</style>
