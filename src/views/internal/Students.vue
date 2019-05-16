<template>
  <span>
    <HeroSmall :data="hero"/>
    <router-view></router-view>
  </span>
</template>
<script>
import HeroSmall from "@/components/HeroSmall";
import DropDown from "@/components/DropDown";

export default {
  components: {
    HeroSmall,
    DropDown
  },
  computed: {
    hero() {
      return {
        title: "Students"
      };
    }
  }
};
</script>
