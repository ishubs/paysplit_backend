// require("dotenv").config();
// const admin = require("firebase-admin");
// const { getFirestore } = require("firebase-admin");
// var serviceAccount = require("./privatekey.json");
// const firebaseApp = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://payapp-c0567-default-rtdb.asia-southeast1.firebasedatabase.app"
// });
// console.log("this is firebaseapp" + JSON.stringify(firebaseApp))
// const db = firebaseApp.firestore();

// module.exports = {
//   db,
// };

var admin = require('firebase-admin')


const serviceAccount = require('./payapp-c0567-firebase-adminsdk-px4xf-9c05e6cb89.json')

admin.initializeApp({
  credential:admin.credential.cert(serviceAccount),
});
const auth = admin.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
const db = admin.firestore();
module.exports = {
  db, 
  auth
};
