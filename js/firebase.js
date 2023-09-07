  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
  import { getAuth, RecaptchaVerifier, signInWithPhoneNumber,browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
  import {getFirestore, collection, addDoc,query,where, getDocs } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
  import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app-check.js";
  
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
    const auth = getAuth(app);
    

  // Set up local persistence
  auth.setPersistence(browserLocalPersistence).then(() => {
      // Local persistence enabled successfully
    })
    .catch((error) => {
      // Handle errors
    });

    const appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider("6LcXifYnAAAAANWB4INPpx_rnQsunUqryz5cv6qR"),
      isTokenAutoRefreshEnabled: true,
      // Optional argument. If true, the SDK automatically refreshes App Check
      // tokens as needed
    });
    

    const sendOtpButton = document.getElementById("sendOtpBtn");
    const phoneNumberInput = document.getElementById("phoneNumber");
    let isButtonDisabled = false; // Track whether the button is disabled
    
    document.addEventListener("click", (event) => {
      if (event.target && event.target.id === "sendOtpBtn") {
        if (isButtonDisabled) {
          return; // Don't do anything if the button is already disabled
        }

        const phoneNumber = "+91" + phoneNumberInput.value; // Construct the full phone number

        // Create reCAPTCHA verifier
        const appVerifier = new RecaptchaVerifier(auth, "verifyAndLoginBtn", {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignInSubmit();
          },
        });
        // Check if reCAPTCHA has already been rendered in the container
        const recaptchaContainer = document.getElementById("recaptcha-container");
        if (recaptchaContainer.childElementCount>=0) {
          // If not rendered, then render it
          appVerifier.render().then((widgetId) => {
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
      }
    });
  

    const otpInput = document.getElementById("otp");
   
    otpInput.value = "";
    const verifyAndLoginButton = document.getElementById("verifyAndLoginBtn");


  
// Function to fetch user profile data from Firestore
async function getUserProfile(uid) {
  const db = getFirestore();
  const userProfilesRef = collection(db, "userProfiles");

  const userProfileQuery = query(userProfilesRef, where("uid", "==", uid));
  
  try {
    const userProfileSnapshot = await getDocs(userProfileQuery);

    if (!userProfileSnapshot.empty) {
      // Return user profile data when found
      return userProfileSnapshot.docs[0].data();
    } else {
      // Return null when no user profile is found
      return null;
    }

  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error; 
  }
}

// OTP verification
 verifyAndLoginButton.addEventListener("click", async () => {
  const otp = otpInput.value;

  console.log("Starting OTP confirmation...");
  const userCredential = await confirmationResult.confirm(otp);
  console.log("OTP confirmed successfully.");

  const user = userCredential.user;

  try {
    // Fetch user profile data
    const userProfileData = await getUserProfile(user.uid);

    if (userProfileData === null) {
      // Show user profile modal
      console.log("User profile not found, showing user profile modal.");
      const modal = document.getElementById("modal");
      modal.style.display = "none";
      const userDataModal = document.getElementById("userdata");
      userDataModal.style.display = "block";
      const modalOverlay = document.getElementById("modalOverlay");
      modalOverlay.style.display = "flex";
    } else {
      // User is logged in
      updateUIForLoggedInUser(user);
      // User profile already exists, update UI
      console.log("User profile found, updating UI.");
      const modal = document.getElementById("modal");
      modal.style.display = "none";
      const userDataModal = document.getElementById("userdata");
      userDataModal.style.display = "none";
      const modalOverlay = document.getElementById("modalOverlay");
      modalOverlay.style.display = "none";
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    // Handle error
    const modalOverlay = document.getElementById("modalOverlay");
    modalOverlay.style.display = "none";
  }
});



// Event listener for the "Save Profile" button
const saveProfileButton = document.getElementById("saveProfileBtn");
saveProfileButton.addEventListener("click", async () => {
  console.log("Save Profile button clicked"); // Log that the button was clicked

  // Check if a user is authenticated
  const user = auth.currentUser; // Assuming you've defined 'auth' using getAuth(app)

  if (!user) {
    console.error("User is not authenticated");
    // You might want to display an error message to the user or redirect them to the login page.
    return;
  }

  // Collect profile data from the form
  const firstName = document.getElementById("firstname").value;
  const lastName = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const mobileNumber = document.getElementById("mobileNumber").value;
  const address = document.getElementById("address").value;
  const pincode = document.getElementById("pincode").value;
  const state = document.getElementById("state").value;

  // Create a user profile object
  console.log("Creating user profile object...");
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

  try {
    // Add the user profile data to Firestore
    console.log("Adding user profile to Firestore...");
    const docRef = await addDoc(userProfilesRef, userProfile);
    console.log("Profile data successfully saved with ID:", docRef.id); // Log success

    // Close the user data modal
    const userDataModal = document.getElementById("userdata");
    userDataModal.style.display = "none";

    // Hide the modal overlay
    const modalOverlay = document.getElementById("modalOverlay");
    modalOverlay.style.display = "none";
  } catch (error) {
    console.error("Error saving profile data:", error); // Log error
    // Handle error
  }
});

// Assume you have a function to get the user's first name from Firestore
async function getFirstNameFromFirestore(uid) {
  const db = getFirestore(app);
  const userProfilesRef = collection(db, "userProfiles");

  // Declare query variable
  let userProfileQuery;

  // Initialize query
  userProfileQuery = query(userProfilesRef, where("uid", "==", uid));

  try {
    const userProfileSnapshot = await getDocs(userProfileQuery);

    if (!userProfileSnapshot.empty) {
      const userProfile = userProfileSnapshot.docs[0].data();
      return userProfile.firstName;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile", error);
    return null;
  }
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
    <li><a class="dropdown-item" id="logoutBtn">Logout</a></li>
  `;

  // Hide the login/signup modal if it's displayed
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Function to update the UI when the user is logged out
function updateUIForLoggedOutUser() {
  // Reset the account text and options
  accountText.textContent = "";
  accountMenu.innerHTML = `<li><button class="dropdown-item" id="loginBtn">Login/Signup</button></li>`;
}

  // Your JavaScript code here, including the event listener for "logoutBtn."
  const logoutButton = document.getElementById("logoutBtn");
  document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "logoutBtn") {
      auth.signOut().then(() => {
          // Sign-out successful.
          // You can perform additional actions here, such as redirecting the user.
        })
        .catch((error) => {
          // An error happened. Handle it here.
          console.error("Error during sign-out:", error);
        });
    }
  });


// Event listener for the "Logout" button
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