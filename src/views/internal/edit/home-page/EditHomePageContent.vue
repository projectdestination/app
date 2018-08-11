<template>
  <section >
    <div v-bind:key="index" v-for="(item,index) in content">
      <EditHero v-if="item.type === 'hero'" v-bind:handleChange="pushData" v-bind:data="item" />
    </div>
    <section class="section container">
      <a v-on:click="pushData" class="button is-success">Save</a>
    </section>
  </section>
</template>
<script>
// @ is an alias to /src
import EditHero from "@/components/EditHero.vue";
import { mapState } from "vuex";

export default {
  name: "EditHomePageContent",
  components: {
    EditHero
  },

  methods: {
    pushData() {
      this.$store.dispatch("content/setHomePageData");
    }
  },
  computed: {
    ...mapState({
      content: state => state.content.HOME_PAGE_DATA
    })
  },
  watch: {
    content: function() {
      this.$store.dispatch("content/setHomePageData");
    }
  }
};
</script>
