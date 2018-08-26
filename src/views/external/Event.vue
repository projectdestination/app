<template>
  <section class="section">
    <div class="container">
      <HeroSmall v-bind:data="hero"/>
      <div class="tile is-ancestor">
        <div class="tile is-4 is-vertical is-parent">
          <div class="tile is-child box">
            <p class="title is-5">Event description</p>
            <p></p>
          </div>
          <div class="tile is-child box">
            <p class="title is-5">Messages</p>
            <p></p>
          </div>
        </div>
        <div class="tile is-parent">
          <EventStatusDetails />
        </div>

      </div>
    </div>
  </section>
</template>
<script>
import HeroSmall from "@/components/HeroSmall";
import EventStatusDetails from "@/components/app/event/EventStatusDetails";
export default {
  components: {
    HeroSmall,
    EventStatusDetails
  },
  data: () => {
    return {
      hero: {
        title: "Lunch Lecture with Scania",
        subtitle: "",
        outerClass: "",
        innerClass: "",
        outerStyle: "",
        titleClass: "",
        subTitleClass: "",
        buttonClasses: "is-success",
        renderButton: false,
        buttonText: "Go back to start"
      }
    };
  }
};
</script>

<style scoped>
.tile-config-large {
  height: 60vh !important;
  max-height: 60vh !important;
}

.tile-config-small {
  height: 30vh !important;
  max-height: 30vh !important;
  overflow: scroll;
}

.footer {
  position: absolute;
  bottom: 0px;
}
</style>
