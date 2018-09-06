import moment from "moment";

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
  }
};
const actions = {
  getContent({ rootState, commit, dispatch }) {
    const { firestore } = rootState;
    firestore
      .collection("companies")
      .get()
      .then(querySnapshot => {
        const companies = {};
        querySnapshot.forEach(d => {
          companies[d.data().company_key] = d.data();
        });
        commit("setCompanyData", companies);
      });
    firestore
      .collection("events")
      .get()
      .then(querySnapshot => {
        const events = {};
        querySnapshot.forEach(d => {
          events[d.data().id] = d.data();
        });
        commit("setEventData", events);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      });
    firestore
      .collection("users")
      .get()
      .then(querySnapshot => {
        const users = {};
        querySnapshot.forEach(d => {
          users[d.data().id] = d.data();
        });
        commit("setUsersData", users);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
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
