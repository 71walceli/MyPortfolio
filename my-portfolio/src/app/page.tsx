'use client'

import { Ref, useEffect, useRef } from "react"
import { useLanguage } from "./translations"
import T from "./translations/page"
import Typed from "typed.js"
import { RaimbowColorBar } from "../components/RaimbowProgressBar"

export default function Home() {
  const preloaderRef: Ref<HTMLDivElement | undefined> = useRef()
  const {language, setLanguage, t} = useLanguage()
  
  useEffect(() => {
    //@ts-ignore as main() binds events and starts all client-side template logic
    window.main()
    if (preloaderRef.current)
      preloaderRef.current.style.display = "none";
  }, [])
  useEffect(() => {
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
  }, [language])

  const progressBarLabelStyle = {
    textShadow: 
      "-3px -3px 3px black, -3px 3px 3px black, 3px 3px 3px black, 3px -3px 3px black"
    ,
  }
  
  return <>
    {/* @ts-ignore */}
    <div id="preloader" ref={preloaderRef}></div>
    <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a> 

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
                          {/* TODO Import */}
                          <img alt="" className="img-fluid rounded b-shadow-a" 
                            src="assets/img/testimonial-2.jpg" 
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
                        customLabel={"React"} className="py-2"
                      />
                      <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={50} 
                        customLabel={"React Native"} className="py-2"
                      />
                      <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={40} 
                        customLabel={"PHP & Apache"} className="py-2"
                      />
                      <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={80} 
                        customLabel={"Node & Express"} className="py-2"
                      />
                      <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={90} 
                        customLabel={"Linux"} className="py-2"
                      />
                      <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={66} 
                        customLabel={"Docker"} className="py-2"
                      />
                      <RaimbowColorBar customLabelStyles={progressBarLabelStyle} percentage={75} 
                        customLabel={"MariaDB & SQL Server"} className="py-2"
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
                      {t(T.aboutParagraps).map(p => <p className="lead">{p}</p>)}
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
                  Services
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
              <div className="service-box">
                <div className="service-ico">
                  <span className="ico-circle"><i className="bi bi-briefcase"></i></span>
                </div>
                <div className="service-content">
                  <h2 className="s-title">Web Design</h2>
                  <p className="s-description text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci eaque autem fugiat! Quia,
                    provident vitae! Magni
                    tempora perferendis eum non provident.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-box">
                <div className="service-ico">
                  <span className="ico-circle"><i className="bi bi-card-checklist"></i></span>
                </div>
                <div className="service-content">
                  <h2 className="s-title">Web Development</h2>
                  <p className="s-description text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci eaque autem fugiat! Quia,
                    provident vitae! Magni
                    tempora perferendis eum non provident.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-box">
                <div className="service-ico">
                  <span className="ico-circle"><i className="bi bi-bar-chart"></i></span>
                </div>
                <div className="service-content">
                  <h2 className="s-title">Photography</h2>
                  <p className="s-description text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci eaque autem fugiat! Quia,
                    provident vitae! Magni
                    tempora perferendis eum non provident.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-box">
                <div className="service-ico">
                  <span className="ico-circle"><i className="bi bi-binoculars"></i></span>
                </div>
                <div className="service-content">
                  <h2 className="s-title">Responsive Design</h2>
                  <p className="s-description text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci eaque autem fugiat! Quia,
                    provident vitae! Magni
                    tempora perferendis eum non provident.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-box">
                <div className="service-ico">
                  <span className="ico-circle"><i className="bi bi-brightness-high"></i></span>
                </div>
                <div className="service-content">
                  <h2 className="s-title">Graphic Design</h2>
                  <p className="s-description text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci eaque autem fugiat! Quia,
                    provident vitae! Magni
                    tempora perferendis eum non provident.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-box">
                <div className="service-ico">
                  <span className="ico-circle"><i className="bi bi-calendar4-week"></i></span>
                </div>
                <div className="service-content">
                  <h2 className="s-title">Marketing Services</h2>
                  <p className="s-description text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni adipisci eaque autem fugiat! Quia,
                    provident vitae! Magni
                    tempora perferendis eum non provident.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{/* <!-- End Services Section --> */}

      {/* <!-- ======= Counter Section ======= --> */}
      <div className="section-counter paralax-mf bg-image" style={{backgroundImage: "url(assets/img/counters-bg.jpg)"}}>
        <div className="overlay-mf"></div>
        <div className="container position-relative">
          <div className="row">
            <div className="col-sm-3 col-lg-3">
              <div className="counter-box counter-box pt-4 pt-md-0">
                <div className="counter-ico">
                  <span className="ico-circle"><i className="bi bi-check"></i></span>
                </div>
                <div className="counter-num">
                  <p data-purecounter-start="0" data-purecounter-end="450" data-purecounter-duration="1" className="counter purecounter"></p>
                  <span className="counter-text">WORKS COMPLETED</span>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-lg-3">
              <div className="counter-box pt-4 pt-md-0">
                <div className="counter-ico">
                  <span className="ico-circle"><i className="bi bi-journal-richtext"></i></span>
                </div>
                <div className="counter-num">
                  <p data-purecounter-start="0" data-purecounter-end="25" data-purecounter-duration="1" className="counter purecounter"></p>
                  <span className="counter-text">YEARS OF EXPERIENCE</span>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-lg-3">
              <div className="counter-box pt-4 pt-md-0">
                <div className="counter-ico">
                  <span className="ico-circle"><i className="bi bi-people"></i></span>
                </div>
                <div className="counter-num">
                  <p data-purecounter-start="0" data-purecounter-end="550" data-purecounter-duration="1" className="counter purecounter"></p>
                  <span className="counter-text">TOTAL CLIENTS</span>
                </div>
              </div>
            </div>
            <div className="col-sm-3 col-lg-3">
              <div className="counter-box pt-4 pt-md-0">
                <div className="counter-ico">
                  <span className="ico-circle"><i className="bi bi-award"></i></span>
                </div>
                <div className="counter-num">
                  <p data-purecounter-start="0" data-purecounter-end="48" data-purecounter-duration="1" className="counter purecounter"></p>
                  <span className="counter-text">AWARD WON</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{/* <!-- End Counter Section --> */}

      {/* <!-- ======= Portfolio Section ======= --> */}
      <section id="work" className="portfolio-mf sect-pt4 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="title-box text-center">
                <h3 className="title-a">
                  Portfolio
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
              <div className="work-box">
                <a href="assets/img/work-1.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox">
                  <div className="work-img">
                    <img src="assets/img/work-1.jpg" alt="" className="img-fluid" />
                  </div>
                </a>
                <div className="work-content">
                  <div className="row">
                    <div className="col-sm-8">
                      <h2 className="w-title">Lorem impsum dolor</h2>
                      <div className="w-more">
                        <span className="w-ctegory">Web Design</span> / <span className="w-date">18 Sep. 2018</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="w-like">
                        <a href="portfolio-details.html"> <span className="bi bi-plus-circle"></span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="work-box">
                <a href="assets/img/work-2.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox">
                  <div className="work-img">
                    <img src="assets/img/work-2.jpg" alt="" className="img-fluid" />
                  </div>
                </a>
                <div className="work-content">
                  <div className="row">
                    <div className="col-sm-8">
                      <h2 className="w-title">Loreda Cuno Nere</h2>
                      <div className="w-more">
                        <span className="w-ctegory">Web Design</span> / <span className="w-date">18 Sep. 2018</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="w-like">
                        <a href="portfolio-details.html"> <span className="bi bi-plus-circle"></span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="work-box">
                <a href="assets/img/work-3.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox">
                  <div className="work-img">
                    <img src="assets/img/work-3.jpg" alt="" className="img-fluid" />
                  </div>
                </a>
                <div className="work-content">
                  <div className="row">
                    <div className="col-sm-8">
                      <h2 className="w-title">Mavrito Lana Dere</h2>
                      <div className="w-more">
                        <span className="w-ctegory">Web Design</span> / <span className="w-date">18 Sep. 2018</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="w-like">
                        <a href="portfolio-details.html"> <span className="bi bi-plus-circle"></span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="work-box">
                <a href="assets/img/work-4.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox">
                  <div className="work-img">
                    <img src="assets/img/work-4.jpg" alt="" className="img-fluid" />
                  </div>
                </a>
                <div className="work-content">
                  <div className="row">
                    <div className="col-sm-8">
                      <h2 className="w-title">Bindo Laro Cado</h2>
                      <div className="w-more">
                        <span className="w-ctegory">Web Design</span> / <span className="w-date">18 Sep. 2018</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="w-like">
                        <a href="portfolio-details.html"> <span className="bi bi-plus-circle"></span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="work-box">
                <a href="assets/img/work-5.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox">
                  <div className="work-img">
                    <img src="assets/img/work-5.jpg" alt="" className="img-fluid" />
                  </div>
                </a>
                <div className="work-content">
                  <div className="row">
                    <div className="col-sm-8">
                      <h2 className="w-title">Studio Lena Mado</h2>
                      <div className="w-more">
                        <span className="w-ctegory">Web Design</span> / <span className="w-date">18 Sep. 2018</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="w-like">
                        <a href="portfolio-details.html"> <span className="bi bi-plus-circle"></span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="work-box">
                <a href="assets/img/work-6.jpg" data-gallery="portfolioGallery" className="portfolio-lightbox">
                  <div className="work-img">
                    <img src="assets/img/work-6.jpg" alt="" className="img-fluid" />
                  </div>
                </a>
                <div className="work-content">
                  <div className="row">
                    <div className="col-sm-8">
                      <h2 className="w-title">Studio Big Bang</h2>
                      <div className="w-more">
                        <span className="w-ctegory">Web Design</span> / <span className="w-date">18 Sep. 2017</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="w-like">
                        <a href="portfolio-details.html"> <span className="bi bi-plus-circle"></span></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>{/* <!-- End Portfolio Section --> */}

      {/* <!-- ======= Testimonials Section ======= --> */}
      <div className="testimonials paralax-mf bg-image" style={{backgroundImage: "url(assets/img/overlay-bg.jpg)"}}>
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
                  </div>{/* <!-- End testimonial item --> */}

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
                  </div>{/* <!-- End testimonial item --> */}
                </div>
                <div className="swiper-pagination"></div>
              </div>

              
              {/* 
                <div id="testimonial-mf" className="owl-carousel owl-theme"></div>
              */}
            </div>
          </div>
        </div>
      </div>{/* <!-- End Testimonials Section --> */}

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

    {/* Template Main JS File */}
    <script async src="assets/js/main.js"></script>
  </>
}
