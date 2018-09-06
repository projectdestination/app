<template>
  <span>
    <HeroSmall :data="hero"/>
    <div class="container">
      <DropDown />
    </div>
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
        title: "Events",
        subtitle: "Edit events and view them."
      };
    },
    dropdown() {
      return {
        main: {}
      };
    }
  }
};
</script>
<style scoped>
.material-icons {
  transform: scale(0.8);
  margin-left: 5px;
}
.drop-icon {
  transform: scale(1);
  margin-left: 0px;
}
</style>
