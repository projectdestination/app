<template>
  <section>

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
          <li v-bind:key="item" v-for="item in data.navData">
            <a><input v-on:change="handleChange" class="input" placeholder="Enter text" v-model="item.text" ></a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</section>
<section class="section container">
  <div class="tile is-ancestor container">
    <div class="tile">
      <div class="content">
        <h1>Styling</h1>
        <p>
          Set your component's style here, find <br /> classes at <strong>bulma.io</strong>  or use <br /> inline styles by coding your own css.
        </p>
        <div>
          <b-field label="Outer classes">
            <b-input v-on:input="handleChange" v-model="data.outerClass" v-bind:value="data.outerClass"></b-input>
          </b-field>
          <b-field label="Inner classes">
            <b-input v-on:input="handleChange" v-model="data.innerClass" v-bind:value="data.innerClass"></b-input>
          </b-field>
          <b-field label="Title classes">
            <b-input v-on:input="handleChange" v-model="data.titleClass" v-bind:value="data.titleClass"></b-input>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</section>

  </section>
</template>
<script>
// @ is an alias to /src

export default {
  name: "home",
  props: {
    data: Object,
    handleChange: Function
  },
  components: {},
  methods: {}
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
