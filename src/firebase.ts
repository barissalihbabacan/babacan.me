// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxVjRMKXh3c8wzIipgOXQU9ndErpT7u_w",
  authDomain: "babacan-sites.firebaseapp.com",
  projectId: "babacan-sites",
  storageBucket: "babacan-sites.firebasestorage.app",
  messagingSenderId: "261617198913",
  appId: "1:261617198913:web:7dea8def155ad10ccf63c0",
  measurementId: "G-YJJS8RBN8E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
  const initAnalytics = () => {
    try {
      analytics = getAnalytics(app);
    } catch {
      // Ignore initialization errors
    }
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(initAnalytics, { timeout: 3000 });
  } else {
    setTimeout(initAnalytics, 2500);
  }
}

export { app, analytics };
