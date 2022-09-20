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
// const topic="notes";
// const registrationTokens = [
//   "evVTCKr4EAG-HvQ7ugFoxV:APA91bFACTcVKE1X3PDR_2zHTLIo4oKCFmgWN4fIa1JckbNv7M2alTO36RnJArXvxeA7IK6DvfEi67L_8HmMHlGAiW0lNm_dc5C-QHWUXiQTYvYqZUfmSlgDlqY1MsfUzSiKk2QjGDp8"
//    ];
   
 
//    messaging().subscribeToTopic(registrationTokens, topic)
//      .then((response) => {
//        // See the MessagingTopicManagementResponse reference documentation
//        // for the contents of response.
//        console.log('Successfully subscribed to topic:', response);
//      })
//      .catch((error) => {
//        console.log('Error subscribing to topic:', error);
//      });