<template>
  <span>
    <HeroSmall :data="hero" />
    <router-view></router-view>
  </span>
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
        title: "Users",
        subtitle: "Edit users and view them."
      };
    }
  }
};
</script>
