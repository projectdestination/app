<template>
  <div class="section container">
  <div class=" tile is-ancestor container">
    <div class="tile container is-fluid is-vertical is-10">
      <div class="tile">
        <div class="tile is-parent is-vertical">
          <div class="tile is-child notification box tile-config-small">
            <article class="">
              <div class="content">
                <p class="title is-5">Welcome company</p>
                <div class="content">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
              </div>
            </article>
          </div>
          <div class="tile is-child notification box tile-config-small">
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
          <div class="tile tile-config-large is-child is-vertical notification box">
            <div class="title is-5">Your events</div>
            <EventColumn v-bind:events="events" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import EventColumn from "@/components/app/main/EventColumn.vue";
import { mapState } from "vuex";

export default {
  components: {
    EventColumn
  },
  computed: {
    ...mapState({
      events: state => state.app.events,
      company: state => state.app.company
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
