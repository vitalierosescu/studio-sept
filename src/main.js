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

  const cursor = new MouseFollower({
    speed: 0.8,
    skewing: 1,
    skewingText: 3,
    visible: true,
    visibleOnState: true,
  })

  const startCursor = () => {
    const cursorElements = [...document.querySelectorAll('[data-cursor]')]
    cursorElements.forEach(function (element) {
      element.addEventListener('mouseenter', () => {
        cursor.setText(element.dataset.cursor)
      })

      element.addEventListener('mouseleave', () => {
        cursor.removeText()
      })
    })
  }

  let lenis

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

    startCursor()
  }
  init()

  barba.hooks.after((data) => {
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
    lenis.resize()
    lenis.start()
    setTimeout(() => {
      lenis.resize()
    }, 1000)
    resetWebflow(data)
  })

  barba.hooks.beforeEnter(() => {
    lenis.start()
    lenis.scrollTo(0, { lerp: 0.05, lock: true, immediate: true })
  })

  barba.init({
    preventRunning: true,
    transitions: [
      {
        name: 'default-transition',
        once: () => {
          startLenis()
        },
        async leave({ current }) {
          lenis.stop()
          cursor.destroy()
          await leaveTransition(current.container)
          // global()
        },
        enter({ next }) {
          lenis.start()
          enterTransition(next.container)
        },
        afterEnter() {
          cursor.init()
          startCursor()
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

  // barba.hooks.beforeEnter(() => {
  //   lenis.start()
  //   lenis.scrollTo(0, { lerp: 0.05, lock: true, immediate: true })
  // })
  // barba.hooks.after((data) => {
  //   $home = document.querySelector('[data-barba-namespace="home"]')
  //   if ($home) {
  //     home()
  //   }
  //   lenis.resize()
  //   lenis.start()
  //   setTimeout(() => {
  //     lenis.resize()
  //   }, 1000)
  //   resetWebflow(data)
  // })

  // barba.init({
  //   preventRunning: true,
  //   transitions: [
  //     {
  //       // sync: true,
  //       once: () => {
  //         startLenis()
  //       },
  //       enter({ next }) {
  //         enterTransition(next.container)
  //       },
  //       leave({ current }) {
  //         lenis.stop()
  //         leaveTransition(current.container)
  //       },
  //     },
  //   ],
  // })
}

main()
