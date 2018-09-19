<template>
  <div>
    <div class="section container">
      <a @click="addProductModal = true" class="button is-success">Add new type</a>
    </div>
    <b-modal :active.sync="addProductModal">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="title is-4 pd-font modal-card-title">
            Enter title
          </p>
        </header>
        <div class="modal-card-body">
          <p class="content">
            You are one step away from creating a new product for the product catalogue.<br />
            <span class="has-text-danger">Warning, if you name your new event with the same title as an existing one you will overwrite the existing product's properties, the title must be unique.</span>
          </p>
          <b-field label="Title">
            <b-input v-model="title"></b-input>
          </b-field>
        </div>
        <footer class="modal-card-foot">
          <button class="button is-success" type="button" @click="addNewProduct()">Create new product type</button>
          <button class="button is-danger" type="button" @click="addProductModal = false">Close</button>
        </footer>
      </div>
    </b-modal>
    <div class="columns">
      <div class="column">
        <MediaObject v-for="(object, index) in data" :data="object" />
      </div>
    </div>
  </div>
</template>

<script>
import MediaObject from "@/components/MediaObject";
import { mapState } from "vuex";

export default {
  components: {
    MediaObject
  },
  data: () => {
    return {
      addProductModal: false,
      title: ""
    };
  },
  computed: {
    ...mapState({
      data: state => {
        const { products } = state.content;
        return state.content.products;
      }
    })
  },
  methods: {
    addNewProduct() {
      let { title } = this;
      const validated = title != "" && !title.includes(".");
      if (validated) {
        title = title.toLowerCase();
        title = title.trim();
        title = title.replace(/ /g, "-");
        const key = title;
        this.$store.dispatch("content/addNewProduct", {
          key,
          title: this.title
        });
        this.addProductModal = false;
        this.title = "";
      }
    }
  }
};
</script>

<style lang="css">
</style>
