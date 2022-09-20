// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore , collection, doc,addDoc,setDoc} from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

//const { initializeApp } = require('firebase-admin/app');
//import { doc, onSnapshot, collection, query, where,addDoc,updateDoc,setDoc,deleteDoc,getDocs,getDoc,documentId,orderBy} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//var admin = require("firebase-admin");
//var serviceAccount = require("payapp-e52fd-firebase-adminsdk-9h72t-90ee09457c.json");
const firebaseConfig = {
  apiKey: "AIzaSyCYo8YZeuoRpYwj1x0rbP9LYyr9f_g2f30",
  authDomain: "payapp-e52fd.firebaseapp.com",
  projectId: "payapp-e52fd",
  storageBucket: "payapp-e52fd.appspot.com",
  messagingSenderId: "68080362712",
  appId: "1:68080362712:web:d2b610524b7c94e48163ad"
};


export const getToken2 = (setTokenFound) => {
  
  return getToken(messaging, {vapidKey: "BB1Xe-i3dVi7POm4swH7RAxAReADelXaYT2P_4qgy1Em01hzLrAstpbaSCt-46f14l7BuwshpgPVxFmf5jGF3ys"}).then((currentToken:any) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      
      addToken(currentToken)
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

const addToken = async (token) => {
  const hola = await setDoc(doc(db2, "tokens",token), {
    tokenUser:token
  });

};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
const messaging = getMessaging(app);
export const db2 = getFirestore();