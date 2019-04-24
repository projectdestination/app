<template>
  <div class="container has-text-centered">
    <div class="columns">
      <div class="column"></div>
      <div class="column">
        <div class="content">{{form.text}}</div>
        <b-field
          :type="formType"
          :message="form.settings.domain.length > 1 ? `Must be a ${form.settings.domain} mail.` : ``"
        >
          <b-input maxlength="50" v-model="data.email" rounded placeholder="Email*"></b-input>
        </b-field>
        <b-field :type="formType">
          <b-input maxlength="30" v-model="data.first_name" rounded placeholder="First name*"></b-input>
          <b-input maxlength="30" v-model="data.last_name" rounded placeholder="Last name*"></b-input>
        </b-field>
        <b-field :type="formType">
          <b-input maxlength="20" v-model="data.phone" rounded placeholder="Phone number*"></b-input>
        </b-field>
        <b-field :type="formType">
          <b-select v-model="data.programme" placeholder="Programme*" rounded expanded>
            <optgroup label="Bachelors">
              <option
                v-for="programme in bachelorProgrammes"
                :key="programme.key"
              >{{programme.text}}</option>
            </optgroup>
            <optgroup label="Masters">
              <option v-for="programme in masterProgrammes" :key="programme.key">{{programme.text}}</option>
            </optgroup>
            <option>Other</option>
          </b-select>
          <b-select v-model="data.year" placeholder="Year*" rounded>
            <option v-for="year in years" :key="year">{{year}}</option>
          </b-select>
        </b-field>
        <b-field :type="formType">
          <b-select
            v-model="data.diet"
            v-if="form.diet"
            placeholder="Dietary preference*"
            rounded
            expanded
          >
            <option v-for="diet in diets" :key="diet.key">{{diet.text}}</option>
          </b-select>
        </b-field>
        <b-field :type="formType">
          <b-select v-model="data.gender" v-if="form.gender" placeholder="Gender*" rounded expanded>
            <option v-for="gender in genders" :key="gender.key">{{gender.text}}</option>
          </b-select>
        </b-field>
        <b-field :type="formType">
          <b-input maxlength="50" v-model="data.free_text" rounded placeholder="Free text"></b-input>
        </b-field>
        <b-field
          v-for="(question,index) in extraQuestions"
          :label="question.required ? `${question.label}*`:question.label"
          :message="question.message"
          :key="`${index}`"
          :type="formType"
        >
          <b-input
            :placeholder="question.placeholder"
            :required="question.required"
            :maxlength="question.maxlength"
            v-model="data[question.key].answer"
            :type="question.maxlength <= 25 ? ``:`textarea`"
            rounded
          ></b-input>
        </b-field>
        <b-field :type="formType">
          <b-switch v-model="data.terms" :value="true" type="is-success">
            I accept the
            <a
              @click="termsAndConditions"
              class="link has-text-info"
            >terms and conditions</a>.
          </b-switch>
        </b-field>
        <div class="section">
          <a
            @click="submit"
            :disabled="!formValidated"
            class="button is-success pd-font title uppercase spacing is-6"
          >Submit</a>
        </div>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import {
  YEARS,
  MASTER_PROGRAMMES,
  BACHELOR_PROGRAMMES,
  DIETS,
  GENDERS,
  TERMS
} from "@/constants/form.js";
import { mapState } from "vuex";
import Events from "@/components/Events";
import { formValidation } from "@/helpers/validation";

export default {
  props: {
    id: String
  },
  components: {
    Events
  },
  data: () => {
    return {
      data: {
        email: null,
        first_name: null,
        last_name: null,
        phone: null,
        programme: null,
        year: null,
        diet: null,
        gender: null,
        free_text: "",
        terms: false
      },
      years: YEARS,
      masterProgrammes: MASTER_PROGRAMMES,
      bachelorProgrammes: BACHELOR_PROGRAMMES,
      diets: DIETS,
      genders: GENDERS,
      formValidated: false,
      formType: ""
    };
  },
  watch: {
    data: {
      handler: function() {
        if (this.data.email) {
          this.data.email = this.data.email.toLowerCase();
        }
        this.validateForm();
      },
      deep: true
    },
    extraQuestions: {
      handler: function() {
        if (this.form) {
          this.validateForm();
        }
      },
      deep: true
    }
  },
  methods: {
    validateForm() {
      this.formValidated = formValidation({
        ...this.data,
        domain: this.form.settings.domain,
        extraQuestions: this.extraQuestions,
        shouldAskDiet: this.form.diet,
        shouldAskGender: this.form.gender
      });
    },
    termsAndConditions() {
      this.$modal.open(TERMS.template);
    },
    submit() {
      const { formID } = router.app.$route.params;
      const { formValidated } = this;
      const {
        email,
        first_name,
        last_name,
        phone,
        programme,
        year,
        diet,
        gender,
        terms,
        free_text
      } = this.data;
      const extraQuestions = {};
      if (formValidated) {
        this.form.questions.map(d => {
          extraQuestions[d.key] = {
            question: d.label,
            answer: d.answer
          };
        });
        this.$store.dispatch("form/addApplicant", {
          email,
          first_name,
          last_name,
          phone,
          programme,
          year,
          diet,
          gender,
          terms,
          applied_at: Date.now(),
          formID,
          free_text,
          extraQuestions,
          attended: false
        });
        this.$store.dispatch("form/addStudent", {
          email,
          first_name,
          last_name,
          phone,
          programme,
          year,
          diet,
          gender,
          terms,
          applied_at: Date.now(),
          free_text,
          attended: false
        });
      }
    }
  },
  computed: {
    ...mapState({
      form: function(state) {
        return state.form.form;
      },
      extraQuestions: function(state) {
        const { form } = state.form;
        if (form && form.questions) {
          form.questions.map(d => {
            this.data[d.key] = d;
          });
        }
        if (state.form && state.form.form) {
          return state.form.form.questions;
        }
      }
    })
  }
};
</script>

<style lang="css">
</style>
