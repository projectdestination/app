<template>
  <div>
    <section class="hero is-medium is-bold is-fullheight" v-bind:class="data.outerClass">
      <div class="hero-body">
        <div class="container has-text-centered" v-bind:class="data.innerClass">
          <h1 class="title" v-bind:class="data.titleClass">
            {{data.title}}
          </h1>
          <h2 class="subtitle" v-bind:class="data.subTitleClass">
            {{data.subtitle}}
          </h2>
        </div>
      </div>
      <div class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth">
      <div class="container">
        <ul>
          <li v-bind:key="item" v-for="item in data.navData">
            <a>{{item}}</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</section>
  </div>

</template>


<script>
export default {
  name: "Hero",
  props: {
    data: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a {
  transition: all 0.3s;
}
</style>
