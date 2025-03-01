import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtZzvtkjxwjYP9S9WQtDRz5TAUZNDxoI8",
  authDomain: "pre-poll-2d694.firebaseapp.com",
  projectId: "pre-poll-2d694",
  storageBucket: "pre-poll-2d694.firebasestorage.app",
  messagingSenderId: "667746047025",
  appId: "1:667746047025:web:40e0fe78ed9d2021997110",
  measurementId: "G-WHMP3X2R98"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db, signInWithPopup, collection, addDoc, getDocs };
