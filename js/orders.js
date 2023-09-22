import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {getFirestore,collection, doc, setDoc, updateDoc, getDoc, deleteDoc,addDoc, query, where,getDocs, writeBatch, onSnapshot,} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import {
  getAuth,
  browserLocalPersistence,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app-check.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4bdQPLI8i7SgvjUj9eKLirPuUWvYUXcI",
  authDomain: "easypizy-in.firebaseapp.com",
  databaseURL:
    "https://easypizy-in-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "easypizy-in",
  storageBucket: "easypizy-in.appspot.com",
  messagingSenderId: "860069269388",
  appId: "1:860069269388:web:b44033d7d721143eebd0a9",
  measurementId: "G-SYY5K0GJ7H",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Set up local persistence
auth.setPersistence(browserLocalPersistence)
  .then(() => {
    // Local persistence enabled successfully
  })
  .catch((error) => {
    // Handle errors
  });

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LcXifYnAAAAANWB4INPpx_rnQsunUqryz5cv6qR"),
  isTokenAutoRefreshEnabled: true,
  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed
});

// Assuming you have Firebase initialized
const db = getFirestore(app);


// Function to fetch order data and create order cards
async function loadOrderHistory(userUID) {
  const ordersContainer = document.getElementById("order-card-container"); // Define the container where order cards will be displayed

  try {
    const userDocRef = doc(db, "users", userUID); // Reference the user's document

    // Fetch the user's document
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      const orders = userData.orders || [];

      orders.forEach((orderData, orderId) => {
        // Create an order card
        const orderCard = document.createElement("div");
        orderCard.className = "card mb-4";

        // Populate the card with data
        orderCard.innerHTML = `
          <div class="card-header">
              <h5 class="card-title">Order #${orderId}</h5>
          </div>
          <div class="card-body">
              <div class="row">
                  <div class="col-md-6">
                      <h6 class="card-subtitle mb-2 text-muted">Order Date: ${
                        orderData.orderDate
                      }</h6>
                      <p class="card-text status-text">Status: ${
                        orderData.status
                      }</p>
                  </div>
                  <div class="col-md-6 text-md-right">
                      <p class="card-text amount-text">Total Amount: ₹${orderData.totalAmount.toFixed(
                        2
                      )}</p>
                  </div>
              </div>
              <hr>
              <h6 class="card-subtitle mb-2 text-muted">Items in this Order:</h6>
              <ul class="list-group">
                  ${orderData.items
                    .map(
                      (item) =>
                        `<li class="list-group-item">${item.name} x ${
                          item.quantity
                        } - $${item.price.toFixed(2)}</li>`
                    )
                    .join("")}
              </ul>
          </div>
          <div class="card-footer">
              <button class="btn btn-primary mr-2 repeat-order">Repeat Order</button>
              <button class="btn btn-secondary download-invoice">Download Invoice</button>
          </div>
        `;

        // Append the order card to the container
        ordersContainer.appendChild(orderCard);
      });
    } else {
      console.log("User document not found.");
    }
  } catch (error) {
    console.error("Error loading order history:", error);
  }
}

// Function to repeat an order and add/merge items to the cart
async function repeatOrder(userUID, orderId) {
  const db = getFirestore();
  const userRef = doc(db, 'users', userUID);
  const cartRef = collection(userRef, 'carts').doc('default'); // You can use a specific cart ID if needed

  try {
    // Get the selected order
    const orderQuerySnapshot = await collection(userRef, 'orders')
      .where('orderId', '==', orderId)
      .get();

    if (!orderQuerySnapshot.empty) {
      const orderData = orderQuerySnapshot.docs[0].data();

      // Check if the user already has a cart
      const cartDoc = await getDoc(cartRef);

      // Initialize an empty cart if it doesn't exist
      if (!cartDoc.exists()) {
        await setDoc(cartRef, { items: [] });
      }

      // Get the existing cart data
      const cartData = cartDoc.data();

      // Merge items from the order into the cart
      orderData.items.forEach((orderItem) => {
        const existingCartItem = cartData.items.find(
          (cartItem) => cartItem.itemId === orderItem.itemId
        );

        if (existingCartItem) {
          // If the item exists in the cart, update the quantity
          existingCartItem.quantity += orderItem.quantity;
        } else {
          // If the item doesn't exist in the cart, add it
          cartData.items.push(orderItem);
        }
      });

      // Update the cart in Firestore
      await updateDoc(cartRef, cartData);

      console.log('Order repeated and items added to cart.');
    } else {
      console.error('Selected order not found.');
    }
  } catch (error) {
    console.error('Error repeating order:', error);
  }
}

// Add a click event listener to all "Download Invoice" buttons
const invoiceButtons = document.querySelectorAll('.download-invoice');

invoiceButtons.forEach(async(button) => {
  button.addEventListener('click', async (event) => {
    // Handle the download invoice functionality here
    const orderId = event.target.getAttribute('data-order-id'); // If you have an order ID associated with the card

    // Call a function to download the invoice
    downloadInvoice(orderId);
  });
});

async function downloadInvoice(orderId) {
  // Assuming you have the order data and can generate an invoice
  const invoiceData = generateInvoiceData(orderId);

  // Create a Blob with the invoice data
  const blob = new Blob([invoiceData], { type: "application/pdf" });

  // Generate a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // Create an anchor element for downloading
  const a = document.createElement("a");
  a.href = url;
  a.download = `invoice_${orderId}.pdf`; // Set the file name

  // Trigger a click event on the anchor element to initiate the download
  a.click();

  // Clean up the temporary URL
  URL.revokeObjectURL(url);
}



auth.onAuthStateChanged(async(user) => {
    if (user) {
        // User is signed in
        const userUID = user.uid;
       await loadOrderHistory(userUID);
       const orderContainer = document.querySelector(".order-container"); // Replace with the actual parent element
       orderContainer.addEventListener("click",async (event) => {
         if (event.target.classList.contains("repeat-order")) {
            const userUID = user.uid;
           // Get the order ID from the clicked button's data attribute
           const orderId = event.target.dataset.orderId;
          await repeatOrder(userUID, orderId);
         }
       });
        
    }
    });

