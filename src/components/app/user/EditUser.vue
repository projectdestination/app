<template>
  <div class="modal-card">
    <header class="modal-card-head">
        <p class="modal-card-title"> {{data.first_name}} {{data.last_name}}</p>
        <b-field class="top-select is-pulled-right" label="User type">
            <b-select v-model="data.user_type">
                <option
                    v-for="option in userTypes"
                    v-if="option.value !== `super` || renderSuper"
                    :key="option.value"
                    :value="option.value">
                    {{ option.text }}
                </option>
                <option>None</option>
            </b-select>
        </b-field>
        <b-field class="top-select is-pulled-right" label="Active">
          <b-switch v-model="data.is_validated" type="is-success"></b-switch>
        </b-field>
    </header>
    <section class="modal-card-body">
      <b-field label="Company">
        <b-input disabled v-model="company.display_name"></b-input>
      </b-field>
      <b-field label="Email">
        <b-input disabled v-model="data.email"></b-input>
      </b-field>
      <b-field label="Database ID">
        <b-input disabled v-model="data.id"></b-input>
      </b-field>
      <b-field label="Phone">
        <b-input disabled v-model="data.phone"></b-input>
      </b-field>
      <b-field label="Role">
        <b-input disabled v-model="data.role"></b-input>
      </b-field>
    </section>
<footer class="modal-card-foot ">
  <button class="button is-warning" type="button" @click="$parent.close()">Close <i class="material-icons">clear</i></button>
  <button class="button is-success" type="button" @click="saveUser">Save <i class="material-icons">save</i></button>
  <button class="button is-danger is-pulled-right" type="button" @click="deleteUser">Delete <i class="material-icons">delete_forever</i></button>
</footer>
</div>
</template>

<script>
import { mapState } from "vuex";
import options from "./options";

export default {
  name: "EditUser",
  data: () => {
    return {
      userTypes: { ...options.userTypes }
    };
  },
  computed: {
    ...mapState({
      data: function(state) {
        const { users } = state.admin;
        const user = users[this.id];
        return user;
      },
      renderSuper: state => {
        const { user } = state.user;
        return user.user_type === "super";
      },
      company: function(state) {
        const { companies } = state.admin;
        return companies[this.company_key];
      }
    })
  },
  methods: {
    deleteUser() {
      this.$parent.close();
      this.$store.dispatch("admin/deleteUser", this.data);
    },
    saveUser() {
      this.$parent.close();
      this.$store.dispatch("admin/saveUser", this.data);
    }
  },
  created() {
    this.id = this.$attrs.id;
    this.company_key = this.$attrs.company_key;
  }
};
</script>

<style scoped>
.top-select {
  margin: 0 10px !important;
}

.material-icons {
  transform: scale(0.7);
  margin-left: 5px;
}
.tag {
  margin-right: 5px;
}
</style>
