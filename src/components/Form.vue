<template>
  <div class="form pd-font">
    <h2 class="subtitle pd-font uppercase spacing is-4">Company details</h2>

    <b-field horizontal label="Company">
        <b-select v-model="companyKey" expanded placeholder="Select your company" rounded>
            <option v-bind:key="company.company_key" v-for="company in companyList" v-bind:value="company.company_key">{{company.display_name}}</option>
        </b-select>
        <b-select v-model="formData.role" expanded placeholder="Your role" rounded>
            <option v-bind:key="role.key" v-for="role in roles" v-if="role.text" v-bind:value="role.key">{{role.text}}</option>
        </b-select>
    </b-field>
    <b-field horizontal>
      <h2 class="subtitle is-6 is-pulled-right pd-font">If you can't find your company you can contact us at help@projectdestination.se</h2>
    </b-field>
    <h2 class="subtitle pd-font is-4 uppercase spacing">Personal details</h2>
    <b-field horizontal label="Name">
          <b-input v-model="formData.firstName" rounded placeholder="First name"></b-input>
          <b-input v-model="formData.lastName" rounded placeholder="Last name"></b-input>

      </b-field>
      <b-field horizontal label="Email">
          <b-field>
            <b-input rounded v-model="formData.emailName" placeholder="Email"></b-input>
            <p class="control">
                <span class="button is-static">{{selectedCompanyDomain}}</span>
            </p>
          </b-field>
        </b-field>
        <b-field horizontal label="Password">
              <b-input password-reveal rounded v-model="formData.password" placeholder="Password"></b-input>
          </b-field>
        <b-field horizontal label="Phone">
              <b-input v-model="formData.phone" rounded placeholder="Phone"></b-input>
          </b-field>
        <div class="divider">

        </div>
            <a v-on:click="createUser" class="button">Send</a>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => {
    return {
      formData: {
        companyKey: "",
        firstName: "",
        lastName: "",
        emailName: "",
        email: "",
        role: "",
        phone: "",
        password: "",
        isValidated: false, // TODO: Create page to validate users and show no access page if not validated.
        userType: "company" // TODO: Create page to manage user roles.
      },
      companyKey: "",
      selectedCompanyDomain: "@projectdestination.se"
    };
  },
  methods: {
    verifyInput() {},
    createUser() {
      const { formData, selectedCompanyDomain, $store, companyKey } = this;
      formData.email = formData.emailName + selectedCompanyDomain;
      $store.dispatch("user/validateAndCreateUser", {
        ...formData,
        companyKey,
        selectedCompanyDomain
      });
    }
  },
  computed: {
    ...mapState({
      companyList: state => state.content.companies,
      roles: state => state.content.roles,
      errors: state => state.user.formData.errors
    })
  },
  watch: {
    companyKey: function() {
      this.selectedCompanyDomain = `@${
        this.companyList[this.companyKey].domain
      }`;
    }
  },
  created() {
    this.$store.dispatch("content/getCompanyProps");
  }
};
</script>

<style scoped lang="scss">
h2 {
  color: rgba(0, 0, 0, 0.7);
}
.form {
  background-color: rgba(#bdbdbd, 0.2);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 0 100px rgba(#000, 0.2);
}
.divider {
  height: 1px;
  margin: 5% 0;
}
</style>
