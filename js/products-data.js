// Import the functions you need from the SDKs you need
// Import firebase admin 
const admin = require("firebase-admin");
const serviceAccount = require("../easypizy-in-firebase-adminsdk-1z2sn-ecb00a9042.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://easypizy-in-default-rtdb.asia-southeast1.firebasedatabase.app",
});

 const db = admin.firestore();
const collectionName = "products"; // Replace with the name of your Firestore collection




const productsData = [
  {
    name: "Kashmiri Chilli Powder",
    id: "kashmiri-chilli-powder",
    link: "products/Kashmiri-Chilli-Powder.html",
    image: "images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-kashmiri-chilli-powder",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-kashmiri-chilli-powder",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-kashmiri-chilli-powder",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹300",
        discount: "30% off",
      },
    },
  },
  {
    name: "Turmeric Powder",
    id: "turmeric-powder",
    link: "products/Turmeric-Powder.html",
    image: "images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-turmeric-powder",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-turmeric-powder",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-turmeric-powder",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹300",
        discount: "30% off",
      },
    },
  },
  {
    name: "Dry Mango Powder",
    id: "dry-mango-powder",
    link: "products/dry-mango-powder.html",
    image: "images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-dry-mango-powder",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-dry-mango-powder",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-dry-mango-powder",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹300",
        discount: "30% off",
      },
    },
  },
  {
    name: "Red Chilli Powder",
    id: "red-chilli-powder",
    link: "products/red-chilli-powder.html",
    image: "images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-red-chilli-powder",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-red-chilli-powder",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-red-chilli-powder",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹300",
        discount: "30% off",
      },
    },
  },
  {
    name: "Dhanaa Powder",
    id: "coriander-powder",
    link: "products/Dhanaa-powder.html",
    image: "images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-coriander-powder",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-coriander-powder",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-coriander-powder",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹300",
        discount: "30% off",
      },
    },
  },
  {
    name: "Jeera Powder",
    id: "jeera-powder",
    link: "products/Jeera-powder.html",
    image: "images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-jeera-powder",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-jeera-powder",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-jeera-powder",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹300",
        discount: "30% off",
      },
    },
  }
];


// Function to upload data to Firestore
const uploadData = async () => {
  try {
    for (const product of productsData) {
      // Use the addDoc method to add a document to the collection
      const docRef = db.collection("collectionName").doc("product.name");
      console.log(`Product added to Firestore with ID:`
      );
    }
    console.log("Products data upload complete.");
  } catch (error) {
    console.error("Error uploading data to Firestore DB:", error);
  }
};

// Function to read data from Firestore
const readData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
      console.log("Product data:", doc.data());
    });
    console.log("Firestore data read complete.");
  } catch (error) {
    console.error("Error reading data from Firestore:", error);
  }
};

// Call the uploadData and readData functions to upload and read data
uploadData();
readData();

