<template>
  <div class="form-view section has-text-centered">
    <img @click="goToHome" class="img" src="@/assets/logo.png">
    <div v-if="!loading" class="">
      <FormHandler />
      <a
      style="margin-top: 50px;"
      @click="goToHome"
      class="button is-success">
      Go to home page
      </a>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import FormHandler from "@/components/app/event/form/FormHandler";
import { mapState } from "vuex";

export default {
  components: {
    FormHandler
  },
  computed: {
    ...mapState({
      loading: function(state) {
        return state.loading.loading;
      }
    })
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
.form-view {
  min-height: 100vh;
}
</style>
