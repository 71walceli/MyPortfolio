import { useEffect } from "react"
import { useReady } from "../data/hooks/useReady"
import { useTranslations } from "../translations"
import translations from "../translations/page"
import { select, onscroll, on } from "../functions"


const Header = () => {
  const {setLanguage, T} = useTranslations(translations)

  const {ready} = useReady()

  useEffect(() => { // Navbar links active state on scroll
    if (!ready) return;
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop 
          && position <= (section.offsetTop + section.offsetHeight)
        ) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    navbarlinksActive()   // It must be called when document loads
    const navbarlinksActive_load = window.addEventListener('load', navbarlinksActive)
    const navbarlinksActive_onscroll = onscroll(document, navbarlinksActive)
    return () => {
      window.removeEventListener("load", navbarlinksActive_load)
      window.removeEventListener("onscroll", navbarlinksActive_onscroll)
    }
  }, [ready])
  
  useEffect(() => { // Toggle .header-scrolled class to #header when page is scrolled
    if (!ready) return;
    let selectHeader = select('#header')
    let headerScrolled_load, headerScrolled_onscroll
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled')
        } else {
          selectHeader.classList.remove('header-scrolled')
        }
      }
      headerScrolled_load = window.addEventListener('load', headerScrolled)
      headerScrolled_onscroll = onscroll(document, headerScrolled)
      headerScrolled()  // It must be called when document loads
    }
    return () => {
      window.removeEventListener("load", headerScrolled_load)
      window.removeEventListener("onscroll", headerScrolled_onscroll)
    }
  }, [ready])

  useEffect(() => { // Mobile nav toggle
    if (!ready) return;
    const mobileNavToggles_click =  on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })

    // Mobile nav dropdowns activate
    const navbarDropdown_click = on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)
    return () => {      
      $(".mobile-app-toggle").each((_, e) => 
        mobileNavToggles_click.map(i => e.removeEventListener("click", i))
      )
      $(".navbar .dropdown > a").each((_, e) => 
        navbarDropdown_click.map(i => e.removeEventListener("click", i))
      )
    }
  }, [ready])
  

  useEffect(() => { // Scrolls to an element with header offset
    if (!ready) return;

    const scrollto = (el) => {
      let header = select('#header')
      let offset = header.offsetHeight

      if (!header.classList.contains('header-scrolled')) {
        offset -= 16
      }

      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos - offset,
        behavior: 'smooth'
      })
    }

    // Scrool with ofset on links with a class name .scrollto
    const scrollTo_click = on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()

        let navbar = select('#navbar')
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
    
    return () => {
      $(".scrollTo").each((_, e) => 
        scrollTo_click.map(i => e.removeEventListener("click", i))
      )
    }
  }, [ready])
  
  return <>
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo"><a href="/">DevFolio</a></h1>
        {/* 
          Uncomment below if you prefer to use an image logo
          <a href="/" className="logo">
            <img src="assets/img/logo.png" alt="" className="img-fluid" />
          </a>
        */}

        <nav id="navbar" className="navbar">
          <ul>
            <li><a className="nav-link scrollto" href="/#hero">{T.Home}</a></li>
            <li><a className="nav-link scrollto" href="/#work">{T.work}</a></li>
            <li><a className="nav-link scrollto" href="/#services">{T.services}</a></li>
            <li><a className="nav-link scrollto" href="/#about">{T.aboutMe}</a></li>
            <li><a className="nav-link scrollto" href="/#contact">{T.contact}</a></li>
            <li className="dropdown">
              <a href="#">
                <i className="bi bi-translate" aria-hidden="true"></i>
                &nbsp;
                {T.LanguageName}
              </a>
              <ul>
                <li><a href="#/" onClick={() => setLanguage("es")}>
                  <span className="fi fi-es"></span>Español
                </a></li>
                <li><a href="#/" onClick={() => setLanguage("en")}>
                  <span className="fi fi-us"></span>English
                </a></li>
              </ul>
            </li> 
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>

      </div>
    </header>
  </>
}
export default Header
