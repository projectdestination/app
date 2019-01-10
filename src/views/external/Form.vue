<template>
  <div class="section has-text-centered">
    <img @click="goToHome" class="img" src="@/assets/logo.png">
    <FormHandler />
    <a style="margin-top: 50px;" @click="goToHome" class="button is-success">Go to home page</a>
  </div>
</template>

<script>
import router from "@/router/router";
import FormHandler from "@/components/app/event/FormHandler";

export default {
  components: {
    FormHandler
  },
  watch: {
    $route(to) {
      if (to.params.formID) {
        this.$store.dispatch("form/getFormData", to.params.formID);
      }
    }
  },
  methods: {
    goToHome() {
      router.push("/");
    }
  },
  beforeCreate() {
    const { formID } = router.app.$route.params;
    this.formID = formID;
    this.$store.dispatch("form/getFormData", formID);
  },
  destroyed() {
    this.$store.dispatch("form/setInitialState");
  }
};
</script>

<style scoped lang="css">
.img {
  width:75px;
}
.img:hover {
  cursor: pointer;
}
</style>
