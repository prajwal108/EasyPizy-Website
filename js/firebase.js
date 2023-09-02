
// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
  import { signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA4bdQPLI8i7SgvjUj9eKLirPuUWvYUXcI",
    authDomain: "easypizy-in.firebaseapp.com",
    databaseURL: "https://easypizy-in-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "easypizy-in",
    storageBucket: "easypizy-in.appspot.com",
    messagingSenderId: "860069269388",
    appId: "1:860069269388:web:b44033d7d721143eebd0a9",
    measurementId: "G-SYY5K0GJ7H"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  
const sendOtpButton = document.getElementById('sendOtpBtn');
const phoneNumberInput = document.getElementById('phoneNumber');

sendOtpButton.addEventListener('click', () => {
  const phoneNumber = '+91' + phoneNumberInput.value; // Construct the full phone number

  // Send OTP to the user's phone
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // OTP sent successfully, proceed to verification
      // Save the 'confirmationResult' to use in the next step
    })
    .catch((error) => {
      console.error('Error sending OTP:', error);
      // Handle error
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

