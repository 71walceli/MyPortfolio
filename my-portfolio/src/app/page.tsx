'use client'

import { useEffect, useState } from "react"

import Typed from "typed.js"  // For aototyping string
import PoreCounter from "@srexi/purecounterjs"
import GLightbox from "glightbox"
import Swiper from "swiper"
import $ from "jquery"

import { useTranslations } from "../translations"
import { RaimbowColorBar } from "../components/RaimbowProgressBar"

import translations from "../translations/page"
import { on, onscroll, scrollto, select } from "@/functions"
import { DotLoader } from "react-spinners"
import { ArticlesCardListView } from "@/articles"
import Header from "@/components/Header"


export default function Home() {
  const {language, T} = useTranslations(translations)
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (loaded) return;
    //@ts-ignore as main() binds events and starts all client-side template logic
    window.Main?.()
    setTimeout(() => {
      setLoaded(true)
    }, 166)
  }, [loaded])
  useEffect(() => {
    if (!loaded) return;
    new PoreCounter();
  }, [loaded])
  useEffect(() => {
    if (!loaded) return;
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
      }
    });
  }, [loaded])
  useEffect(() => {
    if (!loaded) return;
    const portfolioLightbox = GLightbox({
      selector: '.portfolio-lightbox'
    });
  }, [loaded])
  
  // Rest of main.js code
  useEffect(() => {
    if (!loaded) return;
    // Navbar links active state on scroll
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
    const navbarlinksActive_load = window.addEventListener('load', navbarlinksActive)
    const navbarlinksActive_onscroll = onscroll(document, navbarlinksActive)

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
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
    }

    /**
     * Back to top button
     */
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
    }

    /**
     * Mobile nav toggle
     */
    const mobileNavToggles_click =  on('click', '.mobile-nav-toggle', function(e) {
      select('#navbar').classList.toggle('navbar-mobile')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    const navbarDropdown_click = on('click', '.navbar .dropdown > a', function(e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle('dropdown-active')
      }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
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

    /**
     * Scroll with offset on page load with hash links in the url
     * TODO Possibly move it to its own effect
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });

    return () => {
      window.removeEventListener("load", navbarlinksActive_load)
      window.removeEventListener("onscroll", navbarlinksActive_onscroll)
      window.removeEventListener("load", headerScrolled_load)
      window.removeEventListener("onscroll", headerScrolled_onscroll)
      window.removeEventListener("load", toggleBacktotop_load)
      window.removeEventListener("onscroll", toggleBacktotop_onscroll)
      
      // TODO WIP
      $(".mobile-app-toggle").each((_, e) => 
        mobileNavToggles_click.map(i => e.removeEventListener("click", i))
      )
      $(".navbar .dropdown > a").each((_, e) => 
        navbarDropdown_click.map(i => e.removeEventListener("click", i))
      )
      $(".scrollTo").each((_, e) => 
        scrollTo_click.map(i => e.removeEventListener("click", i))
      )
    }
  }, [loaded, language])  // TODO Remove language, which was put in order to test this.
  
  // Language state events
  useEffect(() => {
    if (!loaded) return;
    const typed = new Typed('#typed', {
      strings: T.typed,
      typeSpeed: 50,
      backSpeed: 11,
      backDelay: 3000,
      loop: true,
    });

    return () => {
      typed.destroy()
    }
  }, [language, loaded])

  // TODO Export to CSS, Tailwindo or styled components
  const progressBarLabelStyle = {
    textShadow: 
      "-3px -3px 3px black, -3px 3px 3px black, 3px 3px 3px black, 3px -3px 3px black"
    ,
  }
  
  const preloaderStyle = {  // Must be inlined so it loads first, w/o reflows.
    opacity: loaded ? 0 : 1,
    visibility: loaded ? "hidden" : "visible",
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
  }
  
  return <>
    <Header />

    {/* ======= Hero Section ======= */}
    <div id="hero" className="hero route bg-image" style={{backgroundImage: "url(assets/img/hero-bg.jpg)"}}>
      <div className="overlay-itro"></div>
      <div className="hero-content display-table">
        <div className="table-cell">
          <div className="container">
            {/* <p className="display-6 color-d">Hello, world!</p> */}
            <h1 className="hero-title mb-4">{T.iAm}</h1>
            <p className="hero-subtitle"><span id="typed" /></p>
            <p className="pt-3">
              <a className="btn btn-primary btn js-scroll px-4" href="#about" role="button">
                {T.learnMore}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- End Hero Section --> */}

    <main id="main">
      {/* <!-- ======= Portfolio Section ======= --> */}
      <section id="work" className="portfolio-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="title-box text-center">
                <h3 className="title-a">{ T.portfolio }</h3>
                <p className="subtitle-a">
                  {T.portfolioDescription}
                </p>
                <div className="line-mf"></div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* TODO Add actual articles */}
            <ArticlesCardListView />
          </div>
        </div>
      </section>{/* <!-- End Portfolio Section --> */}

      {/* <!-- ======= Services Section ======= --> */}
      <section id="services" className="services-mf pt-5 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="title-box text-center">
                <h3 className="title-a">
                  {T.services}
                </h3>
                {/* <p className="subtitle-a">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p> */}
                <div className="line-mf"></div>
              </div>
            </div>
          </div>
          <div className="row">
            {T.servicesDescriptions.map(service => 
              <div className="col-md-4" key={service.title}>
                <div className="service-box">
                  <div className="service-ico">
                    <span className="ico-circle"><i className={service.icon}></i></span>
                  </div>
                  <div className="service-content">
                    <h2 className="s-title">{service.title}</h2>
                    <p className="s-description text-center">{service.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>{/* <!-- End Services Section --> */}

      {/* <!-- ======= About Section ======= --> */}
      <section className="testimonials paralax-mf bg-image" style={{
        backgroundImage: "url(assets/img/overlay-bg.jpg)"
      }}>
        <div className="overlay-mf bg-warning"></div>
        <div className="container">
          <div className="row position-relative">
            <div className="col-md-6">
              <div className="row">
                <div className="col-sm-6 col-md-5">
                  <div className="about-img">
                    {/* TODO Import all images */}
                    <img alt="" className="img-fluid rounded b-shadow-a" 
                      src="assets/img/myFace.jpg" 
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-md-7">
                  <div className="about-info">
                    <p>
                      <span className="title-s">{T.name}: </span>
                      <span>Walter Celi</span>
                    </p>
                    <p>
                      <span className="title-s">{T.profile}: </span>
                      <span>{T.profileDescription}</span>
                    </p>
                    <p>
                      <span className="title-s">{T.email}: </span>
                      <span>contact@example.com</span>
                    </p>
                    <p>
                      <span className="title-s">{T.phone}: </span>
                      <span>+593 99 415 2636</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="skill-mf">
                <p className="title-s">{T.skills}</p>
                <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={70} 
                  className="py-2" customLabel="React"
                />
                <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={50} 
                  className="py-2" customLabel="React Native"
                />
                <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={40} 
                  className="py-2" customLabel="PHP & Apache"
                />
                <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={80} 
                  className="py-2" customLabel="Node & Express"
                />
                <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={90} 
                  className="py-2" customLabel="Linux"
                />
                <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={66} 
                  className="py-2" customLabel="Docker"
                />
                <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={75} 
                  className="py-2" customLabel="MariaDB & SQL Server"
                />
                <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={55} 
                  className="py-2" customLabel="Jupyter"
                />
                <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={70} 
                  className="py-2" customLabel="Cloud"
                />
                <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={40} 
                  className="py-2" customLabel="Data Analytics"
                />
                <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={35}
                  className="py-2" customLabel="Machine Learning"
                />
              </div>
            </div>
            <div className="col-md-6">  
              <div className="about-me pt-4 pt-md-0">
                <div className="title-box-2">
                  <h5 className="title-left">
                    {T.aboutMe}
                  </h5>
                </div>
                {T.aboutParagraps.map((p, i) => <p className="lead" key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End About Section --> */}

      {/* <!-- ======= Contact Section ======= --> */}
      <section id="contact" className="paralax-mf footer-paralax bg-image oute" style={{backgroundImage: "url(assets/img/overlay-bg.jpg)"}}>
        <div className="overlay-mf"></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="contact-mf">
                <div id="contact" className="box-shadow-full">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="title-box-2">
                        <h5 className="title-left">
                          {T.contactForm.SendMessage}
                        </h5>
                      </div>
                      <div>
                        <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input type="text" name="name" className="form-control" id="name" 
                                  placeholder={T.contactForm.YourName} required 
                                />
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input type="email" className="form-control" name="email" id="email" 
                                  placeholder={T.contactForm.YourEmail} required 
                                />
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input type="text" className="form-control" name="subject" 
                                  id="subject" placeholder={T.contactForm.Subject} required 
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <textarea className="form-control" name="message" rows={5} 
                                  placeholder={T.contactForm.Message} required
                                ></textarea>
                              </div>
                            </div>
                            <div className="col-md-12 text-center my-3">
                              <div className="loading">{T.contactForm.Sending}</div>
                              <div className="error-message"></div>
                              <div className="sent-message">{T.contactForm.Success}</div>
                            </div>
                            <div className="col-md-12 text-center">
                              <button type="submit" className="button button-a button-big button-rouded">{T.contactForm.Submit}</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="title-box-2 pt-4 pt-md-0">
                        <h5 className="title-left">
                        {T.contactForm.getInTouch.title}
                        </h5>
                      </div>
                      <div className="more-info">
                        {T.contactForm.getInTouch.paragraphs}
                        <ul className="list-ico">
                          {/* <li><span className="bi bi-geo-alt"></span> 329 WASHINGTON ST BOSTON, MA 02108</li> */}
                          <li><span className="bi bi-phone"></span>+593 99 415 2639</li>
                          <li><span className="bi bi-envelope"></span>antonini44354@gmail.com</li>
                        </ul>
                      </div>
                      <div className="socials">
                        <ul>
                          <li><a href=""><span className="ico-circle"><i className="bi bi-facebook"></i></span></a></li>
                          <li><a href=""><span className="ico-circle"><i className="bi bi-instagram"></i></span></a></li>
                          <li><a href=""><span className="ico-circle"><i className="bi bi-twitter"></i></span></a></li>
                          <li><a href=""><span className="ico-circle"><i className="bi bi-linkedin"></i></span></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{/* <!-- End Contact Section --> */}
    </main>{/* <!-- End #main --> */}

    {/* <!-- ======= Footer ======= --> */}
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="copyright-box">
              <p className="copyright">&copy; Copyright <strong>DevFolio</strong>. {T.footer.AllRightReserved}</p>
              <div className="credits">
                {/* <!--
                  All the links in the footer should remain intact /.
                  You can delete the links only if you purchased the pro version /.
                  Licensing information: https://bootstrapmade.com/license/
                  Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=DevFolio
                --> */}
                {T.footer.DesignedBy} <a href="https://bootstrapmade.com/">BootstrapMade</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <div style={preloaderStyle}>
      <DotLoader loading speedMultiplier={2.5} color="grey" size={160} />
    </div>
    
    <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
      <i className="bi bi-arrow-up-short" />
    </a> 
  </>
}
