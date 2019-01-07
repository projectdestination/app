<template lang="html">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new company</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Company name" :type="companyAlreadyExists ? `is-danger`: null" :message="companyAlreadyExists ? `Company already exists.`: null">
          <b-input
            v-model="display_name"
            placeholder="Title"
            required>
          </b-input>
        </b-field>

        <b-field label="Domain">
          <b-input
            v-model="domain"
            placeholder="Domain"
            required>
          </b-input>
        </b-field>

        <b-field label="Industry">
          <b-select required placeholder="Industry" v-model="industry">
              <option
                  v-for="option in industries"
                  :key="option">
                  {{ option }}
              </option>
              <option>Unspecified</option>
          </b-select>
        </b-field>

    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">Close</button>
      <button :disabled="companyAlreadyExists || !formIsValidated" class="button is-success" @click="handleCreate">Create</button>
    </footer>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      industries: ["Consulting", "Chemistry", "Medicine"],
      industry: null,
      display_name: "",
      company_key: "",
      domain: "",
      formIsValidated: false,
      companyAlreadyExists: false
    };
  },
  watch: {
    display_name: function() {
      this.validateForm();
      this.createCompanyKey();
      this.verifyCompanyUnique();
    },
    domain: function() {
      this.validateForm();
    },
    industry: function() {
      this.validateForm();
    }
  },
  methods: {
    handleCreate() {
      const {
        createCompanyKey,
        formIsValidated,
        industry,
        domain,
        display_name,
        company_key
      } = this;
      if (formIsValidated) {
        createCompanyKey();
        this.$store.dispatch("admin/companies/createNewCompany", {
          industry,
          display_name,
          company_key,
          domain
        });
        this.$parent.close();
      }
    },
    verifyCompanyUnique() {
      const { companies } = this.$store.state.admin;
      const keys = Object.keys(companies);
      const isUnique = !keys.includes(this.company_key);
      this.companyAlreadyExists = !isUnique;
    },
    createCompanyKey() {
      let company_key = this.display_name;
      company_key = company_key.toLowerCase();
      company_key = company_key.trim();
      company_key = company_key.replace(" ", "_");
      this.company_key = company_key;
    },
    validateForm() {
      const { industry, domain, display_name } = this;
      const industryIsOk = industry !== null;
      const titleIsOk = display_name !== null && display_name.length >= 3;
      const domainIsOk = domain.includes(".");
      const allIsFine = titleIsOk && industryIsOk && domainIsOk;
      this.formIsValidated = allIsFine;
    }
  }
};
</script>
