import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import {getFirestore,collection,doc,setDoc,updateDoc,getDoc,deleteDoc, addDoc, query, where,getDocs,writeBatch,onSnapshot} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import {
  getAuth,
  browserLocalPersistence,
  onAuthStateChanged,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
 import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app-check.js";


  import { initializeFirebaseApp } from "./firebaseConfig.js";
  const app = await initializeFirebaseApp();
   const auth = getAuth(app);
  // Set up local persistence
    // Set up local persistence
  auth.setPersistence(browserLocalPersistence).then(() => {
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

     const productsData = [
       {name: "Kashmiri Chilli Powder",
         id: "kashmiri-chilli-powder",
         link: "../products/Kashmiri-Chilli-Powder.html",
         image: "../images/images(1).jpeg",
         sizes: {
           "250gm": {
             label: "250 gm",
             name: "size-kashmiri-chilli-powder",
             checked: true,
             finalPrice: "₹ 80",
             originalPrice: "₹ 100",
             discount: "20% off",
           },
           "500gm": {
             label: "500 gm",
             name: "size-kashmiri-chilli-powder",
             checked: false,
             finalPrice: "₹ 150",
             originalPrice: "₹ 200",
             discount: "25% off",
           },
           "1000gm": {
             label: "1000 gm",
             name: "size-kashmiri-chilli-powder",
             checked: false,
             finalPrice: "₹ 240",
             originalPrice: "₹ 400",
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
             label: "250 gm",
             name: "size-turmeric-powder",
             checked: true,
             finalPrice: "₹ 80",
             originalPrice: "₹ 100",
             discount: "20% off",
           },
           "500gm": {
             label: "500 gm",
             name: "size-turmeric-powder",
             checked: false,
             finalPrice: "₹ 150",
             originalPrice: "₹ 200",
             discount: "25% off",
           },
           "1000gm": {
             label: "1000 gm",
             name: "size-turmeric-powder",
             checked: false,
             finalPrice: "₹ 240",
             originalPrice: "₹ 400",
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
             label: "250 gm",
             name: "size-dry-mango-powder",
             checked: true,
             finalPrice: "₹ 80",
             originalPrice: "₹ 100",
             discount: "20% off",
           },
           "500gm": {
             label: "500 gm",
             name: "size-dry-mango-powder",
             checked: false,
             finalPrice: "₹ 150",
             originalPrice: "₹ 200",
             discount: "25% off",
           },
           "1000gm": {
             label: "1000 gm",
             name: "size-dry-mango-powder",
             checked: false,
             finalPrice: "₹ 240",
             originalPrice: "₹ 400",
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
             label: "250 gm",
             name: "size-red-chilli-powder",
             checked: true,
             finalPrice: "₹ 80",
             originalPrice: "₹ 100",
             discount: "20% off",
           },
           "500gm": {
             label: "500 gm",
             name: "size-red-chilli-powder",
             checked: false,
             finalPrice: "₹ 150",
             originalPrice: "₹ 200",
             discount: "25% off",
           },
           "1000gm": {
             label: "1000 gm",
             name: "size-red-chilli-powder",
             checked: false,
             finalPrice: "₹ 240",
             originalPrice: "₹ 400",
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
             label: "250 gm",
             name: "size-coriander-powder",
             checked: true,
             finalPrice: "₹ 80",
             originalPrice: "₹ 100",
             discount: "20% off",
           },
           "500gm": {
             label: "500 gm",
             name: "size-coriander-powder",
             checked: false,
             finalPrice: "₹ 150",
             originalPrice: "₹ 200",
             discount: "25% off",
           },
           "1000gm": {
             label: "1000 gm",
             name: "size-coriander-powder",
             checked: false,
             finalPrice: "₹ 240",
             originalPrice: "₹ 400",
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
             label: "250 gm",
             name: "size-jeera-powder",
             checked: true,
             finalPrice: "₹ 80",
             originalPrice: "₹ 100",
             discount: "20% off",
           },
           "500gm": {
             label: "500 gm",
             name: "size-jeera-powder",
             checked: false,
             finalPrice: "₹ 150",
             originalPrice: "₹ 200",
             discount: "25% off",
           },
           "1000gm": {
             label: "1000 gm",
             name: "size-jeera-powder",
             checked: false,
             finalPrice: "₹ 240",
             originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-paneer-tikka-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-paneer-tikka-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-paneer-tikka-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
        label: "250 gm",
        name: "size-chola-masala",
        checked: true,
        finalPrice: "₹ 80",
        originalPrice: "₹ 100",
        discount: "20% off",
      },
      "500gm": {
        label: "500 gm",
        name: "size-chola-masala",
        checked: false,
        finalPrice: "₹ 150",
        originalPrice: "₹ 200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000 gm",
        name: "size-chola-masala",
        checked: false,
        finalPrice: "₹ 240",
        originalPrice: "₹ 400",
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
        label: "250 gm",
        name: "size-misal",
        checked: true,
        finalPrice: "₹ 80",
        originalPrice: "₹ 100",
        discount: "20% off",
      },
      "500gm": {
        label: "500 gm",
        name: "size-misal",
        checked: false,
        finalPrice: "₹ 150",
        originalPrice: "₹ 200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000 gm",
        name: "size-misal",
        checked: false,
        finalPrice: "₹ 240",
        originalPrice: "₹ 400",
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
        label: "250 gm",
        name: "size-pulav",
        checked: true,
        finalPrice: "₹ 80",
        originalPrice: "₹ 100",
        discount: "20% off",
      },
      "500gm": {
        label: "500 gm",
        name: "size-pulav",
        checked: false,
        finalPrice: "₹ 150",
        originalPrice: "₹ 200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000 gm",
        name: "size-pulav",
        checked: false,
        finalPrice: "₹ 240",
        originalPrice: "₹ 400",
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
        label: "250 gm",
        name: "size-garam-masala",
        checked: true,
        finalPrice: "₹ 80",
        originalPrice: "₹ 100",
        discount: "20% off",
      },
      "500gm": {
        label: "500 gm",
        name: "size-garam-masala",
        checked: false,
        finalPrice: "₹ 150",
        originalPrice: "₹ 200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000 gm",
        name: "size-garam-masala",
        checked: false,
        finalPrice: "₹ 240",
        originalPrice: "₹ 400",
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
        label: "250 gm",
        name: "size-kala-masala",
        checked: true,
        finalPrice: "₹ 80",
        originalPrice: "₹ 100",
        discount: "20% off",
      },
      "500gm": {
        label: "500 gm",
        name: "size-kala-masala",
        checked: false,
        finalPrice: "₹ 150",
        originalPrice: "₹ 200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000 gm",
        name: "size-kala-masala",
        checked: false,
        finalPrice: "₹ 240",
        originalPrice: "₹ 400",
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
        label: "250 gm",
        name: "size-paneer-butter-masala",
        checked: true,
        finalPrice: "₹ 80",
        originalPrice: "₹ 100",
        discount: "20% off",
      },
      "500gm": {
        label: "500 gm",
        name: "size-paneer-butter-masala",
        checked: false,
        finalPrice: "₹ 150",
        originalPrice: "₹ 200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000 gm",
        name: "size-paneer-butter-masala",
        checked: false,
        finalPrice: "₹ 240",
        originalPrice: "₹ 400",
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
        label: "250 gm",
        name: "size-kaju-curry-masala",
        checked: true,
        finalPrice: "₹ 80",
        originalPrice: "₹ 100",
        discount: "20% off",
      },
      "500gm": {
        label: "500 gm",
        name: "size-kaju-curry-masala",
        checked: false,
        finalPrice: "₹ 150",
        originalPrice: "₹ 200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000 gm",
        name: "size-kaju-curry-masala",
        checked: false,
        finalPrice: "₹ 240",
        originalPrice: "₹ 400",
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
        label: "250 gm",
        name: "size-biryani-masala",
        checked: true,
        finalPrice: "₹ 80",
        originalPrice: "₹ 100",
        discount: "20% off",
      },
      "500gm": {
        label: "500 gm",
        name: "size-biryani-masala",
        checked: false,
        finalPrice: "₹ 150",
        originalPrice: "₹ 200",
        discount: "25% off",
      },
      "1000gm": {
        label: "1000 gm",
        name: "size-biryani-masala",
        checked: false,
        finalPrice: "₹ 240",
        originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-kitchen-king-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-kitchen-king-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-kitchen-king-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-bengen-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-bengen-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-bengen-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-shahi-paneer-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-shahi-paneer-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-shahi-paneer-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-sabji-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-sabji-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-sabji-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-khichadi-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-khichadi-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-khichadi-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-maratha-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-maratha-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-maratha-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-chaat-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-chaat-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-chaat-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-pav-bhaji-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-pav-bhaji-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-pav-bhaji-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-pani-puri-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-pani-puri-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-pani-puri-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-sambar-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-sambar-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-sambar-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-tandoori-tikka-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-tandoori-tikka-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-tandoori-tikka-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-dal-tadka-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-dal-tadka-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-dal-tadka-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-poha-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-poha-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-poha-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-usal-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-usal-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-usal-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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
      label: "250 gm",
      name: "size-goda-masala",
      checked: true,
      finalPrice: "₹ 80",
      originalPrice: "₹ 100",
      discount: "20% off",
    },
    "500gm": {
      label: "500 gm",
      name: "size-goda-masala",
      checked: false,
      finalPrice: "₹ 150",
      originalPrice: "₹ 200",
      discount: "25% off",
    },
    "1000gm": {
      label: "1000 gm",
      name: "size-goda-masala",
      checked: false,
      finalPrice: "₹ 240",
      originalPrice: "₹ 400",
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

    // await uploadDataToFirestore(productsData); 

    // Initialize the guest user UID


    // Function to update and sync product card
export async function updateAndSyncProductCard(productId,userUID) {
  try {
    // Assuming you already have Firestore initialized and a reference to the products collection
    const productRef = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      const productData = productSnapshot.data();

      // Construct the product card HTML based on the data from Firestore
      const productCardHTML = `
        <div class="product-thumb product-thumb-box">
       
          <a class="save-icon bi bi-bookmark" id="save-btn-${productId}"></a>
        
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
                <button class="custom-btn btn add-to-cart-btn" id="add-to-cart-${productId}">Add to Cart</button>
                <div class="plus-minus-input" id="plus-minus-input-${productId}">
                  <button id="minus-btn-${productId}" class="btn custom-btn minus-btn">-</button>
                  <div id="input-btn-${productId}" class="custom-btn btn ms-auto inputBtn">1</div>
                  <button id="plus-btn-${productId}" class="btn custom-btn plus-btn">+</button>
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
      const sizeRadios = productContainer.querySelectorAll(
        "input[type='radio']"
      );

      sizeRadios.forEach((radio) => {
        radio.addEventListener("change", async () => {
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
          // Update the Firestore quantity based on the new size
          await syncQuantityUI(productId, selectedSize, userUID);

        });
      });

      // Include the handleSaveButtonClick function
      async function handleSaveButtonClick(productId, userUID) {
        try {
          // Assuming you have Firebase Firestore initialized and a reference to the saved products collection
          const savedProductsRef = doc(
            db,
            `users/${userUID}/savedProducts`,
            productId
          );
          const productDoc = await getDoc(savedProductsRef);

          if (productDoc.exists()) {
            updateUIBasedOnSavedState(productId, userUID);
            // Product is already saved, so you can implement an "Unsave" action here.
            console.log("Product is already saved.");

            // Toggle the save button class for the "Unsave" action.
            const saveBtn = document.getElementById(`save-btn-${productId}`);
            saveBtn.classList.remove("bi-bookmark-fill");
            saveBtn.classList.add("bi-bookmark");
            console.log("Product unsaved successfully.");
            Toastify({
              text: `${productData.name} unsaved`,
              duration: 3000,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "center", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background:
                  "linear-gradient(107deg, rgb(255, 67, 5) 11.1%, rgb(245, 135, 0) 95.3%)",
              },
              // backgroundColor: " #ff6347",
              // Callback after click
            }).showToast();

            // Remove the product from the saved products collection
            await deleteDoc(savedProductsRef);
          } else {
            // Product is not saved, so you can save it.
            await setDoc(savedProductsRef, { saved: true });
            console.log("Product saved successfully.");
            Toastify({
              text: `${productData.name} saved`,
              duration: 3000,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "center", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background:
                  "linear-gradient(107deg, rgb(255, 67, 5) 11.1%, rgb(245, 135, 0) 95.3%)",
              },
              // backgroundColor:' #ff6347',
              // Callback after click
            }).showToast();

            // Toggle the save button class for the "Save" action.
            const saveBtn = document.getElementById(`save-btn-${productId}`);
            saveBtn.classList.remove("bi-bookmark");
            saveBtn.classList.add("bi-bookmark-fill");
          }
        } catch (error) {
          console.error("Error checking/saving product:", error);
        }
      }

      // Find the "Save" button within this specific productItem.
      const saveButton = document.getElementById(`save-btn-${productId}`);
      // Attach a click event listener to the "Save" button.
      saveButton.addEventListener("click", () => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const userUID = user.uid;
            console.log("user is signed in");
            handleSaveButtonClick(productId, userUID);
            // ...
          } else {
            Toastify({
              text: `Please login to save ${productData.name}`,
              duration: 3000,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "center", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background:
                  "linear-gradient(107deg, rgb(255, 67, 5) 11.1%, rgb(245, 135, 0) 95.3%)",
              },
              // backgroundColor:' #ff6347',
              // Callback after click
            }).showToast();

            console.log("user is not signed in");
            // User is signed out
          }
        }); // Assuming userUID is defined
      });

      // Add event listeners for the plus and minus buttons
      const minusButton = document.getElementById(`minus-btn-${productId}`);
      const plusButton = document.getElementById(`plus-btn-${productId}`);
      const inputBtn = document.getElementById(`input-btn-${productId}`);
      // Add an event listener to the "Add to Cart" button
      const addToCartButton = document.getElementById(
        `add-to-cart-${productId}`
      );
      const quantityControls = document.getElementById(
        `plus-minus-input-${productId}`
      );
      let quantity = 1;

      // Function to update the Firestore quantity
      async function updateFirestoreQuantity(
        newQuantity,
        productId,
        selectedSize,
        userUID
      ) {
        try {
          const cartItemRef = doc(
            db,
            "carts",
            userUID,
            "items",
            `${productId}-${selectedSize}`
          );

          // Get the cart item document snapshot
          const docSnapshot = await getDoc(cartItemRef);

          if (newQuantity === 0) {
            // If the new quantity is 0, delete the document
            await deleteDoc(cartItemRef);

            // Update the UI to show the "Add to Cart" button and hide quantity controls
            addToCartButton.style.display = "block";
            quantityControls.style.display = "none";
          } else if (docSnapshot.exists()) {
            // If the document exists, update the quantity for the selected size
            await setDoc(
              cartItemRef,
              { quantity: newQuantity },
              { merge: true }
            );

            // Update the UI to hide the "Add to Cart" button and show quantity controls
            addToCartButton.style.display = "none";
            quantityControls.style.display = "flex";
          }
        } catch (error) {
          console.error("Error updating product quantity:", error);
        }
      }

      // Add an event listener to the "Add to Cart" button
      addToCartButton.addEventListener("click", async () => {
        addToCartButton.style.display = "none";
        quantityControls.style.display = "flex";
        // Get the selected size
        const selectedSize = document.querySelector(
          `input[name="size-${productId}"]:checked`
        ).value;

        // Get the current quantity for the selected size (initially 1)
        const quantity = 1;
        inputBtn.textContent = quantity;

        // Update the Firestore quantity for the selected size
        await updateFirestoreQuantity(
          quantity,
          productId,
          selectedSize,
          userUID
        );

        // Get the product details based on the selected size
        const selectedProductDetails = productData.sizes[selectedSize];
      
        // Add the product to the user's cart in Firestore
        const cartItemRef = doc(
          db,
          "carts",
          userUID,
          "items",
          `${productId}-${selectedSize}`
        );
        await setDoc(cartItemRef, {
          size: selectedSize,
          quantity: quantity,
          price: selectedProductDetails.finalPrice,
          name: productData.name, // Add the product name
          image: productData.image, // Add the product image URL
        })
          .then(() => {
            console.log("Product added to cart in Firestore.");
          })
          .catch((error) => {
            console.error("Error adding product to cart in Firestore:", error);
          });
      });

      minusButton.addEventListener("click", async () => {
        if (quantity > 1) {
          --quantity;
          inputBtn.textContent = quantity;
          const selectedSize = document.querySelector(
            `input[name="size-${productId}"]:checked`
          ).value;
          console.log("selected size quanti", selectedSize,quantity);
          await updateFirestoreQuantity(
            quantity,
            productId,
            selectedSize,
            userUID
          );
          console.log("quantity updated");
        } else {
          addToCartButton.style.display = "block";
          quantityControls.style.display = "none";
          quantity = 0;
          const selectedSize = document.querySelector(
            `input[name="size-${productId}"]:checked`
          ).value;
          await updateFirestoreQuantity(
            quantity,
            productId,
            selectedSize,
            userUID
          );
          console.log("quantity updated");
        }
      });

      plusButton.addEventListener("click", async () => {
        if (quantity < 6) {
          ++quantity;
          inputBtn.textContent = quantity;
          const selectedSize = document.querySelector(
            `input[name="size-${productId}"]:checked`
          ).value;
          await updateFirestoreQuantity(
            quantity,
            productId,
            selectedSize,
            userUID
          );
          console.log("quantity updated");
        }
      });

       async function selectMaxQuantityRadioButton(productId, userUID) {
         try {
           // Find all radio buttons for the given product card
           const sizeRadios = document.querySelectorAll(
             `input[name="size-${productId}"]`
           );

           // Initialize variables to keep track of the maximum quantity and the corresponding radio button
           let maxQuantity = 0;
           let maxQuantityRadioButton = null;

           // Iterate through the radio buttons
           for (const radio of sizeRadios) {
             // Extract the selected size from the radio button's value
             const selectedSize = radio.value;

             // Get the quantity for this size from Firestore or your data source
             const quantity = await getQuantityFromDataSource(
               productId,
               selectedSize,
               userUID
             );

             // Check if the quantity for this size is greater than the current maximum
             if (quantity > maxQuantity) {
               maxQuantity = quantity;
               maxQuantityRadioButton = radio;
             }
           }

           // Check if a radio button with the maximum quantity was found
           if (maxQuantityRadioButton) {
             // Programmatically select the radio button with the maximum quantity
             maxQuantityRadioButton.checked = true;
             // Get the selected size value
             const selectedSize = maxQuantityRadioButton.value;

             // Update prices and discount based on the selected size
             document.getElementById(`final-price-${productId}`).textContent =
               productData.sizes[selectedSize].finalPrice;
             document.getElementById(
               `original-price-${productId}`
             ).textContent = productData.sizes[selectedSize].originalPrice;
             document.getElementById(`discount-${productId}`).textContent =
               productData.sizes[selectedSize].discount;

             await syncQuantityUI(productId, selectedSize, userUID);
           }
         } catch (error) {
           console.error("Error selecting max quantity radio button:", error);
         }
       }

       // Replace this function with your actual logic to retrieve quantity from your data source
       async function getQuantityFromDataSource(
         productId,
         selectedSize,
         userUID
       ) {
         try {
           // Assuming you have Firebase Firestore initialized and a reference to your data collection
           const cartItemRef = doc(
             db,
             "carts",
             userUID,
             "items",
             `${productId}-${selectedSize}`
           );

           // Get the cart item document snapshot
           const docSnapshot = await getDoc(cartItemRef);

           // Check if the document exists
           if (docSnapshot.exists()) {
             const cartItemData = docSnapshot.data();

             // Retrieve the quantity for the selected size from the document data
             const quantity = cartItemData.quantity || 0;

             return quantity;
           } else {
             // Document does not exist, return a default value (0)
             return 0;
           }
         } catch (error) {
           console.error("Error fetching quantity from data source:", error);
           // Handle the error appropriately in your application
           // You can return an error code or throw an exception if needed
           throw error;
         }
       
        }

        await selectMaxQuantityRadioButton(productId, userUID);
       
      
    } else {
      console.error(`Product with ID '${productId}' not found in Firestore.`);
    }
  } catch (error) {
    console.error('Error updating product card:', error);
  }
}

 async function updateAndSyncGuestCart(productId, guestUserUID) {
   try {
     // Assuming you already have Firestore initialized and a reference to the products collection
     const productRef = doc(db, "products", productId);
     const productSnapshot = await getDoc(productRef);

     if (productSnapshot.exists()) {
       const productData = productSnapshot.data();

       // Construct the product card HTML based on the data from Firestore
       const productCardHTML = `
        <div class="product-thumb product-thumb-box">
       
          <a class="save-icon bi bi-bookmark" id="save-btn-${productId}"></a>
        
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
                <button class="custom-btn btn add-to-cart-btn" id="add-to-cart-${productId}">Add to Cart</button>
                <div class="plus-minus-input" id="plus-minus-input-${productId}">
                  <button id="minus-btn-${productId}" class="btn custom-btn minus-btn">-</button>
                  <div id="input-btn-${productId}" class="custom-btn btn ms-auto inputBtn">1</div>
                  <button id="plus-btn-${productId}" class="btn custom-btn plus-btn">+</button>
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
       const sizeRadios = productContainer.querySelectorAll(
         "input[type='radio']"
       );

       sizeRadios.forEach((radio) => {
         radio.addEventListener("change", async () => {
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
           // Update the Firestore quantity based on the new size
           await syncCartUI(productId, selectedSize, guestUserUID);
         });
       });

    
     // Find the "Save" button within this specific productItem.
       const saveButton = document.getElementById(`save-btn-${productId}`);
       // Attach a click event listener to the "Save" button.
       saveButton.addEventListener("click", () => {
         
           
             Toastify({
               text: `Please login to save ${productData.name}`,
               duration: 3000,
               close: true,
               gravity: "top", // `top` or `bottom`
               position: "center", // `left`, `center` or `right`
               stopOnFocus: true, // Prevents dismissing of toast on hover
               style: {
                 background:
                   "linear-gradient(107deg, rgb(255, 67, 5) 11.1%, rgb(245, 135, 0) 95.3%)",
               },
               // backgroundColor:' #ff6347',
               // Callback after click
             }).showToast();

             console.log("user is not signed in");
             // User is signed out
           
         }); // Assuming userUID is defined
       

       // Add event listeners for the plus and minus buttons
       const minusButton = document.getElementById(`minus-btn-${productId}`);
       const plusButton = document.getElementById(`plus-btn-${productId}`);
       const inputBtn = document.getElementById(`input-btn-${productId}`);
       // Add an event listener to the "Add to Cart" button
       const addToCartButton = document.getElementById(
         `add-to-cart-${productId}`
       );
       const quantityControls = document.getElementById(
         `plus-minus-input-${productId}`
       );
       let quantity = 1;

       // Function to update the Firestore quantity
       async function updateFirestoreQuantity(
         newQuantity,
         productId,
         selectedSize,
         guestUserUID
       ) {
         try {
           const cartItemRef = doc(
             db,
             "carts",
             guestUserUID,
             "items",
             `${productId}-${selectedSize}`
           );

           // Get the cart item document snapshot
           const docSnapshot = await getDoc(cartItemRef);

           if (newQuantity === 0) {
             // If the new quantity is 0, delete the document
             await deleteDoc(cartItemRef);

             // Update the UI to show the "Add to Cart" button and hide quantity controls
             addToCartButton.style.display = "block";
             quantityControls.style.display = "none";
           } else if (docSnapshot.exists()) {
             // If the document exists, update the quantity for the selected size
             await setDoc(
               cartItemRef,
               { quantity: newQuantity },
               { merge: true }
             );

             // Update the UI to hide the "Add to Cart" button and show quantity controls
             addToCartButton.style.display = "none";
             quantityControls.style.display = "flex";
           }
         } catch (error) {
           console.error("Error updating product quantity:", error);
         }
       }

       // Add an event listener to the "Add to Cart" button
       addToCartButton.addEventListener("click", async () => {
         addToCartButton.style.display = "none";
         quantityControls.style.display = "flex";
         // Get the selected size
         const selectedSize = document.querySelector(
           `input[name="size-${productId}"]:checked`
         ).value;

         // Get the current quantity for the selected size (initially 1)
         const quantity = 1;
         inputBtn.textContent = quantity;

         // Update the Firestore quantity for the selected size
         await updateFirestoreQuantity(
           quantity,
           productId,
           selectedSize,
           guestUserUID
         );

         // Get the product details based on the selected size
         const selectedProductDetails = productData.sizes[selectedSize];

         // Add the product to the user's cart in Firestore
         const cartItemRef = doc(
           db,
           "carts",
           guestUserUID,
           "items",
           `${productId}-${selectedSize}`
         );
         await setDoc(cartItemRef, {
           size: selectedSize,
           quantity: quantity,
           price: selectedProductDetails.finalPrice,
           name: productData.name, // Add the product name
           image: productData.image, // Add the product image URL
         })
           .then(() => {
             console.log("Product added to cart in Firestore.");
           })
           .catch((error) => {
             console.error("Error adding product to cart in Firestore:", error);
           });
       });

       minusButton.addEventListener("click", async () => {
         if (quantity > 1) {
           --quantity;
           inputBtn.textContent = quantity;
           const selectedSize = document.querySelector(
             `input[name="size-${productId}"]:checked`
           ).value;
           console.log("selected size quanti", selectedSize, quantity);
           await updateFirestoreQuantity(
             quantity,
             productId,
             selectedSize,
             guestUserUID
           );
           console.log("quantity updated");
         } else {
           addToCartButton.style.display = "block";
           quantityControls.style.display = "none";
           quantity = 0;
           const selectedSize = document.querySelector(
             `input[name="size-${productId}"]:checked`
           ).value;
           await updateFirestoreQuantity(
             quantity,
             productId,
             selectedSize,
             guestUserUID
           );
           console.log("quantity updated");
         }
       });

       plusButton.addEventListener("click", async () => {
         if (quantity < 6) {
           ++quantity;
           inputBtn.textContent = quantity;
           const selectedSize = document.querySelector(
             `input[name="size-${productId}"]:checked`
           ).value;
           await updateFirestoreQuantity(
             quantity,
             productId,
             selectedSize,
             guestUserUID
           );
           console.log("quantity updated");
         }
       });

       async function selectMaxQuantityRadioButton(productId, guestUserUID) {
         try {
           // Find all radio buttons for the given product card
           const sizeRadios = document.querySelectorAll(
             `input[name="size-${productId}"]`
           );

           // Initialize variables to keep track of the maximum quantity and the corresponding radio button
           let maxQuantity = 0;
           let maxQuantityRadioButton = null;

           // Iterate through the radio buttons
           for (const radio of sizeRadios) {
             // Extract the selected size from the radio button's value
             const selectedSize = radio.value;

             // Get the quantity for this size from Firestore or your data source
             const quantity = await getQuantityFromDataSource(
               productId,
               selectedSize,
               guestUserUID
             );

             // Check if the quantity for this size is greater than the current maximum
             if (quantity > maxQuantity) {
               maxQuantity = quantity;
               maxQuantityRadioButton = radio;
             }
           }

           // Check if a radio button with the maximum quantity was found
           if (maxQuantityRadioButton) {
             // Programmatically select the radio button with the maximum quantity
             maxQuantityRadioButton.checked = true;
             // Get the selected size value
             const selectedSize = maxQuantityRadioButton.value;

             // Update prices and discount based on the selected size
             document.getElementById(`final-price-${productId}`).textContent =
               productData.sizes[selectedSize].finalPrice;
             document.getElementById(
               `original-price-${productId}`
             ).textContent = productData.sizes[selectedSize].originalPrice;
             document.getElementById(`discount-${productId}`).textContent =
               productData.sizes[selectedSize].discount;

             await syncQuantityUI(productId, selectedSize, guestUserUID);
           }
         } catch (error) {
           console.error("Error selecting max quantity radio button:", error);
         }
       }

       // Replace this function with your actual logic to retrieve quantity from your data source
       async function getQuantityFromDataSource(
         productId,
         selectedSize,
         guestUserUID
       ) {
         try {
           // Assuming you have Firebase Firestore initialized and a reference to your data collection
           const cartItemRef = doc(
             db,
             "carts",
             guestUserUID,
             "items",
             `${productId}-${selectedSize}`
           );

           // Get the cart item document snapshot
           const docSnapshot = await getDoc(cartItemRef);

           // Check if the document exists
           if (docSnapshot.exists()) {
             const cartItemData = docSnapshot.data();

             // Retrieve the quantity for the selected size from the document data
             const quantity = cartItemData.quantity || 0;

             return quantity;
           } else {
             // Document does not exist, return a default value (0)
             return 0;
           }
         } catch (error) {
           console.error("Error fetching quantity from data source:", error);
           // Handle the error appropriately in your application
           // You can return an error code or throw an exception if needed
           throw error;
         }
       }

       await selectMaxQuantityRadioButton(productId, guestUserUID);
     } else {
       console.error(`Product with ID '${productId}' not found in Firestore.`);
     }
   } catch (error) {
     console.error("Error updating product card:", error);
   }
 }

// Function to generate size selection radio buttons
export function generateSizeRadioButtons(sizes) {
  const sortedSizes = Object.keys(sizes).sort((a, b) => {
    return parseInt(a) - parseInt(b);
  });
   
  const sizeRadioButtons = sortedSizes.map((size) => `
    <label>
      <input type="radio" name="${sizes[size].name}" value="${size}" ${sizes[size].checked ? 'checked' : ''}>
      <span>${size}</span>
    </label>
  `);

  return sizeRadioButtons.join('');
}

 // Function to check if a product is saved for the current user
export async function isProductSaved(productId, userUID) {
  try {
    const savedProductsRef = doc(db, `users/${userUID}/savedProducts`, productId);
    const productDoc = await getDoc(savedProductsRef);

    if (productDoc.exists()) {
      // Product is saved, return its data
      return productDoc.data();
    } else {
      // Product is not saved
      return null;
    }
  } catch (error) {
    console.error("Error checking saved product:", error);
    return null;
  }
}
// Function to update the UI based on saved state
export async function updateUIBasedOnSavedState(productId, userUID) {
  const isSaved = await isProductSaved(productId, userUID);
  const saveBtn = document.getElementById(`save-btn-${productId}`);
  if (isSaved) {
    // Product is saved, show the "Unsave" state
    saveBtn.classList.remove("bi-bookmark");
    saveBtn.classList.add("bi-bookmark-fill");
  } else {
    // Product is not saved, show the "Save" state
    saveBtn.classList.remove("bi-bookmark-fill");
    saveBtn.classList.add("bi-bookmark");
  }
}   

 async function syncQuantityUI(productId, selectedSize, userUID) {
   try {
     const cartItemRef = doc(
       db,
       "carts",
       userUID,
       "items",
       `${productId}-${selectedSize}`
     );
     const cartItemSnapshot = await getDoc(cartItemRef);

     // Find the elements in the DOM
     const quantityControls = document.getElementById(
       `plus-minus-input-${productId}`
     );
     const addToCartButton = document.getElementById(
       `add-to-cart-${productId}`
     );
     const inputBtn = document.getElementById(`input-btn-${productId}`);

     if (cartItemSnapshot.exists()) {
       const cartItemData = cartItemSnapshot.data();

       // Get the quantity for the selected size
       const quantity = cartItemData.quantity || 0;

       // Check if the quantity is valid (greater than zero)
       if (quantity > 0) {
         addToCartButton.style.display = "none";
         quantityControls.style.display = "flex";
         inputBtn.textContent = quantity;
       } else {
         // Quantity is zero or negative, this is an invalid state, reset it
         resetUIState();
       }
     } else {
       // Cart item does not exist, reset the UI
       resetUIState();
     }
   } catch (error) {
     console.error("Error syncing quantity UI:", error);
     // Handle the error gracefully, e.g., show a message to the user
     // and reset the UI state.
     resetUIState();
   }

   // Helper function to reset the UI to its default state
   function resetUIState() {
     const quantityControls = document.getElementById(
       `plus-minus-input-${productId}`
     );
     const addToCartButton = document.getElementById(
       `add-to-cart-${productId}`
     );
     const inputBtn = document.getElementById(`input-btn-${productId}`);

     addToCartButton.style.display = "block";
     quantityControls.style.display = "none";
     let quantity = 1;
     inputBtn.textContent = quantity;
   }
 }
async function syncCartUI(productId, selectedSize, guestUserUID) {
  try {
    const cartItemRef = doc(
      db,
      "carts",
      guestUserUID,
      "items",
      `${productId}-${selectedSize}`
    );
    const cartItemSnapshot = await getDoc(cartItemRef);

    // Find the elements in the DOM
    const quantityControls = document.getElementById(
      `plus-minus-input-${productId}`
    );
    const addToCartButton = document.getElementById(`add-to-cart-${productId}`);
    const inputBtn = document.getElementById(`input-btn-${productId}`);

    if (cartItemSnapshot.exists()) {
      const cartItemData = cartItemSnapshot.data();

      // Get the quantity for the selected size
      const quantity = cartItemData.quantity || 0;

      // Check if the quantity is valid (greater than zero)
      if (quantity > 0) {
        addToCartButton.style.display = "none";
        quantityControls.style.display = "flex";
        inputBtn.textContent = quantity;
      } else {
        // Quantity is zero or negative, this is an invalid state, reset it
        resetUIState();
      }
    } else {
      // Cart item does not exist, reset the UI
      resetUIState();
    }
  } catch (error) {
    console.error("Error syncing quantity UI:", error);
    // Handle the error gracefully, e.g., show a message to the user
    // and reset the UI state.
    resetUIState();
  }

  // Helper function to reset the UI to its default state
  function resetUIState() {
    const quantityControls = document.getElementById(
      `plus-minus-input-${productId}`
    );
    const addToCartButton = document.getElementById(`add-to-cart-${productId}`);
    const inputBtn = document.getElementById(`input-btn-${productId}`);

    addToCartButton.style.display = "block";
    quantityControls.style.display = "none";
    let quantity = 1;
    inputBtn.textContent = quantity;
  }
}

// server.js
export async function loadProducts() {
  // API call to load products
  const productItems = document.querySelectorAll(".product-item");
  return productItems;
}
let guestUserUID = localStorage.getItem("guestUserUID"); // Initialize as null

// Function to generate a unique guest user UID
function generateGuestUserUID() {
  const prefix = "guestuser_"; // You can change the prefix if needed
  const randomPart = Math.random().toString(36).substr(2, 10); // Generate a random string
  return `${prefix}${randomPart}`;
}

// Function to convert guest cart to user cart
async function moveGuestCartToUserCart(guestUserUID, userUID) {
  try {
    const db = getFirestore(app);
    const guestCartRef = collection(db, `carts/${guestUserUID}/items`);
    const userCartRef = collection(db, `carts/${userUID}/items`);

    const guestSnapshot = await getDocs(guestCartRef);

    // Create a batch for deleting items from the guest cart
    const deleteBatch = writeBatch(db);

    guestSnapshot.forEach(async (snapshot) => {
      const docId = snapshot.id;
      const userCartItemRef = doc(userCartRef, docId);

      const userCartItemData = snapshot.data();

      // Add item to the user's cart
      await setDoc(userCartItemRef, userCartItemData);

      // Delete item from the guest cart
      deleteBatch.delete(snapshot.ref);
    });

    // Delete the entire guest cart
    await deleteDoc(doc(db, `carts/${guestUserUID}`));

    // Commit the deleteBatch to delete items from the guest cart
    await deleteBatch.commit();
  } catch (error) {
    console.error("Error moving guest cart items:", error);
  }
}

// Function to update the cart count in real-time based on the number of items
async function updateCartCount(userUID) {
  const cartRef = collection(db, `carts/${userUID}/items`);

  // Listen for changes in the Firestore cart collection
  onSnapshot(cartRef, (snapshot) => {
    let totalItems = 0;

    // Calculate the total number of items in the cart
    snapshot.forEach((doc) => {
      const cartItemData = doc.data();
      const quantity = cartItemData.quantity || 0;
      totalItems += quantity > 0 ? 1 : 0; // Count items with a quantity greater than 0
    });

    // Update the cart count in the DOM
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = totalItems;

    // Show or hide the cart count based on the total items
    cartCountElement.style.display = totalItems > 0 ? "inline" : "none";
  });
}

// Function to delete an item from the cart
async function deleteCartItem(cartItemId, userUID) {
  const cartItemRef = doc(db, `carts/${userUID}/items/${cartItemId}`);

  try {
    await deleteDoc(cartItemRef);
    console.log("Item deleted successfully");
    const subtotal = getCurrentSubtotal();
    await updateSummary(subtotal);
    
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

async function getCurrentSubtotal() {
  const cartItems = document.querySelectorAll(".cart-total-price");
  let subtotal = 0;

  cartItems.forEach((item) => {
    const itemTotal = parseInt(item.textContent);
    subtotal += itemTotal;
  });

  return subtotal;
}

// Function to update quantity in the database
async function updateQuantityInDatabase(cartItemId, newQuantity, userUID) {
  const cartItemRef = doc(db, `carts/${userUID}/items/${cartItemId}`);

  try {
    const itemData = (await getDoc(cartItemRef)).data();
    const itemPrice = itemData.price;
    await updateDoc(cartItemRef, {
      quantity: parseInt(newQuantity),
      total: parseInt(newQuantity) * parseInt(itemPrice.match(/\d+/)[0]),
    });
    
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
}

async function updateSummary(subtotal) {
  const subtotalElement = document.getElementById("cart-subtotal-price");
  const finalTotalElement = document.querySelector("#cart-final-total-price");
  const freedeliverylineElement = document.querySelector("#freedeliveryline");
  const shippingSelect = document.querySelector("#shipping-select");
  let delCost;

  if(subtotal === 0){
    delCost = 0;
  }
  else if (subtotal < 500) {
    freedeliverylineElement.style.display = "block";
    shippingSelect.value = "standard";
    shippingSelect.querySelector('option[value="standard"]').disabled = false;
    shippingSelect.querySelector('option[value="free"]').disabled = true; 
    delCost = 40;
  } else {
    freedeliverylineElement.style.display = "none";
    shippingSelect.value = "free";
    delCost = 0;
    // Disable the "Standard Delivery" option
    shippingSelect.querySelector('option[value="standard"]').disabled = true;
    shippingSelect.querySelector('option[value="free"]').disabled = false;
  }
  subtotalElement.textContent = `${subtotal}`;
  const finalTotal = subtotal + delCost;
  finalTotalElement.textContent = `${finalTotal}`;
  if(finalTotal> 0){
    const payBtn = document.getElementById("finalCheckoutBtn");
    payBtn.disabled = false;
  }else{
    const payBtn = document.getElementById("finalCheckoutBtn");
    payBtn.disabled = true;
  }
}

async function updateCartItems(userUID) {
  const cartContainer = document.getElementById("cart-container");

  // Clear the existing cart items
  cartContainer.innerHTML = "";
  const cartRef = collection(db, `carts/${userUID}/items`);

  // Listen for changes in the Firestore cart collection
  onSnapshot(cartRef, async (snapshot) => {
    // Loop through the documents in the collection
    cartContainer.innerHTML = "";
    let subtotal = 0;

    snapshot.forEach(async (snap) => {
      cartContainer.innerHTML = "";
      const itemData = await snap.data();
      const cartItemId = snap.id;
      const price = itemData.price;
      subtotal += itemData.total;

      // Create a new cart item row
      const cartItemRow = document.createElement("div");
      cartItemRow.classList.add("row", "border-bottom");
      cartItemRow.style.padding = "10px";

      const cartItemMainRow = document.createElement("div");
      cartItemMainRow.classList.add(
        "row",
        "main",
        "align-items-center",
        "cart-col"
      );

      // Create individual columns for each cart item property
      const productCol = document.createElement("div");
      productCol.classList.add("col", "product-col", "cart-col-option");
      productCol.innerHTML = `<div>${itemData.name}</div>`;

      const sizeCol = document.createElement("div");
      sizeCol.classList.add("col", "size-col", "cart-col-option");
      sizeCol.innerHTML = `
                <span class="cart-col-label">Size</span>
                <span>${itemData.size}</span>
            `;

      const priceCol = document.createElement("div");
      priceCol.classList.add("col", "price-col", "cart-col-option");
      priceCol.innerHTML = `<span><span class="cart-price">${itemData.price}</span></span>`;

      const quantityCol = document.createElement("div");
      quantityCol.classList.add("col", "quantity-col", "cart-col-option");
      quantityCol.innerHTML = `
                <span class="cart-col-label">Qty</span>
                <select>
                    <option class="text-muted" value="1" ${
                      itemData.quantity === 1 ? "selected" : ""
                    }>1</option>
                    <option class="text-muted" value="2" ${
                      itemData.quantity === 2 ? "selected" : ""
                    }>2</option>
                    <option class="text-muted" value="3" ${
                      itemData.quantity === 3 ? "selected" : ""
                    }>3</option>
                    <option class="text-muted" value="4" ${
                      itemData.quantity === 4 ? "selected" : ""
                    }>4</option>
                    <option class="text-muted" value="5" ${
                      itemData.quantity === 5 ? "selected" : ""
                    }>5</option>
                    <option class="text-muted" value="6" ${
                      itemData.quantity === 6 ? "selected" : ""
                    }>6</option>
                </select>
            `;
      quantityCol.addEventListener("change", (e) => {
        const newQuantity = parseInt(e.target.value);
        // Update the quantity in the database
        updateQuantityInDatabase(cartItemId, newQuantity, userUID);
        // Recalculate and update the total
        const newTotal = newQuantity * parseInt(price.match(/\d+/)[0]);
        totalCol.innerHTML = `<div>₹ <span class="cart-total-price">${itemData.total}</span></div>`;
      });

      const totalCol = document.createElement("div");
      totalCol.classList.add("col", "total-col", "cart-col-option");
      totalCol.innerHTML = `<div>₹ <span class="cart-total-price">${itemData.total}</span></div>`;

      const crossCol = document.createElement("div");
      crossCol.classList.add(
        "bi",
        "bi-x",
        "col",
        "cross-col",
        "cart-col-option"
      );
      crossCol.innerHTML = ` `;

      // Append each column to the cart item row
      cartItemRow.appendChild(cartItemMainRow);
      cartItemMainRow.appendChild(productCol);
      cartItemMainRow.appendChild(sizeCol);
      cartItemMainRow.appendChild(priceCol);
      cartItemMainRow.appendChild(quantityCol);
      cartItemMainRow.appendChild(totalCol);
      cartItemMainRow.appendChild(crossCol);

      // Append the cart item row to the cart container
      cartContainer.appendChild(cartItemRow);

      // Attach a click event listener to the delete button
      // Attach a click event listener to the delete button
      crossCol.addEventListener("click", async (e) => {
        e.preventDefault(); // Prevent the default link behavior
        const cartItemIdToDelete = cartItemId; // Use the already defined cartItemId
        // Call the deleteCartItem function to delete the item
        await deleteCartItem(cartItemIdToDelete, userUID);
      });
      await updateQuantityInDatabase(cartItemId, itemData.quantity, userUID);
      await updateSummary(subtotal);
    });
     
  });       
}


 async function updateAndSyncProductPage(productId, userUID) {
  try{
     const productRef = doc(db, 'products', productId);
    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      const productData = productSnapshot.data();

      // Get a reference to the product page container using the productId
      const productPageContainer = document.getElementById(`${productId}`);

      productPageContainer.innerHTML = `
        
            <!-- Single Product Description -->
                <h1 class="border-bottom" style="text-align: center;">${
                  productData.name
                }</h1>
                <!-- Form -->
                <div class="cart-form clearfix">
                    <!-- Select Box -->
                    <div class="select-box d-flex mt-50 mb-30">
                        <div class="d-flex align-items-center pt-3 product-info">
                            <div class="product-data">
                                <p class="product-price">
                                    <i class="custom-icon bi-cash me-1" id="cash"></i>
                                    <span id="final-price-${productId}" class="final-price-1" style="color: black;">${
        productData.sizes["250gm"].finalPrice
      }</span>
                                    <span id="original-price-${productId}" class="original-price-1" style="color: black;">${
        productData.sizes["250gm"].originalPrice
      }</span>
                                    <span id="discount-${productId}" class="discount-1">${
        productData.sizes["250gm"].discount
      }</span>
                                </p>
                                <div class="size-checkboxes mb-0">
                                    ${generateSizeRadioButtons(
                                      productData.sizes
                                    )}
                                </div>
                            </div>
                            <p class="product-desc">
                            
Prepare to be amazed as this spice mix transforms your simple dish into a flavor-packed, restaurant-quality dish.
Try our ${
        productData.name
      } Spice Mix today and unlock a world of flavor in your own kitchen. Order now and experience the true essence of Indian cuisine with every meal!
</p>
                            <div class="product-btn">
                                <button class="custom-btn btn ms-auto addToCart" id="add-to-cart-${productId}">Add To Cart</button>
                                <div class="flipAddCartBtn" id="plus-minus-input-${productId}">
                                    <button class="custom-btn btn ms-auto plusBtn" id="plus-btn-${productId}">+</button>
                                    <div class="custom-btn btn ms-auto inputBtn" id="input-btn-${productId}">1</div>
                                    <button class="custom-btn btn ms-auto minusBtn" id="minus-btn-${productId}">-</button>
                                </div>
                                <button class="custom-btn btn ms-auto buyNowBtn1" id="buyNowBtn-${productId}">Buy Now</button>
                                <button class="custom-btn btn ms-auto checkoutBtn" id="checkoutBtn-${productId}">Checkout <i class="bi bi-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
          
      `;

      if (productPageContainer) {
        // Synchronize the selected size based on productId
        const sizeRadios = productPageContainer.querySelectorAll(
          "input[type='radio']"
        );

        sizeRadios.forEach(async (radio) => {
          radio.addEventListener("change", async () => {
            // Extract the productId from the radio button's name attribute
            const productId = radio.getAttribute("name").replace("size-", "");
            // Get the selected size value
            const selectedSize = radio.value;

            // Update prices and discount based on the selected size
            const finalPriceElement = document.getElementById(
              `final-price-${productId}`
            );
            const originalPriceElement = document.getElementById(
              `original-price-${productId}`
            );
            const discountElement = document.getElementById(
              `discount-${productId}`
            );

            if (finalPriceElement && originalPriceElement && discountElement) {
              finalPriceElement.textContent =
                productData.sizes[selectedSize].finalPrice;
              originalPriceElement.textContent =
                productData.sizes[selectedSize].originalPrice;
              discountElement.textContent =
                productData.sizes[selectedSize].discount;
            }

            // Update the Firestore quantity based on the new size
            await syncQuantityUI(productId, selectedSize, userUID);
          });
        });
        // Your existing code to access elements
        // ...
      } else {
        console.error(`Element with ID 'p-${productId}' not found.`);
      }


      // Add an event listener to the "Add to Cart" button
      const addToCartButton = productPageContainer.querySelector(
        `#add-to-cart-${productId}`
      );

      const quantityControls = productPageContainer.querySelector(
        `#plus-minus-input-${productId}`
      );

      const buyNowButton = productPageContainer.querySelector(
        `#buyNowBtn-${productId}`
      );
      const checkoutButton = productPageContainer.querySelector(
        `#checkoutBtn-${productId}`
      );
      const inputButton = productPageContainer.querySelector(
        `#input-btn-${productId}`
      );

      let quantity = 1;

      // Function to update the Firestore quantity
      async function updateFirestoreQuantity(
        newQuantity,
        productId,
        selectedSize,
        userUID
      ) {
        try {
          const cartItemRef = doc(
            db,
            "carts",
            userUID,
            "items",
            `${productId}-${selectedSize}`
          );

          // Get the cart item document snapshot
          const docSnapshot = await getDoc(cartItemRef);

          if (newQuantity === 0) {
            // If the new quantity is 0, delete the document
            await deleteDoc(cartItemRef);

            // Update the UI to show the "Add to Cart" button and hide quantity controls
            addToCartButton.style.display = "block";
            quantityControls.style.display = "none";
            buyNowButton.style.display = "block";
            checkoutButton.style.display = "none";
          } else if (docSnapshot.exists()) {
            // If the document exists, update the quantity for the selected size
            await setDoc(
              cartItemRef,
              { quantity: newQuantity },
              { merge: true }
            );

            // Update the UI to hide the "Add to Cart" button and show quantity controls
            addToCartButton.style.display = "none";
            quantityControls.style.display = "flex";
            buyNowButton.style.display = "none";
            checkoutButton.style.display = "block";
          }
        } catch (error) {
          console.error("Error updating product quantity:", error);
        }
      }

      addToCartButton.addEventListener("click", async () => {
        try {
          // Prevent the default link behavior
          addToCartButton.style.display = "none";
          quantityControls.style.display = "flex";
          buyNowButton.style.display = "none";
          checkoutButton.style.display = "block";

          // Get the selected size
          const selectedSize = productPageContainer.querySelector(
            `input[name="size-${productId}"]:checked`
          ).value;

          // Get the current quantity for the selected size (initially 1)
          const quantity = 1;
          inputButton.textContent = quantity;

          // Update the Firestore quantity for the selected size
          await updateFirestoreQuantity(
            quantity,
            productId,
            selectedSize,
            userUID
          );

          // Get the product details based on the selected size
          const selectedProductDetails = productData.sizes[selectedSize];

          // Add the product to the user's cart in Firestore
          const cartItemRef = doc(
            db,
            "carts",
            userUID,
            "items",
            `${productId}-${selectedSize}`
          );

          await setDoc(cartItemRef, {
            size: selectedSize,
            quantity: quantity,
            price: selectedProductDetails.finalPrice,
            name: productData.name, // Add the product name
            image: productData.image, // Add the product image URL
          });

          console.log("Product added to cart in Firestore.");
        } catch (error) {
          console.error("Error adding product to cart in Firestore:", error);
        }
      });

      // Select the plus and minus buttons
      const plusButton = productPageContainer.querySelector(
        `#plus-btn-${productId}`
      );
      const minusButton = productPageContainer.querySelector(
        `#minus-btn-${productId}`
      );

      // Add a click event listener to both buttons
      plusButton.addEventListener("click", () => handleQuantityChange(1));
      minusButton.addEventListener("click", () => handleQuantityChange(-1));

      // Function to handle quantity changes
      async function handleQuantityChange(change) {
        const selectedSize = productPageContainer.querySelector(
          `input[name="size-${productId}"]:checked`
        ).value;

        // Get the current quantity for the selected size
        let quantity = parseInt(inputButton.textContent);

        // Calculate the new quantity
        const newQuantity = quantity + change;

        if (newQuantity >= 0 && newQuantity <= 6) {
          // Update the displayed quantity
          inputButton.textContent = newQuantity;

          // Update the Firestore quantity for the selected size
          await updateFirestoreQuantity(
            newQuantity,
            productId,
            selectedSize,
            userUID
          );

          console.log("Quantity updated:", newQuantity);
        }

        // Update button visibility based on the quantity
        if (newQuantity === 0) {
          addToCartButton.style.display = "block";
          quantityControls.style.display = "none";
          buyNowButton.style.display = "block";
          checkoutButton.style.display = "none";
        } else {
          addToCartButton.style.display = "none";
          quantityControls.style.display = "flex";
          buyNowButton.style.display = "none";
          checkoutButton.style.display = "block";
        }
      }

    buyNowButton.addEventListener("click", async () => {
      // Get the selected size
      const selectedSize = productPageContainer.querySelector(
        `input[name="size-${productId}"]:checked`
      ).value;

      // Set the quantity to 1
      const quantity = 1;

      await updateFirestoreQuantity(quantity, productId, selectedSize, userUID);

      // Get the product details based on the selected size
      const selectedProductDetails = productData.sizes[selectedSize];

      // Add the product to the user's cart in Firestore
      const cartItemRef = doc(
        db,
        "carts",
        userUID,
        "items",
        `${productId}-${selectedSize}`
      );

      await setDoc(cartItemRef, {
        size: selectedSize,
        quantity: quantity,
        price: selectedProductDetails.finalPrice,
        name: productData.name, // Add the product name
        image: productData.image, // Add the product image URL
      });

      console.log("Product added to cart in Firestore.");
      // Redirect to the cart.html page
      window.location.href = "../cart.html";
    });


      checkoutButton.addEventListener("click", async () => {
        // Prevent the default link behavior
        // Handle Checkout button click here
        // Navigate to the cart.html page
        window.location.href = "../cart.html";
        // ...
      });

      async function selectMaxQuantityRadioButton(productId, userUID) {
        try {
          // Find all radio buttons for the given product card
          const sizeRadios = document.querySelectorAll(
            `input[name="size-${productId}"]`
          );

          // Initialize variables to keep track of the maximum quantity and the corresponding radio button
          let maxQuantity = 0;
          let maxQuantityRadioButton = null;

          // Iterate through the radio buttons
          for (const radio of sizeRadios) {
            // Extract the selected size from the radio button's value
            const selectedSize = radio.value;

            // Get the quantity for this size from Firestore or your data source
            const quantity = await getQuantityFromDataSource(
              productId,
              selectedSize,
              userUID
            );

            // Check if the quantity for this size is greater than the current maximum
            if (quantity > maxQuantity) {
              maxQuantity = quantity;
              maxQuantityRadioButton = radio;
            }
          }

          // Check if a radio button with the maximum quantity was found
          if (maxQuantityRadioButton) {
            // Programmatically select the radio button with the maximum quantity
            maxQuantityRadioButton.checked = true;
            // Get the selected size value
            const selectedSize = maxQuantityRadioButton.value;

            // Update prices and discount based on the selected size
            document.getElementById(`final-price-${productId}`).textContent =
              productData.sizes[selectedSize].finalPrice;
            document.getElementById(`original-price-${productId}`).textContent =
              productData.sizes[selectedSize].originalPrice;
            document.getElementById(`discount-${productId}`).textContent =
              productData.sizes[selectedSize].discount;

            await syncQuantityUI(productId, selectedSize, userUID);
          }
        } catch (error) {
          console.error("Error selecting max quantity radio button:", error);
        }
      }

      // Replace this function with your actual logic to retrieve quantity from your data source
      async function getQuantityFromDataSource(
        productId,
        selectedSize,
        userUID
      ) {
        try {
          // Assuming you have Firebase Firestore initialized and a reference to your data collection
          const cartItemRef = doc(
            db,
            "carts",
            userUID,
            "items",
            `${productId}-${selectedSize}`
          );

          // Get the cart item document snapshot
          const docSnapshot = await getDoc(cartItemRef);

          // Check if the document exists
          if (docSnapshot.exists()) {
            const cartItemData = docSnapshot.data();

            // Retrieve the quantity for the selected size from the document data
            const quantity = cartItemData.quantity || 0;

            return quantity;
          } else {
            // Document does not exist, return a default value (0)
            return 0;
          }
        } catch (error) {
          console.error("Error fetching quantity from data source:", error);
          // Handle the error appropriately in your application
          // You can return an error code or throw an exception if needed
          throw error;
        }
      }
      const productDescElement = document.querySelector(".single_product_desc");
      const selectedSize = productDescElement.querySelector(
        "input[type='radio']:checked"
      ).value;
    
      syncQuantityUI(productId, selectedSize, userUID);
    
      
      selectMaxQuantityRadioButton(productId, userUID);
    }
  }
  catch (error) {
    console.error(
      `Error updating and syncing product page for productId ${productId}:`,
      error
    );
  }
}


await loadProducts();

async function createTemporaryCart(userUID) {
  const db = getFirestore(app);
  const tempCartRef = doc(db, `tempCarts/${userUID}`);

  try {
    // Get the user's cart data from the "carts" collection
    const userCartRef = collection(db, `carts/${userUID}/items`);

    const userCartSnapshot = await getDocs(userCartRef);

    if (userCartSnapshot.empty) {
      console.error("User cart data does not exist.");
      return;
    }

    const userCartData = {};

    // Loop through the documents in the snapshot to retrieve cart items
    userCartSnapshot.forEach((doc) => {
      const itemId = doc.id;
      const itemData = doc.data();
      userCartData[itemId] = itemData;
    });

    if (!userCartData || Object.keys(userCartData).length === 0) {
      console.error("User cart data is empty or missing.");
      return;
    }

    // Calculate subtotal
    let subtotal = 0;
    for (const itemId in userCartData) {
      const item = userCartData[itemId];
      subtotal += item.total ;
    }

    // Calculate delivery charge
    let deliveryCharge = subtotal < 500 ? 40 : 0;

    // Calculate final amount
    const finalAmount = subtotal + deliveryCharge;

    // Create the temporary cart document
    await setDoc(tempCartRef, {
      cartItems: userCartData,
      subtotal: subtotal,
      deliveryCharge: deliveryCharge,
      finalAmount: finalAmount,
      // Add other relevant data as needed
    });

    console.log("Temporary cart created successfully.");
  } catch (error) {
    console.error("Error creating temporary cart:", error);
  }
}


const finalCheckoutBtn = document.getElementById("finalCheckoutBtn");

if (finalCheckoutBtn) {
  finalCheckoutBtn.addEventListener("click", async () => {
    if (auth.currentUser.phoneNumber) {
      const userUID = auth.currentUser.uid;
      await createTemporaryCart(userUID);
      window.location.href = "../checkout.html";
    } else {
      Toastify({
        text: "Please login to continue",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
        stopOnFocus: true,
      }).showToast();
      const modalOverlay = document.getElementById("modalOverlay");
      const modal = document.getElementById("modal");
      modal.style.display = "block";
      modalOverlay.style.display = "block";
    }
    // ...
  });
}




const productItems = await loadProducts();

auth.onAuthStateChanged(async (user) => {
  if (user && user.phoneNumber) {
    // Usage:
    (async () => {
      const userUID = user.uid;
      const guestUserUID = localStorage.getItem("guestUserUID");
      // Initialize Firebase app and Firestore
      await moveGuestCartToUserCart(guestUserUID,userUID); 
    })();

    // Handle authenticated user
    productItems.forEach(async (productItem) => {
      const productId = productItem.id;
      const userUID = user.uid;
      await updateAndSyncProductCard(productId, userUID);

      // console.log(`Product card ${productId} updated and synced successfully.`);

      await updateUIBasedOnSavedState(productId, userUID);
      const selectedSize = productItem.querySelector(
        "input[type='radio']:checked"
      ).value;
      // console.log(selectedSize); 
      await syncQuantityUI(productId, selectedSize, userUID);
      
    });

    

    const userUID = user.uid;
    const productDescElement = document.querySelector(".single_product_desc");
    console.log("found product desc",productDescElement);

    if (productDescElement) {
      const productId = productDescElement.id;; // Extract productId from the id
      console.log("found pproduct id",productId);
      updateAndSyncProductPage(productId, userUID);
      
    }


     await updateCartCount(userUID); 
     const cartContainer = document.getElementById("cart-container");
     if (cartContainer) {
       await updateCartItems(userUID);
     }   
  } else {
    // Sign in the user anonymously
    try {
      const guestUserUID = localStorage.getItem("guestUserUID");
      if (!guestUserUID) {
      const userCredential = await signInAnonymously(auth);
      const guestUser = userCredential.user;
      const guestUserUID = guestUser.uid;
      localStorage.setItem("guestUserUID", guestUserUID);

      // User signed in successfully
      console.log("Guest user signed in anonymously:", guestUserUID);
      }
      const productItems = document.querySelectorAll(".product-item");

      productItems.forEach(async (productItem) => {
        const productId = productItem.id;
        await updateAndSyncGuestCart(productId, guestUserUID);

        // Wait for the "load" event to ensure that the DOM elements are ready
        window.addEventListener("load", async () => {
          const selectedSize = productItem.querySelector(
            "input[type='radio']:checked"
          ).value;
          console.log(selectedSize);

          await syncCartUI(productId, selectedSize, guestUserUID);
        });
      });

      const productDescElement = document.querySelector(".single_product_desc");

      // Check if the element exists and has an id attribute
      if (productDescElement) {
        const productId = productDescElement.id; // Extract productId from the id
        updateAndSyncProductPage(productId, guestUserUID);
      }


      await updateCartCount(guestUserUID);
      const cartContainer = document.getElementById("cart-container");
      if (cartContainer) {
      await updateCartItems(guestUserUID);
      }
    } catch (error) {
      console.error("Error signing in as a guest:", error);
    }
  }
});
   
