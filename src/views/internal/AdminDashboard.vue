<template>
  <HeroSmall :data="hero"/>
</template>
<script>
import HeroSmall from "@/components/HeroSmall";

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
