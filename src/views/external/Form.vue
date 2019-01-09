<template>
  <div class="section has-text-centered">
    <img @click="goToHome" class="img" src="@/assets/logo.png">
    <div v-if="form !== null" class="container has-text-centered">
      <h1 class="pd-font title uppercase spacing is-4">Sign up for</h1>
      <h1 class="pd-font title uppercase spacing">{{form.title}}</h1>
      <div v-if="form.settings.accessible && form.settings" class="columns">
        <div class="column">
        </div>
        <div class="column">
          <div class="content">
            {{form.text}}
          </div>
          <b-field :type="formType" :message="form.settings.domain.length > 1 ? `Must be a ${form.settings.domain} mail.` : ``">
            <b-input maxlength="50" v-model="data.email" rounded placeholder="Email"></b-input>
          </b-field>
          <b-field :type="formType">
            <b-input maxlength="30" v-model="data.first_name" rounded placeholder="First name"></b-input>
            <b-input maxlength="30" v-model="data.last_name" rounded placeholder="Last name"></b-input>
          </b-field>
          <b-field :type="formType">
            <b-input maxlength="20" v-model="data.phone" rounded placeholder="Phone number"></b-input>
          </b-field>
          <b-field :type="formType">
            <b-select v-model="data.programme" placeholder="Programme" rounded expanded>
              <optgroup label="Bachelors">
                <option v-for="programme in bachelorProgrammes" :key="programme.key">
                  {{programme.text}}
                </option>
              </optgroup>
              <optgroup label="Masters">
                <option v-for="programme in masterProgrammes" :key="programme.key">
                  {{programme.text}}
                </option>
              </optgroup>
              <option>Other</option>
            </b-select>
            <b-select v-model="data.year" placeholder="Year" rounded>
              <option v-for="year in years" :key="year">
                {{year}}
              </option>
            </b-select>
          </b-field>
          <b-field :type="formType">
            <b-select v-model="data.diet" placeholder="Dietary preference" rounded expanded>
              <option v-for="diet in diets" :key="diet.key">
                {{diet.text}}
              </option>
            </b-select>
          </b-field>
          <b-field :type="formType">
            <b-select v-model="data.gender" placeholder="Gender" rounded expanded>
              <option v-for="gender in genders" :key="gender.key">
                {{gender.text}}
              </option>
            </b-select>
          </b-field>
          <b-field :type="formType">
            <b-input maxlength="50" v-model="data.free_text" rounded placeholder="Free text"></b-input>
          </b-field>
          <b-field v-for="(question,index) in extraQuestions" :label="question.required ? `${question.label}*`:question.label" :message="question.message" :key="`${index}`" :type="formType">
            <b-input :placeholder="question.placeholder" :required="question.required" :maxlength="question.maxlength" v-model="data[question.key].answer" rounded ></b-input>
          </b-field>
          <b-field :type="formType">
            <b-switch
            v-model="data.terms"
            :value="true"
            type="is-success">
                I accept the <a @click="termsAndConditions" class="link has-text-info">terms and conditions</a>.
            </b-switch>
          </b-field>
          <div class="section">
            <a @click="submit" :disabled="!formValidated" class="button is-success pd-font title uppercase spacing is-6">Submit</a>
          </div>
        </div>
        <div class="column">
        </div>
      </div>
      <div v-if="!form.settings.accessible" class="columns">
        <div class="column">
        </div>
        <div class="column">
          This form does not accept any further entries. <br />Have a look at our other future events.
          <div class="section">
            <Events />
          </div>
            <a style="margin-top: 50px;" @click="goToHome" class="button is-success">Go to home page</a>
        </div>
        <div class="column">
        </div>
      </div>
    </div>
      <div v-if="form === null" class="columns">
        <div class="column">
        </div>
        <div class="column">
          <h4 style="margin-top: 50px;" class="title pd-font uppercase is-5 spacing">This form is not open :/ <br /> Have a look at our other events.</h4>
            <div style="margin-top: 100px" class="section">
              <Events />
              </div>
              <a style="margin-top: 50px;" @click="goToHome" class="button is-success">Go to home page</a>
          </div>
        <div class="column">
        </div>
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

export default {
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
    },
    $route(to) {
      if (to.params.formID) {
        this.$store.dispatch("form/getFormData", to.params.formID);
      }
    }
  },
  methods: {
    goToHome() {
      router.push("/");
    },
    validateForm() {
      const {
        email,
        first_name,
        last_name,
        phone,
        programme,
        year,
        diet,
        gender,
        terms
      } = this.data;
      let questionsAreOk = [true];
      const { domain } = this.form.settings;
      if (this.extraQuestions) {
        questionsAreOk = this.extraQuestions.map(d => {
          return d.required
            ? this.data[d.key].answer !== null &&
                this.data[d.key].answer.length > 0
            : true;
        });
      }
      const emailIsOk =
        email !== null &&
        email.length > `@${domain}`.length &&
        email.includes(domain) &&
        email.includes("@");
      const nameIsOk = first_name !== null && last_name !== null;
      const phoneIsOk = phone !== null && phone.length > 5;
      const restIsOk =
        programme !== null &&
        year !== null &&
        diet !== null &&
        gender !== null &&
        terms;
      const allIsOk =
        emailIsOk &&
        nameIsOk &&
        phoneIsOk &&
        restIsOk &&
        questionsAreOk.every(d => d === true);
      this.formValidated = allIsOk;
    },
    termsAndConditions() {
      this.$modal.open(TERMS.template);
    },
    submit() {
      const { formID } = router.app.$route.params;
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
  },
  beforeCreate() {
    const { formID } = router.app.$route.params;
    this.formID = formID;
    this.$store.dispatch("form/getFormData", formID);
  },
  destroyed() {
    this.$store.dispatch("form/setInitialState");
  }
};
</script>

<style scoped lang="css">
.img {
  width:75px;
}
.img:hover {
  cursor: pointer;
}
</style>
