<template>
  <div class="container">
      <b-field>
        <b-input expanded placeholder=" Search..." type="search" v-model="search"></b-input>
        <b-select expanded placeholder="Status" v-model="status">
          <option>No filter</option>
            <option
                v-for="option in statuses"
                :key="option.value">
                {{ option.value }}
            </option>
        </b-select>
        <b-select expanded placeholder="Priority" v-model="priority">
          <option>No filter</option>
            <option
                v-for="option in priorities"
                :key="option.value">
                {{ option.value }}
            </option>
        </b-select>
    </b-field>
    <b-table :row-class="() => `hover`" hoverable @click="object => openModal(object)" :data="companies">
      <template slot-scope="props">
        <b-table-column field="display_name" label="Title" width="200">
          {{ props.row.display_name }}
        </b-table-column>
        <b-table-column field="priority" label="Priority" width="300">
          <span class="tag" :class="getPriorityClass(props.row.priority)" >
            {{ props.row.priority ? props.row.priority:"None" }}
          </span>
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
import Options from "./options";

export default {
  data: () => {
    return {
      statuses: { ...Options.statusOptions },
      priorities: { ...Options.priorityOptions }
    };
  },
  computed: {
    ...mapGetters({
      companies: "admin/companies/getCompanies"
    }),
    search: {
      get: function() {
        return this.$store.state.admin.companies.searchString;
      },
      set: function(value) {
        this.$store.dispatch("admin/companies/updateSearch", value);
      }
    },
    priority: {
      get: function() {
        return this.$store.state.admin.companies.priority;
      },
      set: function(value) {
        this.$store.dispatch("admin/companies/updatePriority", value);
      }
    },
    status: {
      get: function() {
        return this.$store.state.admin.companies.status;
      },
      set: function(value) {
        this.$store.dispatch("admin/companies/updateStatus", value);
      }
    }
  },
  methods: {
    openModal(data) {
      this.$ga.event({
        eventCategory: "companies",
        eventAction: "Clicked company",
        eventLabel: "table"
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
