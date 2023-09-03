  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
  import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
  
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

  let confirmationResult;

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  
    // Your Firebase and event listener code here
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth();

    const sendOtpButton = document.getElementById("sendOtpBtn");
    const phoneNumberInput = document.getElementById("phoneNumber");
    let isButtonDisabled = false; // Track whether the button is disabled
    
    sendOtpButton.addEventListener("click", () => {
      if (isButtonDisabled) {
        return; // Don't do anything if the button is already disabled
      }

      const phoneNumber = "+91" + phoneNumberInput.value; // Construct the full phone number

      // Create reCAPTCHA verifier
      const appVerifier = new RecaptchaVerifier(auth, 'verifyAndLoginBtn',{
        'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
      });
// Check if reCAPTCHA has already been rendered in the container
  const recaptchaContainer = document.getElementById('recaptcha-container');
  if (!recaptchaContainer.hasChildNodes()) {
    // If not rendered, then render it
    appVerifier.render().then(widgetId => {
      // save widgetId
    });
  }


      // Disable the button
      sendOtpButton.disabled = true;
      isButtonDisabled = true;

      // Send OTP to the user's phone
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((result) => {
          // OTP sent successfully, proceed to verification
          // Save the 'confirmationResult' to use in the next step
          confirmationResult = result;
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
      confirmationResult.confirm(otp).then((userCredential) => {
        // User successfully authenticated, you can now access userCredential.user
        const user = userCredential.user;
        console.log("User signed in:", user);
        // Redirect or perform other actions as needed
        // Hide the login modal
        const modal = document.getElementById("modal");
        modal.style.display = "none";
        // Display the user data modal
        const userDataModal = document.getElementById("userdata");
        userDataModal.style.display = "block";
      })
        .catch((error) => {
          console.error("Error verifying OTP:", error);
          // Handle error
        });
    });


    // Event listener for the "Save Profile" button inside the user data modal
const saveProfileButton = document.getElementById("saveProfileBtn");
saveProfileButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission (if it's inside a form)

  // Collect profile data from the form
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const mobileNumber = document.getElementById("mobileNumber").value;
  const address = document.getElementById("address").value;
  const pincode = document.getElementById("pincode").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;

  // Create a user profile object
  const userProfile = {
    uid: user.uid, // Include the UID from Firebase Authentication
    fullName,
    email,
    mobileNumber,
    address,
    pincode,
    city,
    state,
  };

  // Store the user profile in Firestore
  const db = getFirestore(app); // Assuming you've imported getFirestore
  const userProfilesRef = collection(db, "userProfiles");

  // Add the user profile data to Firestore
  addDoc(userProfilesRef, userProfile)
    .then(() => {
      // Profile data successfully saved

      // Close the user data modal
      const userDataModal = document.getElementById("userdata");
      userDataModal.style.display = "none";

      // Hide the modal overlay
      const modalOverlay = document.getElementById("modalOverlay");
      modalOverlay.style.display = "none";
    })
    .catch((error) => {
      console.error("Error saving profile data:", error);
      // Handle error
    });
});