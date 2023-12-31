import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import {getFirestore,collection,doc,setDoc,updateDoc, addDoc, query, where,getDocs,} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

    // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA4bdQPLI8i7SgvjUj9eKLirPuUWvYUXcI",
    authDomain: "easypizy-in.firebaseapp.com",
    databaseURL: "https://easypizy-in-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "easypizy-in",
    storageBucket: "easypizy-in.appspot.com",
    messagingSenderId: "860069269388",
    appId: "1:860069269388:web:b44033d7d721143eebd0a9",
    measurementId: "G-SYY5K0GJ7H"
  };


  const app = initializeApp(firebaseConfig);
  // Set up local persistence
    
     const db = getFirestore(app);

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

     const products = "products";

    

     const uploadDataToFirestore = async (productsData) => {
       try {
         if (!productsData || !Array.isArray(productsData)) {
           console.error("Invalid or empty products data.");
           return;
         }

         const collectionRef = collection(db, products);
         const querySnapshot = await getDocs(collectionRef);
         const existingProducts = querySnapshot.docs.map((doc) => doc.data());

         const batch = [];

         productsData.forEach((product) => {
           const productRef = doc(collectionRef, product.name);

           if (!existingProducts.some((p) => p.name === product.name)) {
             // If the product doesn't exist, create it.
             batch.push(setDoc(productRef, product));
           } else {
             // If the product exists, update it.
             batch.push(updateDoc(productRef, product));
           }
         });

         await Promise.all(batch);
         console.log("Products data upload complete.");
       } catch (error) {
         console.error("Error uploading data to Firestore:", error);
       }
     };


     const readDataFromFirestore = async () => {
       try {
         const collectionRef = collection(db, products);
         const querySnapshot = await getDocs(collectionRef);

         const productsList = [];

         querySnapshot.forEach((doc) => {
           productsList.push(doc.data());
         });

         console.log("Firestore data read complete.");

         // You can now use the `productsList` to display product information on your product page.
         return productsList;
       } catch (error) {
         console.error("Error reading data from Firestore:", error);
         return [];
       }
     };

    uploadDataToFirestore(productsData); 
    readDataFromFirestore();

    
