const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs! It's me, ya boi", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// exports.myFunction = functions.firestore
//   .document('matches/{docId}')
//   .onUpdate(async (change, context) => {
//     functions.logger.info("Hello logs! It's me, ya boi. Today we're updating " + context.params.docId, {structuredData: true});
//     const matchData = change.after.data();
//     const matchWinner = matchData.players.find(p => p === matchData.winner);
//     const matchLoser = matchData.players.find(p => p !== matchData.winner);

//     await admin.firestore.collection('users').document(matchWinner).
//   });