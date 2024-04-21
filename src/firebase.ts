// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBckSwqdHCGVTQdDmyvAOwHnCho8FXnYL0", //FIREBASE_API_KEY,
  authDomain: "quirkycart-bb4aa.firebaseapp.com",
  projectId: "quirkycart-bb4aa",
  storageBucket: "quirkycart-bb4aa.appspot.com",
  messagingSenderId: "355736205514",
  appId: "1:355736205514:web:edfad8565591fec3979c33",
  measurementId: "G-WDJD5HK4Q7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;