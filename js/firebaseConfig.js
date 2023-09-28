import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

async function fetchFirebaseConfig() {
  try {
    const response = await fetch("https://asia-south1-easypizy-in.cloudfunctions.net/getFirebaseConfig");
    if (!response.ok) {
      throw new Error("Failed to fetch Firebase configuration");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Firebase configuration:", error.message);
    throw new Error("Failed to fetch Firebase configuration");
  }
}

async function initializeFirebaseApp() {
  try {
    const firebaseConfig = await fetchFirebaseConfig();
    const app = await initializeApp(firebaseConfig);
    return app;
  } catch (error) {
    console.error("Error initializing Firebase app:", error.message);
    throw new Error("Failed to initialize Firebase app");
  }
}

async function getRecaptchaSiteKey() {
  try {
    const response = await fetch("https://asia-south1-easypizy-in.cloudfunctions.net/getRecaptchaSiteKey");
    if (!response.ok) {
      throw new Error("Failed to fetch Firebase configuration");
    }
    const siteKey = await response.text();
    return siteKey;
  } catch (error) {
    console.error("Error fetching Firebase configuration:", error.message);
    throw new Error("Failed to fetch Firebase configuration");
  }
}

export { initializeFirebaseApp, getRecaptchaSiteKey };
