var request = require("request");
require("dotenv").config()
var fcm = require("fcm-notification");
var FCM = new fcm({
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
});
const { db,auth } = require("./../firebase");
const { response } = require("express");

exports.selectcontacts = (req, res) => {
  var numbers = req.body.numbers;
  var message = {
    data:  {
      vpa: '6360861215@ybl', // or can be john@ybl or mobileNo@upi
      payeeName: 'Shubham Giri',
      amount: '100',
      transactionRef: 'aasf-332-aoei-fn'
    },
    notification: {
      title: "Paysplit",
      body: "Test message by Paysplit",
    },
    android: {
      priority: "high",
    },
  };

 
//   var message = {
//     "to":  "abc",

//     "data": {
//         "notification": {
//         "title": "Hello",
//         "body": "world"
//     }
//     }
// }

  const getdata = async () => {
    const tokenArray = [];
    for (i = 0; i < numbers.length; i++) {
      const rawdata = await db.collection("tokens").doc(numbers[i]).get();
      tokenArray.push(rawdata._fieldsProto.token.stringValue);
    }
    console.log(tokenArray);
    return tokenArray;
  };

  getdata().then((tokens) => {
    FCM.sendToMultipleToken(message, tokens, function (err, response) {
      if (err) {
        console.log("err--", err);
      } else {
        console.log("response-----", response);
      }
    });
  });

  return res.status(200).send("All okay");
};

// a = ['+916360861215','+918527741952', '+919876543211', '+91123456789', '+91123456789']

exports.contactsync = (req, res) => {
  
    const maxResults = 10; // optional arg.
    var b = []
  auth.listUsers(maxResults).then((userRecords) => {
      console.log("fetching from firebase...")
    userRecords.users.forEach((user) => b.push(user.phoneNumber.substring(3,13)));
    console.log("b"+b)
    var a = req.body.contacts;
  
      var c = [];
    a.sort(function (a, b) {
      if (a.phone.length > 10) { a.phone = a.phone.substring(3, 13); console.log(a.phone)}
        return a.phone - b.phone;
      });
      console.log("a="+JSON.stringify(a))
      b.sort();
      let i = 0, j = 0;
    while (i < a.length && j < b.length) {
      console.log(a[i].phone.length)
        if (a[i].phone == b[j]) {
          c.push(a[i]);
          ++i;
          ++j;
        } else if (a[i].phone < b[j]) {
          ++i;
        } else {
          ++j;
        }
    }
    
    console.log(c)
    
    
    return res.status(200).send(c);
    }).catch((error) => console.log(error));
  
}


