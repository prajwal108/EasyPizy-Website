
window.addEventListener("scroll", function() {
  const heroSectionHeight = document.querySelector(".hero-section").offsetHeight;
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > heroSectionHeight) {
    navbar.classList.add("transparent");
  } else {
    navbar.classList.remove("transparent");
  }
});

window.addEventListener("scroll", function () {
  const SectionHeight = document.querySelector(".site-header").offsetHeight;
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > SectionHeight) {
    navbar.classList.add("transparent");
  } else {
    navbar.classList.remove("transparent");
  }
});

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




