import consoleLog from "@/../javascripts/consoleLog";
import companies from "./admin/companies";
import events from "./admin/events";
import applications from "./admin/applications";

const state = {
  events: {},
  users: {}
};
const mutations = {
  setUsersData(state, payload) {
    state.users = { ...payload };
  }
};

const getters = {
  getUsers: (state, _, rootState) => {
    const data = { ...state };
    const { users } = data;
    const keys = Object.keys(data.users);
    let userArray = [];
    const currentUser = rootState.user.user;
    const { user_type, id } = currentUser;
    keys.forEach(userID => {
      if (
        (users[userID].user_type !== "super" || user_type === "super") &&
        id !== userID
      ) {
        userArray = [...userArray, users[userID]];
      }
    });
    return userArray;
  },
  getAdminUsers: state => {
    const { users } = state;
    const adminUsers = Object.keys(users).map(d => {
      const userIsAdmin =
        users[d].user_type === "admin" || users[d].user_type === "super";
      if (userIsAdmin) {
        return {
          ...users[d],
          name: `${users[d].first_name} ${users[d].last_name}`
        };
      }
    });
    return adminUsers;
  }
};
const actions = {
  getContent({ rootState, commit, dispatch }) {
    const { firestore } = rootState;
    firestore.collection("users").onSnapshot(querySnapshot => {
      const users = {};
      querySnapshot.forEach(d => {
        users[d.data().id] = d.data();
      });
      commit("setUsersData", users);
      dispatch("loading/stopLoading", { payload: null }, { root: true });
    });
  },
  deleteUser({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("users")
      .doc(payload)
      .delete()
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      })
      .catch(error => {
        consoleLog(error.message);
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
      });
  },
  saveUser({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("users")
      .doc(payload.id)
      .update(payload)
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      })
      .catch(error => {
        consoleLog(error.message);
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
      });
  }
};
export default {
  namespaced: true,
  modules: {
    companies,
    events,
    applications
  },
  state,
  getters,
  mutations,
  actions
};
