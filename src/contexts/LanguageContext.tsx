import React, { createContext, useContext, type ReactNode } from "react";
import { i18nData, type I18nNode } from "../data/i18nData";
import { useAppRouter, type Lang } from "./RouterContext";

interface LanguageContextValue {
  lang: Lang;
  toggleLanguage: () => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const { lang, setLang } = useAppRouter();

  const toggleLanguage = () => {
    const newLang: Lang = lang === "tr" ? "en" : "tr";
    setLang(newLang);
  };

  const t = (path: string): string => {
    const keys = path.split(".");
    let result: I18nNode | string = i18nData;
    for (const key of keys) {
      if (typeof result === "object" && result !== null) {
        const matchingKey = Object.keys(result).find(
          (k) => k === key || k.toLowerCase() === key.toLowerCase(),
        );
        if (matchingKey) {
          result = (result as Record<string, unknown>)[matchingKey] as I18nNode | string;
        } else {
          return path;
        }
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
