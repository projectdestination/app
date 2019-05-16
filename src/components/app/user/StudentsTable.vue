<template>
  <div class="container">
    <div class="section">
      <p class="title is-7">Showing: {{data.length}} students.</p>
    </div>
    <b-field>
      <b-input expanded placeholder=" Search..." type="search" v-model="search"></b-input>
    </b-field>
    <b-table :row-class="() => `hover`" hoverable @click="object => openModal(object)" :data="data">
      <template slot-scope="props">
        <b-table-column field="first_name" label="First name" width="100">{{ props.row.first_name }}</b-table-column>
        <b-table-column field="last_name" label="Last name" width="200">{{ props.row.last_name }}</b-table-column>
        <b-table-column field="email" label="E-mail" width="250">{{ props.row.email }}</b-table-column>
        <b-table-column field="phone" label="Phone" width="100">{{ props.row.phone }}</b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      data: "admin/getStudents",
      companyNames: "admin/companies/getCompanyNames"
    }),
    search: {
      get: function() {
        return this.$store.state.admin.companies.searchString;
      },
      set: function(value) {
        this.$store.dispatch("admin/updateSearch", value);
      }
    }
  },
  methods: {}
};
</script>

<style lang="css">
.hover {
  cursor: pointer;
}
</style>
