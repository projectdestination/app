<template>
  <span>
    <HeroSmall :data="hero"/>
    <div class="container section">
      <DropDown :data="buttons" buttonText="Event Actions" />
    </div>
    <router-view></router-view>
  </span>
</template>
<script>
import HeroSmall from "@/components/HeroSmall";
import DropDown from "@/components/DropDown";
import NewEvent from "@/components/app/event/NewEvent";

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
    buttons() {
      return [
        {
          type: "new",
          icon: "date_range",
          text: "New event",
          subText: "Create a new event",
          method: this.newEvent
        }
      ];
    }
  },
  methods: {
    newEvent() {
      this.$modal.open({
        parent: this,
        component: NewEvent,
        hasModalCard: true
      });
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
