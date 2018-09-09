<template>
  <b-modal :onCancel="closeModal" :active="isActive" :width="640" scroll="keep">
    <div class="card">
      <div class="card-image">
        <figure class="image">
          <img :src="data.image" alt="Image">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title pd-font uppercase spacing is-4">{{data.question}}</p>
            <p class="subtitle is-6">@projectdestination</p>
          </div>
        </div>

        <div class="content has-text-left">
          {{data.answer}}
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: "ProductModal",
  props: {
    data: Object,
    isActive: Boolean,
    closeModal: Function
  }
};
</script>

<style lang="css">
</style>
