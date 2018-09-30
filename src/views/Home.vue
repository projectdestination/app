<template>
  <div class="home">
    <span v-bind:key="index" v-for="(data ,index) in content">
      <!--<Hero v-if="data.type === 'hero'" v-bind:data="data" />-->
      <!--<Columns v-if="data.type === 'columns'" v-bind:data="data" />-->
      <HeroSmall v-if="data.type === 'heroSmall'" :isHome="true" v-bind:login="login" v-bind:data="data"/>
      <!--<Level v-if="data.type === 'level'" v-bind:data="data" />-->
    </span>
    <section class="section pd-intro">
      <div class="container">
        <div class="content pd-font">
          <h1 class="pd-font uppercase spacing has-text-centered">What is project destination?</h1>
          <div class="columns content-container">
            <div class="column is-one-quarter"></div>
            <div class="column is-one-quarter has-background-pd-light">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div class="column is-one-quarter has-background-pd-pink"></div>
            <div class="column is-one-quarter has-background-pd-blue"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="section pd-team">
      <div class="container">
        <div class="content pd-font">
          <div class="columns content-container ">
            <div class="column is-one-quarter has-background-pd-green"><h1 class="pd-font uppercase spacing has-text-centered">The team</h1></div>
            <div class="column is-one-quarter">
              <Profile />
              <Profile />
              <Profile />
            </div>
            <div class="column is-one-quarter">
              <Profile />
              <Profile />
              <Profile />
            </div>
            <div class="column is-one-quarter">
              <Profile />
              <Profile />
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import HeroSmall from "@/components/HeroSmall.vue";
import Level from "@/components/Level.vue";
import Tiles from "@/components/Tiles.vue";
import Columns from "@/components/Columns.vue";
import Profile from "@/components/Profile.vue";

import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    Hero,
    Level,
    Tiles,
    Columns,
    HeroSmall,
    Profile
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login/openModal");
    }
  },
  computed: {
    ...mapState({
      content: state => state.content.HOME_PAGE_DATA
    })
  },
  created() {
    this.$store.dispatch("content/getHomePageData");
  }
};
</script>
<style scoped>
.content {
  height: 100% !important;
}
.container {
  height: 100% !important;
}
.pd-intro {
  padding-top: 7%;
  height: 90vh;
}
.content-container {
  margin: 7% 0;
  height: 100%;
}
.pd-team {
  margin-top: 7%;
  height: 90vh;
}
</style>
