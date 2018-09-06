<template>
  <div class="container">
    <b-table :row-class="() => `hover`" hoverable @click="object => openModal(object)" :data="data">
      <template slot-scope="props">
        <b-table-column field="display_name" label="Title" width="200">
          {{ props.row.display_name }}
        </b-table-column>
        <b-table-column field="organization_number" label="Organisation number" width="200">
          {{ props.row.organization_number }}
        </b-table-column>
        <b-table-column field="street" label="Address">
          {{ `${props.row.address.street} ${props.row.address.number}` }}
        </b-table-column>
        <b-table-column field="domain" label="Domain" width="200">
          {{ props.row.domain }}
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      data: "admin/getCompanies"
    })
  },
  methods: {
    openModal(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="css">
.hover {
  cursor: pointer;
}
</style>
