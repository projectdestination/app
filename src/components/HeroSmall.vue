<template>
  <section class="hero pd-font uppercase spacing" v-bind:class="[data.outerClass, homeClasses]" v-bind:style="data.outerStyle">
    <div class="hero-body">
      <div class="container" v-bind:class="data.innerClass">
        <img v-if="isHome" src="@/assets/logo_white.png" style="width: 100px;">
        <h1 class="title pd-font" v-bind:class="data.titleClass">
          {{data.title}}
        </h1>
        <h2 class="subtitle pd-font" v-bind:class="data.subTitleClass">
          {{data.subtitle}}
        </h2>
        <span v-if="data.renderButton">
          <a v-on:click="login" v-bind:class="[data.buttonClasses, data.firstButton]" class="button">{{user ? "Enter app" : "Log in"}}</a>
        </span>
        <span v-if="data.renderButton && isHome">
          <a @click="handleClick(`/products`)" v-bind:class="[data.buttonClasses, data.secondButton]" class="button">View our products</a>
        </span>
      </div>
    </div>
    <div v-if="isHome" class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth has-text-white font pd-font pd-font-2 navigation">
      <div class="container">
        <ul v-if="false">
          <li class="nav-button"><a @click="handleClick(`/products`)" class="button-modifier">Products</a></li>
        </ul>
      </div>
    </nav>
  </div>
  <footer v-if="isHome" class="hero-foot has-items-centered has-text-white arrow-down">
    <i class="material-icons is-pulled-left">keyboard_arrow_down</i>
  </footer>
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
  },
  methods: {
    handleClick(route) {
      this.$router.push(route);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.background {
  background: linear-gradient(rgba(#000000, 0.4), rgba(#000000, 0.4)),
    url(../assets/beach.jpg) center !important;
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
  margin: 30px 5px 0 5px;
}

.button:hover {
  transform: scale(1.05);
}

.nav-button {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 10000px !important;
  border-bottom-left-radius: 10000px !important;
  background-color: rgba(#ffffff, 0);
  transition: background-color 0.2s;
}

.arrow-down {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: scale(1.2) translate(-50%, -100%);
}

a:hover {
  background-color: none;
}

.nav-button:hover {
  background-color: rgba(#ffffff, 0.2) !important;
}
</style>
