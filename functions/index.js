const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const Razorpay = require("razorpay");

admin.initializeApp();

exports.getFirebaseConfig = functions
    .region("asia-south1")
    .https.onRequest((request, response) => {
      const firebaseConfig = {
        apiKey: functions.config().functions.api_key,
        authDomain: functions.config().functions.auth_domain,
        databaseURL: functions.config().functions.database_url,
        projectId: functions.config().functions.project_id,
        storageBucket: functions.config().functions.storage_bucket,
        messagingSenderId: functions.config().functions.messaging_sender_id,
        appId: functions.config().functions.app_id,
        measurementId: functions.config().functions.measurement_id,
      };
      // Enable CORS
      cors(request, response, () => {
        response.json(firebaseConfig);
      });
    });

exports.getRecaptchaSiteKey = functions
    .region("asia-south1")
    .https.onRequest((request, response) => {
      const siteKey = functions.config().recaptcha.site_key;
      cors(request, response, () => {
        response.send(siteKey);
      });
    });

exports.createOrder = functions
    .region("asia-south1")
    .https.onRequest((request, response) => {
      const instance = new Razorpay({
        key_id: functions.config().key_id,
        key_secret: functions.config().key_secret,
      });

      instance.orders.create({
        amount: request.body.amount,
        currency: "INR",
        receipt: "receipt#1",
      }, (error, order) => {
        if (error) {
          response.status(500).send(error);
        } else {
          // Enable CORS
          cors(request, response, () => {
            response.json({orderId: order.id});
          });
        }
      });
    });
