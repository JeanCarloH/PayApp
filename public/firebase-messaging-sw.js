// // Scripts for firebase and firebase messaging
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

//importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js");




// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyCYo8YZeuoRpYwj1x0rbP9LYyr9f_g2f30",
    authDomain: "payapp-e52fd.firebaseapp.com",
    projectId: "payapp-e52fd",
    storageBucket: "payapp-e52fd.appspot.com",
    messagingSenderId: "68080362712",
    appId: "1:68080362712:web:d2b610524b7c94e48163ad"
};
const app = firebase.initializeApp(firebaseConfig);


// Retrieve firebase messaging
  const messaging = firebase.messaging(app);

 //const messaging = getMessaging();
messaging.onMessage(function (payload) {
  console.log('Message received. ', payload);
  window.alert('Message received. ', payload)
  // ...
});

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
console.log("ENTRE")
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(
    
    notificationTitle,
    notificationOptions);
    
});
