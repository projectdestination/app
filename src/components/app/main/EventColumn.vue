<template>
  <span>
  <article v-bind:key="event.id" v-if="event" v-on:click="navigateToEvent(event.id, event.owner)" class="article media" v-for="event in eventsRefined">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{event.title}}</strong>
          <br>
          {{event.text}}
        </p>
      </div>
    </div>
  </article>
</span>
</template>

<script>
export default {
  props: {
    events: Array
  },
  methods: {
    navigateToEvent(id, owner) {
      this.$store.dispatch("loading/startLoading");
      this.$router.push({
        name: "event_status",
        params: { eventID: id, owner: owner }
      });
      setTimeout(() => {
        this.$store.dispatch("loading/stopLoading");
      }, 500);
    }
  },
  computed: {
    eventsRefined() {
      const newData =
        this.events === null
          ? []
          : this.events.map(d => {
              if (d.text.length > 120) {
                return { ...d, text: `${d.text.slice(0, 120)}...` };
              }
            });
      return newData;
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
