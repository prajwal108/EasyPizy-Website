
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


const loginForm = document.getElementById("loginForm");
const sendOtpBtn = document.getElementById("sendOtpBtn");

// Function to handle sending OTP
sendOtpBtn.addEventListener("click", () => {
  const phoneNumber = document.getElementById("phoneNumber").value;

  firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
    .then((confirmationResult) => {
      const verificationCode = prompt("Enter OTP sent to your phone:");
      return confirmationResult.confirm(verificationCode);
    })
    .then((userCredential) => {
      // User is logged in or signed up
    })
    .catch((error) => {
      console.error(error);
    });
});

// Function to handle form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Your form submission logic
});
