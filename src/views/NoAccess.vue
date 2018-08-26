<template>
    <HeroSmall v-bind:login="redirect" v-bind:data="data" />
</template>
<script>
import HeroSmall from "@/components/HeroSmall";

export default {
  components: {
    HeroSmall
  },
  data: () => {
    return {
      data: {
        title: "You do not have access to this page.",
        subtitle: "",
        outerClass: "is-warning is-fullheight is-bold",
        innerClass: "",
        outerStyle: "",
        titleClass: "",
        subTitleClass: "",
        buttonClasses: "is-success",
        renderButton: true,
        buttonText: "Go back to start"
      }
    };
  },
  created() {
    this.$store.dispatch("loading/stopLoading");
  },
  methods: {
    redirect() {
      this.$store.dispatch("login/openModal", this);
      this.$router.push("/");
    }
  }
};
</script>
