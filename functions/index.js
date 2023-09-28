const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const Razorpay = require("razorpay");

admin.initializeApp();

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
