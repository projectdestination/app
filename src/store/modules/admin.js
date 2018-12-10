import moment from "moment";
import consoleLog from "@/../javascripts/consoleLog";
import { companyProfile } from "@/../javascripts/new";

const state = {
  events: {},
  companies: {},
  users: {}
};
const mutations = {
  setCompanyData(state, payload) {
    state.companies = { ...payload };
  },
  setEventData(state, payload) {
    state.events = { ...payload };
  },
  setUsersData(state, payload) {
    state.users = { ...payload };
  }
};
const getters = {
  getEvents: state => {
    const data = { ...state };
    const events = Object.keys(data.events);
    let eventsArray = [];
    events.forEach(id => {
      const event = data.events[id];
      const date = new Date(event.date.seconds * 1000);
      const momentDate = moment(date).format("D MMMM YY - HH:mm");
      const momentTime = moment(date).format("");
      const newEvent = {
        ...data.events[id],
        date: momentDate,
        time: momentTime
      };
      eventsArray = [...eventsArray, newEvent];
    });
    return eventsArray;
  },
  getCompanies: state => {
    const data = { ...state };
    const { companies } = data;
    const keys = Object.keys(data.companies);
    let companyArray = [];
    keys.forEach(company_key => {
      if (company_key !== "undefined") {
        companyArray = [...companyArray, companies[company_key]];
      }
    });
    return companyArray;
  },
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
  getCompanyNames: state => {
    const data = { ...state };
    const { companies } = data;
    const keys = Object.keys(data.companies);
    let companyNames = {};
    keys.forEach(company_key => {
      if (company_key !== "undefined") {
        companyNames[company_key] = companies[company_key].display_name;
      }
    });
    return companyNames;
  },
  getCompanyIds: state => {
    const data = { ...state };
    const { companies } = data;
    const keys = Object.keys(data.companies);
    let companyNames = {};
    keys.forEach(company_key => {
      if (company_key !== "undefined") {
        companyNames[company_key] = {
          display_name: companies[company_key].display_name,
          company_key: companies[company_key].company_key
        };
      }
    });
    return companyNames;
  }
};
const actions = {
  getContent({ rootState, commit, dispatch }) {
    const { firestore } = rootState;
    firestore.collection("companies").onSnapshot(querySnapshot => {
      const companies = {};
      querySnapshot.forEach(d => {
        companies[d.data().company_key] = d.data();
      });
      commit("setCompanyData", companies);
    });
    firestore.collection("events").onSnapshot(querySnapshot => {
      const events = {};
      querySnapshot.forEach(d => {
        events[d.data().id] = d.data();
      });
      commit("setEventData", events);
      dispatch("loading/stopLoading", { payload: null }, { root: true });
    });
    firestore.collection("users").onSnapshot(querySnapshot => {
      const users = {};
      querySnapshot.forEach(d => {
        users[d.data().id] = d.data();
      });
      commit("setUsersData", users);
      dispatch("loading/stopLoading", { payload: null }, { root: true });
    });
  },
  saveCompanyDetails({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("companies")
      .doc(payload.company_key)
      .update(payload)
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      });
  },
  createNewCompany({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const {
      firestore,
      user: { user }
    } = rootState;
    dispatch(
      "slack/newCompanyAdded",
      {
        company: payload.display_name,
        firstname: user.first_name,
        lastname: user.last_name
      },
      { root: true }
    );
    const company = companyProfile(payload);
    firestore
      .collection("companies")
      .doc(company.company_key)
      .set({ ...company })
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      })
      .catch(error => {
        consoleLog(error.message);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
      });
  },
  deleteComapny({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("companies")
      .doc(payload)
      .delete()
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      })
      .catch(error => {
        consoleLog(error.message);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
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
  },
  createNewEvent({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const {
      firestore,
      user: { user }
    } = rootState;
    const event = {
      owner_key: payload.owner_key,
      owner: payload.owner,
      type: payload.type
    };
    console.table(payload);
    firestore
      .collection("events")
      .doc()
      .set({ ...event })
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      })
      .catch(error => {
        consoleLog(error.message);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
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
  state,
  getters,
  mutations,
  actions
};
