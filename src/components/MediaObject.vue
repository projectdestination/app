<template >
  <div v-if="data" class="card pd-font transition">
    <header class="card-header">
      <div class="card-header-title uppercase spacing">
        <span v-if="data.isRecomended && !isEditMode" class="tag is-pd-green type">Recomended</span>
        <p  v-if="!isEditMode">
          {{data.title}}
        </p>
        <b-input class="type" v-if="isEditMode" v-model="data.title"></b-input>
        <b-switch class="type" v-if="isEditMode" type="is-success" v-model="data.isRecomended">Recommended</b-switch>
      </div>
      <div class="card-header-icon is-pulled-right type">
        <p class="type">
          Type:
        </p>
        <p v-if="!isEditMode">
         {{data.type}}
        </p>
        <b-select v-model="data.type" v-if="isEditMode">
                <option
                    v-for="option in options"
                    :value="option.id"
                    :key="option.id">
                    {{ option.value }}
                </option>
          </b-select>
      </div>
    </header>
    <div class="card-content">
      <nav v-if="!isEditMode" class="level is-mobile">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Location</p>
            <p class="title pd-font is-6">{{data.properties.location}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Reach</p>
            <p class="title pd-font is-6">{{data.properties.reach}}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">Time</p>
            <p class="title pd-font is-6">{{data.properties.time}}</p>
          </div>
        </div>
      </nav>
      <div v-if="!isEditMode" class="content">
        {{data.text}}
      </div>
      <div v-if="isEditMode" class="columns">
        <div class="column">
          <b-field label="Location">
              <b-input v-model="data.properties.location"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Reach">
              <b-input v-model="data.properties.reach"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field label="Time">
              <b-input v-model="data.properties.time"></b-input>
          </b-field>
        </div>
      </div>
      <b-input v-model="data.text" v-if="isEditMode" maxlength="400" type="textarea"></b-input>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item has-text-success" @click="handleSuccessClick()">{{isEditMode?"Save":"Edit"}}</a>
      <a v-if="isEditMode" class="card-footer-item has-text-warning" @click="onCancel()">Cancel</a>
      <a v-if="isEditMode" class="card-footer-item has-text-danger" :class="{[`is-loading`]:deleteButtonLoading}" @click="onDelete()">Delete</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: "MediaObject",
  props: {
    data: Object
  },
  data: () => {
    return {
      isEditMode: false,
      options: [
        { id: "event", value: "Event" },
        { id: "marketing", value: "Marketing" },
        { id: "other", value: "Other" }
      ],
      deleteButtonLoading: false
    };
  },
  methods: {
    onSave() {
      this.isEditMode = false;
      this.$store.dispatch("content/saveProductContent", this.data);
    },
    onEdit() {
      this.isEditMode = true;
    },
    onCancel() {
      this.isEditMode = false;
    },
    onDelete() {
      this.deleteButtonLoading = true;
      this.isEditMode = false;
      this.$store.dispatch("content/deleteProduct", this.data);
    },
    handleSuccessClick() {
      this.isEditMode ? this.onSave() : this.onEdit();
    }
  }
};
</script>

<style lang="css">
.card {
  margin-bottom: 5%;
}
.type {
  margin-right: 10px;
}
</style>
