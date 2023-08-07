
// const heroSection = document.getElementById("heroSection");
// const images = [
//   "../images/1.jpg",
//   "",
//   "",
//   // "https://res.cloudinary.com/dgel7fmas/image/upload/v1691314294/easypizy/1_idppo7.jpg",
//   // "https://res.cloudinary.com/dgel7fmas/image/upload/v1691314295/easypizy/5_o9ccor.jpg",
//   // "https://res.cloudinary.com/dgel7fmas/image/upload/v1691314294/easypizy/3_gtvjmm.jpg",
// ];

// let currentImageIndex = 0;

// function changeBackgroundImage() {
//   heroSection.style.backgroundImage = `url(${images[currentImageIndex]})`;

//   currentImageIndex = (currentImageIndex + 1) % images.length;
// }

// // Change background image every 2 seconds (2000 milliseconds)
// setInterval(changeBackgroundImage, 3000);

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

