import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'

import { EASE } from './js/easings/easing'
import customMouse from './js/features/customMouse'
import nav from './js/features/nav'
import createScrollTrigger from './js/helpers/createScrollTrigger'
import marqueeServices from '../src/js/features/marqueeServices'

gsap.registerPlugin(ScrollTrigger)

function global() {
  const titles = document.querySelectorAll('.tagline')
  const lines = document.querySelectorAll('.divider')

  let mm = gsap.matchMedia(),
    breakPoint = 479

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions
      console.log(isDesktop, isMobile, reduceMotion)

      function animateFooter() {
        var footerWrap = $('.footer_wrap')

        let tl = gsap.timeline({
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

        tl.fromTo(
          footerWrap.find('.footer_component'),
          {
            y: '-60vh',
          },
          { y: '0vh' }
        )
      }

      if (isDesktop) animateFooter()
    }
  )

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

  const init = () => {
    nav()
    marqueeServices()
    customMouse()
  }
  init()
}

export default global
