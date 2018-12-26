<template>
  <div>
    <div class="modal-card" style="width: 100%">
      <header class="modal-card-head">
        <p class="modal-card-title">Applicants</p>
      </header>
      <section class="modal-card-body">
        <div class="section">
          <b-field>
            <b-input expanded placeholder=" Search..." type="search" v-model="search"></b-input>
          </b-field>
          <b-field>
            <b-switch v-model="showOnlyNotAttended" type="is-success">Show only unchecked.</b-switch>
          </b-field>
        </div>
        <div class="container">
          <h2 class="title pd-font is-5 uppercase spacing">Double click a row to attend an attendee.</h2>
        </div>
        <div class="section">
          <b-table @dblclick="(obj) => updateRow(obj)" :row-class="() => `hover`" hoverable :data="applicants">
            <template slot-scope="props">
              <b-table-column field="attended" label="Attended" width="10">
                <b-switch disabled v-model="props.row.attended" type="is-success"></b-switch>
              </b-table-column>
              <b-table-column field="name" label="Name" width="500">
                {{ props.row.first_name }} {{props.row.last_name}}
              </b-table-column>
              <b-table-column field="email" label="Email" width="200">
                {{ props.row.email }}
              </b-table-column>
              <b-table-column field="phone" label="Phone" width="200">
                {{ props.row.phone }}
              </b-table-column>
              <b-table-column field="gender" label="Gender" width="100">
                {{ props.row.gender }}
              </b-table-column>
              <b-table-column field="diet" label="Diet" width="150">
                {{ props.row.diet }}
              </b-table-column>
              <b-table-column field="programme" label="Programme" width="200">
                <b-tag type="is-orange">{{ props.row.programme }}</b-tag>
              </b-table-column>
              <b-table-column field="year" label="Year" width="90">
                <b-tag type="is-info">{{ props.row.year }}</b-tag>
              </b-table-column>
              <b-table-column field="date" label="Applied at" width="300">
                <b-tag type="is-success">{{ getMoment(props.row.applied_at) }}</b-tag>
              </b-table-column>
            </template>
          </b-table>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  data: () => {
    return {
      search: "",
      showOnlyNotAttended: false
    };
  },
  computed: {
    ...mapState({
      applicants: function(state) {
        const { applicants } = state.admin.applications;
        const searchString = this.search.toLowerCase();
        let applicantsArray = [];
        Object.keys(applicants).forEach(d => {
          const { email, first_name, last_name, phone, attended } = applicants[
            d
          ];
          const found =
            email.toLowerCase().includes(searchString) ||
            first_name.toLowerCase().includes(searchString) ||
            last_name.toLowerCase().includes(searchString) ||
            phone.toLowerCase().includes(searchString);
          const filter = this.showOnlyNotAttended ? !attended : true;
          if (found && filter) {
            applicantsArray = [...applicantsArray, applicants[d]];
          }
        });
        return applicantsArray;
      }
    })
  },
  methods: {
    getMoment(date) {
      return moment(date).format("D MMMM YY - HH:mm");
    },
    updateRow(object) {
      const payload = {
        ...object,
        attended: !object.attended
      };
      this.$store.dispatch("admin/applications/updateApplicant", payload);
    }
  }
};
</script>

<style lang="css">

.modal-card {
  max-width: none !important;
  width: 75vw !important;
  margin: 0 !important;
  height: 75vh !important;
  border-radius: 0 !important;
}
</style>
