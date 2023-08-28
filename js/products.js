// Get necessary elements
const addToCartBtn = document.getElementById("addToCart");
// const buyNowButton1 = document.getElementById("buyNowBtn1");
const flipAddCartBtn = document.getElementById("flipAddCartBtn");
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const inputBtn = document.getElementById("inputBtn");

window.addEventListener("load", () => {
  const sizeRadios = document.querySelectorAll("input[type='radio']");
  const finalPrice = document.querySelector(".final-price-1");
  const originalPrice = document.querySelector(".original-price-1");
  const discountText = document.querySelector(".discount-1");

  // Load selected size from local storage or use default value
  const selectedSize = "250gm";

  // Set radio buttons and prices based on the selected size
  sizeRadios.forEach((radio) => {
    radio.checked = radio.value === selectedSize;
    radio.addEventListener("change", function () {
      // Update local storage with the selected size
      localStorage.setItem("selectedSize_pulav", this.value);

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

// // Buy Now button click event
// buyNowButton1.addEventListener("click", function (event) {
//   event.preventDefault();
//   // Add your logic here for the Buy Now action
//   console.log("Buy Now clicked");
// });

let quantity = 1;

addToCartBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
    addToCartBtn.style.display = "none";
    flipAddCartBtn.style.display = "flex";
});

plusBtn.addEventListener("click", function (event){
  event.preventDefault(); // Prevent form submission
  if (quantity < 6) {
    quantity++;
    inputBtn.textContent = quantity;
  }
});

minusBtn.addEventListener("click", function (event){
  event.preventDefault(); // Prevent form submission
  if (quantity > 1) {
    quantity--;
    inputBtn.textContent = quantity;
  } else {
    flipAddCartBtn.style.display = "none";
    addToCartBtn.style.display = "block";
  }
});

//  related owl container
// Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        autoplay: true,
        smartSpeed: 1000,
        slideBy: 1,        
        responsive: {
          0:{
            items:1
          },
            845:{
                items:2
            },
            1325:{
                items:3
            }
        },

         nav: true, // Show navigation arrows
      navText: [
        '<i class="bi bi-arrow-bar-left"></i>',
        '<i class="bi bi-arrow-bar-right"></i>',
      ], // Customize navigation arrows
      dots: true, // Show dots navigation
    });
