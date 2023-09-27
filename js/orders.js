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

import { initializeFirebaseApp } from "./firebaseConfig.js";

const app = await initializeFirebaseApp();

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

async function loadOrderHistory(userUID) {
  try {
    const ordersContainer = document.getElementById("order-card-container");
    const userRef = doc(db, "users", userUID);
    const ordersCollectionRef = collection(userRef, "orders");

    const ordersQuerySnapshot = await getDocs(ordersCollectionRef);

    // Create an array to hold the order cards and their associated Date objects
    const orderCardsWithDates = [];

    ordersQuerySnapshot.forEach((doc) => {
      const orderData = doc.data();

      // Parse the order date and time into a JavaScript Date object
      const orderDateTime = new Date(
        `${orderData.orderDate} ${orderData.orderTime}`
      );

      // Create an order card
      const orderCard = document.createElement("div");
      orderCard.className = "card mb-4";

      // Populate the card with data
      orderCard.innerHTML = `
        <div class="card-header">
          <h5 class="card-title">Order #${doc.id}</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <h6 class="card-subtitle mb-2 text-muted">Order Date: ${
                orderData.orderDate
              } ${orderData.orderTime}</h6>
              <p class="card-text status-text">Status: ${orderData.status}</p>
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
          <button class="btn btn-primary mr-2">Repeat Order</button>
          <button class="btn btn-secondary download-invoice" data-order-id="${
            doc.id
          }">Download Invoice</button>
        </div>
      `;

      // Push the order card and its associated Date object into the array
      orderCardsWithDates.push({ card: orderCard, date: orderDateTime });
    });

    // Sort the order cards based on the Date objects in descending order (latest first)
    orderCardsWithDates.sort((a, b) => b.date - a.date);

    // Clear the existing order cards in the container
    ordersContainer.innerHTML = "";

    // Prepend the sorted order cards to the container
    orderCardsWithDates.forEach((order) => {
      ordersContainer.appendChild(order.card);
    });
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




 async function getOrderDataById(docId) {
   // Replace this with your actual Firestore data retrieval code
   return {
     orderNumber: docId,
     orderDate: "2023-09-30 17:0:13",
     totalAmount: 100.0,
     items: [
       { name: "Product A", quantity: 2, price: 20.0 },
       { name: "Product B", quantity: 3, price: 30.0 },
     ],
   };
 }

function generatePDF(orderData) {
  // Define the document definition
  const docDefinition = {
    content: [
      {
        text: `Order Number: ${orderData.orderNumber}`,
        style: "header",
      },
      {
        text: `Order Date: ${orderData.orderDate}`,
      },
      {
        text: `Total Amount: ₹${orderData.totalAmount.toFixed(2)}`,
      },
      {
        text: "Items in this Order:",
        style: "subheader",
      },
      {
        ul: orderData.items.map(
          (item) =>
            `${item.name} x ${item.quantity} - ₹${item.price.toFixed(2)}`
        ),
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
    },
  };

  // Generate the PDF content
  const pdfContent = pdfMake.createPdf(docDefinition);

  // Open the PDF in a new browser tab
  pdfContent.getDataUrl((dataUrl) => {
    const pdfWindow = window.open();
    pdfWindow.document.write(
      '<iframe width="100%" height="100%" src="' +
        dataUrl +
        '" frameborder="0"></iframe>'
    );
  });
}

 // Attach event listeners to "Download Invoice" buttons
 document.addEventListener("DOMContentLoaded", function () {
   // Your JavaScript code here

   document.querySelectorAll(".download-invoice").forEach(async (button) => {
     button.addEventListener("click", async (event) => {
       const orderId = event.target.getAttribute("data-order-id");

       // Find the order data for this ID
       const orderData = await getOrderDataById(orderId);

       if (orderData) {
         generatePDF(orderData);
       } else {
         console.error("Order data not found.");
       }
     });
   });
 });





async function addSampleOrder(userUID) {
  const ordersCollectionRef = collection(db, `users/${userUID}/orders`);

  try {
    const currentDate = new Date();
    const currentHour = currentDate.getHours(); // Get the current hour (0-23)
    const currentMinute = currentDate.getMinutes(); // Get the current minute (0-59)
    const currentSecond = currentDate.getSeconds(); // Get the current second (0-59)


    // Create a sample order document
    const orderData = {
      orderDate: "2023-09-30", // Replace with an actual date
      orderTime: `${currentHour}:${currentMinute}:${currentSecond}`, // Replace with an actual timestamp
      status: "Delivered",
      totalAmount: 100.0, // Replace with the actual total amount
      items: [
        {
          name: "Product A",
          quantity: 2,
          price: 20.0,
        },
        {
          name: "Product B",
          quantity: 3,
          price: 30.0,
        },
      ],
    };

    // Add the sample order document to the orders collection
    const docRef = await addDoc(ordersCollectionRef, orderData);

    console.log("Sample order added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding sample order: ", error);
  }
}





auth.onAuthStateChanged(async(user) => {
    if (user) {
        // User is signed in
        const userUID = user.uid;
        //  await addSampleOrder(userUID);
       await loadOrderHistory(userUID);
       const orderContainer = document.querySelector(".card"); // Replace with the actual parent element
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

