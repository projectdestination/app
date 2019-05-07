<template>
  <div v-if="form !== null">
    <h1
      class="pd-font title uppercase spacing is-4"
    >{{formAnswered? `You are now signed up for`:`Sign up for`}}</h1>
    <h1 class="pd-font title uppercase spacing">{{form.title}}.</h1>
    <div v-if="formAnswered">
      <div class="columns">
        <div class="column"></div>
        <div class="column">
          <Events/>
        </div>
        <div class="column"></div>
      </div>
    </div>
    <div v-if="form.settings.accessible && form.settings && !formAnswered">
      <ApplicationForm/>
    </div>
    <div v-if="!form.settings.accessible" class="columns">
      <div class="column"></div>
      <div class="column">
        This form does not accept any further entries.
        <br>Have a look at our other future events.
        <div class="section">
          <Events/>
        </div>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import ApplicationForm from "@/components/app/event/form/ApplicationForm";
import { mapState } from "vuex";
import Events from "@/components/Events";
export default {
  components: {
    ApplicationForm,
    Events
  },
  computed: {
    ...mapState({
      form: function(state) {
        const { form } = state.form;
        if (form) {
          this.$ga.page(form.title);
        }
        return form;
      },
      formAnswered: function(state) {
        return state.form.formAnswered;
      }
    })
  }
};
</script>

<style lang="css">
</style>
