//  related owl container

// Get all tab links and tab content
const tabLinks = document.querySelectorAll(".nav1-link");
const tabContent = document.querySelectorAll(".tab-pane");

// Add click event listener to each tab link
tabLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Prevent default anchor link behavior
    event.preventDefault();

    // Remove 'active' class from all tab links
    tabLinks.forEach((tab) => tab.classList.remove("active"));

    // Add 'active' class to the clicked tab link
    link.classList.add("active");

    // Get the target tab content ID from the link's 'href' attribute
    const targetContentId = link.getAttribute("href");

    // Loop through all tab content and hide them
    tabContent.forEach((content) => {
      if (content.id === targetContentId.slice(1)) {
        // Display the content of the active tab
        content.classList.add("show", "active");
      } else {
        // Hide the content of other tabs
        content.classList.remove("show", "active");
      }
    });
  });
});

const stars = document.querySelectorAll(".star-container i");

// Initialize a variable to keep track of the selected rating
let selectedRating = 0;

// Add event listeners for hovering and clicking
stars.forEach((star, index) => {
  star.addEventListener("mouseenter", () => {
    // Fill the stars up to the current one when hovering
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("bi-star-fill");
      stars[i].classList.remove("bi-star");
    }
  });

  star.addEventListener("mouseleave", () => {
    // Remove fill from all stars when mouse leaves
    if (selectedRating === 0) {
      stars.forEach((s) => {
        s.classList.remove("bi-star-fill");
        s.classList.add("bi-star");
      });
    } else {
      // Fill the stars based on the selected rating
      for (let i = 0; i < selectedRating; i++) {
        stars[i].classList.add("bi-star-fill");
        stars[i].classList.remove("bi-star");
      }
      // Remove fill from stars after the selected rating
      for (let i = selectedRating; i < stars.length; i++) {
        stars[i].classList.remove("bi-star-fill");
        stars[i].classList.add("bi-star");
      }
    }
  });

  star.addEventListener("click", () => {
    // Set the selected rating
    selectedRating = index + 1;

    // Fill the stars up to the selected rating
    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add("bi-star-fill");
      stars[i].classList.remove("bi-star");
    }
    // Remove fill from stars after the selected rating
    for (let i = selectedRating; i < stars.length; i++) {
      stars[i].classList.remove("bi-star-fill");
      stars[i].classList.add("bi-star");
    }
  });
});

// Related carousel

const owl = $(".related-carousel");

$(document).ready(function () {
  owl.owlCarousel({
    // loop: true,
    margin: 29,
    autoplay: true,
    smartSpeed: 3000,
    slideBy: 1,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    items: 3,
    responsive: {
      0: {
        items: 1,
      },
      845: {
        items: 2,
      },
      1325: {
        items: 3,
      },

    },
    nav: true, // Show navigation arrows
    navText: [
      '<i class="bi bi-arrow-left-circle-fill"></i>',
      '<i class="bi bi-arrow-right-circle-fill"></i>',
    ], // Customize navigation arrows
    dots: true, // Show dots navigation
    dotsEach: true, // Show dots each slide
    dotsSpeed: 1000, // Dots animation speed
    rewind: true, // Go backwards when the boundary has reached
    rewindSpeed: 1000, // Rewind animation speed
    autoplaySpeed: 1000, // Autoplay animation speed

  });
});

