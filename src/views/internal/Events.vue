<template>
  <span>
    <HeroSmall :data="hero"/>
    <div class="container section">
      <DropDown :data="buttons" />
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
    buttons() {
      return [
        {
          type: "new",
          icon: "date_range",
          text: "New event",
          subText: "Create a new event",
          method: this.newEvent
        },
        {
          type: "new_type",
          icon: "flare",
          text: "New event type",
          subText: "Create a new type of event",
          method: this.newEventType
        }
      ];
    }
  },
  methods: {
    newEvent() {
      console.log("hwej");
    },
    newEventType() {}
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
