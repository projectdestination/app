import consoleLog from "@/../javascripts/consoleLog";

const state = {
  file: null
};
const mutations = {
  setFile(state, payload) {
    state.file = payload;
  }
};
const actions = {
  uploadFile({ rootState, dispatch }, { file, id, type, user, saveAction }) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { bucket } = rootState;
    bucket
      .ref()
      .child(`${type}/${id}/${file.name}`)
      .put(file)
      .then(snapshot => {
        bucket
          .ref()
          .child(`${type}/${id}/${file.name}`)
          .getDownloadURL()
          .then(url => {
            dispatch(
              saveAction,
              { snapshot: { ...snapshot, user, url }, id },
              { root: true }
            );
          })
          .catch(error => {
            consoleLog(error.message);
            dispatch("loading/stopLoading", { payload: null }, { root: true });
            dispatch(
              "errors/setError",
              {
                error: true,
                message: "There was a problem when uploading the file..."
              },
              { root: true }
            );
          });
      });
  },
  deleteAllFiles({ rootState, dispatch }, { type, id, name }) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { bucket } = rootState;
    bucket
      .ref()
      .child(`${type}/${id}/${name}`)
      .delete()
      .catch(error => {
        consoleLog(error.message);
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          {
            error: true,
            message: "There was a problem when deleting the files..."
          },
          { root: true }
        );
      });
  },
  removeFile(
    { rootState, dispatch },
    { name, id, type, saveAction, documents }
  ) {
    dispatch("loading/startLoading", { payload: null }, { root: true });
    const { bucket } = rootState;
    bucket
      .ref()
      .child(`${type}/${id}/${name}`)
      .delete()
      .then(() => {
        dispatch(saveAction, { id, documents, name }, { root: true });
      })
      .catch(() => {
        dispatch("loading/stopLoading", { payload: null }, { root: true });
        dispatch(
          "errors/setError",
          {
            error: true,
            message: "There was a problem when deleting the image..."
          },
          { root: true }
        );
      });
  },
  downloadFile({ rootState }, payload) {
    const { file, callBack, http } = payload;
    http
      .get(file.url, { responseType: "blob" })
      .then(response => {
        return response.blob();
      })
      .then(blob => {
        saveAs(blob, file.name);
        callBack();
      });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
