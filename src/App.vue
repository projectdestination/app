<template>
  <div>
    <router-view/>
    <b-loading :is-full-page="true" :active.sync="shouldShowLoading" :can-cancel="false"></b-loading>
    <footer v-if="!shouldShowLoading" class="footer">
    <div class="content section has-text-centered">
      <span>
        <h4 class="title pd-font uppercase spacing">Project Destination &copy;</h4>
        <small>
           by Soner Vergon. <br /> <a class="link" target="_blank" href="http://vergon.se">@Vergon Design</a>
        </small>
      </span>
    </div>
  </footer>
  </div>
</template>

<script>
import Login from "./views/shared/Login.vue";
import { initializeContent, initializeUser } from "@/init";
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
      const type = () => {
        switch (this.modalType) {
          case "warning":
            return "is-warning";
          case "error":
            return "is-danger";
          case "success":
            return "is-success";
          default:
            return "is-danger";
        }
      };
      bool &&
        this.$toast.open({
          duration: 3000,
          message: this.errorMessage,
          position: "is-bottom",
          type: type()
        });
    },
    closeLoginModal() {
      this.$store.dispatch("login/closeModal");
    },
    loginModal() {
      const isAdminOrSuper =
        this.userType === "super" || this.userType === "admin";
      if (!this.userIsAuthenticated && !this.modal) {
        this.$modal.open({
          parent: this,
          component: Login,
          hasModalCard: true,
          onCancel: () => this.closeLoginModal()
        });
      } else {
        this.$store.dispatch("login/closeModal");
        isAdminOrSuper
          ? this.$router.push("/app/admin")
          : this.$router.push("/app/main");
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.loading.loading,
      error: state => state.errors.error,
      message: state => state.errors.message,
      modalType: state => state.errors.type,
      modal: state => state.login.modal,
      userIsAuthenticated: state => state.user.userIsAuthenticated,
      userType: state => state.user.user.user_type
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
    initializeContent();
  },
  beforeCreate() {
    initializeUser();
  }
};
</script>

<style lang="scss">
.animation-content {
  max-width: none !important;
}
.pd-font {
  font-weight: 300 !important;
}

.spacing {
  letter-spacing: 4px;
}

.uppercase {
  text-transform: uppercase !important;
}

.pd-font-2 {
  letter-spacing: 1px !important;
  font-weight: 100 !important;
}

body {
  font-weight: 300 !important;
  font-family: Roboto !important;
}
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #182c61;
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

$home: #ffd96a;
$home-invert: findColorInvert($home);

$pd-pink: #ef9bc1;
$pd-pink-invert: findColorInvert($pd-pink);

$pd-green: #d2eadf;
$pd-green-invert: findColorInvert($pd-green);

$pd-light: #fff2e7;
$pd-light-invert: findColorInvert($pd-light);

$pd-blue: #96f2ff;
$pd-blue-invert: findColorInvert($pd-blue);

$orange: #f4ad42;
$orange-invert: findColorInvert($orange);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "orange": (
    $orange,
    $orange-invert
  ),
  "pd-blue": (
    $pd-blue,
    $pd-blue-invert
  ),
  "pd-light": (
    $pd-light,
    $pd-light-invert
  ),
  "pd-green": (
    $pd-green,
    $pd-green-invert
  ),
  "pd-pink": (
    $pd-pink,
    $pd-pink-invert
  ),
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
  ),
  "home": (
    $home,
    $home-invert
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
