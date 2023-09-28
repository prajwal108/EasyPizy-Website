import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {getFirestore,collection,doc, setDoc, updateDoc, getDoc, deleteDoc, addDoc, query, where, getDocs,onSnapshot} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getAuth, browserLocalPersistence, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import {updateAndSyncProductCard, isProductSaved,
  updateUIBasedOnSavedState} from "./server.js";
  
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

 // Initialize Firebase

 const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
// Set up local persistence
auth
  .setPersistence(browserLocalPersistence)
  .then(() => {
    // Local persistence enabled successfully
  })
  .catch((error) => {
    // Handle errors
  });
const db = getFirestore(app);


const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LcXifYnAAAAANWB4INPpx_rnQsunUqryz5cv6qR"),
  isTokenAutoRefreshEnabled: true,
  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed
});
// Function to set up a snapshot listener for saved products
export async function setUpSnapshotListener(userUID) {
  if (!userUID) {
    console.error("User not authenticated.");
    return;
  }
  // Reference to the 'savedProducts' subcollection
  const savedProductsRef = collection(db, `users/${userUID}/savedProducts`);
  // Add a snapshot listener to watch for changes in the 'savedProducts' subcollection
  onSnapshot(savedProductsRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "removed") {
        // A product was removed, remove it from the UI
        const productId = change.doc.id;
        const productCardToRemove = document.getElementById(productId);
        if (productCardToRemove) {
          productCardToRemove.remove();
        }
      }
    });
  });
}

 export async function getSavedItems(userUID) {
  try {
    // Assuming you have a Firestore collection where saved products are stored
    const savedProductsRef = collection(db, `users/${userUID}/savedProducts`);
    const savedProductsSnapshot = await getDocs(savedProductsRef);

    // Get the container where you want to append the product cards
    const savedItemContainer = document.getElementById("savedItemContainer");

    // Loop through the saved products and create a card for each one
    savedProductsSnapshot.forEach(async (doc) => {
      // Assuming the Firestore document ID is the productId
      const productId = doc.id;

      // Create a new product card element
      const div = document.createElement("div");      
      div.classList.add("product-item");
      div.classList.add("col-lg-4");
      div.classList.add("col-md-6");
      div.classList.add("col-12");
      div.classList.add("wow");
      div.classList.add("animate__animated");
      div.classList.add("animate__fadeInUp");
      div.classList.add("animate__delay-0.1s");
      div.setAttribute("data-wow-delay", "0.1s");
      div.setAttribute("id", productId); // Set the ID to productId
      div.setAttribute(
        "style",
        "visibility: visible; animation-delay: 0.1s; animation-name: fadeInUp;"
      );

      // Append the product card to the savedItemContainer
      savedItemContainer.appendChild(div);
    });
  } catch (error) {
    console.error(error);
  }
}
        
    window.onload = (async) => {
       // Get the currently signed-in user
       onAuthStateChanged(auth, async (user) => {
         if (user) {
           const userUID = user.uid;
           setUpSnapshotListener(userUID);
          await  getSavedItems(userUID);
           
                const productItems = document.querySelectorAll(".product-item");
                productItems.forEach(async (productItem) => {
                  const productId = productItem.id;

                  console.log(productId);
                 await updateAndSyncProductCard(productId,userUID);
                 
                    isProductSaved(productId, userUID),
                    updateUIBasedOnSavedState(productId, userUID);
                });
         
         }
       });
    };






