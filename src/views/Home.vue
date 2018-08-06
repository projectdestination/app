<template>
  <div class="home">
    <Hero v-bind:data="heroData" />
    <Columns v-bind:data="columnData" />
    <HeroSmall v-bind:data="heroSmallData"/>
    <Level v-bind:data="levelData" />
  </div>
</template>
<script>
// @ is an alias to /src
import Hero from "@/components/Hero.vue";
import HeroSmall from "@/components/HeroSmall.vue";
import Level from "@/components/Level.vue";
import Tiles from "@/components/Tiles.vue";
import Columns from "@/components/Columns.vue";

export default {
  name: "home",
  components: {
    Hero,
    Level,
    Tiles,
    Columns,
    HeroSmall
  },
  data: () => ({
    levelData: {
      outerStyle: "margin-top: 10vh;",
      content: [
        { text: "Events", value: "300" },
        { text: "Students", value: "20 000" },
        { text: "Partners", value: "50" }
      ]
    },
    heroData: {
      navData: ["Get an event", "Read our stories", "Contact us"],
      title: "Project Destination",
      subtitle: "",
      outerClass: "is-primary",
      innerClass: "has-text-centered",
      titleClass: "is-size-1"
    },
    heroSmallData: {
      title: "High Quality Events",
      subtitle: "High outcome...",
      outerClass: "is-light",
      innerClass: "has-text-centered",
      outerStyle: "margin-top: 10vh;",
      buttonClasses: "is-success is-rounded is-medium",
      buttonText: "Log in",
      renderButton: true,
      link: "/hej"
    },
    columnData: {
      outerStyle: "margin-top: 10vh;",
      data: [
        {
          text: `"I just love those big fairs"...`,
          class:
            "has-text-centered has-text-weight-bold is-size-1 is-uppercase",
          style: ""
        },
        {
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit amet placerat massa. Aenean tincidunt neque tellus, vitae tincidunt tellus laoreet quis. Nunc elementum massa sed justo placerat iaculis. Vivamus interdum augue quis neque maximus suscipit. Quisque augue enim, sodales a mauris non, dapibus efficitur velit. Nunc elit enim, pharetra vel turpis nec, finibus sagittis dolor. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
          class: "has-text-left ",
          style: ""
        },
        {
          text: "",
          class:
            "has-text-centered has-text-weight-bold is-size-1 is-uppercase",
          style: ""
        }
      ]
    }
  })
};
</script>
