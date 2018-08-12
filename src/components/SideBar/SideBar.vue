<template>
  <div>
<div class="button-container">
  <a v-if="!active" v-on:click="handleSideBar" class="is-pulled-left side-bar-button"><i class="material-icons is-pulled-left">keyboard_arrow_right</i> Open style tab</a>
</div>
<div v-if="active" class="section side-bar-container container">
  <a v-on:click="handleSideBar" class="is-pulled-right side-bar-button"><i class="material-icons is-pulled-right">keyboard_arrow_left</i> Close</a>
    <HeroContent v-if="data.type === 'hero'" v-bind:data="data" v-bind:handleChange="handleChange" />
</div>
</div>
</template>

<script>
import HeroContent from "./SideBarContent/HeroContent";

export default {
  name: "SideBar",
  props: {
    type: String,
    data: Object,
    active: Boolean,
    handleChange: Function,
    handleSideBar: Function
  },
  components: {
    HeroContent
  }
};
</script>

<style scoped lang="scss">
.side-bar-container {
  position: absolute !important;
  background-color: #fff;
  width: 40%;
  height: 100vh;
  box-shadow: 2px 0 10px rgba(#000000, 0.2);
  z-index: 1000;
  background-color: rgba(#fff, 0.7);
}

.button-container {
  position: absolute;
  top: 50%;
}

.side-bar-button:hover {
  transform: scale(1.07);
}

.side-bar-button {
  color: rgba(#000000, 0.7);
  transition: transform 0.3s;
}
</style>
