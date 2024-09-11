import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { EASE } from './features/easings/easing'
import createScrollTrigger from './features/helpers/createScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function global() {
  const headings = document.querySelectorAll('.heading_component')

  headings.forEach((heading) => {
    let tl = gsap.timeline({ paused: true })
    tl.from(
      heading.querySelector('.divider'),
      {
        scaleX: 0,
        duration: 2,
        ease: EASE,
      },
      0
    )
    tl.from(
      heading.querySelector('.tagline'),
      {
        yPercent: 100,
        duration: 1.5,
        ease: EASE,
      },
      0
    )

    createScrollTrigger(heading, tl, 'top bottom')
  })
}

export default global
