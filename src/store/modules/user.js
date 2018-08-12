import consoleLog from "@/../javascripts/consoleLog";

const state = {
  userIsAuthenticated: false,
  error: false,
  errorMessage: null
};
const mutations = {
  setUserState(state, payload) {
    state.userIsAuthenticated = payload.userIsAuthenticated;
    state.error = payload.error;
    state.errorMessage = payload.errorMessage;
  }
};
const actions = {
  createUser({ rootState, commit, dispatch }, payload) {
    const { auth } = rootState;
    const { email, password } = payload;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const payload = {
          userIsAuthenticated: true,
          error: false,
          errorMessage: null
        };
        commit("setUserState", payload);
        consoleLog("User created");
        dispatch("addUserData");
      })
      .catch(error => {
        const payload = {
          userIsAuthenticated: false,
          error: true,
          errorMessage: error.message
        };
        commit("setUserState", payload);
        consoleLog(error.message);
      });
  },
  addUserData({ rootState, commit }, payload) {
    const { firestore, auth } = rootState;
    const { uid } = auth.currentUser;
    firestore
      .collection("users")
      .doc(uid)
      .set({ name: "Soner" })
      .then(() => {
        console.log("User updated");
        //TODO
      })
      .catch(error => {
        consoleLog(error.message);
        // TODO
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
