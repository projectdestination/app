import consoleLog from "@/../javascripts/consoleLog";
import debounce from "lodash/debounce";

const state = {
  HOME_PAGE_DATA: [],
  companies: [],
  roles: {},
  PDIconUrl: "@/assets/logo_white.png"
};

const mutations = {
  updateHomePageData(state, payload) {
    state.HOME_PAGE_DATA = payload;
  },
  updateCompanies(state, payload) {
    state.companies = payload;
  },
  updataCompanyRoles(state, payload) {
    state.roles = payload;
  }
};

const actions = {
  getHomePageData({ rootState, commit, dispatch }) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("content")
      .doc("home_page")
      .onSnapshot(data => {
        commit("updateHomePageData", data.data().pages);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      });
  },
  setHomePageData: debounce(({ rootState, dispatch }) => {
    const { HOME_PAGE_DATA } = rootState.content;
    const { firestore } = rootState;
    firestore
      .collection("content")
      .doc("home_page")
      .update({ pages: HOME_PAGE_DATA })
      .then(() => {
        consoleLog("Updated");
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      })
      .catch(error => consoleLog(error));
  }, 3000),
  getCompanyProps({ rootState, commit, dispatch }) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("companies")
      .get()
      .then(collection => {
        const companyList = {};
        collection.forEach(data => {
          const { type, company_key } = data.data();
          if (type === "roles") commit("updataCompanyRoles", data.data());
          if (type !== "roles") companyList[company_key] = data.data();
        });
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        commit("updateCompanies", companyList);
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
