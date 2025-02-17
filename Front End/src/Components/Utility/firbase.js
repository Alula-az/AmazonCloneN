import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // Import auth to use authentication functions
import "firebase/compat/firestore"; // Import firestore if needed

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
const auth = app.auth(); // This will give you access to the authentication methods
const db = app.firestore(); // Initialize Firestore if you need it

// Export the auth object so you can access it elsewhere in your app
export { auth, db };
