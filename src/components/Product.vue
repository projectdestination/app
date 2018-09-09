<template>
  <transition name="bounce">
    <div ref="element" v-if="show" class="section">
      <RenderProduct :data="data" />
    </div>
</transition>
</template>

<script>
import { mapState } from "vuex";
import RenderProduct from "@/components/RenderProduct";
export default {
  data: () => {
    return {
      show: true
    };
  },
  components: {
    RenderProduct
  },
  computed: {
    ...mapState({
      data: function(state) {
        return state.content.products[this.$route.params.routeID];
      }
    })
  },
  watch: {
    data: function() {
      this.loadingComponent = this.$loading.open({
        container: this.$refs.element
      });
      this.show = false;
      setTimeout(() => {
        this.show = true;
        setTimeout(() => {
          this.loadingComponent.close();
        }, 4000);
      }, 1000);
    }
  }
};
</script>

<style scoped>
.section {
  width: 100%;
}
.bounce-enter-active {
  animation: bounce-in 0.2s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translate(100%, 0);
  }
  50% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
