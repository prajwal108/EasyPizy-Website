const functions = require("firebase-functions");
const cors = require("cors")({origin: true});
const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: functions.config().razorpay.key_id,
  key_secret: functions.config().razorpay.key_secret,
});

exports.createOrder = functions
    .region("asia-south1")
    .https.onRequest((request, response) => {
      return cors(request, response, () => {
        const timestamp = Date.now();
        const receipt = `receipt#${timestamp}`;
        const {amount} = request.body;

        const options = {
          amount: amount,
          currency: "INR",
          receipt: receipt,
        };

        instance.orders.create(options, (err, order) => {
          order ?
          response.status(200).send(order) : response.status(500).send(err);
        });
      });
    });
