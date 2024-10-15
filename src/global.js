import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Lenis from 'lenis'

import { EASE } from './js/easings/easing'
import nav from './js/features/nav'
import createScrollTrigger from './js/helpers/createScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function global() {
  const titles = document.querySelectorAll('.tagline')
  const lines = document.querySelectorAll('.divider')

  titles.forEach((item) => {
    let tl = gsap.timeline({ paused: true })
    tl.from(
      item,
      {
        yPercent: 100,
        duration: 1.5,
        ease: EASE,
      },
      0
    )

    createScrollTrigger(item, tl, 'top bottom')
  })

  lines.forEach((item) => {
    let tl = gsap.timeline({ paused: true })
    tl.from(
      item,
      {
        scaleX: 0,
        duration: 2,
        ease: EASE,
      },
      0
    )

    createScrollTrigger(item, tl, 'top bottom')
  })

  const animateFooter = () => {
    const footerWrap = document.querySelector('.footer_wrap')

    gsap
      .timeline({
        defaults: {
          ease: 'none',
        },
        scrollTrigger: {
          trigger: footerWrap,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      })
      .fromTo(
        '.footer_component',
        {
          y: '-60vh',
        },
        { y: '0vh' }
      )
  }

  const displayTime = () => {
    const now = new Date()
    let hours = now.getHours()
    let minutes = now.getMinutes()

    minutes = minutes < 10 ? '0' + minutes : minutes
    const suffix = hours >= 12 ? 'PM' : 'AM'
    if (hours === 0) {
      hours = 12 // Midnight case
    }
    const timeString = hours + ':' + minutes + ' ' + suffix
    document.getElementById('time').innerText = timeString
  }

  const init = () => {
    setInterval(displayTime, 1000)
    animateFooter()
    nav()
  }
  init()
}

export default global
