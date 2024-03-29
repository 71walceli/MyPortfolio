"use client"
import React, { ReactNode, useState, createContext, useContext, Context, useMemo, useEffect } from "react";


export const supportedLanguages = ["en", "es"]

type LanguageContextProps = {
  language?: string | null;
  setLanguage?: (lenguage: string) => void;
};
export const TranslateContext = createContext<LanguageContextProps>({  })
export const TranslateProvider = (props: {children: ReactNode}) => {
  const [language, setLanguage] = useState("es");
  
  return <TranslateContext.Provider value={{ language, setLanguage }}>
    {props.children}
  </TranslateContext.Provider>;
}

interface TranslationsDict {
  [key: string]: string | JSX.Element | JSX.Element[] | TranslationsDict
}
export const useTranslations = (translations: TranslationsDict) => {
  const {language, setLanguage} = useContext(TranslateContext)
  if (!language || !setLanguage) {
    throw new Error("No context for usage of translations.")
  }

  const T = useMemo(() => Object.entries(translations).reduce(
    function reduceTranslation(index: TranslationsDict, current) {
      const key = current[0]
      let value = current[1]
      const nonLanguageKeys = translations.constructor.name === "Object" ? Object.keys(value) : []
      supportedLanguages.forEach(_language => {
        const index = nonLanguageKeys.findIndex(x => x === _language)
        index > -1 ? nonLanguageKeys.splice(index, 1) : null
      })
      let subDictuinaries = nonLanguageKeys
        .map(key => ({ [key]: (value as TranslationsDict)[key] }))
      subDictuinaries = subDictuinaries
        .map(dict => Object.entries(dict).reduce(reduceTranslation, {}))
      if (subDictuinaries.length) {
        index[key] = subDictuinaries.reduce((acc, cur) => ({ ...acc, ...cur }), {})
        return index
      }
      index[key] = (value as TranslationsDict)[language]
      return index
    }, {}
  ), [language])

  return { language, setLanguage, T }
}


