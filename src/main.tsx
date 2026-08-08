import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.css";
import { RouterProvider } from "./contexts/RouterContext.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import "./firebase.ts";
import { HelmetProvider } from "react-helmet-async";

// Enforce dark mode
document.documentElement.classList.add("dark");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </RouterProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
