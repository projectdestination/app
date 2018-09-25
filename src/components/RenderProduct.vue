<template>
  <span>
    <div class="content" v-if="($route.path.includes(`start`) || $route.path.includes(`-`)) && data !== undefined">
      <div class="title uppercase spacing pd-font has-text-centered">
        {{data.title}}
      </div>
      <Level :data="level" />
      <div class="columns is-paddingless is-marginless">
        <div class="column has-background-pd-green is-two-thirds is-child has-text-left">
          <h1 class="title pd-font  is-4">Description</h1>
          <p class="text" v-html="data.text">
          </p>
        </div>
        <div class="column has-background-pd-light is-one-third is-child has-text-left">
          <h1 class="title pd-font  is-4"></h1>
          <p class="text">
          </p>
        </div>
      </div>
      <div class="image-container">
        <img alt="Product Image" :src="data[`image-url`]" class="image" />
      </div>
    </div>
    <div class="content" v-if="$route.params.routeID === `start`">
      <ProductStart />
    </div>
  </span>
</template>

<script>
import ProductStart from "@/components/ProductStart";
import Level from "@/components/Level";

export default {
  name: "RenderProduct",
  components: {
    Level,
    ProductStart
  },
  props: {
    data: Object
  },
  computed: {
    level: function() {
      console.log(`renderdata`, this.data);
      return {
        outerClass: "has-background-pd-pink",
        textColor: "has-text-white",
        content: [
          { text: "Time", value: this.data.properties.time },
          { text: "Location", value: this.data.properties.location },
          { text: "Reach", value: this.data.properties.reach }
        ]
      };
    }
  }
};
</script>

<style scoped>
ul li {
  list-style: none;
  padding: 10px;
}
ul {
  margin: 0 !important;
}

.properties {
  height: 70%;
  border-radius: 20px;
  padding: 20px 0;
  z-index: 9999 !important;
}

.section {
  width: 100%;
}

.text {
  font-size: 110% !important;
}

.content {
  font-weight: 300 !important;
  height: 50vh !important;
}

.image-container {
  max-height: 30vh;
  height: 30vh;
  width: 100%;
  overflow: hidden;
  z-index: 1 !important;
}
.image {
  margin-top: -25%;
  z-index: 0 !important;
}
</style>
