import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "@firebase/firestore"

// paste your firebase config object here
const firebaseConfig = {
    apiKey: "AIzaSyBFbedwfiJZNtmM1Hah-psboTXdD3jULDY",
    authDomain: "quantum-chat-bot.firebaseapp.com",
    projectId: "quantum-chat-bot",
    storageBucket: "quantum-chat-bot.appspot.com",
    messagingSenderId: "73234206130",
    appId: "1:73234206130:web:b439d7d7a65e2fc9f5a8ab"
  };
  
  // Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;