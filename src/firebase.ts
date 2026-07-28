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
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, analytics };
