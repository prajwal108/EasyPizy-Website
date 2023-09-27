const functions = require("firebase-functions");
const Razorpay = require("razorpay");
const cors = require("cors")({origin: true});

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

exports.getRecaptchaSiteKey = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const siteKey = functions.config().recaptcha.site_key;
    response.send(siteKey);
  });
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

// exports.createOrder = functions
//     .region("asia-south1")
//     .https.onRequest((req, res) => {
//       return cors(req, res, () => {
//         const options = {
//           amount: req.body.amount,
//           currency: "INR",
//           receipt: req.body.receipt,
//         };
//         instance.orders.create(options, (err, order) => {
//         order ? res.status(200).send(order) : res.status(500).send(err);
//         });
//       });
//     });

// exports.capturePayments = functions
//     .region("asia-south1")
//     .https.onRequest((req, res) => {
//       return cors(req, res, () => {
//         request(
//             {
//               method: "POST",
//               url: `https://${key_id}:${key_secret}@api.razorpay.com/v1/payments/${req.body.payment_id}/capture`,
//               form: {
//                 amount: req.body.amount,
//               },
//             },
//             (error, response, body) => {
//           response ?
//             res.status(200).send({
//               res: response,
//               req: req.body,
//               body: body,
//             }) :
//             res.status(500).send(error);
//             },
//         );
//       });
//     });
