<template>
  <div class="container">
    <b-table :row-class="() => `hover`" hoverable @click="object => openModal(object)" :data="data">
      <template slot-scope="props">
        <b-table-column field="first_name" label="First name" width="100">
          {{ props.row.first_name }}
        </b-table-column>
        <b-table-column field="last_name" label="Last name" width="200">
          {{ props.row.last_name }}
        </b-table-column>
        <b-table-column field="email" label="E-mail" width="250">
          {{ props.row.email }}
        </b-table-column>
        <b-table-column field="company_key" label="Company">
          {{ companyNames[props.row.company_key] }}
        </b-table-column>
        <b-table-column field="phone" label="Phone" width="100">
          {{ props.row.phone }}
        </b-table-column>
        <b-table-column field="is_validated" label="Validation" width="200">
          <span class="tag" :class="props.row.is_validated ? `is-success`: `is-danger`">
            {{ props.row.is_validated ? "Validated" : "Needs validation" }}
          </span>
        </b-table-column>
        <b-table-column field="user_type" label="User type" width="50">
          <span class="tag is-info">
              {{ `${props.row.user_type[0].toUpperCase()}${props.row.user_type.slice(1)}` }}
          </span>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditUser from "./EditUser";

export default {
  computed: {
    ...mapGetters({
      data: "admin/getUsers",
      companyNames: "admin/companies/getCompanyNames"
    })
  },
  methods: {
    openModal(data) {
      this.$ga.event({
        eventCategory: "users",
        eventAction: "Clicked user",
        eventLabel: "table"
      });
      this.$modal.open({
        parent: this,
        component: EditUser,
        props: { id: data.id, company_key: data.company_key },
        hasModalCard: true
      });
    }
  }
};
</script>

<style lang="css">
.hover {
  cursor: pointer;
}
</style>
