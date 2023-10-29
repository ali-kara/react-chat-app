// src/firebase.js
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBECqRg6xoH5x3xSJxktEqvWdx64ojUzL8",
  authDomain: "react-chat-app-d4d76.firebaseapp.com",
  projectId: "react-chat-app-d4d76",
  storageBucket: "react-chat-app-d4d76.appspot.com",
  messagingSenderId: "1033234550014",
  appId: "1:1033234550014:web:669fb1ab7b550ca98269af",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
