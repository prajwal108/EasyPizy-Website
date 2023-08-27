// Get necessary elements
const cashIcon = document.getElementById("cash");
const finalPriceElement1 = document.querySelector(".final-price-1");
const originalPriceElement1 = document.querySelector(".original-price-1");
const discountElement1 = document.querySelector(".discount-1");
const sizeRadiosPulav = document.querySelectorAll("input[type='radio']");
const addToCartButton = document.getElementById("addToCart");
const buyNowButton1 = document.getElementById("buyNowBtn1");

// Function to calculate and update prices based on selected size
function updatePricesPulav(selectedValue) {
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
  finalPriceElement1.textContent = `₹${finalPriceValue}`;
  originalPriceElement1.textContent = `₹${price}`;
  discountElement1.textContent = `${discount}% off`;
}

// Attach event listeners to size radios
sizeRadiosPulav.forEach((radio) => {
  radio.addEventListener("change", function () {
    updatePricesPulav(this.value);
  });
});

// Initial update of prices based on default selected size
updatePricesPulav("250gm");

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
