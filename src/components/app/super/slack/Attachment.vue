<template>
  <div>
    <b-field label="Main text">
        <b-input type="textarea" expanded placeholder="Main text" v-model="pretext"></b-input>
    </b-field>
    <b-field label="Attachment title">
        <b-input expanded placeholder="Title" v-model="title"></b-input>
    </b-field>
    <b-field label="Attachment link">
        <b-input expanded placeholder="Link" v-model="title_link"></b-input>
    </b-field>
    <b-field label="Attachment text">
        <b-input expanded textarea placeholder="Enter message" type="textarea" v-model="text"></b-input>
    </b-field>
    <b-field label="Color">
        <b-input expanded placeholder="Color" v-model="color"></b-input>
    </b-field>
    <button class="button is-success" type="button" @click="send">Send <i class="material-icons">send</i></button>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      text: "",
      color: "#36a64f",
      pretext: "",
      title: "",
      title_link: ""
    };
  },
  methods: {
    send() {
      const { color, text, pretext, title, title_link } = this;
      const payload = {
        attachments: [
          {
            fallback: text,
            color,
            pretext,
            title,
            title_link,
            text
          }
        ]
      };
      this.$store.dispatch("slack/sendAttachment", payload);
    }
  }
};
</script>
<style scoped>
.material-icons {
  transform: scale(0.7);
  margin-left: 5px;
}
</style>
