<template>
  <div class="home">
    <span v-bind:key="index" v-for="(data ,index) in content">
      <Hero v-if="data.type === 'hero'" v-bind:data="data" />
      <Columns v-if="data.type === 'columns'" v-bind:data="data" />
      <HeroSmall v-if="data.type === 'heroSmall'" v-bind:data="data"/>
      <Level v-if="data.type === 'level'" v-bind:data="data" />
    </span>
  </div>
</template>
<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import HeroSmall from "@/components/HeroSmall.vue";
import Level from "@/components/Level.vue";
import Tiles from "@/components/Tiles.vue";
import Columns from "@/components/Columns.vue";

import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    Hero,
    Level,
    Tiles,
    Columns,
    HeroSmall
  },
  data() {
    return {
      items: []
    };
  },
  computed: {
    ...mapState({
      content: state => state.content.HOME_PAGE_DATA
    })
  }
};
</script>
