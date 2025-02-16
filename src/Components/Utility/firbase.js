import firebase from "firebase/compat/app";
//auth
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN7eMK7lwnCdkIZ1OgAXNsFILaTr5oDfs",
  authDomain: "clone-f9d32.firebaseapp.com",
  projectId: "clone-f9d32",
  storageBucket: "clone-f9d32.firebasestorage.app",
  messagingSenderId: "247458456246",
  appId: "1:247458456246:web:f095a93cbe0e14681e7c17",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
