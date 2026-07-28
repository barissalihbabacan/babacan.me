import React, { createContext, useState, useEffect, useContext, type ReactNode } from "react";
import { i18nData, type I18nNode } from "../data/i18nData";

type Lang = "en" | "tr";

interface LanguageContextValue {
  lang: Lang;
  toggleLanguage: () => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const userLang = navigator.language;
    const isTR = userLang.startsWith("tr");
    const storedLang = localStorage.getItem("site-lang") as Lang | null;
    const initialLang: Lang = storedLang ?? (isTR ? "tr" : "en");
    setLang(initialLang);
    document.documentElement.lang = initialLang;
  }, []);

  const toggleLanguage = () => {
    const newLang: Lang = lang === "tr" ? "en" : "tr";
    setLang(newLang);
    localStorage.setItem("site-lang", newLang);
    document.documentElement.lang = newLang;
  };

  const t = (path: string): string => {
    const keys = path.split(".");
    let result: I18nNode | string = i18nData;
    for (const key of keys) {
      if (typeof result === "object" && result !== null && key in result) {
        result = result[key] as I18nNode | string;
      } else {
        return path;
      }
    }
    if (typeof result === "object" && result !== null && lang in result) {
      return (result as unknown as Record<string, string>)[lang] ?? path;
    }
    return path;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
