<template>
  <span>
  <div class="title pd-font uppercase spacing has-text-right">
    Start
  </div>
  <div class="image-container">
    <img alt="Product Image" src="https://firebasestorage.googleapis.com/v0/b/project-destination.appspot.com/o/plane.jpg?alt=media&token=19d73de4-ad1e-4867-b104-90afb04150e8" class="image" />
  </div>
  <div class="columns-container">
  <div class="columns is-marginless is-paddingless has-text-centered" :key="rowIndex" v-for="(row, rowIndex) in columns">
    <div @click="handleClick(item)" class="column" :class="[`has-background-pd-${item.color}`, item.question === `What is Project Desitnation?` && `animation`] " :key="index" v-for="(item,index) in row">
      <div class="title pd-font is-5 spacing uppercase">
        {{item.question}}
      </div>
    </div>
  </div>
</div>
<ProductModal :closeModal="closeModal" :isActive="modalIsActive" :data="activeData" />
</span>
</template>

<script>
import ProductModal from "@/components/ProductModal";
import items from "@/../javascripts/answers";
export default {
  components: {
    ProductModal
  },
  data: () => {
    return {
      modalIsActive: false,
      activeData: {},
      columns: items
    };
  },
  methods: {
    handleClick(data) {
      this.activeData = data;
      this.modalIsActive = true;
    },
    closeModal() {
      this.modalIsActive = false;
    }
  }
};
</script>

<style scoped>
.column .title {
  padding: 10% 10px;
  transition: transform 0.2s;
}
.column .title:hover {
  transform: scale(1.05);
  cursor: pointer;
}
.image-container {
  max-height: 30vh !important;
  height: 20vh;
  width: 100%;
  overflow: hidden;
  z-index: 1 !important;
}
.image {
  margin-top: -25%;
  z-index: 0 !important;
}
.animation {
  animation: bounce-in 0.9s;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
