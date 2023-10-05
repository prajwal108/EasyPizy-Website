const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
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


exports.processOrder = functions
    .region("asia-south1")
    .https.onRequest((request, response) => {
      cors(request, response, async () => {
        try {
          const {
            amount,
            orderID,
            name,
            contact,
            email, // Default to an empty string if not provided
            userUID,
          } = request.body;


          const options = {
            key: {
              key_id: functions.config().razorpay.key_id,
              key_secret: functions.config().razorpay.key_secret,
            },
            amount: amount,
            currency: "INR",
            name: "EasyPizy", // your business name
            order_id: orderID,
            callback_url: "127.0.0.1:5501/Account-Menu/order-history.html",
            prefill: {
              name: name, // your customer's name
              email: email,
              contact: contact,
            },
            theme: {
              color: "#ff6347",
            },
            modal: {
              confirm_close: true,
            },
            customer_id: userUID,
            remember_customer: true,
            hidden: {
              contact: true,
              email: true,
            },
            send_sms_hash: true,
          };

          const rzp1 = new Razorpay(options);


          rzp1.open();

          rzp1.on("payment.success", (response) => {
            // Payment success logic here
            console.log("Payment successful:", response);

            // Store the payment details in Firestore
            const paymentDetails = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            // Define the path to the Firestore document
            const orderDocumentPath = `users/${userUID}/orders/${orderID}`;

            // Get a Firestore reference to the document
            const orderDocRef = admin.firestore().doc(orderDocumentPath);

            // Set the payment details in Firestore
            orderDocRef
                .update(paymentDetails, {merge: true})
                .then(() => {
                  console.log("Payment details stored in Firestore.");
                })
                .catch((error) => {
                  console.error(
                      "Error storing payment details in Firestore:",
                      error,
                  );
                });

            // Send a success response to the client
            response.status(200).send("Payment successful");
          });

          rzp1.on("payment.error", async (error) => {
            // Payment error logic here
            console.error("Payment error:", error);

            // Send an error response to the client
            response.status(500).send("Payment error");

            // Update the status field in Firestore to "failed"
            const orderDocumentPath = `users/${userUID}/orders/${orderID}`;
            const orderDocRef = admin.firestore().doc(orderDocumentPath);

            try {
              await orderDocRef.update({status: "failed"}, {merge: true});
              console.log("Order status updated to 'failed' in Firestore.");
            } catch (updateError) {
              console.error(
                  "Error updating order status in Firestore:",
                  updateError,
              );
            }
          });
        } catch (error) {
          console.error("Error processing the order:", error);
          // Send an error response to the client in case of any exception
          response.status(500).send("Error processing the order");
        }
      });
    });


