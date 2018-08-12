<template>
  <div class="form">
    <h2 class="subtitle is-4">Personal details details</h2>
    <b-field horizontal label="Name">
          <b-input rounded placeholder="First name"></b-input>
          <b-input rounded placeholder="Last name"></b-input>
      </b-field>
      <b-field horizontal label="Email">
            <b-input rounded placeholder="Email"></b-input>
        </b-field>
        <div class="divider">

        </div>
        <h2 class="subtitle is-4">Company details</h2>
        <b-field horizontal label="Company">
            <b-select expanded placeholder="Select your company" rounded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
            <b-select expanded placeholder="Your role" rounded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>
        <b-field horizontal>
          <h2 class="subtitle is-6 is-pulled-right">If you can't find your company you can contact us at help@projectdestination.se</h2>
        </b-field>

        <b-field horizontal label="Adress">
              <b-input rounded placeholder="Street"></b-input>
              <b-input rounded placeholder="Number"></b-input>
              <b-input rounded placeholder="Box number"></b-input>
          </b-field>
          <b-field horizontal>
                <b-input rounded placeholder="City"></b-input>
                <b-input rounded placeholder="Postal code"></b-input>
            </b-field>
            <a v-on:click="createUser" class="button">Send</a>
  </div>
</template>

<script>
export default {
  methods: {
    createUser() {
      this.$store.dispatch("user/createUser", {
        email: "soner@vergon.se",
        password: "123456"
      });
    }
  }
};
</script>

<style scoped lang="scss">
h2 {
  color: rgba(0, 0, 0, 0.7);
}
.form {
  background-color: rgba(#bdbdbd, 0.2);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 0 100px rgba(#000, 0.7);
}
.divider {
  height: 1px;
  margin: 5% 0;
}
</style>
