import React, { createContext, useState, useEffect, useContext } from "react";
import { i18nData } from "../data/i18nData";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    const isTR = userLang.startsWith("tr");
    const storedLang = localStorage.getItem("site-lang");
    const initialLang = storedLang || (isTR ? "tr" : "en");
    setLang(initialLang);
    document.documentElement.lang = initialLang;
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "tr" ? "en" : "tr";
    setLang(newLang);
    localStorage.setItem("site-lang", newLang);
    document.documentElement.lang = newLang;
  };

  const t = (path) => {
    const keys = path.split(".");
    let result = i18nData;
    for (const key of keys) {
      if (result[key]) {
        result = result[key];
      } else {
        return path;
      }
    }
    return result[lang] || path;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
