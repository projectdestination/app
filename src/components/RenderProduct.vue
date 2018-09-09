<template>
  <span>
    <div class="content" v-if="!$route.path.includes(`start`) && data !== undefined">
      <div class="title uppercase spacing pd-font has-text-centered">
        {{data.title}}
      </div>
      <div class="image-container">
        <img alt="Product Image" :src="data[`image-url`]" class="image" />
      </div>
      <div class="columns">
        <div class="column is-three-fifths is-child has-text-left">
          <p v-html="data.text">
          </p>
        </div>
        <div class="column is-one-third">
          <div class="has-text-centered has-background-pd-pink properties">
            <h1 class="pd-font uppercase spacing is-4 has-text-white title">Details</h1>
            <ul class="title uppercase spacing is-7 has-text-white pd-font">
              <li>
                Time: {{data.properties.time}}
              </li>
              <li>
                Location: {{data.properties.location}}
              </li>
              <li>
                Reach: {{data.properties.reach}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="content" v-if="$route.params.routeID === `start`">
      <ProductStart />
    </div>
  </span>
</template>

<script>
import ProductStart from "@/components/ProductStart";
export default {
  name: "RenderProduct",
  components: {
    ProductStart
  },
  props: {
    data: Object
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

.columns {
  padding: 10px 0 0 25px !important;
  margin-top: 20px !important;
  height: 100%;
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
