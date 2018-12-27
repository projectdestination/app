<template>
  <div class="home">
    <section class="hero pd-font uppercase spacing is-fullheight background">
      <div class="hero-body">
        <div class="container has-text-centered">
          <img src="@/assets/logo_white.png" style="width: 100px;">
          <h1 class="title pd-font has-text-white pd-font" >
            Project Destination
          </h1>
          <span>
            <b-tooltip position="is-bottom" type="is-home" label="For companies only">
              <a v-on:click="login"  class="is-rounded is-medium is-home button">{{user ? "Enter app" : "Log in"}}</a>
            </b-tooltip>
          </span>
          <span>
            <a @click="handleClick(`/products`)" class="is-rounded is-medium is-primary button">View our products</a>
          </span>
        </div>
      </div>
      <div class="hero-foot">
      <nav class="tabs is-boxed is-fullwidth has-text-white font pd-font pd-font-2 navigation">
        <div class="container">
          <ul v-if="false">
            <li class="nav-button"><a @click="handleClick(`/products`)" class="button-modifier">Products</a></li>
          </ul>
        </div>
      </nav>
    </div>
    <footer class="hero-foot has-items-centered has-text-white arrow-down">
      <i class="material-icons is-pulled-left">keyboard_arrow_down</i>
    </footer>
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
      <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <h4 class="title pd-font uppercase spacing">Project Destination &copy;</h4>
          <small>
             by Soner Vergon.
          </small>
        </p>
      </div>
    </footer>
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
    })
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

.home {
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
  height: 100vh;
}

.navigation {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
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
</style>
