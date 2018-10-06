<template>
    <div class="modal-card">
      <header class="modal-card-head">
          <p class="modal-card-title"> {{data.display_name}}</p>
          <b-field class="top-select is-pulled-right" label="Responsible">
              <b-select v-model="data.responsible">
                  <option
                      v-for="option in adminUsers"
                      :key="option.id">
                      {{ option.name }}
                  </option>
              </b-select>
          </b-field>
          <b-field class="top-select is-pulled-right" label="Priority">
              <b-select v-model="data.priority">
                  <option
                      v-for="option in priorityOptions"
                      :key="option.value">
                      {{ option.value }}
                  </option>
              </b-select>
          </b-field>
          <b-field class="top-select is-pulled-right" label="Status">
              <b-select v-model="data.status">
                  <option
                      v-for="option in statusOptions"
                      :key="option.value">
                      {{ option.value }}
                  </option>
              </b-select>
          </b-field>
      </header>
      <section class="modal-card-body section">
        <div class="container">
          <div class="columns">
            <div class="column">
              <div class="section">
                <h2 class="title pd-font uppercase spacing">Organization</h2>
                <b-field label="Organization Number">
                  <b-input v-model="data.organization_number"></b-input>
                </b-field>
                <b-field label="Domain">
                  <b-input v-model="data.domain"></b-input>
                </b-field>
                <b-field label="Database ID">
                  <b-input disabled v-model="data.key"></b-input>
                </b-field>
                <b-field label="Company ID">
                  <b-input disabled v-model="data.company_key"></b-input>
                </b-field>
                <b-field label="Industry">
                  <b-input disabled v-model="data.industry"></b-input>
                </b-field>
              </div>
              <div class="section">
                <h2 class="title pd-font uppercase spacing">Address</h2>
                <b-field>
                  <b-input expanded placeholder="Street" v-model="data.address.street"></b-input>
                  <b-input placeholder="Number" v-model="data.address.number"></b-input>
                </b-field>
                <b-field>
                  <b-input placeholder="City" expanded v-model="data.address.city"></b-input>
                  <b-input placeholder="Postal Code" v-model="data.address.postal_code"></b-input>
                </b-field>
                <b-field>
                  <b-input placeholder="Region" v-model="data.address.region"></b-input>
                </b-field>
                <b-field>
                  <b-input placeholder="Country" v-model="data.address.country"></b-input>
                </b-field>
              </div>
            </div>
            <div class="column">
              <div class="section">
                <h2 class="title pd-font uppercase spacing">Contact <small class="title is-7 pd-font">(Non unsers)</small></h2>
                <article class="media" :key="user.id" v-if="user" v-for="user in data.contacts">
                  <a ><i class="material-icons has-text-danger">delete_forever</i></a>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>{{user.first_name}} {{user.last_name}}</strong>
                        <span class="is-pulled-right tag is-info">{{user.role}}</span>
                        <br>
                        <small>{{user.email}}</small>
                        <span class="is-pulled-right"><small>{{user.phone}}</small></span>
                        <br>
                      </p>
                    </div>
                  </div>
                  <div class="media-right">

                  </div>
                </article>
                </div>
                <div class="section">
                <h2 class="title pd-font uppercase spacing">Users</h2>
                <article class="media" :key="user.id" v-if="user" v-for="user in users">
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>{{user.first_name}} {{user.last_name}}</strong>
                        <span class="is-pulled-right tag is-info">{{user.role}}</span>
                        <span class="tag is-pulled-right" :class="user.is_validated ? `is-success`: `is-danger`">
                          {{ user.is_validated ? "Validated" : "Needs validation" }}
                        </span>
                        <br>
                        <small>{{user.email}}</small>
                        <span class="is-pulled-right"><small>{{user.phone}}</small></span>
                        <br>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div class="column">
              <div class="section">
                <h2 class="title pd-font uppercase spacing">Events</h2>
                <EventColumn :company_key="data.company_key" :closeModal="closeModal" :isAdmin="true" />
              </div>
            </div>
          </div>
        </div>
      </section>
  <footer class="modal-card-foot ">
    <button class="button is-warning" type="button" @click="closeModal">Close <i class="material-icons">clear</i></button>
    <button class="button is-success" type="button" @click="handleSave">Save <i class="material-icons">save</i></button>
    <button class="button is-danger is-pulled-right" type="button" @click="handleSave">Delete <i class="material-icons">delete_forever</i></button>
  </footer>
</div>
</template>

<script>
import { mapState } from "vuex";
import EventColumn from "@/components/app/main/EventColumn";
import options from "./options";

export default {
  components: {
    EventColumn
  },
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
    handleSave() {},
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
