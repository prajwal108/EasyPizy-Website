const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp(); // Initialize Firebase Admin SDK
const {AppCheck} = require("firebase-admin/app-check");
// const {initialize} = require("firebase-functions/lib/providers/firestore");

const appCheck = new AppCheck();
appCheck.activate("6LcXifYnAAAAANWB4INPpx_rnQsunUqryz5cv6qR");

exports.proxyHttpRequest = functions.https.onRequest(async (req, res) => {
  // Use Firebase App Check to verify the request
  try {
    await appCheck.check(req);
  } catch (error) {
    console.error("App Check failed:", error);
    return res.status(403).send("Unauthorized");
  }

  // Define the target URL for your HTTP request
  const targetUrl = "https://EasyPizy-in.web.app/"; // Replace with your target URL

  try {
    // Make the HTTP request
    const response = await fetch(targetUrl);

    if (!response.ok) {
      throw new Error(`HTTP request failed with status: ${response.status}`);
    }

    // Get and send the response data
    const data = await response.text();
    return res.status(200).send(data);
  } catch (error) {
    console.error("HTTP request error:", error);
    return res.status(500).send("Internal Server Error");
  }
});
