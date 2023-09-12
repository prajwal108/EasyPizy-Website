import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import {getFirestore,collection,doc,setDoc,updateDoc,getDoc, addDoc, query, where,getDocs,} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

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
       {name: "Kashmiri Chilli Powder",
         id: "kashmiri-chilli-powder",
         link: "../products/Kashmiri-Chilli-Powder.html",
         image: "../images/images(1).jpeg",
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
             originalPrice: "₹400",
             discount: "30% off",
           },
         },
       },
       {
         name: "Turmeric Powder",
         id: "turmeric-powder",
         link: "../products/Turmeric-Powder.html",
         image: "../images/images(1).jpeg",
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
             originalPrice: "₹400",
             discount: "30% off",
           },
         },
       },
       {
         name: "Dry Mango Powder",
         id: "dry-mango-powder",
         link: "../products/dry-mango-powder.html",
         image: "../images/images(1).jpeg",
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
             originalPrice: "₹400",
             discount: "30% off",
           },
         },
       },
       {
         name: "Red Chilli Powder",
         id: "red-chilli-powder",
         link: "../products/red-chilli-powder.html",
         image: "../images/images(1).jpeg",
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
             originalPrice: "₹400",
             discount: "30% off",
           },
         },
       },
       {
         name: "Dhanaa Powder",
         id: "coriander-powder",
         link: "../products/Dhanaa-powder.html",
         image: "../images/images(1).jpeg",
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
             originalPrice: "₹400",
             discount: "30% off",
           },
         },
       },
       {
         name: "Jeera Powder",
         id: "jeera-powder",
         link: "../products/Jeera-powder.html",
         image: "../images/images(1).jpeg",
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
             originalPrice: "₹400",
             discount: "30% off",
           },
         },
       },
        {name: "Panner Tikka Masala",
  id: "paneer-tikka-masala",
  link: "../products/panner-tikka-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-paneer-tikka-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-paneer-tikka-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-paneer-tikka-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
       },
  { name: "Chola Masala",
    id: "chola-masala",
    link: "../products/chola-masala.html",
    image: "../images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-chola-masala",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-chola-masala",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-chola-masala",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹400",
        discount: "30% off",
      },
    },
  },
  { name: "Misal Masala",
    id: "misal",
    link: "../products/misal-masala.html",
    image: "../images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-misal",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-misal",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-misal",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹400",
        discount: "30% off",
      },
    },
  },
  { name: "Pulav Masala",
    id: "pulav",
    link: "../products/pulav-masala.html",
    image: "../images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-pulav",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-pulav",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-pulav",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹400",
        discount: "30% off",
      },
    },
  },
  { name: "Garam Masala",
    id: "garam-masala",
    link: "../products/garam-masala.html",
    image: "../images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-garam-masala",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-garam-masala",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-garam-masala",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹400",
        discount: "30% off",
      },
    },
  },
  {name: "Kala Masala",
    id: "kala-masala",
    link: "../products/kala-masala.html",
    image: "../images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-kala-masala",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-kala-masala",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-kala-masala",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹400",
        discount: "30% off",
      },
    },
  },
  { name: "Paneer Butter Masala",
    id: "paneer-butter-masala",
    link: "../products/paneer-butter-masala.html",
    image: "../images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-paneer-butter-masala",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-paneer-butter-masala",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-paneer-butter-masala",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹400",
        discount: "30% off",
      },
    },
  },
  {name: "Kaju Curry Masala",
    id: "kaju-curry-masala",
    link: "../products/kaju-curry-masala.html",
    image: "../images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-kaju-curry-masala",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-kaju-curry-masala",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-kaju-curry-masala",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹400",
        discount: "30% off",
      },
    },
  },
  {name: "Biryani Masala",
    id: "biryani-masala",
    link: "../products/biryani-masala.html",
    image: "../images/images(1).jpeg",
    sizes: {
      "250gm": {
        label: "250gm",
        name: "size-biryani-masala",
        checked: true,
        finalPrice: "₹80",
        originalPrice: "₹100",
        discount: "20% off",
      },
      "500gm": {
        label: "500gm",
        name: "size-biryani-masala",
        checked: false,
        finalPrice: "₹150",
        originalPrice: "₹200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000gm",
        name: "size-biryani-masala",
        checked: false,
        finalPrice: "₹240",
        originalPrice: "₹400",
        discount: "30% off",
      },
    },
  },
  { name: "Kitchen King Masala",
  id: "kitchen-king-masala",
  link: "../products/kitchen-king-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-kitchen-king-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-kitchen-king-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-kitchen-king-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
  },
 {name: "Bengan Masala",
  id: "bengen-masala",
  link: "../products/bengan-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-bengen-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-bengen-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-bengen-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
},
 {name: "Shahi Paneer Masala",
  id: "shahi-paneer-masala",
  link: "../products/shahi-paneer-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-shahi-paneer-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-shahi-paneer-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-shahi-paneer-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
},
{ name: "Sabji Masala",
  id: "sabji-masala",
  link: "../products/sabji-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-sabji-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-sabji-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-sabji-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
},
{name: "Khichadi Masala",
  id: "khichadi-masala",
  link: "../products/khichadi-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-khichadi-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-khichadi-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-khichadi-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
},
{name: "Maratha Spicy Masala",
  id: "maratha-masala",
  link: "../products/Marath-spicy-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-maratha-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-maratha-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-maratha-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
},
 {name: "Chaat Masala",
  id: "chaat-masala",
  link: "../products/chaat-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-chaat-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-chaat-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-chaat-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
},
{name: "Pav Bhaji Masala",
  id: "pav-bhaji-masala",
  link: "../products/pav-bhaji-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-pav-bhaji-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-pav-bhaji-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-pav-bhaji-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
},
{name: "Pani Puri Masala",
  id: "pani-puri-masala",
  link: "../products/pani-puri-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-pani-puri-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-pani-puri-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-pani-puri-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
},
{name: "Sambar Masala",
  id: "sambar-masala",
  link: "../products/sambar-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-sambar-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-sambar-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-sambar-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
},
{name: "Tandoori Tikka Masala",
  id: "tandoori-tikka-masala",
  link: "../products/tandoori-tikka-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-tandoori-tikka-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-tandoori-tikka-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-tandoori-tikka-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
},
 { name: "Dal Tadka Masala",
  id: "dal-tadka-masala",
  link: "../products/dal-tadka-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-dal-tadka-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-dal-tadka-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-dal-tadka-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
},
{name: "Poha Masala",
  id: "poha-masala",
  link: "../products/poha-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-poha-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-poha-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-poha-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
},
{name: "Usal Masala",
  id: "usal-masala",
  link: "../products/usal-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-usal-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-usal-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-usal-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
      discount: "30% off",
    },
  },
},

