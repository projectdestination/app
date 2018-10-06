<template>
  <div class="container">
    <b-table :row-class="() => `hover`" hoverable @click="object => openModal(object)" :data="data">
      <template slot-scope="props">
        <b-table-column field="display_name" label="Title" width="200">
          {{ props.row.display_name }}
        </b-table-column>
        <b-table-column field="priority" label="Priority" width="100">
          <span class="tag" :class="getPriorityClass(props.row.priority)" >
            {{ props.row.priority ? props.row.priority:"None" }}
          </span>
        </b-table-column>
        <b-table-column field="organization_number" label="Organisation number" width="200">
          {{ props.row.organization_number ? props.row.organization_number:"Undefined" }}
        </b-table-column>
        <b-table-column field="responsible" label="Responsible">
          {{ props.row.responsible ? props.row.responsible:"None" }}
        </b-table-column>
        <b-table-column field="domain" label="Domain" width="200">
          {{ props.row.domain ? props.row.domain:"Undefined" }}
        </b-table-column>
        <b-table-column field="status" label="Status" width="100">
          <span class="tag" :class="getStatusClass(props.row.status)" >
            {{ props.row.status ? props.row.status:"None" }}
          </span>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditCompany from "./EditCompany";

export default {
  computed: {
    ...mapGetters({
      data: "admin/getCompanies"
    })
  },
  methods: {
    openModal(data) {
      this.$ga.event({
        eventCategory: "Company",
        eventAction: "Clicked company in table",
        eventValue: data.company_key
      });
      this.$modal.open({
        parent: this,
        component: EditCompany,
        props: { company_key: data.company_key },
        hasModalCard: true
      });
    },
    getStatusClass(status) {
      switch (status) {
        case "Booked":
          return "is-success";
        case "Meeting":
          return "is-warning";
        case "Contacted":
          return "is-orange";
        case "Call later":
          return "is-info";
        case "No":
          return "is-danger";
        default:
          return "is-white";
      }
    },
    getPriorityClass(priority) {
      switch (priority) {
        case "High":
          return "is-danger";
        case "Medium":
          return "is-orange";
        case "Low":
          return "is-success";
        default:
          return "is-white";
      }
    }
  }
};
</script>

<style lang="css">
.hover {
  cursor: pointer;
}
</style>
