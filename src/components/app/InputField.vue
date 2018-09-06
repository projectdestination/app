<template>
  <span>
    <b-field :key="entry.keyID" v-for="entry in entries" v-if="keyID === entry.keyID" :label="entry.label">
      <b-input v-model="data" v-if="entry.type === `short-text`"></b-input>
      <b-switch v-model="data" v-if="entry.type === `switch`" type="is-danger"></b-switch>
      <b-datepicker v-model="data" v-if="entry.type === `date`" icon="calendar-today"></b-datepicker>
    </b-field>
  </span>
</template>

<script>
import moment from "moment";

export default {
  name: "InputField",
  props: {
    initialData: [String, Number, Date, Boolean],
    keyID: [String, Boolean],
    onChange: Function
  },
  data: function() {
    console.log(
      this.keyID === "date" && moment(this.initialData, "D MMMM YY - HH:mm")
    );
    return {
      data:
        this.keyID === "date"
          ? moment(this.initialData, "D MMMM YY - HH:mm")._d
          : this.initialData,
      entries: [
        { keyID: "host", label: "Host", type: "short-text" },
        { keyID: "owner", label: "Company", type: "short-text" },
        { keyID: "error", label: "Needs completion", type: "switch" },
        { keyID: "date", label: "Date", type: "date" }
      ]
    };
  },
  watch: {
    data: function(val) {
      console.log(val);
      this.onChange(this.keyID, val);
    },
    date: function(val) {
      console.log(val);
      this.onChange(this.keyID, val);
    }
  }
};
</script>

<style lang="css">
</style>
