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
require('dotenv').config()



admin.initializeApp({
  credential:admin.credential.cert({
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL,
  }
  ),
});
const auth = admin.auth();
// const provider = new firebase.auth.GoogleAuthProvider();
const db = admin.firestore();
module.exports = {
  db, 
  auth
};
