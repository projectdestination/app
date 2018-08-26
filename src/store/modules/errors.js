const state = {
  error: false,
  message: "",
  type: ""
};
const mutations = {
  updateError(state, payload) {
    const { error, message, type } = payload;
    state.error = error;
    state.message = message ? message : "";
    state.type = type ? type : "error";
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
