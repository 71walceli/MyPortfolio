"use client"
import React, { ReactNode, useState, createContext, useContext, Context } from "react";

type LanguageContextProps = {
  language: string | null;
  setLanguage: (lenguage: string) => undefined;
};
export const TranslateContext = createContext<LanguageContextProps>({
  language: null,
  setLanguage: (lenguage: string) => undefined,
})
export const TranslateProvider = 
  (props: {children: ReactNode}) => {
    const [language, setLanguage] = useState("es");
    
    return <TranslateContext.Provider value={{ language, setLanguage }}>
      {props.children}
    </TranslateContext.Provider>;
  }

export const useLanguage = () => {
  const {language, setLanguage} = useContext(TranslateContext)

  const t = (key): string | string[] | React.JSX.Element | React.JSX.Element[] => key[language]
  /*
  TODO Create a dynamic dict which picks everythong of the language
    const tr = {
      key: translation
    }
  */

  return { language, setLanguage, t }
}
