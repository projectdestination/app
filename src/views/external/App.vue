<template>
<div>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" @click="navigateTo(`/`)" >
      <img v-bind:src="iconURL" height="100">
    </a>
  </div>
  <div class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" @click="navigateTo(`/app/main`)">
        Home
      </a>
      </div>
      <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p v-bind:key="button.text" v-if="button.text" v-for="button in buttons" class="control">
            <a class="button" v-bind:class="button.class" @click="handleClick(button.type,button.route)">
              <span>{{button.text}}</span>
              <span class="icon icon-modifier">
                <i class="material-icons">{{button.icon}}</i>
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
    </div>
</nav>
<router-view></router-view>
<footer class="footer">
  <div class="content has-text-centered">
    <p>
      <strong>Project Destination</strong> by <a href="http://vergon.se">Vergon Design</a>.
    </p>
  </div>
</footer>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => {
    return {};
  },
  name: "App",
  computed: {
    ...mapState({
      user: state => state.user,
      iconURL: state => {
        return state.content.PDIconUrl;
      },
      buttons: state => {
        const user = state.user.userIsAuthenticated;
        return [
          user && {
            text: "Request event",
            icon: "store",
            class: "is-success",
            route: "/app/event/request",
            type: "navigate"
          },
          user && {
            text: "Company profile",
            icon: "store",
            class: "is-twitter",
            route: "/app/company",
            type: "navigate"
          },
          {
            text: user ? "Log out" : "Sign in",
            icon: user ? "lock" : "lock_open",
            class: user ? "is-danger" : "is-success",
            route: null,
            type: user ? "log_out" : "log_in"
          }
        ];
      }
    })
  },
  methods: {
    navigateTo(route) {
      typeof route === Object
        ? this.$router.push(...route)
        : this.$router.push(route);
    },
    signUserOut() {
      this.$store.dispatch("loading/startLoading");
      setTimeout(() => {
        this.$store.dispatch("user/signUserOut");
      }, 1000);
    },
    handleClick(type, route) {
      switch (type) {
        case "navigate":
          this.navigateTo(route);
          break;
        case "log_out":
          this.signUserOut();
          break;
        case "log_in":
          this.$store.dispatch("login/openModal");
      }
    }
  }
};
</script>
<style scoped>
.icon-modifier {
  transform: scale(0.7) !important;
}
</style>
