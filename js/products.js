// Get necessary elements
const addToCartButton = document.getElementById("addToCart");
const buyNowButton1 = document.getElementById("buyNowBtn1");

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

// Add to Cart button click event
addToCartButton.addEventListener("click", function (event) {
  event.preventDefault();
  // Add your logic here for adding to cart
  console.log("Item added to cart");
});

// Buy Now button click event
buyNowButton1.addEventListener("click", function (event) {
  event.preventDefault();
  // Add your logic here for the Buy Now action
  console.log("Buy Now clicked");
});
