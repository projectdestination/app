<template>
  <section>
    <SideBar v-bind:active="sideBarOpen" type="hero" v-bind:data="data" v-bind:handleChange="handleChange" v-bind:handleSideBar="handleSideBar"/>
    <section class="hero is-medium is-bold is-fullheight" v-bind:class="data.outerClass">
      <div class="hero-body">
        <div class="container has-text-centered" v-bind:class="data.innerClass">
          <h1 class="title">
            <input v-on:change="handleChange" placeholder="Enter Title" class="input title" v-model="data.title" >
          </h1>
          <h2 class="subtitle">
            <input v-on:change="handleChange" class="input subtitle" placeholder="Enter Subtitle" v-model="data.subTitle" >
          </h2>
        </div>
      </div>
      <div class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth">
      <div class="container">
        <ul>
          <li v-bind:key="index" v-for="(item,index) in data.navData">
            <a><input v-on:change="handleChange" class="input" placeholder="Enter text" v-model="item.text" ></a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</section>
</section>
</template>
<script>
// @ is an alias to /src
import SideBar from "@/components/SideBar/SideBar";

export default {
  name: "EditHero",
  props: {
    data: Object,
    handleChange: Function
  },
  data() {
    return {
      sideBarOpen: false
    };
  },
  components: {
    SideBar
  },
  methods: {
    handleSideBar: function() {
      this.sideBarOpen = !this.sideBarOpen;
    }
  }
};
</script>
<style scoped>
.input {
  max-width: 50%;
  background-color: rgb(250, 250, 250, 0) !important;
  border: 0px #000 solid !important;
}
input {
  text-align: center;
  background-color: rgb(250, 250, 250, 0) !important;
  border-color: rgb(250, 250, 250, 0) !important;
  box-shadow: none !important;
}
</style>
