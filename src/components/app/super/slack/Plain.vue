<template>
  <div>
    <b-field label="Text">
        <b-input expanded textarea placeholder="Enter message" type="textarea" v-model="text"></b-input>
    </b-field>
    <button class="button is-success" type="button" @click="send">Send <i class="material-icons">send</i></button>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      text: ""
    };
  },
  methods: {
    send() {
      const { text } = this;
      const payload = { attachments: [{ text }] };
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
