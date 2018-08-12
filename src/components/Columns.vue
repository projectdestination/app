<template>
  <section class="section container" v-bind:style="data.outerStyle">
    <div class="columns">
      <div v-bind:key="item.text" v-for="item in data.data" class="column" v-bind:class="item.class" v-bind:style="item.style">
          {{item.text}}
        </div>
      </div>
    </section>
</template>


<script>
/*

*/
export default {
  name: "Columns",
  props: {
    data: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
