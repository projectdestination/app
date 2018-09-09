<template>
  <div class="tile is-child tile-config-large ">
    <p class="title is-5">Event status {{"&"}} details</p>
    <b-tabs v-on:input="i => changeTab(i)" type="is-toggle-rounded" expanded>
      <b-tab-item v-bind:key="tab.label" v-for="tab in tabs" v-bind:label="tab.label"></b-tab-item>
  </b-tabs>
  <router-view />
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      tabs: [
        { label: "Status", route: "event_status" },
        { label: "Event preferences", route: "event_preferences" },
        { label: "Documents", route: "event_documents" }
      ]
    };
  },
  methods: {
    changeTab(i) {
      let route = "";
      if (i === 0) route = "event_status";
      else if (i === 1) route = "event_preferences";
      else if (i === 2) route = "event_documents";
      this.$router.push({ name: route });
    }
  }
};
</script>


<style scoped>
</style>
