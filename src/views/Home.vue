<template>
  <div class="home">
    <section class="hero pd-font uppercase spacing is-large background">
      <nav class="navbar" role="navigation" aria-label="dropdown navigation">
          <div class="navbar-menu is-active" id="navMenu">
            <div class="navbar-start navbar">
                <div class="kkk navbar is-left">
                  <a @click="login"
                  style="border-right: 1px solid #898989"
                   class="has-background-white left navbar-item">
                    {{user ? "Enter app" : "Log in"}}
                  </a>
                  <a @click="handleClick(`/products`)" class="has-background-white right navbar-item">
                    For Companies
                  </a>
              </div>
            </div>
          </div>
        </nav>
      <div class="hero-body">
        <div class="container has-text-centered">
          <img src="@/assets/logo_white.png" style="width: 100px;">
          <h1 class="title pd-font has-text-white pd-font" >
            Project Destination
          </h1>
        </div>
      </div>
    </section>

      <div class="hero pd-intro is-white">
        <div class="hero-body has-text-centered">
          <div class="section">
            <h1 class="title pd-font uppercase spacing">
              Upcoming events
            </h1>
            <div class="container">
              <div class="content pd-font">
                <div class="columns">
                  <div class="column is-one-fifth">

                  </div>
                  <div class="parent column">
                    <Events />
                    <div class="section pd-font uppercase spacing">
                      <h3 class="title is-7 pd-font">Follow us at</h3>
                      <a target="_blank" href="https://www.instagram.com/projectdestination/">
                        <img class="icon" width="20px" src="../assets/insta.png" />
                      </a>
                      <a target="_blank" href="https://www.facebook.com/projectdestination/">
                        <img class="icon" width="20px" src="../assets/fb.png" />
                      </a>
                    </div>
                  </div>
                  <div class="column is-one-fifth">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Intro />

      <TheTeam />
      <section class="hero pd-intro is-medium background3 is-bold">
        <div class="section has-text-centered">
          <h1 style="background-color: #000; display:inline-block;" class="title pd-font has-text-white uppercase spacing">Our destination</h1>
          <div class="hero-body has-text-center">
            <div class="columns">
              <div class="column">

              </div>
              <div class="column">
                <h1 style="display: inline-block" class="title content2 has-text-white is-4 pd-font uppercase spacing">
                  PROJECT SOUTH AMERICA
                </h1>
                <p>
                  <span class="content2 has-text-white">
                    {{TRIP}}
                  </span>
                </p>
              </div>
              <div class="column">

              </div>
            </div>
          </div>
        </div>
      </section>
  </div>
</template>
<script>
// @ is an alias to /src
import Hero from "@/components/Hero";
import HeroSmall from "@/components/HeroSmall";
import Level from "@/components/Level";
import Tiles from "@/components/Tiles";
import Columns from "@/components/Columns";
import Intro from "@/components/Intro";
import TheTeam from "@/components/TheTeam";
import Events from "@/components/Events";
import { TRIP } from "@/constants/home";

import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    TheTeam,
    Hero,
    Level,
    Events,
    Tiles,
    Columns,
    HeroSmall,
    Intro
  },
  methods: {
    login() {
      this.$store.dispatch("login/openModal");
    },
    handleClick(path) {
      this.$router.push(path);
    }
  },
  computed: {
    ...mapState({
      content: state => state.content.HOME_PAGE_DATA,
      user: state => state.user.userIsAuthenticated
    }),
    TRIP: () => TRIP
  },
  created() {
    this.$store.dispatch("content/getHomePageData");
  }
};
</script>
<style scoped lang="scss">
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
.background {
  background: linear-gradient(rgba(#ef9bc1, 0.2), rgba(#ef9bc1, 0.5)),
    url(../assets/beach.jpg) center !important;
  background-size: cover !important;
  min-height: 70vh;
}

.background2 {
  background: linear-gradient(rgba(#ffd96a, 0.2), rgba(#ffd96a, 0.8)),
    url(../assets/team/team2.jpg) center fixed !important;
  background-size: cover !important;
}

.background3 {
  background: linear-gradient(rgba(#ffd96a, 0.5), rgba(#ffd96a, 0.2)),
    url(../assets/field.jpg) center !important;
  background-size: cover !important;
}

.content2 {
  background-color: #000;
}

.button {
  text-transform: uppercase;
}

a {
  transition: all 0.3s;
}

.button-modifier:hover {
  background-color: rgba(#ffffff, 0) !important;
}

.button {
  margin: 30px 5px 0 5px;
}

.button:hover {
  transform: scale(1.05);
}

.nav-button {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 10000px !important;
  border-bottom-left-radius: 10000px !important;
  background-color: rgba(#ffffff, 0);
  transition: background-color 0.2s;
}

.arrow-down {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: scale(1.2) translate(-50%, -100%);
}

a:hover {
  background-color: none;
}
.icon {
  margin: 0 5px;
}

.nav-button:hover {
  background-color: rgba(#ffffff, 0.2) !important;
}

.navbar-menu {
  width: 100%;
  margin-top: 20px;
}
.navbar-brand {
  background-color: rgba(#ffffff, 0);
}
.navbar-burger {
  border: none;
  background-color: rgba(#ffffff, 0);
}
.navbar-burger:hover {
  border: none;
  background-color: rgba(#ffffff, 0);
}
.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 30px;
  height: 150px;
  width: auto;
}
.navbar {
  border: none;
  box-shadow: 0 0 0 #000 !important;
  filter: drop-shadow(0) !important;
  background-color: rgba(#ebb285, 0);
}

.navbar a:hover {
  background-color: rgba(#ffffff, 0) !important;
  color: #fff !important;
}

.navbar a {
  text-align: center !important;
}
</style>
