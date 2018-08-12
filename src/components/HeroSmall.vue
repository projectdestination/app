<template>
  <section class="hero is-bold" v-bind:class="data.outerClass" v-bind:style="data.outerStyle">
    <div class="hero-body">
      <div class="container" v-bind:class="data.innerClass">
        <h1 class="title" v-bind:class="data.titleClass">
          {{data.title}}
        </h1>
        <h2 class="subtitle" v-bind:class="data.subTitleClass">
          {{data.subtitle}}
        </h2>
        <span v-if="data.renderButton">
          <a v-bind:href="data.link" v-bind:class="data.buttonClasses" class="button">{{data.buttonText}}</a>
        </span>
      </div>
    </div>
  </section>
</template>


<script>
export default {
  name: "Hero",
  props: {
    data: Object,
    renderButton: Boolean
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  transition: all 0.3s;
}
</style>
