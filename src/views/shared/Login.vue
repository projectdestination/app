<template>
  <form action="">
    <div class="modal-card" style="max-width: 960px;">
      <header class="modal-card-head">
        <p class="modal-card-title">Login</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Email">
          <b-input
          type="email"
          v-model="email"
          placeholder="Your email"
          required>
        </b-input>
      </b-field>

      <b-field label="Password">
        <b-input
        type="password"
        v-model="password"
        password-reveal
        placeholder="Your password"
        required>
      </b-input>
    </b-field>

    <b-checkbox>Remember me</b-checkbox>
  </section>
  <footer class="modal-card-foot">
    <button class="button" type="button" @click="$parent.close()">Close</button>
    <a @click="login" class="button is-primary">Login</a>
  </footer>
</div>
</form>
</template>
<script>
export default {
  data: () => {
    return {
      email: "",
      password: "",
      buttonClicked: false
    };
  },
  methods: {
    login() {
      this.buttonClicked = true;
      this.$store.dispatch("user/signUserIn", {
        email: this.email,
        password: this.password
      });
      this.$parent.close();
    }
  }
};
</script>
