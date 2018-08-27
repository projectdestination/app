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
          <a v-on:click="login" v-bind:class="data.buttonClasses" class="button">{{user ? "Enter app" : "Log in"}}</a>
        </span>
      </div>
    </div>
  </section>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "Hero",
  props: {
    data: Object,
    renderButton: Boolean,
    login: Function
  },
  computed: {
    ...mapState({
      user: state => state.user.userIsAuthenticated
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  transition: all 0.3s;
}
.button {
  margin-top: 30px;
}
</style>
