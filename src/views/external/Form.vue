<template>
  <div class="section has-text-centered">
    <img @click="goToHome" class="img" src="@/assets/logo.png">
    <div v-if="form !== null" class="container has-text-centered">
      <h1 class="pd-font title uppercase spacing is-4">Sign up for</h1>
      <h1 class="pd-font title uppercase spacing">{{form.title}}</h1>
      <div v-if="form.settings.accessible" class="columns">
        <div class="column">
        </div>
        <div class="column">
          <div class="content">
            {{form.text}}
          </div>
          <b-field :type="formType" :message="form.settings.domain.length > 1 ? `Must be a ${form.settings.domain} mail.` : ``">
            <b-input maxlength="50" v-model="email" rounded placeholder="Email"></b-input>
          </b-field>
          <b-field :type="formType">
            <b-input maxlength="30" v-model="first_name" rounded placeholder="First name"></b-input>
            <b-input maxlength="30" v-model="last_name" rounded placeholder="Last name"></b-input>
          </b-field>
          <b-field :type="formType">
            <b-input maxlength="20" v-model="phone" rounded placeholder="Phone number"></b-input>
          </b-field>
          <b-field :type="formType">
            <b-select v-model="programme" placeholder="Programme" rounded expanded>
              <option v-for="programme in programmes" :key="programme.key">
                {{programme.text}}
              </option>
            </b-select>
            <b-select v-model="year" placeholder="Year" rounded expanded>
              <option v-for="year in years" :key="year">
                {{year}}
              </option>
            </b-select>
          </b-field>
          <b-field :type="formType">
            <b-select v-model="diet" placeholder="Dietary preference" rounded expanded>
              <option v-for="diet in diets" :key="diet.key">
                {{diet.text}}
              </option>
            </b-select>
          </b-field>
          <b-field :type="formType">
            <b-select v-model="gender" placeholder="Gender" rounded expanded>
              <option v-for="gender in genders" :key="gender.key">
                {{gender.text}}
              </option>
            </b-select>
          </b-field>
          <b-field :type="formType">
            <b-input maxlength="50" v-model="free_text" rounded placeholder="Free text"></b-input>
          </b-field>
          <b-field :type="formType">
            <b-switch
            v-model="terms"
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
          This form does not accept any further entries.
          <a style="margin-top: 20px;" @click="goToHome" class="button is-success">Go to home page</a>
        </div>
        <div class="column">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";
import { YEARS, PROGRAMMES, DIETS, GENDERS, TERMS } from "@/constants/form.js";
import { mapState } from "vuex";

export default {
  data: () => {
    return {
      years: YEARS,
      programmes: PROGRAMMES,
      diets: DIETS,
      genders: GENDERS,
      email: null,
      first_name: null,
      last_name: null,
      phone: null,
      programme: null,
      year: null,
      diet: null,
      gender: null,
      terms: false,
      formValidated: false,
      free_text: "",
      formType: ""
    };
  },
  watch: {
    email: function() {
      this.validateForm();
    },
    first_name: function() {
      this.validateForm();
    },
    last_name: function() {
      this.validateForm();
    },
    phone: function() {
      this.validateForm();
    },
    programme: function() {
      this.validateForm();
    },
    year: function() {
      this.validateForm();
    },
    diet: function() {
      this.validateForm();
    },
    gender: function() {
      this.validateForm();
    },
    terms: function() {
      this.validateForm();
    }
  },
  methods: {
    goToHome() {
      router.push("/");
    },
    validateForm() {
      this.email = this.email.toLowerCase();
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
      } = this;
      const { domain } = this.form.settings;
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
      const allIsOk = emailIsOk && nameIsOk && phoneIsOk && restIsOk;
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
      } = this;
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
      }
    })
  },
  beforeCreate() {
    const { formID } = router.app.$route.params;
    this.$store.dispatch("form/getFormData", formID);
  }
};
</script>

<style lang="css">
.img {
  width:75px;
}
.img:hover {
  cursor: pointer;
}
</style>
