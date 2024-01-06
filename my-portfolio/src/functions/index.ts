
export const select = (el, all = false) => {
    el = el.trim()
    if (all) {
        return [...document.querySelectorAll(el)]
    } else {
        return document.querySelector(el)
    }
}

/**
 * Easy event listener function
 */
export const on = (type, el, listener, all = false) => {
    let listeners = []
    let selectEl = select(el, all)
    if (selectEl) {
        if (all) {
            listeners = selectEl.map(e => e.addEventListener(type, listener))
        } else {
            listeners.push(selectEl.addEventListener(type, listener))
        }
    }
    return listeners
}

/**
 * Easy on scroll event listener 
 */
export const onscroll = (el, listener) => {
    return el.addEventListener('scroll', listener)
}

// Scrolls to an element with header offset
export const scrollto = (el) => {
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
