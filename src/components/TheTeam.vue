<template>
  <div class="hero pd-intro is-home">
    <div class="section">
      <div class="hero-body has-text-centered">
        <h1 class="title pd-font uppercase spacing">
          The Roles in Project Destination
        </h1>
        
        <div class="container">
          <div class="content pd-font">
            <div class="columns content-container">
                <div class="column">
                <Profile :data="team.projectl">
                </Profile>
              </div>
              <div class="column">
                <Profile :data="team.projectv">
                </Profile>
              </div>
              <div class="column">
                <Profile :data="team.sales">
                </Profile>
              </div>
            
              
              
              </div>
              <div class="columns content-container">
                
                 </div>

             <div class="columns content-container">
               <div class="column">
                <Profile :data="team.marketing">
                </Profile>
              </div>
              <div class="column">
                <Profile :data="team.event">
                </Profile>
              </div>
              </div>
             <div class="columns content-container">
               <div class="column">
                <Profile :data="team.ir">
                </Profile>
              </div>

               <div class="column">
                <Profile :data="team.ad">
                </Profile>
              </div>

               </div>
               <h1 class="title pd-font uppercase spacing">
                          The team
              </h1>
                <h2 class="subtitle pd-font uppercase spacing">
                            18/19
              </h2>
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
import {
  PROJECTL,
  PROJECTV,
  SALES,
  MARKETING,
  EVENT,
  IR,
  AD,
  IT,
  ERIK,
  SONER,
  DENICE,
  JOSEFIN,
  HANNA,
  ULRIKA,
  OSCAR,
  LINNEA,
  BURHAN,
  EVELINE
} from "@/constants/home";

export default {
  components: {
    Profile
  },
  data() {
    return {
      team: {
        projectl: {
          name: "PROJECT MANAGER",
          text: PROJECTL,
          role: "Click To Apply",
          linkedin:"https://www.projectdestination.se/form/TpbGcxvpz7BJR3DMndum/"
        },

        projectv: {
          name: "VICE PROJECT MANAGER",
          text: PROJECTV,
          role: "Click To Apply",
          linkedin: "https://www.projectdestination.se/event/MB7T0YsFI2Jil7GiQ2xn"
        },
        sales: {
          name: "SALES MANAGER",
          text: SALES,
          role: "Click To Apply",
          linkedin: "https://www.projectdestination.se/event/MB7T0YsFI2Jil7GiQ2xn"
        },
        marketing: {
          name: "MARKETING MANAGER",
          text: MARKETING,
          role: "Click To Apply",
          linkedin: "https://www.projectdestination.se/event/MB7T0YsFI2Jil7GiQ2xn"
        },
        event: {
          name: "EVENT MANAGER",
          text: EVENT,
          role: "Click To Apply",
          linkedin: "https://www.projectdestination.se/event/MB7T0YsFI2Jil7GiQ2xn"
        },
        ir: {
          name: "INTERNATIONAL RELATIONS MANAGER",
          text: IR,
          role: "Click To Apply",
          linkedin: "https://www.projectdestination.se/event/MB7T0YsFI2Jil7GiQ2xn"
        },
        ad: {
          name: "ART DIRECTOR",
          text: AD,
          role: "Click To Apply",
          linkedin: "https://www.projectdestination.se/event/MB7T0YsFI2Jil7GiQ2xn"
        },
        it: {
          name: "IT MANAGER",
          text: IT,
          role: "Click To Apply",
          linkedin: "https://www.projectdestination.se/event/MB7T0YsFI2Jil7GiQ2xn"
        },
        soner: {
          name: "Soner Vergon",
          text: SONER,
          role: "Art Director, <br /> Head of app",
          linkedin: "https://www.linkedin.com/in/soner-vergon/"
        },
        tesen: {
          name: "Erik Tällberg",
          text: ERIK,
          role: "Project Manager",
          linkedin: "https://www.linkedin.com/in/eriktallberg/"
        },
        denice: {
          name: "Denice Dawoud",
          text: DENICE,
          role: "International Relations Manager",
          linkedin: "https://www.linkedin.com/in/denicedawoud/"
        },
        jossan: {
          name: "Josefin Osbjer",
          text: JOSEFIN,
          role: "Vice Project Manager",
          linkedin: "https://www.linkedin.com/in/josefin-osbjer/"
        },
        hanna: {
          name: "Hanna Söderlund",
          text: HANNA,
          role: "Event manager",
          linkedin: "https://www.linkedin.com/in/hannasoderlund1/"
        },
        ullis: {
          name: "Ulrika Solheim",
          text: ULRIKA,
          role: "Event Manager",
          linkedin: "https://www.linkedin.com/in/ulrika-solheim-b682a4100/"
        },
        oscar: {
          name: "Oscar Hjelm",
          text: OSCAR,
          role: "International Relations Manager"
        },
        linnea: {
          name: "Linnea Axelsson",
          text: LINNEA,
          role: "Sales Manager"
        },
        burre: {
          name: "Burhan Hashi",
          text: BURHAN,
          role: "IT Manager",
          linkedin: "https://www.linkedin.com/in/burhan-hashi-1419b7106/"
        },
        eve: {
          name: "Eveline Haugaard",
          text: EVELINE,
          role: "Marketing Manager",
          linkedin: "https://www.linkedin.com/in/eveline-haugaard-6b9891152/"
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
