import { JSX, useEffect } from "react"
import Header from "./Header"
import Footer from "./Footer"
import { useReady } from "../data/hooks/useReady"
import DotLoader from "react-spinners/DotLoader"
import { select, onscroll, on } from "../functions"


export const BaseLayout = ({children}: {children: JSX.Element}) => {
  const {ready, setReady} = useReady()

  useEffect(() => {
    if (ready) return;
    setTimeout(() => {
      setReady(true)
    }, 166)
  }, [ready])

  useEffect(() => { // Back to top button
    if (!ready) return;
    let backtotop = select('.back-to-top')
    let toggleBacktotop_load, toggleBacktotop_onscroll
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      toggleBacktotop_load = window.addEventListener('load', toggleBacktotop)
      toggleBacktotop_onscroll = onscroll(document, toggleBacktotop)
      toggleBacktotop() // It must be called when document loads
    }
    return () => {
      window.removeEventListener("load", toggleBacktotop_load)
      window.removeEventListener("onscroll", toggleBacktotop_onscroll)
    }
  }, [ready])

  useEffect(() => { // Back to top button
    if (!ready) return;
    let backtotop = select('.back-to-top')
    let toggleBacktotop_load, toggleBacktotop_onscroll
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      toggleBacktotop_load = window.addEventListener('load', toggleBacktotop)
      toggleBacktotop_onscroll = onscroll(document, toggleBacktotop)
      toggleBacktotop() // It must be called when document loads
    }
    return () => {
      window.removeEventListener("load", toggleBacktotop_load)
      window.removeEventListener("onscroll", toggleBacktotop_onscroll)
    }
  }, [ready])

  return <>
    <Header />
    {children}
    <Footer />

    <div style={{
      opacity: ready ? 0 : 1,
      visibility: ready ? "hidden" : "visible",
      transition: "all 0.333s linear",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
      zIndex: 9999,
      overflow: "hidden",
      background: "white",
    }}>
      <DotLoader loading speedMultiplier={2.5} color="grey" size={160} />
    </div>
    
    <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
      <i className="bi bi-arrow-up-short" />
    </a> 
  </>
}