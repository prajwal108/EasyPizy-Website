import { getDocs, collection, setDoc, getFirestore } from "firebase/firestore";
import admin from "firebase-admin";

// Import the service account JSON file using 'fs' module (a built-in Node.js module)
import * as fs from "fs";
// Load the service account JSON file
const serviceAccount = JSON.parse(
  fs.readFileSync(
    "../easypizy-in-firebase-adminsdk-1z2sn-ecb00a9042.json",
    "utf-8"
  )
);

const adminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://easypizy-in-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = getFirestore(adminApp);
// Replace with the name of your Firestore collection

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
  },
];
let products = "products";
// Function to upload data to Firestore
// Function to upload data to Firestore
const uploadData = async () => {
  try {
    const collectionRef = admin.firestore().collection(db, products);

    const query = collectionRef;
    // Fetch the existing product data from Firestore
    const querySnapshot = await getDocs(query);
    const existingProducts = querySnapshot.docs.map((doc) => doc.data());

    // Filter out products that are not already in Firestore or have been updated
    const productsToUpdate = productsData.filter((product) => {
      // Check if the product is not already in Firestore or if it's updated
      return (
        !existingProducts.some(
          (existingProduct) => existingProduct.name === product.name
        ) ||
        existingProducts.some(
          (existingProduct) =>
            existingProduct.name === product.name &&
            existingProduct.someField !== product.someField
        )
      );
    });

    // Upload the filtered products
    for (const product of productsToUpdate) {
      const docRef = admin
        .firestore()
        .collection(db, products)
        .doc(product.name);
      await setDoc(docRef, product);
      console.log(`Product added/updated in Firestore with ID: ${docRef.id}`);
    }

    console.log("Products data upload complete.");

    // After uploading, call the readData function to read the updated data
    readData();
  } catch (error) {
    console.error("Error uploading data to Firestore DB:", error);
  }
};

// Function to read data from Firestore
const readData = async () => {
  try {
    const collectionRef = admin.firestore().collection(db.products);

    const query = collectionRef;
    const querySnapshot = await getDocs(query);
    querySnapshot.forEach((doc) => {
      console.log("Product data:", doc.data());
    });
    console.log("Firestore data read complete.");
  } catch (error) {
    console.error("Error reading data from Firestore:", error);
  }
};

// Call the uploadData function to check for updates and upload data
uploadData();
