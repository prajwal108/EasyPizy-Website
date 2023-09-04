  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
  import { getAuth, RecaptchaVerifier, signInWithPhoneNumber,browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
  import {getFirestore, collection, addDoc,query,where, getDocs } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
  
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
  let user=null;

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  
    // Your Firebase and event listener code here
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth(app);

  // Set up local persistence
  auth.setPersistence(browserLocalPersistence)
    .then(() => {
      // Local persistence enabled successfully
    })
    .catch((error) => {
      // Handle errors
    });


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

// Event listener for verifying OTP and showing user data modal
verifyAndLoginButton.addEventListener("click", () => {
  const otp = otpInput.value;

  // Use the confirmationResult from the previous step to verify the OTP
  confirmationResult.confirm(otp)
    .then((userCredential) => {
      // User successfully authenticated, you can now access userCredential.user
      user = userCredential.user;
      console.log("User signed in:", user);

      // Check if the user's profile data already exists in Firestore
      const db = getFirestore(app);
      const userProfilesRef = collection(db, "userProfiles");
      const query = where("uid", "==", user.uid);

      getDocs(query).then((querySnapshot) => {
          if (querySnapshot.size === 0) {
            // User's profile data doesn't exist in Firestore, show the userdata modal
            const modal = document.getElementById("modal");
            modal.style.display = "none";
            const userDataModal = document.getElementById("userdata");
            userDataModal.style.display = "block";
          } else {
            // User's profile data already exists, you can redirect or perform other actions
            console.log("User's profile data already exists in Firestore.");
            // Redirect or perform other actions as needed
          }
        })
        .catch((error) => {
          console.error("Error checking profile data:", error);
          // Handle error
        });
    })
    .catch((error) => {
      console.error("Error verifying OTP:", error);
      // Handle error
    });
});



    // Event listener for the "Save Profile" button inside the user data modal
const saveProfileButton = document.getElementById("saveProfileBtn");
saveProfileButton.addEventListener("click", () => {
  // Collect profile data from the form
  const firstName = document.getElementById("firstname").value;
  const lastName = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const mobileNumber = document.getElementById("mobileNumber").value;
  const address = document.getElementById("address").value;
  const pincode = document.getElementById("pincode").value;
  const state = document.getElementById("state").value;

  // Create a user profile object
  const userProfile = {
    uid: user.uid, // Include the UID from Firebase Authentication
    firstName,
    lastName,
    email,
    mobileNumber,
    address,
    pincode,
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
// Assume you have a function to get the user's first name from Firestore
function getFirstNameFromFirestore(uid) {
  const db = getFirestore(app); // Assuming you've imported getFirestore
  const userProfilesRef = collection(db, "userProfiles");
  
  // Query Firestore to get the user's profile data
  const query = query(userProfilesRef, where("uid", "==", uid));

  return getDocs(query)
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const userProfile = querySnapshot.docs[0].data();
        return userProfile.firstName;
      } else {
        return null; // User profile not found
      }
    })
    .catch((error) => {
      console.error("Error fetching first name:", error);
      return null;
    });
}


// Function to update the UI when the user is logged in
function updateUIForLoggedInUser(user) {
  // Update the account text and display additional options
  getFirstNameFromFirestore(user.uid).then((firstName) => {
    if (firstName) {
      accountText.textContent = `${firstName}`;
    }
  });

  accountMenu.innerHTML = `
    <li><a class="dropdown-item" href="#">Account Details</a></li>
    <li><a class="dropdown-item" href="#">Track Your Order</a></li>
    <li><a class="dropdown-item" href="#">Order History</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Logout</a></li>
  `;

  // Hide the login/signup modal if it's displayed
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Function to update the UI when the user is logged out
function updateUIForLoggedOutUser() {
  // Reset the account text and options
  accountText.textContent = "Account";
  accountMenu.innerHTML = `<li><button class="dropdown-item" id="loginBtn">Login/Signup</button></li>`;
}

// Assuming you have a Firebase authentication state change listener
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is logged in
    updateUIForLoggedInUser(user);
  } else {
    // User is logged out
    updateUIForLoggedOutUser();
  }
});
