<template>
  <article class="media">
  <div class="media-content">
    <figure class="media-left">
      <p class="image is-90x90">
        <img class="img" :src="data.image">
      </p>
    </figure>
    <div class="content pd-font">
      <p class="pd-font">
        <strong><span class="is-5 title">{{data.name}}</span></strong> <br /> <small><span class="uppercase spacing subtitle is-6">{{data.role}}</span></small>
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
    data: Object
  }
};
</script>

<style scoped lang="scss">
.img {
  border-radius: 1000000000px !important;
  overflow: hidden;
}
.media {
  margin: 10% 10% !important;
  border: none !important;
}
</style>
