const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.database();

exports.updateStatistics = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const badgesCollected = db.ref('/badgesCollected/');
    badgesCollected.on("value", function(snapshot){
        snapshot.forEach(function(data){
            console.log(data.val())
        })
    })
    return res.redirect(303, "End function");
});








// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});
