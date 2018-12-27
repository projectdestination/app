<template>
  <div class="hero pd-intro is-home">
    <div class="section">
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
                <Profile :data="team.hanna">
                  <img class="img" src="@/assets/team/hanna.jpg" slot="image" />
                </Profile>
              </div>
              <div class="column">
                <Profile :data="team.denice">
                  <img class="img" src="@/assets/team/denice.jpg" slot="image" />
                </Profile>
              </div>
              <div class="column">
                <Profile :data="team.oscar">
                  <img class="img" src="@/assets/team/oscar.jpg" slot="image" />
                </Profile>
              </div>
              <div class="column">
                <Profile :data="team.soner">
                  <img class="img" src="@/assets/team/soner.jpg" slot="image" />
                </Profile>
              </div>
            </div>
            <div class="columns content-container">
              <div class="column">
                <Profile :data="team.linnea">
                  <img class="img" src="@/assets/team/linnea.jpg" slot="image" />
                </Profile>
              </div>
              <div class="column">
                <Profile :data="team.burre">
                  <img class="img" src="@/assets/team/burre.jpg" slot="image" />
                </Profile>
              </div>
              <div class="column">
                <Profile :data="team.ullis">
                  <img class="img" src="@/assets/team/ullis.jpg" slot="image" />
                </Profile>
              </div>
              <div class="column">
                <Profile :data="team.eve">
                  <img class="img" src="@/assets/team/eve.jpg" slot="image" />
                </Profile>
              </div>
            </div>
            <div class="columns content-container">
              <div class="column">
              </div>
              <div class="column is-one-quarter">
                <Profile :data="team.jossan">
                  <img class="img" src="@/assets/team/jossan.jpg" slot="image" />
                </Profile>
              </div>
              <div class="column">
                <Profile :data="team.tesen">
                  <img class="img" src="@/assets/team/tesen.jpg" slot="image" />
                </Profile>
              </div>
              <div class="column">
              </div>
            </div>
            <div class="columns content-container">
              <div class="column">

              </div>
              <div class="column">
                <img class="img" src="@/assets/team/team2.jpg" slot="image" />
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
import Profile from "@/components/Profile";

export default {
  components: {
    Profile
  },
  data() {
    return {
      team: {
        soner: {
          name: "Soner Vergon",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut.",
          role: "Art Director, <br /> Head of app"
        },
        tesen: {
          name: "Erik Tällberg",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. ",
          role: "Project Manager"
        },
        denice: {
          name: "Denice Dawoud",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. ",
          role: "International Relations Manager"
        },
        jossan: {
          name: "Josefin Osbjer",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. ",
          role: "Vice Project Manager"
        },
        hanna: {
          name: "Hanna Söderlund",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. ",
          role: "Event manager"
        },
        ullis: {
          name: "Ulrika Solheim",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. ",
          role: "Event Manager"
        },
        oscar: {
          name: "Oscar Hjelm",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. ",
          role: "International Relations Manager"
        },
        linnea: {
          name: "Linnea Axelsson",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. ",
          role: "Sales Manager"
        },
        burre: {
          name: "Burhan Hashi",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. ",
          role: "IT Manager"
        },
        eve: {
          name: "Eveline Haugaard",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. ",
          role: "Marketing Manager"
        }
      }
    };
  }
};
</script>

<style lang="css" scoped>
.img {
  border-radius: 1000000000px !important;
  overflow: hidden;
}
.media {
  margin: 10% 10% !important;
  border: none !important;
}
.content-container {
  margin-top: 80px;
}
</style>
