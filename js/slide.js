
function sendToWhatsApp() {
  // Get form data
  const fullName = encodeURIComponent(
    document.getElementById("full-name").value
  );
  const email = encodeURIComponent(document.getElementById("email").value);
  const message = encodeURIComponent(document.getElementById("message").value);

  // Construct WhatsApp URL
  const whatsappURL = `https://api.whatsapp.com/send?phone=9049058976&text=Full%20Name:%20${fullName}%0AEmail:%20${email}%0AMessage:%20${message}`;

  // Open WhatsApp link in a new tab
  window.open(whatsappURL, "_blank");
}

  window.addEventListener("scroll", function() {
    const whatsappButton = document.getElementById("whatsapp-button");
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY >= windowHeight) {
      whatsappButton.style.display = "block"; // Display the button after scrolling past 100vh
    } else {
      whatsappButton.style.display = "none"; // Hide the button if scrolled back above 100vh
    }
  });


// Example JavaScript code
const accountText = document.getElementById("accountText");
const accountMenu = document.getElementById("accountMenu");

// Check if the user is logged in or signed up
const isLoggedIn = false; // Set this to true if the user is logged in
const isSignedUp = false; // Set this to true if the user is signed up

if (isLoggedIn || isSignedUp) {
    // Update the account text and display additional options
    accountText.textContent = ""; // Replace with the user's name
    accountMenu.innerHTML = `
        <li><a class="dropdown-item" href="#">Account Details</a></li>
        <li><a class="dropdown-item" href="#">Track Your Order</a></li>
        <li><a class="dropdown-item" href="#">Order History</a></li>
        <li><a class="dropdown-item" href="#">Saved Items</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Logout</a></li>
    `;
}





// Add this script before the closing </body> tag
const modalOverlay = document.getElementById("modalOverlay");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModal");
const LoginBtn = document.getElementById("loginBtn");
const LoginBtnS = document.getElementById("loginBtnS");

// Show the modal when "Login/Signup" is clicked
LoginBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
  modal.style.display = "block";

});
// Show the modal when "Login/Signup" is clicked
LoginBtnS.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
  modal.style.display = "block";
});

// Close the modal when the close button is clicked
closeModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

// Close the modal if user clicks outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});
const firebaseConfig = {
  apiKey: "AIzaSyChpg85GDTdpX9WdaN2cmGC9B-bKF_NVxU",

  authDomain: "easypizy-signup.firebaseapp.com",

  projectId: "easypizy-signup",

  storageBucket: "easypizy-signup.appspot.com",

  messagingSenderId: "456276577737",

  appId: "1:456276577737:web:e27a3cae99a9ca3c5aec18",

  measurementId: "G-HH335V8J5D",
};
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// Reference the HTML elements
const phoneForm = document.getElementById("loginForm");
const sendCodeButton = document.getElementById("sendOtpBtn");
const phoneInput = document.getElementById("phoneNumber");
const verifyAndLoginBtn = document.getElementById("verifyAndLoginBtn");
const verificationCodeInput = document.getElementById("verificationCode");

// Set up reCAPTCHA verifier
const recaptchaVerifier = new firebase.auth.RecaptchaVerifier("loginForm", {
  size: "invisible", // Use invisible reCAPTCHA
  callback: (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    sendVerificationCode();
  },
});

let confirmationResult; // Store confirmation result globally

// Attach event listener to the send code button
sendCodeButton.addEventListener('click', () => {
  const phoneNumber = phoneInput.value;
  sendCodeButton.disabled = true;
  // Send verification code
  firebase.auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
    .then((result) => {
      // Code sent successfully
      sendCodeButton.disabled = false;
      confirmationResult = result; // Store the confirmation result
    })
    .catch((error) => {
      console.error('Error:', error.message);
      sendCodeButton.disabled = false;
    });
});

// Attach event listener to the verify and login button
verifyAndLoginBtn.addEventListener('click', () => {
  const verificationCode = verificationCodeInput.value;
  if (confirmationResult) {
    confirmationResult.confirm(verificationCode)
      .then((result) => {
        // User signed in successfully
        console.log('User signed in:', result.user);
      })
      .catch((error) => {
        console.error('Error:', error.message);
      });
  }
});
