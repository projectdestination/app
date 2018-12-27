<template>
  <article class="media">
  <div class="media-content">
    <figure class="media-left">
      <p class="image is-90x90">
        <slot name="image"></slot>
      </p>
    </figure>
    <div class="content pd-font">
      <p class="pd-font">
        <strong><span class="is-5 title">{{data.name}}</span></strong> <br />
        <small><span v-html="data.role" class="uppercase spacing subtitle is-6"></span></small>
        <br>
        {{data.text}}
      </p>
    </div>
  </div>
</article>
</template>

<script>
export default {
  name: "Profile",
  props: {
    data: Object,
    imgLink: String
  }
};
</script>

<style scoped lang="scss">
.media {
  margin: 10% 10% !important;
  border: none !important;
}
</style>
