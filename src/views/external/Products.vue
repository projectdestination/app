<template>
  <div class="products">
    <div class="tile is-ancestor is-marginless is-paddingless">
      <div class="tile is-3 is-vertical is-parent is-marginless is-paddingless">
        <div class="tile section is-child">
          <ProductMenu />
        </div>
      </div>
      <div class="tile padding is-parent is-9 has-text-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HeroSmall from "@/components/HeroSmall";
import ProductMenu from "@/components/ProductMenu";
import Product from "@/components/Product";

export default {
  components: {
    HeroSmall,
    ProductMenu,
    Product
  },
  computed: {
    data: function() {
      return {
        title: "Our Products",
        titleClass: "pd-font",
        outerClass: "is-fullheight",
        innerClass: "has-text-centered",
        outerStyle: "max-width: inherit !important"
      };
    }
  }
};
</script>

<style scoped>
@media only screen and (min-width: 1000px) {
  .products {
    max-height: none;
    min-height: 100vh;
    overflow: auto !important;
  }
}
@media only screen and (min-width: 1300px) {
  .products {
    max-height: 100vh;
    overflow: hidden;
  }
}
.is-ancestor {
  height: 100vh !important;
  max-height: 100vh !important;
}
</style>
