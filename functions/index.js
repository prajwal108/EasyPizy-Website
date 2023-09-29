const functions = require("firebase-functions");
const cors = require("cors")({origin: true});
const Razorpay = require("razorpay");
const {v4: uuidv4} = require("uuid");

exports.createOrder = functions
    .region("asia-south1")
    .https.onRequest((request, response) => {
      cors(request, response, () => {
        const instance = new Razorpay({
          key_id: functions.config().razorpay.key_id,
          key_secret: functions.config().razorpay.key_secret,
        });

        const timestamp = Date.now();
        const uniqueId = uuidv4();
        const receipt = `receipt#${timestamp}-${uniqueId}`;

        // Corrected the way to extract the 'amount' from the request body
        const {amount} = request.body;

        instance.orders.create(
            {
              amount: amount, // Use the extracted amount
              currency: "INR",
              receipt: receipt,
            },
            (error, order) => {
              if (error) {
                response.status(500).send(error);
              } else {
                response.json({orderId: order.id});
              }
            },
        );
      });
    });
