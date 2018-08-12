<template>
  <section class="section">
    <div class="tile is-ancestor">
      <div class="tile is-4 is-vertical is-parent">
        <div class="tile is-child box">
          <p class="title">One</p>
        </div>
        <div class="tile is-child box">
          <p class="title">Two</p>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child box">
          <p class="title">"I just love those big fairs!"</p>
        </div>
      </div>
      </div>
    </section>
</template>


<script>
/*

*/
export default {
  name: "Tiles",
  props: {
    content: Array
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tile {
  box-shadow: none;
  -webkit-box-shadow: none;
  text-align: center;
}
</style>
