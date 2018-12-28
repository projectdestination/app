<template>
  <span>
  <article
  @click="navigateToEvent(event)"
  v-for="(event, id, index) in events"
  v-if="getBool(event.date.seconds, id)"
  :style="index === 0 ? `border: none !important;` : `border-top: #d8d8d8 0.5px solid !important;`"
  :key="event.id" class="article media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content pd-font">
        <p>
          <strong><span class="pd-font uppercase spacing">{{event.title}}</span></strong>
          <br />
          <span style="font-size: 70%;">
              {{getMoment(event.date.seconds)}} <span v-if="event.address.room.length > 0">- @{{event.address.room}}</span>
          </span>
          <br />
          <small>{{event.text}}</small>
        </p>
      </div>
    </div>
  </article>
</span>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  data: () => {
    return {
      renderNoEvents: []
    };
  },
  methods: {
    navigateToEvent(event) {
      this.$router.push(`/form/${event.id}`);
    },
    getBool(date, formID) {
      const bool =
        Date.now() < date * 1000 &&
        (this.$route.params.formID
          ? formID !== this.$route.params.formID
          : true);
      return bool;
    },
    getMoment(seconds) {
      return moment(seconds * 1000).format("D MMMM HH:mm");
    }
  },
  computed: {
    ...mapState({
      events: function(state) {
        return state.content.events;
      }
    })
  },
  beforeCreate() {
    this.$store.dispatch("content/fetchEvents");
  }
};
</script>

<style scoped>
.media {
  border: none !important;
}
.article {
  margin-top: 25px;
  padding-top: 40px !important;
  transition: transform 0.2s;
}
.article:hover {
  transform: scale(1.03);
  cursor: pointer;
}
</style>
