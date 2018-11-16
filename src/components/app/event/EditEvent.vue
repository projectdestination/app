<template>
    <div class="modal-card">
      <header class="modal-card-head">
          <p class="modal-card-title"> {{data.display_name}}</p>
          <b-field class="top-select is-pulled-right" label="Responsible">
          </b-field>
          <b-field class="top-select is-pulled-right" label="Priority">
          </b-field>
          <b-field class="top-select is-pulled-right" label="Status">
          </b-field>
      </header>
      <section class="modal-card-body section">
        <div class="container">
          <div class="columns">
            <div class="column">
              <div class="section">
                <h2 class="title pd-font uppercase spacing">Organization</h2>
              </div>
              <div class="section">
                <h2 class="title pd-font uppercase spacing">Address</h2>
              </div>
            </div>
            <div class="column">
              <div class="section">
                <h2 class="title pd-font uppercase spacing">
                  Contact
                  <small class="title is-7 pd-font">(Non unsers)</small>
                </h2>
                </div>
                <div class="section">
                <h2 class="title pd-font uppercase spacing">Users</h2>
              </div>
            </div>
            <div class="column">
              <div class="section">
                <h2 class="title pd-font uppercase spacing">Events</h2>
              </div>
              <div class="section">
                <h2 class="title pd-font uppercase spacing">Notes</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
  <footer class="modal-card-foot ">
    <button class="button is-warning" type="button" @click="closeModal">Close <i class="material-icons">clear</i></button>
    <button class="button is-success" type="button" @click="handleSave">Save <i class="material-icons">save</i></button>
    <button class="button is-danger is-pulled-right" type="button" @click="deleteCompany">Delete <i class="material-icons">delete_forever</i></button>
  </footer>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => {
    return {
      priorityOptions: {
        ...options.priorityOptions
      },
      statusOptions: {
        ...options.statusOptions
      }
    };
  },
  computed: {
    ...mapState({
      data: function(state) {
        const { companies } = state.admin;
        const company = companies[this.company_key];
        return company;
      },
      address: function(state) {
        const { companies } = state.admin;
        const company = companies[this.company_key];
        return { ...company.address };
      },
      contacts: function(state) {
        const { companies } = state.admin;
        if (companies[this.company_key].contacts === undefined) {
          return {};
        } else {
          return companies[this.company_key].contacts;
        }
      },
      users: function(state) {
        const { users } = state.admin;
        const companyUsers = Object.keys(users).map(d => {
          if (users[d].company_key === this.data.company_key) {
            return users[d];
          }
        });
        return companyUsers;
      },
      adminUsers: function(state) {
        const { users } = state.admin;
        const adminUsers = Object.keys(users).map(d => {
          if (
            users[d].user_type === "admin" ||
            users[d].user_type === "super"
          ) {
            return {
              ...users[d],
              name: `${users[d].first_name} ${users[d].last_name}`
            };
          }
        });
        return adminUsers;
      }
    })
  },
  methods: {
    handleSave() {
      const { dispatch } = this.$store;
      const { address, contacts } = this;
      const payload = { ...this.data, address, contacts };
    },
    closeModal() {
      this.$parent.close();
    }
  },
  created() {
    this.company_key = this.$attrs.company_key;
  }
};
</script>

<style scoped>
.top-select {
  margin: 0 10px !important;
}
.modal-card {
  max-width: none !important;
  width: 100vw !important;
  margin: 0 !important;
  height: 100vh !important;
  border-radius: 0 !important;
}
.material-icons {
  transform: scale(0.7);
  margin-left: 5px;
}
.tag {
  margin-right: 5px;
}
</style>
