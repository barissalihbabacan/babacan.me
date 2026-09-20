import { createContext, useContext } from "react";
import type { Lang } from "./router.ts";

export interface LanguageContextValue {
  lang: Lang;
  toggleLanguage: () => void;
  t: (path: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
