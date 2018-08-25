<template>
  <div>
    <router-view/>
    <b-loading :is-full-page="true" :active.sync="shouldShowLoading" :can-cancel="true"></b-loading>
  </div>
</template>

<script>
import Login from "./views/shared/Login.vue";
import { mapState } from "vuex";

export default {
  data: () => {
    return {
      shouldShowLoading: false,
      errorMessage: "",
      isError: false
    };
  },
  components: {
    Login
  },
  methods: {
    errorModal(bool) {
      bool &&
        this.$toast.open({
          duration: 3000,
          message: this.errorMessage,
          position: "is-bottom",
          type: "is-danger"
        });
    },
    closeLoginModal() {
      this.$store.dispatch("login/closeModal");
    },
    loginModal() {
      if (!this.userIsAuthenticated && !this.modal) {
        this.$modal.open({
          parent: this,
          component: Login,
          hasModalCard: true,
          onCancel: () => this.closeLoginModal()
        });
      } else {
        this.$store.dispatch("login/closeModal");
        this.$router.push("/app/main");
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.loading,
      error: state => state.errors.error,
      message: state => state.errors.message,
      modal: state => state.login.modal,
      userIsAuthenticated: state => state.user.userIsAuthenticated
    })
  },
  watch: {
    loading: function() {
      this.shouldShowLoading = this.loading;
    },
    error: function() {
      this.errorMessage = this.message;
      this.errorModal(this.error);
    },
    modal: function() {
      this.loginModal();
    }
  },
  created() {
    this.$store.dispatch("loading/startLoading");
  }
};
</script>

<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #bdbdbd;
$primary-invert: findColorInvert($primary);

$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

$success: #66bb6a;
$success-invert: findColorInvert($success);

$danger: #ef5350;
$danger-invert: findColorInvert($danger);

$warning: #ffee58;
$warning-invert: findColorInvert($warning);

$info: #42a5f5;
$info-invert: findColorInvert($info);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black
  ),
  "black": (
    $black,
    $white
  ),
  "light": (
    $light,
    $light-invert
  ),
  "dark": (
    $dark,
    $dark-invert
  ),
  "primary": (
    $primary,
    $primary-invert
  ),
  "info": (
    $info,
    $info-invert
  ),
  "success": (
    $success,
    $success-invert
  ),
  "warning": (
    $warning,
    $warning-invert
  ),
  "danger": (
    $danger,
    $danger-invert
  ),
  "twitter": (
    $twitter,
    $twitter-invert
  )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

.con-example-sidebar {
  height: 100vh;
}

.primary-color {
  color: $primary;
}
</style>
