<template>
  <div class="app-container">
    <Navigation
      :navigateTo="navigateTo"
      :signUserOut="signUserOut"
      :handleClick="handleClick"
      :iconURL="iconURL"
      :buttons="buttons"
    />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/app/Navigation";
import { mapState, mapGetters } from "vuex";

export default {
  name: "App",
  components: { Navigation },
  computed: {
    ...mapState({
      user: state => state.user,
      iconURL: state => state.content.PDIconUrl
    }),
    ...mapGetters({
      buttons: "user/getNavBar"
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
  },
  beforeCreate() {
    this.$store.dispatch("app/getContent");
  }
};
</script>
<style scoped>
.icon-modifier {
  transform: scale(0.7) !important;
}
.app-container {
  min-height: 100vh !important;
}
</style>
