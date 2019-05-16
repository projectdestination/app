import consoleLog from "@/../javascripts/consoleLog";
import companies from "./admin/companies";
import events from "./admin/events";
import applications from "./admin/applications";

const state = {
  events: {},
  users: {},
  students: {},
  searchString: ""
};
const mutations = {
  setUsersData(state, payload) {
    state.users = { ...payload };
  },
  setStudentData(state, payload) {
    state.students = { ...payload };
  },
  setSearchString(state, payload) {
    state.searchString = payload;
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
  getSearchString: state => {
    const { searchString } = state;
    return searchString;
  },
  getStudents: state => {
    const data = { ...state };
    const { students, searchString } = data;
    let studentArray = [];
    Object.values(students).forEach(d => {
      const { first_name, last_name, email, phone } = d;
      const search =
        (first_name && first_name.toLowerCase().includes(searchString)) ||
        (last_name && last_name.toLowerCase().includes(searchString)) ||
        (email && email.toLowerCase().includes(searchString)) ||
        (phone && phone.toLowerCase().includes(searchString));
      if (search) {
        studentArray = [...studentArray, d];
      }
    });
    return studentArray;
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
    return adminUsers.filter(d => Boolean(d));
  }
};
const actions = {
  updateSearch({ commit }, searchString) {
    commit("setSearchString", searchString);
  },
  getContent({ rootState, commit, dispatch }) {
    const { firestore } = rootState;
    firestore.collection("users").onSnapshot(querySnapshot => {
      const users = {};
      querySnapshot.forEach(d => {
        users[d.data().id] = d.data();
      });
      commit("setUsersData", users);
    });
    firestore.collection("students").onSnapshot(querySnapshot => {
      const students = {};
      querySnapshot.forEach(d => {
        students[d.data().email] = d.data();
      });
      commit("setStudentData", students);
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
