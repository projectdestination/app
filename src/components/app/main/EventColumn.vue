<template>
  <span>
  <article v-bind:key="event.id" v-if="event" v-on:click="navigateToEvent(event)" class="article media" v-for="event in eventsRefined">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png">
      </p>
    </figure>
    <div class="media-content">
      <i class="material-icons is-pulled-right" v-bind:class="event.error ? `has-text-danger`:`has-text-success`">{{event.error ? "error":"done"}}</i>
      <div class="content">
        <p>
          <strong>{{event.title}}</strong>
          <br>
          {{event.text}}
        </p>
      </div>
    </div>
  </article>
  <div v-if="Object.keys(eventsRefined).length === 0">
    <b-message type="is-info">
      You have no upcoming events. To request events, contact help@projectdestination.se. If you have already requested an event you will be notified through mail when it is accessable here.
    </b-message>
  </div>
</span>
</template>

<script>
import store from "@/store/store";
export default {
  props: ["isAdmin", "closeModal", "company_key"],
  methods: {
    navigateToEvent(eventObject) {
      this.$store.dispatch("loading/startLoading");
      this.$router.push({
        name: "event_status",
        params: { eventID: eventObject.id, ...eventObject }
      });
      setTimeout(() => {
        this.$store.dispatch("loading/stopLoading");
      }, 500);
      if (this.closeModal) {
        this.closeModal();
      }
    }
  },
  computed: {
    eventsRefined() {
      const letterCount = this.isAdmin ? 40 : 120;
      if (this.isAdmin) {
        const { events } = store.state.admin.events;
        const newEvents = Object.keys(events).map(d => {
          const event = events[d];
          if (event.owner_key === this.company_key) {
            return { ...event, text: `${event.text.slice(0, letterCount)}...` };
          }
        });
        return newEvents;
      } else {
        const events = store.getters["app/getEvents"];
        if (events) {
          Object.keys(events).forEach(d => {
            const event = events[d];
            if (event.text.length > letterCount) {
              events[d] = {
                ...event,
                text: `${event.text.slice(0, letterCount)}...`
              };
            }
          });
        }
        return events;
      }
    }
  }
};
</script>
<style scoped>
.article {
  margin-top: 25px;
  padding-top: 10px;
  transition: transform 0.2s;
}

.article:hover {
  transform: scale(1.03);
  cursor: pointer;
}
</style>
