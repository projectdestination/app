<template>
    <b-field :message="message" class="">
        <b-upload :accept="accept" v-model="files">
            <a class="button is-primary">
                <i style="margin-right: 10px" class="material-icons" icon="upload">{{icon}}</i>
                <span>{{text}}</span>
            </a>
        </b-upload>
    </b-field>
</template>

<script>
export default {
  props: {
    text: String,
    icon: String,
    upload: Function,
    accept: String,
    message: String
  },
  data() {
    return {
      files: []
    };
  },
  watch: {
    files: function(file) {
      this.upload(file);
    }
  }
};
</script>
