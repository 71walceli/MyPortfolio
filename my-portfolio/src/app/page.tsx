'use client'

import { Ref, useEffect, useRef, useState } from "react"

import Typed from "typed.js"  // For aototyping string
import PoreCounter from "@srexi/purecounterjs"
import GLightbox from "glightbox"
import Swiper from "swiper"
import $ from "jquery"

import { useLanguage } from "../translations"
import { RaimbowColorBar } from "../components/RaimbowProgressBar"

import T from "../translations/page"
import { on, onscroll, scrollto, select } from "@/functions"
import { DotLoader } from "react-spinners"
import { articles } from "@/articles"

export default function Home() {
  const {language, setLanguage, t} = useLanguage()
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
      strings: t(T.typed),
      typeSpeed: 50,
      backSpeed: 11,
      backDelay: 3000,
      loop: true,
    });

    return () => {
      typed.destroy()
    }
  }, [language, loaded])

  const progressBarLabelStyle = {
    textShadow: 
      "-3px -3px 3px black, -3px 3px 3px black, 3px 3px 3px black, 3px -3px 3px black"
    ,
  }
  
  const pureCounterEndSeconds = 2.25
  
  const preloaderStyle = {
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
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo"><a href="index.html">DevFolio</a></h1>
        {/* 
          Uncomment below if you prefer to use an image logo
          <a href="index.html" className="logo">
            <img src="assets/img/logo.png" alt="" className="img-fluid" />
          </a>
        */}

        {/* TODO Create a t() functhin within a language hook */}
        <nav id="navbar" className="navbar">
          <ul>
            <li><a className="nav-link scrollto active" href="#about">{t(T.aboutMe)}</a></li>
            <li><a className="nav-link scrollto" href="#services">{t(T.services)}</a></li>
            <li><a className="nav-link scrollto" href="#work">{t(T.work)}</a></li>
            <li><a className="nav-link scrollto" href="#blog">{t(T.blog)}</a></li>
            <li><a className="nav-link scrollto" href="#contact">{t(T.contact)}</a></li>
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

    {/* ======= Hero Section ======= */}
    <div id="hero" className="hero route bg-image" style={{backgroundImage: "url(assets/img/hero-bg.jpg)"}}>
      <div className="overlay-itro"></div>
      <div className="hero-content display-table">
        <div className="table-cell">
          <div className="container">
            {/* <p className="display-6 color-d">Hello, world!</p> */}
            <h1 className="hero-title mb-4">{t(T.iAm)}</h1>
            <p className="hero-subtitle"><span id="typed" /></p>
            <p className="pt-3">
              <a className="btn btn-primary btn js-scroll px-4" href="#about" role="button">
                {t(T.learnMore)}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    {/* <!-- End Hero Section --> */}

    <main id="main">

      {/* <!-- ======= About Section ======= --> */}
      <section id="about" className="about-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="box-shadow-full">
                <div className="row">
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
                            <span className="title-s">{t(T.name)}: </span>
                            <span>Walter Celi</span>
                          </p>
                          <p>
                            <span className="title-s">{t(T.profile)}: </span>
                            <span>{t(T.profileDescription)}</span>
                          </p>
                          <p>
                            <span className="title-s">{t(T.email)}: </span>
                            <span>contact@example.com</span>
                          </p>
                          <p>
                            <span className="title-s">{t(T.phone)}: </span>
                            <span>+593 99 415 2636</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="skill-mf">
                      <p className="title-s">{t(T.skills)}</p>
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
                          {t(T.aboutMe)}
                        </h5>
                      </div>
                      {t(T.aboutParagraps).map((p, i) => <p className="lead" key={i}>{p}</p>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{/* <!-- End About Section --> */}

      {/* <!-- ======= Services Section ======= --> */}
      <section id="services" className="services-mf pt-5 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="title-box text-center">
                <h3 className="title-a">
                  {t(T.services)}
                </h3>
                {/* <p className="subtitle-a">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p> */}
                <div className="line-mf"></div>
              </div>
            </div>
          </div>
          <div className="row">
            {t(T.servicesDescriptions).map(service => 
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

      {/* <!-- ======= Counter Section ======= --> */}
      <div className="section-counter paralax-mf bg-image" style={
        {backgroundImage: "url(assets/img/counters-bg.jpg)"}
      }>
        <div className="overlay-mf" style={{
          backgroundColor: "green"
        }} />
        <div className="container position-relative">
          <div className="row">
            <div className="col-sm-4 col-lg-4">
              <div className="counter-box counter-box pt-4 pt-md-0">
                <div className="counter-ico">
                  <span className="ico-circle"><i className="bi bi-check"></i></span>
                </div>
                <div className="counter-num">
                  <p className="counter">
                    <span className="purecounter" data-purecounter-start="0" data-purecounter-end="20" 
                      data-purecounter-duration={pureCounterEndSeconds} 
                    />
                    +
                  </p>
                  <span className="counter-text">{t(T.numbers.projectsDone)}</span>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-lg-4">
              <div className="counter-box pt-4 pt-md-0">
                <div className="counter-ico">
                  <span className="ico-circle"><i className="bi bi-journal-richtext"></i></span>
                </div>
                {/* TODO Debe decir:
                  N años
                  Experiencia
                */}
                <div className="counter-num">
                  <p className="counter">
                    <span 
                      className="purecounter" data-purecounter-start="0" data-purecounter-end="2" 
                      data-purecounter-duration={pureCounterEndSeconds} 
                    />
                    +
                  </p>
                  <span className="counter-text">{t(T.numbers.yearsOfExperience)}</span>
                </div>
              </div>
            </div>
            <div className="col-sm-4 col-lg-4">
              <div className="counter-box pt-4 pt-md-0">
                <div className="counter-ico">
                  <span className="ico-circle"><i className="bi bi-people"></i></span>
                </div>
                <div className="counter-num">
                <p className="counter">
                    <span 
                      className="purecounter" data-purecounter-start="0" data-purecounter-end="7" 
                      data-purecounter-duration={pureCounterEndSeconds} 
                    />
                    +
                  </p>
                  <span className="counter-text">{t(T.numbers.totalClients)}</span>
                </div>
              </div>
            </div>
            {/* <div className="col-sm-3 col-lg-3">
              <div className="counter-box pt-4 pt-md-0">
                <div className="counter-ico">
                  <span className="ico-circle"><i className="bi bi-award"></i></span>
                </div>
                <div className="counter-num">
                  <p data-purecounter-start="0" data-purecounter-end="48" data-purecounter-duration="1" className="counter purecounter"></p>
                  <span className="counter-text">{t(T.numbers.awardsWon)}</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>{/* <!-- End Counter Section --> */}

      {/* <!-- ======= Portfolio Section ======= --> */}
      <section id="work" className="portfolio-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="title-box text-center">
                <h3 className="title-a">{ t(T.portfolio) }</h3>
                <p className="subtitle-a">
                  {t(T.portfolioDescription)}
                </p>
                <div className="line-mf"></div>
              </div>
            </div>
          </div>
          <div className="row">
            {/* TODO Add actual articles */}
            {articles.map(a => <div className="col-md-4" key={a.href}>
              <div className="work-box">
                <a href={a.href} data-gallery="portfolioGallery" className="portfolio-lightbox">
                  <div className="work-img">
                    <img src={a.mainPicSrc} alt="" className="img-fluid" />
                  </div>
                </a>
                <div className="work-content">
                  <div className="row">
                    <div className="col-sm-8">
                      <h2 className="w-title">{a.title}</h2>
                      <div className="w-more">
                        <span className="w-ctegory">{a.category}</span>
                        /
                        <span className="w-date">{a.date}</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="w-like">
                        <a href={a.href}> <span className="bi bi-plus-circle"></span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}

          </div>
        </div>
      </section>{/* <!-- End Portfolio Section --> */}

      {/* <!-- ======= Testimonials Section ======= --> */}
      
      <div className="testimonials paralax-mf bg-image" style={{
        backgroundImage: "url(assets/img/overlay-bg.jpg)"
      }}>
        <div className="overlay-mf"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                <div className="swiper-wrapper">

                  <div className="swiper-slide">
                    <div className="testimonial-box">
                      <div className="author-test">
                        <img src="assets/img/testimonial-2.jpg" alt="" className="rounded-circle b-shadow-a" />
                        <span className="author">Xavi Alonso</span>
                      </div>
                      <div className="content-test">
                        <p className="description lead">
                          Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="testimonial-box">
                      <div className="author-test">
                        <img src="assets/img/testimonial-4.jpg" alt="" className="rounded-circle b-shadow-a" />
                        <span className="author">Marta Socrate</span>
                      </div>
                      <div className="content-test">
                        <p className="description lead">
                          Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-pagination"></div>
              </div>
              
              <div id="testimonial-mf" className="owl-carousel owl-theme"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <!-- End Testimonials Section --> */}

      {/* <!-- ======= Blog Section ======= --> */}
      <section id="blog" className="blog-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="title-box text-center">
                <h3 className="title-a">
                  Blog
                </h3>
                <p className="subtitle-a">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="line-mf"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="card card-blog">
                <div className="card-img">
                  <a href="blog-single.html"><img src="assets/img/post-1.jpg" alt="" className="img-fluid" /></a>
                </div>
                <div className="card-body">
                  <div className="card-category-box">
                    <div className="card-category">
                      <h6 className="category">Travel</h6>
                    </div>
                  </div>
                  <h3 className="card-title"><a href="blog-single.html">See more ideas about Travel</a></h3>
                  <p className="card-description">
                    Proin eget tortor risus. Pellentesque in ipsum id orci porta dapibus. Praesent sapien massa, convallis
                    a pellentesque nec,
                    egestas non nisi.
                  </p>
                </div>
                <div className="card-footer">
                  <div className="post-author">
                    <a href="#">
                      <img src="assets/img/testimonial-2.jpg" alt="" className="avatar rounded-circle" />
                      <span className="author">Morgan Freeman</span>
                    </a>
                  </div>
                  <div className="post-date">
                    <span className="bi bi-clock"></span> 10 min
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-blog">
                <div className="card-img">
                  <a href="blog-single.html"><img src="assets/img/post-2.jpg" alt="" className="img-fluid" /></a>
                </div>
                <div className="card-body">
                  <div className="card-category-box">
                    <div className="card-category">
                      <h6 className="category">Web Design</h6>
                    </div>
                  </div>
                  <h3 className="card-title"><a href="blog-single.html">See more ideas about Travel</a></h3>
                  <p className="card-description">
                    Proin eget tortor risus. Pellentesque in ipsum id orci porta dapibus. Praesent sapien massa, convallis
                    a pellentesque nec,
                    egestas non nisi.
                  </p>
                </div>
                <div className="card-footer">
                  <div className="post-author">
                    <a href="#">
                      <img src="assets/img/testimonial-2.jpg" alt="" className="avatar rounded-circle" />
                      <span className="author">Morgan Freeman</span>
                    </a>
                  </div>
                  <div className="post-date">
                    <span className="bi bi-clock"></span> 10 min
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card card-blog">
                <div className="card-img">
                  <a href="blog-single.html"><img src="assets/img/post-3.jpg" alt="" className="img-fluid" /></a>
                </div>
                <div className="card-body">
                  <div className="card-category-box">
                    <div className="card-category">
                      <h6 className="category">Web Design</h6>
                    </div>
                  </div>
                  <h3 className="card-title"><a href="blog-single.html">See more ideas about Travel</a></h3>
                  <p className="card-description">
                    Proin eget tortor risus. Pellentesque in ipsum id orci porta dapibus. Praesent sapien massa, convallis
                    a pellentesque nec,
                    egestas non nisi.
                  </p>
                </div>
                <div className="card-footer">
                  <div className="post-author">
                    <a href="#">
                      <img src="assets/img/testimonial-2.jpg" alt="" className="avatar rounded-circle" />
                      <span className="author">Morgan Freeman</span>
                    </a>
                  </div>
                  <div className="post-date">
                    <span className="bi bi-clock"></span> 10 min
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{/* <!-- End Blog Section --> */}

      {/* <!-- ======= Contact Section ======= --> */}
      <section id="contact" className="paralax-mf footer-paralax bg-image sect-mt4 route" style={{backgroundImage: "url(assets/img/overlay-bg.jpg)"}}>
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
                          Send Message Us
                        </h5>
                      </div>
                      <div>
                        <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                              </div>
                            </div>
                            <div className="col-md-12 mb-3">
                              <div className="form-group">
                                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <textarea className="form-control" name="message" rows={5} placeholder="Message" required></textarea>
                              </div>
                            </div>
                            <div className="col-md-12 text-center my-3">
                              <div className="loading">Loading</div>
                              <div className="error-message"></div>
                              <div className="sent-message">Your message has been sent. Thank you!</div>
                            </div>
                            <div className="col-md-12 text-center">
                              <button type="submit" className="button button-a button-big button-rouded">Send Message</button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="title-box-2 pt-4 pt-md-0">
                        <h5 className="title-left">
                          Get in Touch
                        </h5>
                      </div>
                      <div className="more-info">
                        <p className="lead">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolorum dolorem soluta quidem
                          expedita aperiam aliquid at.
                          Totam magni ipsum suscipit amet? Autem nemo esse laboriosam ratione nobis
                          mollitia inventore?
                        </p>
                        <ul className="list-ico">
                          <li><span className="bi bi-geo-alt"></span> 329 WASHINGTON ST BOSTON, MA 02108</li>
                          <li><span className="bi bi-phone"></span> (617) 557-0089</li>
                          <li><span className="bi bi-envelope"></span> contact@example.com</li>
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
              <p className="copyright">&copy; Copyright <strong>DevFolio</strong>. All Rights Reserved</p>
              <div className="credits">
                {/* <!--
                  All the links in the footer should remain intact /.
                  You can delete the links only if you purchased the pro version /.
                  Licensing information: https://bootstrapmade.com/license/
                  Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=DevFolio
                --> */}
                Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
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
