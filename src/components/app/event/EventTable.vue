<template>
  <div class="container">
    <b-table :row-class="() => `hover`" hoverable @click="object => openModal(object)" :data="data">
      <template slot-scope="props">
        <b-table-column field="title" label="Title" width="400">{{ props.row.title }}</b-table-column>
        <b-table-column
          v-if="!isMobile"
          field="owner"
          label="Company"
          width="300"
        >{{ props.row.owner }}</b-table-column>
        <b-table-column v-if="!isMobile" field="date" label="Date" width="200">
          <span class="tag is-info">{{ props.row.date }}</span>
        </b-table-column>
        <b-table-column v-if="!isMobile" field="host" label="Host">{{ props.row.host }}</b-table-column>
        <b-table-column v-if="!isMobile" field="status" label="Status">
          <span
            class="tag"
            :class="props.row.status === `done` ? `is-success`:`is-warning` "
          >{{ `${props.row.status[0].toUpperCase()}${props.row.status.slice(1)}` }}</span>
        </b-table-column>
        <b-table-column v-if="!isMobile" field="public" width="100">
          <span
            class="tag"
            :class="props.row.public? `is-success`: `is-danger`"
          >{{ props.row.public ? `Published` : `Not published` }}</span>
        </b-table-column>
      </template>
    </b-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import EditEvent from "@/components/app/event/EditEvent";
import { isMobileDevice } from "@/helpers";

export default {
  computed: {
    ...mapGetters({
      data: "admin/events/getEvents"
    }),
    isMobile: () => isMobileDevice()
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
