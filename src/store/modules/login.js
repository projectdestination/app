const state = {
  modal: false
};
const mutations = {
  setModalState(state, payload) {
    state.modal = payload;
  }
};
const actions = {
  openModal({ commit }) {
    commit("setModalState", true);
  },
  closeModal({ commit }) {
    commit("setModalState", false);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
