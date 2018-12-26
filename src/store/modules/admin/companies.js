import consoleLog from "@/../javascripts/consoleLog";
import { companyProfile } from "@/../javascripts/new";

const state = {
  companies: {},
  searchString: "",
  priority: null,
  status: null
};

const actions = {
  fetchCompanies({ rootState, commit }) {
    const { firestore } = rootState;
    firestore.collection("companies").onSnapshot(querySnapshot => {
      const companies = {};
      querySnapshot.forEach(d => {
        companies[d.data().company_key] = d.data();
      });
      commit("setCompanyData", companies);
    });
  },
  updateSearch({ commit }, searchString) {
    commit("setSearchString", searchString);
  },
  updatePriority({ commit }, priority) {
    commit("setPriority", priority);
  },
  updateStatus({ commit }, status) {
    commit("setStatus", status);
  },
  deleteComapny({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("companies")
      .doc(payload)
      .delete()
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      })
      .catch(error => {
        consoleLog(error.message);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
      });
  },
  createNewCompany({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const {
      firestore,
      user: { user }
    } = rootState;
    dispatch(
      "slack/newCompanyAdded",
      {
        company: payload.display_name,
        firstname: user.first_name,
        lastname: user.last_name
      },
      { root: true }
    );
    const company = companyProfile(payload);
    firestore
      .collection("companies")
      .doc(company.company_key)
      .set({ ...company })
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      })
      .catch(error => {
        consoleLog(error.message);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
      });
  },
  saveCompanyDetails({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("companies")
      .doc(payload.company_key)
      .update(payload)
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      });
  }
};
const getters = {
  getCompanies: state => {
    const companies = state.companies;
    const searchString = state.searchString;
    let companyArray = [];
    const keys = Object.keys(state.companies);
    const isSearchMode = searchString === "";
    const { status: statusFilter, priority: priorityFilter } = state;
    keys.forEach(company_key => {
      if (company_key !== "undefined") {
        const { responsible, display_name, status, priority } = companies[
          company_key
        ];
        const search =
          (responsible && responsible.includes(searchString)) ||
          display_name.includes(searchString) ||
          (responsible && responsible.toLowerCase().includes(searchString)) ||
          display_name.toLowerCase().includes(searchString) ||
          isSearchMode;
        const hasStatus =
          (status && status.includes(statusFilter)) ||
          statusFilter === "No filter" ||
          statusFilter === null;
        const hasPriority =
          (priority && priority.includes(priorityFilter)) ||
          priorityFilter === "No filter" ||
          priorityFilter === null;

        if (search && hasStatus && hasPriority) {
          companyArray = [...companyArray, companies[company_key]];
        }
      }
    });
    return companyArray;
  },
  getCompanyNames: state => {
    const data = { ...state };
    const { companies } = data;
    const keys = Object.keys(data.companies);
    let companyNames = {};
    keys.forEach(company_key => {
      if (company_key !== "undefined") {
        companyNames[company_key] = companies[company_key].display_name;
      }
    });
    return companyNames;
  },
  getSearchString: state => {
    const { searchString } = state;
    return searchString;
  },
  getCompanyIds: state => {
    const data = { ...state };
    const { companies } = data;
    const keys = Object.keys(data.companies);
    let companyNames = {};
    keys.forEach(company_key => {
      if (company_key !== "undefined") {
        companyNames[company_key] = {
          display_name: companies[company_key].display_name,
          company_key: companies[company_key].company_key
        };
      }
    });
    return companyNames;
  }
};

const mutations = {
  setCompanyData(state, payload) {
    state.companies = { ...payload };
    state.companiesLoaded = true;
  },
  setSearchString(state, payload) {
    state.searchString = payload;
  },
  setPriority(state, payload) {
    state.priority = payload;
  },
  setStatus(state, payload) {
    state.status = payload;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
