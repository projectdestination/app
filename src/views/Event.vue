<template>
  <div>
    <div
    v-if="event !== undefined && event.marketing && event.public"
    :style="{backgroundImage: `url(${event.marketing.image.url})`}"
    class="background">
      <div class="bg2">
        <div
        style="background-image: linear-gradient(rgba(#ffd96a, 0.5), rgba(#ffd96a, 0.2));"
        class="section bg3">
          <div class="has-text-centered columns">
            <div class="column">

            </div>
            <div class="has-text-white column">
                <img @click="goToHome" class="img" src="@/assets/logo_white.png">
                <h1 class="title has-text-white pd-font uppercase spacing">{{event.title}}</h1>
                <div class="content">
                  {{event.marketing.text}}
                  <br /><br />
                  <nav class="level">
                    <div  class="level-item has-text-centered">
                      <div>
                        <p class="heading">Location</p>
                        <p class="title has-text-white">
                          {{event.address.room === `` ? `To be decided` : event.address.room}}
                        </p>
                      </div>
                    </div>
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">Date</p>
                        <p class="title has-text-white">{{date(event.date)}}</p>
                      </div>
                    </div>
                    <div class="level-item has-text-centered">
                      <div>
                        <p class="heading">Time</p>
                        <p class="title has-text-white">{{time(event.date)}}</p>
                      </div>
                    </div>
                  </nav>
                  <div class="section">
                    <div v-if="event.form !== undefined && event.form.settings.accessible" @click="goToEvent"  class="data has-text-black has-font-weight-semibold">
                      <div class="text pd-font uppercase spacing">
                        Sign up!
                      </div>
                    </div>
                    <a style="margin-top: 50px;" @click="goToHome" class="button is-success">Go to home page</a>
                  </div>
                </div>
                <div class="section has-text-black events">
                  <h1 class="title pd-font uppercase spacing">Other events</h1>
                  <Events/>
                </div>
            </div>
            <div class="column">

            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!(event !== undefined && event.marketing && event.public)" class="hero-body is-fullheight">
    <div class="container">
      404
    </div>
  </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import Events from "@/components/Events";

export default {
  components: {
    Events
  },
  computed: {
    ...mapState({
      event: function(state) {
        return state.content.activeEvent;
      }
    })
  },
  watch: {
    $route(to) {
      if (to.params.eventID) {
        this.$store.dispatch(
          "content/getEventData",
          this.$route.params.eventID
        );
      }
    }
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    date(date) {
      return moment(date.seconds * 1000).format("D/M - YYYY");
    },
    time(date) {
      return moment(date.seconds * 1000).format("HH:mm");
    },
    goToEvent() {
      this.$router.push(`/form/${this.event.id}`);
    }
  },
  mounted() {
    if (!this.event.public) {
      this.$store.dispatch(
        "errors/setError",
        {
          error: true,
          message:
            "Looks like this event doesn't exist... Taking you back to the homepage!",
          type: "warning"
        },
        { root: true }
      );
      this.$ga.page("Event doesn't exist");
      setTimeout(() => {
        this.$router.push(`/`);
      }, 3000);
    } else {
      this.$ga.page(this.event.title);
    }
  },
  created() {
    this.$store.dispatch("content/getEventData", this.$route.params.eventID);
    this.eventID = this.$route.params.eventID;
  }
};
</script>

<style scoped lang="scss">
.background {
  background-size: cover !important;
}
.bg2 {
  background-size: cover !important;
  min-height: 100vh;
}
.bg3 {
  background-size: cover !important;
  min-height: 100vh;
  background: linear-gradient(rgba(#182c61, 0.7), rgba(#182c61, 0.2));
}
.img:hover {
  cursor: pointer;
}
.img {
  width: 125px;
}
.text {
  top: 50%;
  position: relative;
  transform: translate(0, -50%);
}
.data {
  width: 80%;
  border-radius: 10px;
  background-color: #fff;
  height: 70px;
  margin: auto;
  transition: transform 0.2s;
}
.data:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.events {
  margin-top: 300px;
  background-color: #fff;
  border-radius: 10px;
}
.level-item {
  margin-top: 50px;
}
</style>
