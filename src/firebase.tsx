// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore , collection, doc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYo8YZeuoRpYwj1x0rbP9LYyr9f_g2f30",
  authDomain: "payapp-e52fd.firebaseapp.com",
  projectId: "payapp-e52fd",
  storageBucket: "payapp-e52fd.appspot.com",
  messagingSenderId: "68080362712",
  appId: "1:68080362712:web:d2b610524b7c94e48163ad"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db2 = getFirestore();