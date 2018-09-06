<template>
  <HeroSmall :data="hero"/>
</template>
<script>
import HeroSmall from "@/components/HeroSmall";
import { mapState } from "vuex";

export default {
  components: {
    HeroSmall
  },
  computed: {
    hero() {
      return {
        title: "Admin dashboard",
        subtitle: ""
      };
    }
  }
};
</script>
