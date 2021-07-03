import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD2ntBjA4qLnDwit52O1_5vW_RygiTIDyk",
    authDomain: "cloth-db-97c70.firebaseapp.com",
    projectId: "cloth-db-97c70",
    storageBucket: "cloth-db-97c70.appspot.com",
    messagingSenderId: "574835751886",
    appId: "1:574835751886:web:2381c7569871f6ccb6c99f",
    measurementId: "G-KQW4KVQ3Z5"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;