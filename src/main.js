import barba from '@barba/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import MouseFollower from 'mouse-follower'

import global from './global'
import { resetWebflow } from './js/helpers/resetWebflow'
import cases from './js/pages/cases'
import home from './js/pages/home/index.js'
import './styles/style.css'
import overview from './js/pages/overview'
import { enterTransition, leaveTransition } from './js/pageTransitions'

gsap.registerPlugin(ScrollTrigger)
MouseFollower.registerGSAP(gsap)

function main() {
  global()

  let $home = document.querySelector('[data-barba-namespace="home"]')
  let $case = document.querySelector('[data-barba-namespace="case"]')
  let $overview = document.querySelector('[data-barba-namespace="overview"]')

  if ($home) {
    home()
  } else if ($case) {
    cases()
  } else if ($overview) {
    overview()
  }

  const lenis = new Lenis()

  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  lenis.stop()
  window.addEventListener('resize', () => lenis.resize())

  barba.hooks.after((data) => {
    // lenis.start()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    lenis.stop()

    let $home = document.querySelector('[data-barba-namespace="home"]')
    let $case = document.querySelector('[data-barba-namespace="case"]')
    let $overview = document.querySelector('[data-barba-namespace="overview"]')
    if ($home) {
      home()
    } else if ($case) {
      cases()
    } else if ($overview) {
      overview()
    }

    resetWebflow(data)
  })

  barba.hooks.beforeEnter(() => {
    console.log('beforeEnter')
    // lenis.start()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    lenis.start()
  })

  barba.init({
    transitions: [
      {
        name: 'default-transition',
        async leave({ current }) {
          lenis.stop()
          await leaveTransition(current.container)
        },
        enter({ next }) {
          enterTransition(next.container)
          setTimeout(() => {
            lenis.resize()
            lenis.start()
          }, 500)
        },
        afterEnter() {},
      },
    ],
    views: [
      {
        namespace: 'home',
        beforeEnter() {
          home()
        },
      },
    ],
  })
}

main()
