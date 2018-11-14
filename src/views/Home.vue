<template>
  <div class="home">
    <span v-bind:key="index" v-for="(data ,index) in content">
      <!--<Hero v-if="data.type === 'hero'" v-bind:data="data" />-->
      <!--<Columns v-if="data.type === 'columns'" v-bind:data="data" />-->
      <HeroSmall v-if="data.type === 'heroSmall'" :isHome="true" v-bind:login="login" v-bind:data="data"/>
      <!--<Level v-if="data.type === 'level'" v-bind:data="data" />-->
    </span>
      <section class="hero pd-intro is-medium  is-pd-pink is-bold">
        <div class="hero-body">
          <div class="container has-text-left">
            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <div class="tile is-5 is-child">
                  <h1 class="title pd-font uppercase spacing">
                    project destination?
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
                <div  class="tile is-child">
                  <div class="container">
                  </div>
                </div>
              </div>
            </div>
            <div class="tile is-ancestor margin">
              <div class="tile is-parent">
                <div class="tile is-child">
                </div>
                <div class="tile has-text-right is-5 is-child">
                  <h1 class="title pd-font uppercase spacing">
                    For students by students
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>

              </div>
            </div>
            <div class="tile is-ancestor margin">
              <div class="tile is-parent">

                <div class="tile has-text-left is-5 is-child">
                  <h1 class="title pd-font uppercase spacing">
                    Trancparancy is key
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                </div>
                <div class="tile is-child">
                  <div class="container">
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
      <div class="hero pd-intro is-white">
        <div class="hero-body has-text-centered">
          <h1 class="title pd-font uppercase spacing">
            The team
          </h1>
          <h2 class="subtitle pd-font uppercase spacing">
            18/19
          </h2>
          <div class="container">
            <div class="content pd-font">
              <div class="columns content-container">
                <div class="column">
                  <Profile :data="team.soner" />
                </div>
                <div class="column">
                  <Profile :data="team.erik" />
                </div>
                <div class="column">
                  <Profile />
                </div>
                <div class="column">
                  <Profile />
                </div>
              </div>
              <div class="columns content-container">
                <div class="column">
                  <Profile />
                </div>
                <div class="column">
                  <Profile />
                </div>
                <div class="column">
                  <Profile />
                </div>
                <div class="column">
                  <Profile />
                </div>
              </div>
              <div class="columns content-container">
                <div class="column is-one-quarter">
                </div>
                <div class="column">
                  <Profile />
                </div>
                <div class="column">
                  <Profile />
                </div>
                <div class="column">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      team: {
        soner: {
          name: "Soner Vergon",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut.",
          role: "Art Director",
          image:
            "https://firebasestorage.googleapis.com/v0/b/project-destination.appspot.com/o/images%2Fteam%2Fprofil.jpg?alt=media&token=6d710bf2-2b8d-474e-8390-d7d57aa3c7fb"
        },
        erik: {
          name: "Erik Tällberg",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. ",
          role: "Project Manager",
          image:
            "https://firebasestorage.googleapis.com/v0/b/project-destination.appspot.com/o/images%2Fteam%2Fweberik.png?alt=media&token=8eb06068-be22-42ac-876a-b36c34a2686a"
        }
      }
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
.margin {
  margin-top: 6% !important;
}

.pd-intro {
  margin-top: 0%;
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
