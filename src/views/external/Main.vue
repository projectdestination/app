<template>
  <div class="section">
  <div class="container">
    <HeroSmall v-bind:data="hero"/>
    <div class=" tile is-ancestor">
        <div class="tile is-parent is-vertical">
          <div class="tile is-child box tile-config-small">
            <article class="">
              <div class="content">
                <p class="title is-5">Company message</p>

              </div>
            </article>
          </div>
          <div class="tile is-child box tile-config-small">
            <article class="">
              <a v-bind:class="loading" @click="toggleLoading" class="is-success is-outlined button is-pulled-right is-small is-rounded">Mark as read</a>
              <div class="content">
                <p class="title is-5">Notifications</p>
                  <b-message >
                    <div class="content">
                      <p><strong>Hi there</strong> welcome to the Project Destination app! It is very new and under development so be nice on us. Here you can see all your events that has or will happen. Our goal is to be transparent with what we do in our collaborations, this is our solution.</p>
                      <p>In the future your colleagues will also be able to register in the app just like you did.</p>
                    </div>
                  </b-message>
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
    return {
      loading: ""
    };
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
          outerStyle: "margin-top: -60px;",
          titleClass: "",
          subTitleClass: "",
          buttonClasses: "is-success",
          renderButton: false,
          buttonText: "Go back to start"
        };
      }
    })
  },
  methods: {
    toggleLoading() {
      this.loading = this.loading === "is-loading" ? "" : "is-loading";
      setTimeout(() => {
        this.loading = "";
      }, 2000);
    }
  }
};
</script>

<style scoped>
.tile-config-large {
  height: 60vh !important;
}

.tile-config-small {
  height: 30vh !important;
}
.section {
  height: 100vh;
}
</style>
