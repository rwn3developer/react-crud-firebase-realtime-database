// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLhWWQ2diDJnH1hecYE_1t4MSwFaNFUlg",
  authDomain: "crud-realtime-db-9c5eb.firebaseapp.com",
  databaseURL: "https://crud-realtime-db-9c5eb-default-rtdb.firebaseio.com",
  projectId: "crud-realtime-db-9c5eb",
  storageBucket: "crud-realtime-db-9c5eb.appspot.com",
  messagingSenderId: "1023964351066",
  appId: "1:1023964351066:web:df25a47c66b378b6952663",
  measurementId: "G-10N4MSH3ST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export default {database};