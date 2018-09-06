<template>
  <HeroSmall :data="hero"/>
</template>
<script>
import HeroSmall from "@/components/HeroSmall";
<<<<<<< HEAD
=======
import { mapState } from "vuex";
>>>>>>> Major updates

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
