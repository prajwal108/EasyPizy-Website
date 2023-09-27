import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth,browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
 import {getFirestore, collection, addDoc,query,where, getDocs,getDoc,doc,updateDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
  import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app-check.js";

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
      provider: new ReCaptchaV3Provider(
        "6LcXifYnAAAAANWB4INPpx_rnQsunUqryz5cv6qR"
      ),
      isTokenAutoRefreshEnabled: true,
      // Optional argument. If true, the SDK automatically refreshes App Check
      // tokens as needed
    });


    const db = getFirestore(app);
  import { getUserProfile } from "./firebase.js";
    
// Function to toggle edit mode
async function toggleEditMode() {
  const formFields = document.querySelectorAll("#user-info-form input:not([name='user-phone'])");
  const editButton = document.getElementById("edit-user-info");
  const saveButton = document.getElementById("save-user-info");

  formFields.forEach((input) => {
    input.removeAttribute("readonly");
  });
  editButton.style.display = "none";
  saveButton.style.display = "block";

}

async function toggleSaveMode() {
  const formFields = document.querySelectorAll(
    "#user-info-form input:not([name='user-phone'])"
  );
  const editButton = document.getElementById("edit-user-info");
  const saveButton = document.getElementById("save-user-info");

  formFields.forEach((input) => {
    input.setAttribute("readonly", "true"); // Add readonly attribute
  });

  editButton.style.display = "block"; // Show the edit button
  saveButton.style.display = "none"; // Hide the save button
}

// Function to populate user profile data into the form
async function populateUserProfile(userUID) {
  try {
    const userProfile = await getUserProfile(userUID);
    if (userProfile) {
      // Populate form fields with user profile data
      document.getElementById("user-name").value = userProfile.firstName + " " + userProfile.lastName;
      document.getElementById("user-email").value = userProfile.email;
      document.getElementById("user-phone").value = userProfile.mobileNumber;
      document.getElementById("user-secondary-phone").value = userProfile.secondaryContactNumber || "";
    } else {
      console.error("User profile not found.");
    }
  } catch (error) {
    console.error("Error populating user profile:", error);
  }
}

// Event listener for the "Edit" button
const editButton = document.getElementById("edit-user-info");
  editButton.addEventListener("click", toggleEditMode);

// Event listener for the form submission to save changes
const saveButton = document.getElementById("save-user-info");
saveButton.addEventListener("click", async (event) => {
  event.preventDefault();
  
  // Get the user's UID from your authentication system
  const userUID = getUserUID(); // Replace with your actual function to get the UID
console.log("useruid is",userUID);
  if (!userUID) {
    console.error("User UID not found.");
    return;
  }

  const firstName = document.getElementById("user-name").value.split(" ")[0];
  const lastName = document.getElementById("user-name").value.split(" ")[1];
  const email = document.getElementById("user-email").value;
  const mobileNumber = document.getElementById("user-phone").value;
  const secondaryContactNumber = document.getElementById("user-secondary-phone").value;

  try {
    // Call a function to save user profile changes to the database
    await saveUserProfileChanges(
      userUID,
      firstName,
      lastName,
      email,
      mobileNumber,
      secondaryContactNumber
    );

    // Update the UI to reflect saved changes
    // For example, you can toggle back to view mode and update the form fields as read-only
    await toggleSaveMode();
  } catch (error) {
    console.error("Error saving user profile changes:", error);
    // Handle the error and provide user feedback if necessary
  }
});

