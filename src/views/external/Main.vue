<template>
  <div class="section">
  <div class="container">
    <HeroSmall v-bind:data="hero"/>
  <div class=" tile is-ancestor">
        <div class="tile is-parent is-vertical">
          <div class="tile is-child box tile-config-small">
            <article class="">
              <div class="content">
                <p class="title is-5">Welcome company</p>
                <div class="content">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </article>
          </div>
          <div class="tile is-child box tile-config-small">
            <article class="">
              <div class="content">
                <p class="title is-5">Misc</p>
                <div class="content">
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile tile-config-large  is-child is-vertical box">
            <div class="title is-5">Your events</div>
            <EventColumn v-bind:events="events" />
          </div>
        </div>
  </div>
  </div>
</div>
</template>

<script>
import EventColumn from "@/components/app/main/EventColumn.vue";
import HeroSmall from "@/components/HeroSmall";
import { mapState } from "vuex";

export default {
  data: () => {
    return {};
  },
  components: {
    HeroSmall,
    EventColumn
  },
  computed: {
    ...mapState({
      events: state => state.app.events,
      company: state => state.app.company,
      user: state => {
        return state.user;
      },
      hero: state => {
        return {
          title: `Hello ${state.user.user.first_name}`,
          subtitle: "",
          outerClass: "",
          innerClass: "",
          outerStyle: "",
          titleClass: "",
          subTitleClass: "",
          buttonClasses: "is-success",
          renderButton: false,
          buttonText: "Go back to start"
        };
      }
    })
  }
};
</script>

<style scoped>
.tile-config-large {
  height: 60vh !important;
}

.tile-config-small {
  height: 30vh !important;
  overflow: scroll;
}
</style>
