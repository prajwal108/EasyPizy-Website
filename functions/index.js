const functions = require("firebase-functions");
const Razorpay = require("razorpay");
const cors = require("cors")({origin: true});


const razorpay = new Razorpay({
  key_id: "rzp_test_uN9wYB6blxpSJv",
  key_secret: "U05E6uA3Py8IltmGI1EiqQQC",
});

exports.initiatePayment = functions
    .region("asia-south1")
    .https.onRequest((req, res) => {
      cors(req, res, async () => {
        const options = {
          amount: req.body.amount, // amount in smallest currency unit
          currency: "INR",
          receipt: "order_receipt",
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
      });
    });


exports.createRazorpayOrder = functions
    .region("asia-south1")
    .https.onCall(async (data, context) => {
      try {
      // Verify that the user is authenticated
        if (!context.auth) {
          throw new functions.https.HttpsError(
              "unauthenticated",
              "Authentication required.",
          );
        }

        const amountInPaisa = data.finalAmount * 100;

        const order = await razorpay.orders.create({
          amount: amountInPaisa,
          currency: "INR",
          receipt: "order_receipt",
          payment_capture: 1,
        });

        // Return the order ID to the client
        return {orderId: order.id};
      } catch (error) {
        throw new functions.https.HttpsError(
            "internal",
            "Error creating Razorpay order.",
            error,
        );
      }
    });
