<template lang="html">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new event</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Event type">
          <b-select required placeholder="Event type" v-model="eventType">
              <option
                  v-for="option in eventTypes"
                  :key="option">
                  {{ option }}
              </option>
              <option>Unspecified</option>
          </b-select>
        </b-field>

        <b-field label="Company">
          <b-select required placeholder="Company" v-model="company">
              <option
                  v-for="option in companies"
                  :key="option.company_key"
                  :value="option">
                  {{ option.display_name }}
              </option>
          </b-select>
        </b-field>
        <b-field :label="title" v-if="eventType !== null && company !== null">
        </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
      <button :disabled="!formIsValidated" class="button is-success" @click="handleCreate">Create</button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => {
    return {
      title: "",
      formIsValidated: false,
      eventTypes: ["Lunch lecture", "Marketing"],
      company: null,
      eventType: null
    };
  },
  computed: {
    ...mapGetters({
      companies: "admin/getCompanyIds"
    })
  },
  watch: {
    company: function() {
      this.validateForm();
      this.createTitle();
    },
    eventType: function() {
      this.validateForm();
      this.createTitle();
    }
  },
  methods: {
    handleCreate() {
      const {
        formIsValidated,
        eventType,
        company: { display_name, company_key }
      } = this;
      if (formIsValidated) {
        this.$store.dispatch("admin/createNewEvent", {
          owner_key: company_key,
          owner: display_name,
          type: eventType
        });
        this.$parent.close();
      }
    },
    createTitle() {
      const { eventType, company } = this;
      if (company && eventType) {
        this.title = `${eventType} with ${company.display_name}`;
      }
    },
    validateForm() {
      const { eventType, company } = this;
      const titleIsOk = eventType !== null && company !== null;
      const allIsFine = titleIsOk;
      this.formIsValidated = allIsFine;
    }
  }
};
</script>
