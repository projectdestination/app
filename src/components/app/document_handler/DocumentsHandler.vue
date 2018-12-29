<template>
    <section>
        <b-field label="File uploader" :message="message">
            <b-upload
            v-model="files"
                :multiple="false"
                type="is-home"
                drag-drop>
                <section class="section">
                    <div class="content has-text-centered">
                        <p>
                            <i style="margin-right: 10px; font-size: 250%;" class="material-icons" icon="upload">{{icon}}</i>
                        </p>
                        <p>{{text}}</p>
                    </div>
                </section>
            </b-upload>
        </b-field>
    </section>
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
