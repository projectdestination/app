const functions = require("firebase-functions");
const request = require("request");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.slackNewUser = functions.auth.user().onCreate(user => {
  const uid = user.uid;
  const email = user.email;
  return request.post(
    "https://hooks.slack.com/services/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",
    { json: { text: `New user: ${email}.` } }
  );
});

exports.slackNewCompany = functions.firestore
  .document("companies/{company_key}")
  .onCreate(snapshot => {
    const company = snapshot.data().display_name;
    return request.post(
      "https://hooks.slack.com/services/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",
      { json: { text: `New company added: ${company}.` } }
    );
  });
