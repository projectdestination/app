import consoleLog from '../consoleLog'
import * as firebase from 'firebase';

export default function createUser(user) {
  const { email, password, contacts, adress} = user;
  firebase.auth.createUserWithEmail(email, password).then((callback) => {
    consoleLog(callback)
  })
}

export default function removeUser(user) {
  
}
