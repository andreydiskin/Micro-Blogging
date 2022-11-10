// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN1aPHrpruIDtoyq9cNf7iUf4VuaOzC88",
  authDomain: "micro-blogging-b9064.firebaseapp.com",
  databaseURL:
    "https://micro-blogging-b9064-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "micro-blogging-b9064",
  storageBucket: "micro-blogging-b9064.appspot.com",
  messagingSenderId: "266782372998",
  appId: "1:266782372998:web:41684dd0b456d83ef58d07",
  measurementId: "G-8BGBEJXVMT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  addDoc,
  onSnapshot,
  query,
  where,
};
