<template>
  <span>
    <HeroSmall :data="hero" />
    <div class="container section">
      <b-tabs v-on:input="i => changeTab(i)" type="is-boxed" class="is-marginless">
        <b-tab-item v-bind:key="tab.label" v-for="tab in tabs" v-bind:label="tab.label"></b-tab-item>
      </b-tabs>
      <router-view></router-view>
    </div>
  </span>
</template>
<script>
import HeroSmall from "@/components/HeroSmall";
export default {
  components: {
    HeroSmall
  },
  computed: {
    hero() {
      return {
        title: "Content",
        subtitle: "Edit content."
      };
    }
  },
  data: () => {
    return {
      tabs: [
        { label: "Home Page", route: "home" },
        { label: "Product Catalogue", route: "products" }
      ]
    };
  },
  methods: {
    changeTab(i) {
      const { route } = this.tabs[i];
      this.$router.push(`/app/admin/content/${route}`);
    }
  },
  created() {
    this.$store.dispatch("content/getProductTypes");
    this.$store.dispatch("content/getProductContent");
  }
};
</script>
