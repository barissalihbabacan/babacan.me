import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.css";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import "./firebase.js";
import { HelmetProvider } from "react-helmet-async";

// Enforce dark mode as required
document.documentElement.classList.add("dark");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
