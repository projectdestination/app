<template>
    <div class="container">
      <b-table :row-class="() => `hover`" hoverable @click="object => openModal(object)" :data="data">
        <template slot-scope="props">
          <b-table-column field="title" label="Title" width="200">
            {{ props.row.title }}
          </b-table-column>
          <b-table-column field="owner" label="Company" width="300">
            {{ props.row.owner }}
          </b-table-column>
          <b-table-column field="date" label="Date" width="200">
            <span class="tag is-info">
              {{ props.row.date }}
            </span>
          </b-table-column>
          <b-table-column field="host" label="Host" >
            {{ props.row.host }}
          </b-table-column>
          <b-table-column field="status" label="Status" >
            <span class="tag" :class="props.row.status === `done` ? `is-success`:`is-warning` " >
              {{ `${props.row.status[0].toUpperCase()}${props.row.status.slice(1)}` }}
            </span>
          </b-table-column>
          <b-table-column field="id" label="ID" width="150">
            <span class="tag is-light">
              {{ props.row.id }}
            </span>
          </b-table-column>
        </template>
      </b-table>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import EditEvent from "@/components/app/event/EditEvent";

export default {
  computed: {
    ...mapGetters({
      data: "admin/getEvents"
    })
  },
  methods: {
    openModal(data) {
      this.$modal.open({
        parent: this,
        component: EditEvent,
        props: { content: { ...data }, type: "event" },
        hasModalCard: true
      });
    }
  }
};
</script>
<style>
.hover {
  cursor: pointer;
}
</style>
