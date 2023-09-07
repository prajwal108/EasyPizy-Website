
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

// Add this script before the closing </body> tag
const modalOverlay = document.getElementById("modalOverlay");
const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModal");
const LoginBtn = document.getElementById("loginBtn");
const closeModalBtn1 = document.getElementById("closeModal1");

document.addEventListener("click", (event) => {
  if (event.target && event.target.id === "loginBtn") {
    // Show the modal when "Login/Signup" is clicked
    modalOverlay.style.display = "flex";
    modal.style.display = "block";
  } else if (event.target && (event.target.id === "closeModal" ||event.target.id === "closeModal1")) {
    // Close the modal when the close button is clicked
    console.log("close");
    modalOverlay.style.display = "none";
  }
});

window.addEventListener("load", () => {
  const productCards = document.querySelectorAll(".product-item");

  productCards.forEach((card) => {
    const productId = card.getAttribute("data-product-id");
    const sizeRadios = card.querySelectorAll("input[type='radio']");
    const finalPrice = card.querySelector(".final-price");
    const originalPrice = card.querySelector(".original-price");
    const discountText = card.querySelector(".discount");

    // Load selected size from local storage or use default value
    const selectedSize ="250gm";
    // Set radio buttons and prices based on the selected size
    sizeRadios.forEach((radio) => {
      radio.checked = radio.value === selectedSize;
      radio.addEventListener("change", function () {
        // Update local storage with the selected size
        localStorage.setItem(`selectedSize_${productId}`, this.value);

        // Simulated dynamic price and discount calculation
        const selectedValue = this.value;
        let price = 100; // Default price
        let discount = 20; // Default discount percentage

        if (selectedValue === "500gm") {
          price = 200;
          discount = 25;
        } else if (selectedValue === "1000gm") {
          price = 400;
          discount = 30;
        }

        const finalPriceValue = price - (price * discount) / 100;
        finalPrice.textContent = `₹${finalPriceValue}`;
        originalPrice.textContent = `₹${price}`;
        discountText.textContent = `${discount}% off`;
      });
    });
  });

});

document.addEventListener("DOMContentLoaded", function () {
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  const plusBtns = document.querySelectorAll(".plus-btn");
  const minusBtns = document.querySelectorAll(".minus-btn");
  const inputBtns = document.querySelectorAll(".inputBtn");
  const plusMinusInputs = document.querySelectorAll(".plus-minus-input");

  addToCartBtns.forEach((addToCartBtn, index) => {
    let quantity = 1;

    addToCartBtn.addEventListener("click", function (event) {
      event.preventDefault();
      addToCartBtn.style.display = "none";
      plusMinusInputs[index].style.display = "flex";
    });

    plusBtns[index].addEventListener("click", function (event) {
      event.preventDefault();
      if (quantity < 6) {
        quantity++;
        inputBtns[index].textContent = quantity;
      }
    });

    minusBtns[index].addEventListener("click", function (event) {
      event.preventDefault();
      if (quantity > 1) {
        quantity--;
        inputBtns[index].textContent = quantity;
      } else {
        plusMinusInputs[index].style.display = "none";
        addToCartBtn.style.display = "block";
      }
    });
  });
});




  $(document).ready(function () {
    $(".product_thumbnail_slides").owlCarousel({
      items: 1, // Number of items to show
      loop: true, // Loop the carousel
      autoplay: true, // Autoplay the carousel
      autoplayTimeout: 3000, // Autoplay every 'n' milliseconds
      autoplayHoverPause: true, // Pause the autoplay on hover
      dots: false, // Show navigation dots
      nav: true, // Show navigation arrows
      navText: [
        '<i class="bi bi-arrow-left-circle-fill"></i>',
        '<i class="bi bi-arrow-right-circle-fill"></i>',
      ], // Customize navigation arrows
    });
  });
