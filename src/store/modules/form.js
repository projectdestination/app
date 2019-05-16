import consoleLog from "@/../javascripts/consoleLog";

const state = {
  form: null,
  formAnswered: false
};
const getters = {};
const mutations = {
  setFormData(state, payload) {
    state.form = payload;
  },
  setInitialState(state) {
    state.form = null;
    state.formAnswered = false;
  },
  setFormAnswered(state) {
    state.formAnswered = true;
  }
};
const actions = {
  getFormData({ rootState, commit, dispatch }, eventID) {
    const { firestore } = rootState;
    firestore
      .collection("events")
      .doc(eventID)
      .onSnapshot(data => {
        const event = data.data();
        let formData = null;
        if (event.form) {
          formData = event.form;
        }
        commit("setFormData", formData);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
      });
  },
  setInitialState({ commit }) {
    commit("setInitialState");
  },
  updateForm({ rootState, dispatch }, form) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("events")
      .doc(form.form_id)
      .update({
        form
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
  addStudent({ rootState, dispatch }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    firestore
      .collection("students")
      .where("email", "==", payload.email)
      .get()
      .then(data => {
        const emailAlreadyExists = !data.empty;
        if (!emailAlreadyExists) {
          firestore
            .collection("students")
            .doc(payload.email)
            .set({ ...payload })
            .catch(error => {
              consoleLog(error.message);
              dispatch(
                "loading/stopLoading",
                { payload: null },
                { root: true }
              );
            })
            .then(() => {
              dispatch(
                "loading/stopLoading",
                { payload: null },
                { root: true }
              );
            });
        } else {
          dispatch("loading/stopLoading", { payload: null }, { root: true });
        }
      });
  },
  addApplicant({ rootState, dispatch, state, commit }, payload) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { firestore } = rootState;
    const { notifications, title } = state.form;
    firestore
      .collection("events")
      .doc(payload.formID)
      .collection("applicants")
      .where("email", "==", payload.email)
      .get()
      .then(data => {
        const emailAlreadyExists = !data.empty;
        if (!emailAlreadyExists) {
          firestore
            .collection("events")
            .doc(payload.formID)
            .collection("applicants")
            .doc(payload.email)
            .set({ ...payload })
            .catch(error => {
              consoleLog(error.message);
              dispatch(
                "loading/stopLoading",
                { payload: null },
                { root: true }
              );
              dispatch(
                "errors/setError",
                { error: true, message: error.message },
                { root: true }
              );
            })
            .then(() => {
              dispatch(
                "errors/setError",
                {
                  error: true,
                  message: "You are now registred on this event.",
                  type: "success"
                },
                { root: true }
              );
              if (notifications) {
                const { first_name, last_name } = payload;
                const text = `${first_name} ${last_name} just applied for ${title}.`;
                const data = { attachments: [{ text }] };
                dispatch("slack/sendAttachment", data, { root: true });
              }
              dispatch(
                "loading/stopLoading",
                { payload: null },
                { root: true }
              );
              commit("setFormAnswered");
            });
        } else {
          dispatch("loading/stopLoading", { payload: null }, { root: true });
          dispatch(
            "errors/setError",
            {
              error: true,
              message: "You are already registred on this event.",
              type: "warning"
            },
            { root: true }
          );
        }
      });
  },
  registerStudent({ rootState }, payload) {
    const { firestore } = rootState;
    firestore.collection("students").where("email", "==", payload.email);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
