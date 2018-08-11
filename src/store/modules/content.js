import consoleLog from "@/../javascripts/consoleLog";

const state = {
  HOME_PAGE_DATA: []
};

const mutations = {
  updateData(state, payload) {
    state.HOME_PAGE_DATA = payload;
  }
};

const actions = {
  getHomePageData({ rootState, commit }) {
    const { firestore } = rootState;
    firestore
      .collection("content")
      .doc("home_page")
      .get()
      .then(data => {
        commit("updateData", data.data().pages);
      });
  },
  setHomePageData({ rootState }) {
    const { HOME_PAGE_DATA } = rootState.content;
    const { firestore } = rootState;
    firestore
      .collection("content")
      .doc("home_page")
      .update({ pages: HOME_PAGE_DATA })
      .then(() => consoleLog("Updated"))
      .catch(error => console.log(error));
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
