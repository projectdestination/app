<template>
  <div class="container">
    <b-table :row-class="() => `hover`" hoverable @click="object => openModal(object)" :data="data">
      <template slot-scope="props">
        <b-table-column field="display_name" label="Title" width="200">
          {{ props.row.display_name }}
        </b-table-column>
        <b-table-column field="priority" label="Priority" width="100">
          <span class="tag" :class="getPriorityClass(props.row.priority)" >
            {{ props.row.priority }}
          </span>
        </b-table-column>
        <b-table-column field="organization_number" label="Organisation number" width="200">
          {{ props.row.organization_number }}
        </b-table-column>
        <b-table-column field="street" label="Address">
          {{ `${props.row.address.street} ${props.row.address.number}` }}
        </b-table-column>
        <b-table-column field="responsible" label="Responsible">
          {{ props.row.responsible }}
        </b-table-column>
        <b-table-column field="domain" label="Domain" width="200">
          {{ props.row.domain }}
        </b-table-column>
        <b-table-column field="status" label="Status" width="100">
          <span class="tag" :class="getStatusClass(props.row.status)" >
            {{ props.row.status }}
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
          break;
        case "Meeting":
          return "is-warning";
          break;
        case "Contacted":
          return "is-orange";
          break;
        case "Call later":
          return "is-info";
          break;
        case "No":
          return "is-danger";
          break;
        default:
          return "is-white";
          break;
      }
    },
    getPriorityClass(priority) {
      switch (priority) {
        case "High":
          return "is-danger";
          break;
        case "Medium":
          return "is-orange";
          break;
        case "Low":
          return "is-success";
          break;
        default:
          return "is-white";
          break;
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
