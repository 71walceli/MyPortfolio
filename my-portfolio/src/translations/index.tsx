"use client"
import React, { ReactNode, useState, createContext, useContext, Context, useMemo } from "react";

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
  
  return { language, setLanguage, t }
}


export const useTranslations = (translations: {}, languages: []) => {
  const {language, setLanguage} = useContext(TranslateContext)

  const T = useMemo(() => Object.entries(translations).reduce(function reduceTranslation(index, current) {
    const key = current[0]
    let value = current[1]
    const nonLanguageKeys = translations.constructor.name === "Object" ? Object.keys(value) : []
    languages.forEach(_language => {
      const index = nonLanguageKeys.findIndex(x => x === _language)
      index > -1 ? nonLanguageKeys.splice(index, 1) : null
    })
    let subDictuinaries = nonLanguageKeys.map(key => ({ [key]: value[key] }))
    subDictuinaries = subDictuinaries.map(dict => Object.entries(dict).reduce(reduceTranslation, {}))
    if (subDictuinaries.length) {
      index[key] = subDictuinaries.reduce((acc, cur) => ({ ...acc, ...cur }), {})
      return index
    }
    index[key] = value[language]
    return index
  }, {}), [language])

  return { language, setLanguage, T }
}


