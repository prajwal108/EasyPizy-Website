const functions = require("firebase-functions");
const {initializeAppCheck, ReCaptchaV3Provider} = require("firebase/app-check");
const admin = require("firebase-admin");
const Razorpay = require("razorpay");


admin.initializeApp();

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LcXifYnAAAAANWB4INPpx_rnQsunUqryz5cv6qR"),
  isTokenAutoRefreshEnabled: true,
  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed
});

const razorpay = new Razorpay({
  key_id: "rzp_test_SPK0JdG1kial0H",
  key_secret: "wEaSM4JvaanlTu0D1lszZ28K",
});

exports.createRazorpayOrder = functions.https.onCall(async (data, context) => {
  // Verify that the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "Authentication required.",
    );
  }

  try {
    // Create a new Razorpay order
    const order = await razorpay.orders.create({
      amount: data.amount, // Amount in paisa (e.g., 1000 for ₹10)
      currency: "INR",
      receipt: "order_receipt",
      payment_capture: 1, // Auto-capture the payment
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
