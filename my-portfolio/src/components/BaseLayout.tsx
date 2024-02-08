import { JSX, useEffect } from "react"
import { TranslateProvider } from "@/translations"
import Header from "./Header"
import Footer from "./Footer"
import { useReady } from "../data/hooks/useReady"

export const BaseLayout = ({children}: {children: JSX.Element}) => {
  const {ready, setReady} = useReady()

  useEffect(() => {
    if (ready) return;
    setTimeout(() => {
      setReady(true)
    }, 166)
  }, [ready])

  return <>
    <Header />
    {children}
    <Footer />
  </>
}