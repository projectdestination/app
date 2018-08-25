<template>
  <form action="">
    <div class="modal-card" style="">
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
import { mapState } from "vuex";

export default {
  data: () => {
    return {
      email: "",
      password: "",
      buttonClicked: false
    };
  },
  computed: {
    ...mapState({
      userIsAuthenticated: state => state.user.userIsAuthenticated
    })
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
  },
  watch: {
    userIsAuthenticated: function() {
      if (this.userIsAuthenticated) {
        this.$store.dispatch("login/closeModal");
        this.$router.push("/app/main");
        this.$parent.close();
      }
    }
  }
};
</script>
