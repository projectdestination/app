<template>
  <article class="media">
  <div class="media-content">
    <figure class="media-left">
      <p class="image is-90x90">
        <img class="img" src="https://bulma.io/images/placeholders/128x128.png">
      </p>
    </figure>
    <div class="content pd-font">
      <p class="pd-font">
        <strong>Soner Vergon</strong> <br /> <small><span class="uppercase spacing">Art Director</span></small>
        <br>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
      </p>
    </div>
  </div>
</article>
</template>

<script>
export default {
  name: "Profile"
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
