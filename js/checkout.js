import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
  getAuth,
  browserLocalPersistence,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
    setDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app-check.js";

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
auth
  .setPersistence(browserLocalPersistence)
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

const db = getFirestore(app);

 async function getUserProfile(uid) {
  const db = getFirestore();
  const userProfilesRef = collection(db, "userProfiles");

  const userProfileQuery = query(userProfilesRef, where("uid", "==", uid));

  try {
    const userProfileSnapshot = await getDocs(userProfileQuery);

    if (!userProfileSnapshot.empty) {
      // Return user profile data when found
      return userProfileSnapshot.docs[0].data();
    } else {
      // Return null when no user profile is found
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

// Function to populate user profile data into the form
async function populateUserProfile(userUID) {
  try {
    const userProfile = await getUserProfile(userUID);
    if (userProfile) {
      // Populate form fields with user profile data
      document.getElementById("full-name").value = userProfile.firstName + " " + userProfile.lastName;
      document.getElementById("phoneNumber").value = userProfile.mobileNumber;
      document.getElementById("phoneNumber2").value = userProfile.secondaryContactNumber|| "";
        document.getElementById("email").value = userProfile.email ||"";


      // Get a reference to the select element
      const addressSelect = document.getElementById('address');

      // Clear existing options
      addressSelect.innerHTML = '';

      // Populate the select options with user's addresses
      userProfile.addresses.forEach((addressData, index) => {
        const option = document.createElement('option');
        option.value = index; // Set the value to the index of the address
        option.textContent = `${addressData.details}, ${addressData.pincode}, ${addressData.state}`; // Combine address details, pincode, and state
        addressSelect.appendChild(option);
      });
    } else {
      console.error("User profile not found.");
    }
  } catch (error) {
    console.error("Error populating user profile:", error);
  }
}
// Function to clear form fields
function clearAddressFormFields() {
  document.getElementById("address-label").value = "";
  document.getElementById("address-details").value = "";
  document.getElementById("address-pincode").value = "";
  document.getElementById("address-state").value = "";
}

const addAddressButton = document.getElementById("add-address");
addAddressButton.addEventListener("click",async () => {
  const addressForm3 = document.getElementById("address-form-div");
  const saveAddressButton = document.getElementById("save-address");

  // Toggle the visibility of the address form
  if (addressForm3.style.display === "none") {
    addressForm3.style.display = "block";
    saveAddressButton.style.display = "block";
  } else {
    addressForm3.style.display = "none";
    saveAddressButton.style.display = "none";
    // Clear the form fields when hiding the form
    clearAddressFormFields();
  }
});

// Function to add a new address
async function addNewAddress(userUID, label, details, pincode, state) {
  const db = getFirestore();
  const userProfilesRef = collection(db, "userProfiles");

  try {
    const querySnapshot = await getDocs(query(userProfilesRef, where("uid", "==", userUID)));

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();
      const addresses = userData.addresses || [];

      // Add the new address to the list
      addresses.push({ label, details, pincode, state });

      // Update the user's document with the new addresses
      await updateDoc(querySnapshot.docs[0].ref, { addresses });

      // Clear the form fields
      clearAddressFormFields();

      // Refresh the displayed addresses
      populateUserProfile(userUID);
    }
  } catch (error) {
    console.error("Error adding address:", error);
  }
}

// Event listener for the "Save Address" button
const saveAddressButton = document.getElementById("save-address");
saveAddressButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // Get form field values
  const label = document.getElementById("address-label").value;
  const details = document.getElementById("address-details").value;
  const pincode = document.getElementById("address-pincode").value;
  const state = document.getElementById("address-state").value;

  // Replace "your_user_uid_here" with the actual user's UID
  const userUID = await getUserUID();

  // Add the new address
  const newAddressId = addNewAddress(userUID, label, details, pincode, state);

  // Hide the address form and clear the form fields
  const addressForm3 = document.getElementById("address-form-3");
  addressForm3.style.display = "none";
  clearAddressFormFields();


  // Select the newly added address in the <select> element
  const addressSelect = document.getElementById("address");
  const newOption = document.createElement("option");
  newOption.value = newAddressId; // Assuming the new address has an ID
  newOption.textContent = `${label}: ${details}, ${pincode}, ${state}`;
  addressSelect.appendChild(newOption);
  newOption.selected = true; // Select the newly added address
});

async function updateSummary(userUID) {
  const db = getFirestore();
  const tempCartRef = doc(db, "tempCarts", userUID);

  try {
    // Get the temporary cart data from Firestore
    const tempCartSnapshot = await getDoc(tempCartRef);
    if (tempCartSnapshot.exists()) {
      const tempCartData = tempCartSnapshot.data();

      // Get references to the HTML elements
      const subtotalElement = document.getElementById("cart-subtotal-price");
      const finalTotalElement = document.getElementById(
        "cart-final-total-price"
      );
      const shippingSelect = document.getElementById("shipping-select");

      // Update subtotal amount
      subtotalElement.textContent = `${tempCartData.subtotal}`;
      

      // Update final total amount
        finalTotalElement.textContent = `${tempCartData.finalAmount}`;
      

      // Update shipping options based on delivery charge
     
        const shippingOption = shippingSelect.querySelector(
          "option[value='standard']"
        );
       
          shippingOption.textContent = `Delivery Charge - ₹ ${tempCartData.deliveryCharge}`;
        
    } else {
      console.error("Temporary cart data not found.");
    }
  } catch (error) {
    console.error("Error updating summary:", error);
  }
}

// Event listener for the "Proceed to Pay" buttons
const proceedToPayButtons = document.querySelectorAll("#proceedToPayBtn");
proceedToPayButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    const fullName = document.getElementById("full-name").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const phoneNumber2 = document.getElementById("phoneNumber2").value;
    const email = document.getElementById("email").value;
    // Get the selected address from the <select> element
    const addressSelect = document.getElementById("address");
    const selectedAddress =
      addressSelect.options[addressSelect.selectedIndex].text;

    // Replace "your_user_uid_here" with the actual user's UID
    const userUID = await getUserUID();

    const db = getFirestore();
    const tempCartRef = doc(db, "tempCarts", userUID);

    try {
      // Get the existing temporary cart data
      const tempCartSnapshot = await getDoc(tempCartRef);
      if (tempCartSnapshot.exists()) {
        const tempCartData = tempCartSnapshot.data();

        // Add the additional fields to the temporary cart data
        tempCartData.fullName = fullName;
        tempCartData.phoneNumber = phoneNumber;
        tempCartData.phoneNumber2 = phoneNumber2;
        tempCartData.email = email;
        tempCartData.deliveryAddress = selectedAddress;
        tempCartData.paymentStatus = "pending";

        // Update the temporary cart document with the additional data
        await setDoc(tempCartRef, tempCartData);

        // Redirect to the payment page or perform other actions
        // ...

        console.log("Temporary cart data updated successfully.");
      } else {
        console.error("Temporary cart data not found.");
      }
    } catch (error) {
      console.error("Error updating temporary cart data:", error);
    }
  });
});




  function getUserUID() {
    const user = auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      // Handle the case where the user is not authenticated
      return null; // or some other value or throw an error
    }
  }

auth.onAuthStateChanged(async(user) => {
    if (user) {
      const userUID = user.uid;
        await populateUserProfile(user.uid);
        await updateSummary(userUID);
       
    } else {
        
    }
    }
);