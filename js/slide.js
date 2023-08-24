
// window.addEventListener("scroll", function() {
//   const heroSectionHeight = document.querySelector(".hero-section").offsetHeight;
//   const navbar = document.querySelector(".navbar");

//   if (window.scrollY > heroSectionHeight) {
//     navbar.classList.add("transparent");
//   } else {
//     navbar.classList.remove("transparent");
//   }
// });

// window.addEventListener("scroll", function () {
//   const SectionHeight = document.querySelector(".site-header").offsetHeight;
//   const navbar = document.querySelector(".navbar");

//   if (window.scrollY > SectionHeight) {
//     navbar.classList.add("transparent");
//   } else {
//     navbar.classList.remove("transparent");
//   }
// });

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
const isLoggedIn = true; // Set this to true if the user is logged in
const isSignedUp = true; // Set this to true if the user is signed up

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




