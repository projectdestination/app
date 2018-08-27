<template>
  <section class="section">
    <div class="container">
      <HeroSmall v-bind:data="hero"/>
      <div class="tile is-ancestor">
        <div class="tile is-4 is-vertical is-parent">
          <div class="tile is-child box">
            <p class="title is-5">Event description</p>
            <p>Present your company’s career opportunities and culture, while the students are treated with a lunch they will remember. We will work together with your company representatives to improve existing presentations. Thanks to feedback from past years, we are now in a good position to guide your representatives and help you to communicate better.</p>
          </div>
          <div class="tile is-child box">
            <b-tag class="is-warning is-pulled-right" rounded>Under development</b-tag>
            <div class="content">
              <p class="title is-5">Messaging</p>
              <p></p>
          </div>
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
