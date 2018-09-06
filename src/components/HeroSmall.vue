<template>
  <section class="hero" v-bind:class="[data.outerClass, homeClasses]" v-bind:style="data.outerStyle">
    <div class="hero-body">
      <div class="container" v-bind:class="data.innerClass">
        <img v-if="isHome" src="@/assets/logo_white.png" style="width: 100px;">
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
    <div v-if="isHome" class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth has-text-white font pd-font pd-font-2 navigation">
      <div class="container">
        <ul>
          <li class="nav-button"><a class="button-modifier">Products</a></li>
          <li class="nav-button"><a class="button-modifier">Modifiers</a></li>
          <li class="nav-button"><a class="button-modifier">Stories</a></li>
        </ul>
      </div>
    </nav>
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
    isHome: Boolean,
    login: Function
  },
  computed: {
    ...mapState({
      user: state => state.user.userIsAuthenticated
    }),
    homeClasses: function() {
      return this.isHome ? `is-fullheight` : `is-bold`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.background {
  background: linear-gradient(rgba(#000000, 0.6), rgba(#000000, 0.6)),
    url(../assets/plane.jpg) center !important;
  background-size: cover !important;
  height: 100vh;
}

.navigation {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
}

.button {
  text-transform: uppercase;
}

a {
  transition: all 0.3s;
}

.button-modifier:hover {
  background-color: rgba(#ffffff, 0) !important;
}

.button {
  margin-top: 30px;
}
.nav-button {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 10000px !important;
  border-bottom-left-radius: 10000px !important;
  background-color: rgba(#ffffff, 0);
  transition: background-color 0.2s;
}

a:hover {
  background-color: none;
}

.nav-button:hover {
  background-color: rgba(#ffffff, 0.2) !important;
}
</style>
