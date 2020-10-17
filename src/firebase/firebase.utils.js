import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCIoHsDVByOao-mO8_bbhP8PDmnp54bYPE",
  authDomain: "crwn-db-15275.firebaseapp.com",
  databaseURL: "https://crwn-db-15275.firebaseio.com",
  projectId: "crwn-db-15275",
  storageBucket: "crwn-db-15275.appspot.com",
  messagingSenderId: "328792672107",
  appId: "1:328792672107:web:dd77adf8291b94dbd4ee2e",
  measurementId: "G-ED0LNEJMF7"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
