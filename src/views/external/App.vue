<template>
<div>
<Navigation :navigateTo="navigateTo" :signUserOut="signUserOut" :handleClick="handleClick" :iconURL="iconURL" :buttons="buttons" />
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
