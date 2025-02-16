// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth';
import "firebase/compat/firestore"
import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAbdrM8po9Om7FerENAQDB3v5ALBkMp21w",
  authDomain: "e-2024.firebaseapp.com",
  projectId: "e-2024",
  storageBucket: "e-2024.appspot.com",
  messagingSenderId: "603955850084",
  appId: "1:603955850084:web:318bc75792bb8d6f206871"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = app.firestore()



//----------------------------------------------------------------------
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from 'firebase'
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//     apiKey: "AIzaSyAKH9mzbYc1nWI8WvJyRIPGXpeGFDKvB5o",
//     authDomain: "e-feb-dd351.firebaseapp.com",
//     projectId: "e-feb-dd351",
//     storageBucket: "e-feb-dd351.appspot.com",
//     messagingSenderId: "750481143199",
//     appId: "1:750481143199:web:148c588c449cf6b5e179aa",
//     measurementId: "G-W3QM84008B"
//   };


// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
// export { db, auth };
