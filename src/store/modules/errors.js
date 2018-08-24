const state = {
  error: false,
  message: ""
};
const mutations = {
  updateError(state, payload) {
    const { error, message } = payload;
    state.error = error;
    state.message = message ? message : "";
    setTimeout(() => {
      state.error = false;
    });
  }
};
const actions = {
  setError({ commit }, payload) {
    commit("updateError", payload);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
