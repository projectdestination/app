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
            <b-tooltip v-bind:active="button.disabled" type="is-warning" label="Under development" position="is-bottom">
            <a class="button" v-bind:disabled="button.disabled" v-bind:class="button.class" @click="!button.disabled && handleClick(button.type,button.route)">
              <span>{{button.text}}</span>
              <span class="icon icon-modifier">
                <i class="material-icons">{{button.icon}}</i>
              </span>
            </a>
          </b-tooltip>
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
        const auth = state.user.userIsAuthenticated;
        const isAdmin = state.user.user.user_mode === "admin";
        const createEventText = isAdmin ? "Create event" : "Company profile";
        return [
          auth && {
            text: createEventText,
            icon: "date_range",
            class: "is-success",
            route: "/app/event/request",
            type: "navigate",
            disabled: true
          },
          auth && {
            text: "Company profile",
            icon: "store",
            class: "is-twitter",
            route: "/app/company",
            type: "navigate",
            disabled: true
          },
          {
            text: auth ? "Log out" : "Sign in",
            icon: auth ? "lock" : "lock_open",
            class: auth ? "is-danger" : "is-success",
            route: null,
            type: auth ? "log_out" : "log_in",
            disabled: false
          }
        ];
      }
    })
  },
  methods: {
    navigateTo(route) {
      this.$store.dispatch("loading/startLoading");
      typeof route === Object
        ? this.$router.push(...route)
        : this.$router.push(route);
      setTimeout(() => {
        this.$store.dispatch("loading/stopLoading");
      }, 1000);
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