async function saveUserProfileChanges(
  userUID,
  firstName,
  lastName,
  email,
  mobileNumber,
  secondaryContactNumber
) {
  const db = getFirestore();
  const userProfilesRef = collection(db, "userProfiles");
  const userQuery = query(userProfilesRef, where("uid", "==", userUID));
  const userDocs = await getDocs(userQuery);

  if (userDocs.size !== 1) {
    console.error(
      "User profile document not found or multiple matching documents."
    );
    return;
  }

  const userDocRef = userDocs.docs[0].ref;

  // Validate input fields
  if (!firstName || !lastName || !email || !mobileNumber) {
    console.error("Invalid input values.");
    return;
  }

  try {
    await updateDoc(userDocRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: mobileNumber,
      secondaryContactNumber: secondaryContactNumber,
    });

    console.log("Profile data successfully updated.");
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

async function displaySavedAddresses(userUID) {
  const db = getFirestore();
  const userProfilesRef = collection(db, "userProfiles");

  try {
    const querySnapshot = await getDocs(
      query(userProfilesRef, where("uid", "==", userUID))
    );

    if (!querySnapshot.empty) {
      const userData = querySnapshot.docs[0].data();

      const addressList = document.getElementById("address-list");
      addressList.innerHTML = ""; // Clear existing addresses

      // Addresses array (empty if not found in userData)
      const addressesArray = userData.addresses || [];

      addressesArray.forEach((addressData, index) => {
        const addressLabel = addressData.label || "Home";
        const address = addressData.details || "";
        const pincode = addressData.pincode || "";
        const state = addressData.state || "";

        // Create the address string with fallback values
        const addressString = `${address}, ${pincode}, ${state}`;

        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerHTML = `
          <span class="badge">${addressLabel}</span>
          ${addressString}
          <button class="btn btn-sm btn-danger bi bi-trash-fill float-end" data-index="${index}"></button>
        `;
        addressList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Error fetching saved addresses:", error);
  }
}

// Event listener for adding a new address
const addressForm = document.getElementById("address-form");
addressForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const label = document.getElementById("address-label").value;
  const details = document.getElementById("address-details").value;
  const pincode = document.getElementById("address-pincode").value;
  const state = document.getElementById("address-state").value;

  // Replace "your_user_uid_here" with the actual user's UID
  const userUID = await getUserUID();

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
      document.getElementById("address-label").value = "";
      document.getElementById("address-details").value = "";
      document.getElementById("address-pincode").value = "";
      document.getElementById("address-state").value = "";

      // Refresh the displayed addresses
      displaySavedAddresses(userUID);
      addressForm.style.display = "none";
    }
  } catch (error) {
    console.error("Error adding address:", error);
  }
});

// Event listener for the "Edit Address" button
const editAddressButton = document.getElementById("edit-address");
editAddressButton.addEventListener("click", async() => {
     const saveAddressButton = document.getElementById("save-address");
  // Toggle the visibility of the address form
  if (addressForm.style.display === "none" || addressForm.style.display === "") {
    addressForm.style.display = "block";
    saveAddressButton.style.display = "block";
  } else {
    addressForm.style.display = "none";
    saveAddressButton.style.display = "none";
  }
});

// Event listener for delete buttons
const addressList = document.getElementById("address-list");
  addressList.addEventListener("click", async (event) => {
    const db = getFirestore();
    if (event.target.classList.contains("bi-trash-fill")) {
      const indexToDelete = event.target.getAttribute("data-index");

      // Check if the index is valid
      if (indexToDelete !== null) {
        // Convert the index to a number
        const index = parseInt(indexToDelete);

        // Get the user's UID (you'll need to define this)
        const userUID = getUserUID(); // Replace with your method to get the user's UID
        const userProfilesRef = collection(db, "userProfiles");

        try {
          // Query the user's document based on UID
          const querySnapshot = await getDocs(
            query(userProfilesRef, where("uid", "==", userUID))
          );

          if (!querySnapshot.empty) {
            const userDocRef = querySnapshot.docs[0].ref;
            const userData = querySnapshot.docs[0].data();

            // Remove the address at the specified index
            if (userData.addresses && index >= 0 && index < userData.addresses.length) {
              userData.addresses.splice(index, 1);

              // Update the user's document to remove the address
              await updateDoc(userDocRef, { addresses: userData.addresses });

              // Remove the address item from the UI
              const listItem = event.target.closest("li");
              if (listItem) {
                listItem.remove();
              }
            }
          }
        } catch (error) {
          console.error("Error deleting address:", error);
          // Handle the error if needed
        }
      }
    }
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


auth.onAuthStateChanged(async (user) => {
  if (user && !user.isAnonymous) {
    const userUID = user.uid;
    await populateUserProfile(userUID);
    // Event listener for the "Save Changes" button
    const saveChangesButton = document.getElementById("save-user-info");
      saveChangesButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const userUID = user.uid;
        await saveUserProfileChanges(userUID);
      });
  
    await displaySavedAddresses(userUID);
  } 
});

