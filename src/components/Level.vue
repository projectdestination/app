<template>
  <section class="section" :style="data.outerStyle" :class="data.outerClass">
      <nav class="level">
          <div v-bind:key="item.text" v-for="item in data.content" class="level-item has-text-centered">
            <div>
              <p :class="data.textColor" class="heading">{{item.text}}</p>
              <p :class="data.textColor" class="title">{{item.value}}</p>
          </div>
        </div>
      </nav>
    </section>
</template>


<script>
/*
Example prop:
content: [
  { text: "Events", value: "300" },
  { text: "Students", value: "20 000" },
  { text: "Partners", value: "50" }
]
*/
export default {
  name: "Level",
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
