const functions = require("firebase-functions");
const Razorpay = require("razorpay");
const corsOptions = {
  origin: [
    "https://easypizy-in.web.app",
    "https://easypizy-in.web.app/cart.html",
    "http://127.0.0.1:5501",
  ],
};

const cors = require("cors")(corsOptions);

exports.getFirebaseConfig = functions
    .region("asia-south1")
    .https.onRequest((request, response) => {
      const firebaseConfig = {
        apiKey: "AIzaSyA4bdQPLI8i7SgvjUj9eKLirPuUWvYUXcI",
        authDomain: "easypizy-in.firebaseapp.com",
        databaseURL:
        "https://easypizy-in-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "easypizy-in",
        storageBucket: "easypizy-in.appspot.com",
        messagingSenderId: "860069269388",
        appId: "1:860069269388:web:b44033d7d721143eebd0a9",
        measurementId: "G-SYY5K0GJ7H",
      };

      // Set CORS headers
      response.set("Access-Control-Allow-Origin", "*");
      response.set("Access-Control-Allow-Methods", "GET");
      response.set("Access-Control-Allow-Headers", "Content-Type");

      response.json(firebaseConfig);
    });

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


