const state = {
  loading: false
};
const mutations = {
  setLoading(state, payload) {
    state.loading = payload;
  }
};
const actions = {
  startLoading({ commit }) {
    commit("setLoading", true);
  },
  stopLoading({ commit }) {
    commit("setLoading", false);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
