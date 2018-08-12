<template>
  <section >
    <div v-bind:key="index" v-for="(item,index) in content">
      <EditHero v-if="item.type === 'hero'" v-bind:handleChange="pushData" v-bind:data="item" />
    </div>
  </section>
</template>
<script>
// @ is an alias to /src
import EditHero from "@/components/EditHero";
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
      this.$store.dispatch("loading/startLoading");
      this.$store.dispatch("content/setHomePageData");
    }
  }
};
</script>
