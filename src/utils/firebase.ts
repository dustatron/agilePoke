import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWl4luXyraFeVBxBM7AeiZXCKJRUWCdts",
  authDomain: "mcagilepoker.firebaseapp.com",
  projectId: "mcagilepoker",
  storageBucket: "mcagilepoker.appspot.com",
  messagingSenderId: "87929214533",
  appId: "1:87929214533:web:10ec620a643eeba6ee752c",
  measurementId: "G-P6L13WER2P",
}

export const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);

