// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCO6cBj4VU7TvC_v01dAwDPngeOO5ATtz8',
  authDomain: 'store-79737.firebaseapp.com',
  databaseURL: 'https://store-79737.firebaseio.com',
  projectId: 'store-79737',
  storageBucket: 'store-79737.appspot.com',
  messagingSenderId: '564714410752',
  appId: '1:564714410752:web:7a9e9861a1e42fd0c859e5',
  measurementId: 'G-X7ZVHPL98V',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export const fetchLatestMatches = () => {
  return db
    .collection('matches')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        //   const { createdAt } = data
        //   console.log(createdAt)

        //   const date = new Date(createdAt.seconds * 1000)
        //   const normalizedCreatedAt = new Intl.DateTimeFormat("es-ES").format(
        //     date
        //   )

        return {
          ...data,
          // id,
          // createdAt: normalizedCreatedAt,
        };
      });
    });
};
