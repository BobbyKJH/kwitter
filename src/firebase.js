// import * as firebase from "firebase.app";
import * as firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzlo8ae2VyQrJqReR5c_4i7yM_PUxi2Kc",
  authDomain: "kwitter-afa2e.firebaseapp.com",
  projectId: "kwitter-afa2e",
  storageBucket: "kwitter-afa2e.appspot.com",
  messagingSenderId: "26833494718",
  appId: "1:26833494718:web:eaf008e57c7978bfe874ef",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
