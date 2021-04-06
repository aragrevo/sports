const admin = require('firebase-admin');
const dotenv = require('dotenv');
const result = dotenv.config()

if (result.error) {
  throw result.error
}

// const serviceAccount = require('../service_key.json');
const serviceAccount = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jjo55%40store-79737.iam.gserviceaccount.com"
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firestore = admin.firestore();
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../public/files');

async function deleteCollection(path) {
  firestore
    .collection(path)
    .listDocuments()
    .then((val) => {
      val.map((val) => {
        val.delete();
      });
    });
}

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  files.forEach(async function (file) {
    var lastDotIndex = file.lastIndexOf('.');

    var menu = require('../public/files/' + file);

    await deleteCollection(file.substring(0, lastDotIndex));

    menu.forEach(function (obj) {
      firestore
        .collection(file.substring(0, lastDotIndex))
        .add(obj)
        .then(function (docRef) {
          console.log('Document written');
        })
        .catch(function (error) {
          console.error('Error adding document: ', error);
        });
    });
  });
});
