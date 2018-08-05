import consoleLog from "../consoleLog";
import * as firebase from "firebase";

function createUser(user, callbackFunction) {
  const { email, password } = user;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      if (callbackFunction) {
        callbackFunction();
      }
    })
    .catch(callback => {
      consoleLog(callback);
      return callback;
    });
}

function removeUser(callbackFunction) {
  const user = firebase.auth().currentUser;
  user
    .delete()
    .then(() => {
      if (callbackFunction) {
        callbackFunction();
      }
    })
    .catch(callback => {
      consoleLog(callback);
      return callback;
    });
}

function signIn(user, callbackFunction) {
  const { email, password } = user;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      if (callbackFunction) {
        callbackFunction();
      }
    })
    .catch(callback => {
      consoleLog(callback);
      return callback;
    });
}

export { createUser, removeUser, signIn };
