<template>
  <div class="col-container">
  <div class="columns status">
    <div class="tile col column tile-config-large box">
    </div>
    <div class="tile col column tile-config-large box">
    </div>
  </div>
  <div class="columns status-bar">
    <div class="tile col column tile-config-large box">
      <progress class="progress is-success" v-bind:value="val" max="100">60%</progress>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data: () => {
    return {
      val: 0
    };
  },
  created() {
    setInterval(() => {
      const { val } = this;
      if (val <= 100) this.val = val + 10;
      else this.val = 0;
    }, 1000);
  }
};
</script>

<style scoped>
.status-bar {
  height: 20%;
}
.status {
  height: 80%;
}
.col {
  margin: 10px !important;
}
.col-container {
  height: 75%;
}
</style>
