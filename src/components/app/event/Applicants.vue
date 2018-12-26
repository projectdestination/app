<template>
  <div>
    <h1 class="title pd-font is-4 uppercase has-text-weight-semibold spacing">Number of applicants: {{amount}}</h1>
    <div class="columns">
      <div v-if="years.series.length > 0" class="column">
        <h2 class="title pd-font is-5 uppercase spacing">Years</h2>
        <Charts width="380" type="pie" :options="years.options" :series="years.series" />
      </div>
      <div v-if="diets.series.length > 0" class="column">
        <h2 class="title pd-font is-5 uppercase spacing">Diets</h2>
        <Charts width="450" type="pie" :options="diets.options" :series="diets.series" />
      </div>
      <div v-if="genders.series.length > 0" class="column">
        <h2 class="title pd-font is-5 uppercase spacing">Genders</h2>
        <Charts width="380" type="pie" :options="genders.options" :series="genders.series" />
      </div>
    </div>
    <div class="columns">
      <div v-if="programmes.series.length > 0" class="column">
        <h2 class="title pd-font is-5 uppercase spacing">Programmes</h2>
        <Charts width="500" type="pie" :options="programmes.options" :series="programmes.series" />
      </div>
    </div>
  </div>
</template>

<script>
import Charts from "vue-apexcharts";
import { mapGetters } from "vuex";

export default {
  components: {
    Charts
  },
  props: ["eventID"],
  computed: {
    ...mapGetters({
      diets: "admin/applications/getDiets",
      years: "admin/applications/getYears",
      programmes: "admin/applications/getProgrammes",
      genders: "admin/applications/getGenders",
      amount: "admin/applications/getTotalAmount"
    })
  },
  created() {
    this.$store.dispatch("admin/applications/getApplicantData", this.eventID);
  }
};
</script>

<style lang="css">
</style>