{ name: "Goda Masala",
  id: "goda-masala",
  link: "../products/goda-masala.html",
  image: "../images/images(1).jpeg",
  sizes: {
    "250gm": {
      label: "250gm",
      name: "size-goda-masala",
      checked: true,
      finalPrice: "₹80",
      originalPrice: "₹100",
      discount: "20% off",
    },
    "500gm": {
      label: "500gm",
      name: "size-goda-masala",
      checked: false,
      finalPrice: "₹150",
      originalPrice: "₹200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000gm",
      name: "size-goda-masala",
      checked: false,
      finalPrice: "₹240",
      originalPrice: "₹400",
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
           const productRef = doc(collectionRef, product.id);

           if (!existingProducts.some((p) => p.name === product.id)) {
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

    // uploadDataToFirestore(productsData); 

    // Function to update and sync product card
async function updateAndSyncProductCard(productId) {
  try {
    // Assuming you already have Firestore initialized and a reference to the products collection
    const productRef = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      const productData = productSnapshot.data();

      // Construct the product card HTML based on the data from Firestore
      const productCardHTML = `
        <div class="product-thumb product-thumb-box">
        <div class="save-btn">
          <a class="save-icon bi bi-bookmark"></a>
        </div>
          <div class="product-image-box-wrap">
            <a href="${productData.link}">
              <img src="${
                productData.image
              }" class="product-image img-fluid" alt="${productData.name}">
            </a>
          </div>
          <div class="product-body">
            <h4 class="product-title">
              <a href="${productData.link}" class="product-title-link">${
        productData.name
      }</a>
            </h4>
            <div class="d-flex align-items-center border-top pt-3 product-info">
              <div class="product-data">
                <div class="size-checkboxes mb-0">
                  ${generateSizeRadioButtons(productData.sizes)}
                </div>
                <p class="product-price">
                  <i class="custom-icon bi-cash me-1"></i>
                  <span class="final-price" id="final-price-${productId}">${
        productData.sizes["250gm"].finalPrice
      }</span>
                  <span class="original-price" id="original-price-${productId}">${
        productData.sizes["250gm"].originalPrice
      }</span>
                  <span class="discount" id="discount-${productId}">${
        productData.sizes["250gm"].discount
      }</span>
                </p>
              </div>
              <div class="add-to-cart-container">
                <button class="custom-btn btn add-to-cart-btn">Add to Cart</button>
                <div class="plus-minus-input">
                  <button class="btn custom-btn minus-btn">-</button>
                  <div class="custom-btn btn ms-auto inputBtn">1</div>
                  <button class="btn custom-btn plus-btn">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Update the corresponding HTML element with the new product card HTML
      const productContainer = document.getElementById(productId);
      productContainer.innerHTML = productCardHTML;

      // Assuming you already have size radio buttons selected as you mentioned before:
     const sizeRadios = productContainer.querySelectorAll("input[type='radio']");
     sizeRadios.forEach((radio) => {
       radio.addEventListener("change", () => {
         // Extract the productId from the radio button's name attribute
         const productId = radio.getAttribute("name").replace("size-", "");
         // Get the selected size value
         const selectedSize = radio.value;
         // Update prices and discount based on the selected size
         document.getElementById(`final-price-${productId}`).textContent =
           productData.sizes[selectedSize].finalPrice;
         document.getElementById(`original-price-${productId}`).textContent =
           productData.sizes[selectedSize].originalPrice;
         document.getElementById(`discount-${productId}`).textContent =
           productData.sizes[selectedSize].discount;
       });
     });




    } else {
      console.error(`Product with ID '${productId}' not found in Firestore.`);
    }
  } catch (error) {
    console.error('Error updating product card:', error);
  }
}

// Function to generate size selection radio buttons
function generateSizeRadioButtons(sizes) {
  const sizeRadioButtons = Object.keys(sizes).map((size) => `
    <label>
      <input type="radio" name="${sizes[size].name}" value="${size}" ${sizes[size].checked ? 'checked' : ''}>
      <span>${size}</span>
    </label>
  `);

  return sizeRadioButtons.join('');
}


// Get all elements with the class 'product-item' inside the 'product-section'.
const productItems = document.querySelectorAll('.product-item');

// Iterate through the product-item elements.
productItems.forEach((productItem) => {
    // Get the ID from the 'id' attribute of each product-item.
    const productId = productItem.id;
    // Call the updateAndSyncProductCard function with the productId.
    updateAndSyncProductCard(productId);
});

   

 