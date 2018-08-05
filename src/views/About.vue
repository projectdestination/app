<template>
  <div class="about">
    <vs-button v-on:click="create" vs-color="primary" vs-type="filled">Add</vs-button>
    <vs-button v-on:click="remove" vs-color="primary" vs-type="filled">Delete</vs-button>
    <vs-button v-on:click="signInUser" vs-color="primary" vs-type="filled">Sign in</vs-button>
  </div>
</template>
<script>
import {
  createUser,
  removeUser,
  signIn
} from "../../javascripts/firebase/firebase";

export default {
  name: "HelloWorld",
  data: () => {
    return {
      kej: "asdfasdfasdf"
    };
  },
  props: {
    msg: String
  },
  methods: {
    create() {
      createUser({ email: "soner@vergon.se", password: "123123123" }, () =>
        console.log("hej")
      );
    },
    remove() {
      removeUser();
    },
    signInUser() {
      signIn({ email: "soner@vergon.se", password: "123123123" });
    }
  }
};
</script>
