import barba from '@barba/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'
import Lenis from 'lenis'
import MouseFollower from 'mouse-follower'

import global from './global'
import { resetWebflow } from './js/helpers/resetWebflow'
import cases from './js/pages/cases'
import home from './js/pages/home/index'
import './styles/style.css'
import overview from './js/pages/overview'
import { enterTransition, leaveTransition } from './js/pageTransitions'

gsap.registerPlugin(ScrollTrigger)
MouseFollower.registerGSAP(gsap)

// Main function to determine which scripts to run
function main() {
  global()

  let lenis

  let $home = document.querySelector('[data-barba-namespace="home"]')
  let $case = document.querySelector('[data-barba-namespace="case"]')
  let $overview = document.querySelector('[data-barba-namespace="overview"]')
  // let $contact = document.querySelector('[data-barba-namespace="contact"]')

  if ($home) {
    home()
  } else if ($case) {
    cases()
  } else if ($overview) {
    overview()
  }

  const startLenis = () => {
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1.0,
      infinite: false,
      gestureOrientation: 'vertical',
      normalizeWheel: false,
      smoothTouch: false,
      autoResize: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }
  window.addEventListener('resize', () => lenis.resize())

  /** Add stop & start lenis eventlisteners */
  $('[data-lenis-start]').on('click', function () {
    lenis.start()
    $('[data-lenis-toggle]').toggleClass('stop-scroll')
  })
  $('[data-lenis-toggle]').on('click', function () {
    $(this).toggleClass('stop-scroll')
    if ($(this).hasClass('stop-scroll')) {
      lenis.stop()
    } else {
      lenis.start()
    }
  })
  const init = () => {
    $('a').on('click', () => {
      if ($('[data-lenis-toggle]').hasClass('stop-scroll')) {
        lenis.start()
      }
    })
    startLenis()

    // startCursor()
  }
  init()

  barba.hooks.after((data) => {
    lenis.start()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }

    $home = document.querySelector('[data-barba-namespace="home"]')
    $case = document.querySelector('[data-barba-namespace="case"]')
    $overview = document.querySelector('[data-barba-namespace="overview"]')
    if ($home) {
      home()
    } else if ($case) {
      cases()
    } else if ($overview) {
      overview()
    }

    resetWebflow(data)
  })

  barba.hooks.beforeEnter(() => {})

  barba.init({
    transitions: [
      {
        name: 'default-transition',
        async leave({ current }) {
          lenis.stop()
          // cursor.destroy()
          await leaveTransition(current.container)
        },
        enter({ next }) {
          // lenis.start()
          lenis.resize()
          lenis.start()
          setTimeout(() => {
            lenis.resize()
          }, 1000)
          enterTransition(next.container)
        },
        afterEnter() {
          // cursor.init()
          // startCursor()
        },
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
