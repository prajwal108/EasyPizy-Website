// TODO: Add SDKs for Firebase products that you want to use
//  import firebase from "firebase/app";
import firebase from "../node_modules/firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries
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

// Your web app's Firebase configuration
// Your web app's Firebase configuration
let confirmationResult;
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
document.addEventListener("DOMContentLoaded", () => {
  // Your Firebase and event listener code here
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const analytics = firebase.analytics(app);
  const auth = firebase.auth();

  const sendOtpButton = document.getElementById("sendOtpBtn");
  const phoneNumberInput = document.getElementById("phoneNumber");
  let isButtonDisabled = false; // Track whether the button is disabled

  sendOtpButton.addEventListener("click", () => {
    if (isButtonDisabled) {
      return; // Don't do anything if the button is already disabled
    }

    const phoneNumber = "+91" + phoneNumberInput.value; // Construct the full phone number

    // Create reCAPTCHA verifier
    const appVerifier = new _auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible", // Set to 'invisible' for invisible reCAPTCHA
    });

    // Disable the button
    sendOtpButton.disabled = true;
    isButtonDisabled = true;

    // Send OTP to the user's phone
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // OTP sent successfully, proceed to verification
        // Save the 'confirmationResult' to use in the next step

        // Set a timer to re-enable the button after 1 minute (60,000 milliseconds)
        setTimeout(() => {
          sendOtpButton.disabled = false;
          isButtonDisabled = false;
        }, 60000); // 1 minute
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        // Handle error

        // Re-enable the button in case of an error
        sendOtpButton.disabled = false;
        isButtonDisabled = false;
      });
  });

  const otpInput = document.getElementById("otp");
  const verifyAndLoginButton = document.getElementById("verifyAndLoginBtn");

  verifyAndLoginButton.addEventListener("click", () => {
    const otp = otpInput.value;

    // Use the confirmationResult from the previous step to verify the OTP
    confirmationResult
      .confirm(otp)
      .then((userCredential) => {
        // User successfully authenticated, you can now access userCredential.user
        const user = userCredential.user;
        console.log("User signed in:", user);
        // Redirect or perform other actions as needed
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        // Handle error
      });
  });
});
