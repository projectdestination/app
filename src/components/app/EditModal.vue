<template>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{data.title}} with {{data.owner}}</p>
      </header>
      <section class="modal-card-body section">
        <div class="container">
          <div class="columns">
            <div class="column">
              <span :key="index" v-for="(key, index) in Object.keys(data)">
                <InputField v-if="index >= 7" :onChange="handleChange" :initialData="data[key]" :keyID="key" />
              </span>
            </div>
            <div class="column">
              <span :key="index" v-for="(key, index) in Object.keys(data)">
                <InputField v-if="index < 7" :onChange="handleChange" :initialData="data[key]" :keyID="key" />
              </span>
            </div>
          </div>
        </div>
      </section>
  <footer class="modal-card-foot ">
    <button class="button is-danger" type="button" @click="$parent.close()">Close <i class="material-icons">clear</i></button>
    <button class="button is-success" type="button" @click="handleSave">Save <i class="material-icons">save</i></button>
  </footer>
</div>
</template>

<script>
import InputField from "@/components/app/InputField";

export default {
  components: {
    InputField
  },
  data: () => {
    return {
      data: {},
      type: ""
    };
  },
  methods: {
    handleSave() {
      //this.$parent.close();
    },
    handleChange(key, value) {
      this.data[key] = value;
    }
  },
  created() {
    this.data = this.$attrs.content;
    this.type = this.$attrs.type;
  }
};
</script>

<style scoped>
.modal-card {
  max-width: none !important;
  width: 100vw !important;
  margin: 0 !important;
  height: 100vh !important;
  border-radius: 0 !important;
}
.material-icons {
  transform: scale(0.7);
  margin-left: 5px;
}
</style>
