const state = {
  company: null,
  events: null
};
const mutations = {
  setCompanyData(state, payload) {
    state.company = payload;
  },
  setEventData(state, payload) {
    state.events = payload;
  }
};
const actions = {
  getContent({ rootState, commit, dispatch }) {
    const { firestore } = rootState;
    firestore
      .collection("companies")
      .where("company_key", "==", rootState.user.user.company_key)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(d => {
          commit("setCompanyData", d.data());
        });
      });
    firestore
      .collection("events")
      .where("owner", "==", rootState.user.user.company_key)
      .get()
      .then(querySnapshot => {
        const events = [];
        querySnapshot.forEach(d => {
          events.push(d.data());
        });
        commit("setEventData", events);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
