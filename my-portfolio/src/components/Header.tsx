import { useTranslations } from "../translations"
import translations from "../translations/page"

const Header = () => {
  const {setLanguage, T} = useTranslations(translations)

  return <>
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo"><a href="index.html">DevFolio</a></h1>
        {/* 
          Uncomment below if you prefer to use an image logo
          <a href="index.html" className="logo">
            <img src="assets/img/logo.png" alt="" className="img-fluid" />
          </a>
        */}

        <nav id="navbar" className="navbar">
          <ul>
            <li><a className="nav-link scrollto" href="/#hero">{T.Home}</a></li>
            <li><a className="nav-link scrollto" href="/#work">{T.work}</a></li>
            <li><a className="nav-link scrollto" href="/#services">{T.services}</a></li>
            <li><a className="nav-link scrollto" href="/#contact">{T.contact}</a></li>
            <li className="dropdown">
              <a href="#">
                <i className="bi bi-translate" aria-hidden="true"></i>
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
