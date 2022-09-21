var admin = require("firebase-admin");

var serviceAccount = require("./payapp-e52fd-firebase-adminsdk-9h72t-1496e04696.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://payapp-e52fd-default-rtdb.firebaseio.com"
});

var registrationToken = "f6hJreF1OlAeNGDmJN7o_R:APA91bHg8lJV7aTYxuxoX6S1llQONfWR5n_URFdJRvzAX2TDFWYVV_scp8uZCGu4hFXDTVAFxGMfQLWZerN7Kb-XYQnwtQZs_RMRWYVPLxPYgIHyskK39CrkvQPXUIzM1VJiGNomXRq1";

var payload = {
    notification: {
      title: "This is a Notification",
      body: "This is the body of the notification message."
    }
  };
  
   var options = {
    priority: "high",
    timeToLive: 60 * 60 *24
  };
  var topic = "notes"
  admin.messaging().sendToDevice(registrationToken, payload, options)
  .then(function(response) {
    console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });

// admin.messaging().subscribeToTopic(registrationTokens, topic)
//   .then(function(response) {
//     console.log("Successfully subscribed to topic:", response);
//   })
//   .catch(function(error) {
//     console.log("Error subscribing to topic:", error);
//   });

  
  
//   var topic = "notes";
  
//   admin.messaging().sendToTopic(topic, payload)
//     .then(function(response) {
//       console.log("Successfully sent message:", response);
//     })
//     .catch(function(error) {
//       console.log("Error sending message:", error);
//     });