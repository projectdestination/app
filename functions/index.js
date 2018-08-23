const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.initializeUser = functions.auth.user.onCreate(user => {
  const uid = user.uid;
  functions.firestore
    .collection("users")
    .doc("user_count")
    .set({ test: "hej" });
});
