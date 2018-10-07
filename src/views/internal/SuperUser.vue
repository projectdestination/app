<template>
  <span>
    <HeroSmall :data="hero"/>
    <div class="container">
      <div class="columns">
        <div class="column">
          <p class="title pd-font is-6 uppercase spacing">
            Send messages to slack
          </p>
          <Slack />
        </div>
        <div class="column">
          Other
        </div>
      </div>
    </div>
  </span>
</template>
<script>
import HeroSmall from "@/components/HeroSmall";
import Slack from "@/components/app/super/Slack";

export default {
  components: {
    HeroSmall,
    Slack
  },
  computed: {
    hero() {
      return {
        title: "Super user controls",
        subtitle: ""
      };
    }
  }
};
</script>
