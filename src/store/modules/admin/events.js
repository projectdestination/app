import moment from "moment";
import consoleLog from "@/../javascripts/consoleLog";

const state = {
  events: {}
};

const getMetadata = file => {
  const {
    metadata: { name, fullPath, bucket, contentType, timeCreated, type },
    url,
    id,
    user
  } = file;
  return {
    name,
    fullPath,
    bucket,
    contentType,
    timeCreated,
    type,
    parent_id: id,
    url,
    uploaded_by: user
  };
};

const actions = {
  fetchEvents({ rootState, commit, dispatch }) {
    const { firestore } = rootState;
    firestore.collection("events").onSnapshot(querySnapshot => {
      const events = {};
      querySnapshot.forEach(d => {
        events[d.id] = d.data();
        events[d.id].date = new Date(events[d.id].date.seconds * 1000);
      });
      commit("setEventData", events);
      dispatch("loading/stopLoading", { payload: null }, { root: true });
    });
  },
  removeForm({ rootState, dispatch }, eventID) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore, firebase } = rootState;
    firestore
      .collection("events")
      .doc(eventID)
      .update({
        form: firebase.firestore.FieldValue.delete()
      });
  },
  removeMarketingImage({ rootState, dispatch }, { id }) {
    const { firestore } = rootState;
    firestore
      .collection("events")
      .doc(id)
      .update({
        "marketing.image": {}
      })
      .catch(error => {
        consoleLog(error.message);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          {
            error: true,
            message: "There was a problem when deleting the image..."
          },
          { root: true }
        );
      })
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      });
  },
  addMarketingImage({ rootState, dispatch }, { snapshot, id }) {
    const { firestore } = rootState;
    const payload = getMetadata({ ...snapshot, id });
    firestore
      .collection("events")
      .doc(id)
      .update({
        "marketing.image": payload
      })
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          { error: true, message: "Image uploaded!", type: "success" },
          { root: true }
        );
      });
  },
  addDocument({ rootState, dispatch }, { snapshot, id }) {
    const { firestore } = rootState;
    const payload = getMetadata({ ...snapshot, id });
    firestore
      .collection("events")
      .doc(id)
      .get()
      .then(d => {
        const documents = d.data().documents;
        documents[`${payload.name}`] = payload;
        firestore
          .collection("events")
          .doc(id)
          .update({
            documents
          })
          .then(() => {
            dispatch("loading/stopLoading", { payload: null }, { root: true });
            dispatch(
              "errors/setError",
              { error: true, message: "File uploaded!", type: "success" },
              { root: true }
            );
          });
      });
  },
  removeDocument({ rootState, dispatch }, { id, documents, name }) {
    const { firestore } = rootState;
    delete documents[name];
    firestore
      .collection("events")
      .doc(id)
      .update({
        documents
      })
      .catch(error => {
        consoleLog(error.message);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          {
            error: true,
            message: "There was a problem when deleting the file..."
          },
          { root: true }
        );
      })
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          { error: true, message: "File deleted!", type: "success" },
          { root: true }
        );
      });
  },
  createForm({ rootState, dispatch }, event) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const eventID = event.id;
    const {
      firestore,
      user: { user }
    } = rootState;
    firestore
      .collection("events")
      .doc(eventID)
      .collection("applicants")
      .doc("initialized")
      .set({
        init: true
      })
      .catch(error => {
        consoleLog(error.message);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
      })
      .then(() => {
        firestore
          .collection("events")
          .doc(eventID)
          .update({
            form: {
              settings: {
                domain: "kth.se",
                lock: "none",
                accessible: true
              },
              title: event.title,
              questions: [],
              text: "",
              diet: true,
              form_id: eventID,
              created_by: `${user.first_name} ${user.last_name}`,
              created_at: Date.now()
            }
          });
      })
      .catch(error => {
        consoleLog(error.message);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          { error: true, message: error.message },
          { root: true }
        );
      })
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
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
      host: `${user.first_name} ${user.last_name}`,
      type: payload.type,
      title: payload.title,
      date: payload.date,
      text: "",
      status: "Created",
      preferences: [],
      public: false,
      notes: "",
      marketing: {
        notes: "",
        text: "",
        checklist: [],
        image: {}
      },
      documents: {},
      address: {
        room: "",
        street: "",
        number: "",
        city: ""
      }
    };
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
  },
  saveEvent({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("events")
      .doc(payload.id)
      .update(payload)
      .then(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      });
  },
  deleteEvent({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("events")
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
  }
};

const mutations = {
  setEventData(state, payload) {
    state.events = { ...payload };
  }
};

const getters = {
  getEvents: state => {
    const data = { ...state };
    const events = Object.keys(data.events);
    let eventsArray = [];
    events.forEach(id => {
      const event = data.events[id];
      let date = event.date;
      let momentTime = "Time not set";
      let momentDate = "Date not set";
      const hasDateObject = date && date.seconds;
      const { host, error, status, text, title } = event;
      if (hasDateObject) {
        date = new Date(event.date.seconds * 1000);
      }
      momentDate = moment(date).format("D MMMM YY - HH:mm");
      momentTime = moment(date).format("");
      const newEvent = {
        ...data.events[id],
        date: momentDate,
        time: momentTime,
        host: host ? host : "None",
        id: id,
        error: error ? error : "No error",
        text: text ? text : "None",
        title: title ? title : "Untitled",
        status: status ? status : "None"
      };
      eventsArray = [...eventsArray, newEvent];
    });
    return eventsArray;
  },
  getMarketingImage: state => id => {
    const marketingImage = state.events[id].marketing.image;
    return marketingImage ? marketingImage : "";
  }
};

export default {
  namespaced: true,
  actions,
  state,
  getters,
  mutations
};
