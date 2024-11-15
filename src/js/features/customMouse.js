import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import $ from 'jquery'

import { EASE } from '../easings/easing'

gsap.registerPlugin(ScrollTrigger)

const customMouse = () => {
  gsap.defaults({
    ease: EASE,
    duration: 0.8,
  })

  let isMobile = window.innerWidth < 480

  window.addEventListener('resize', () => {
    isMobile = window.innerWidth < 480
  })

  function initSlider(wrapElement, boxesEl) {
    const wrappers = [...document.querySelectorAll(wrapElement)]
    let cursorInner = document.querySelector('.cursor-el')

    wrappers.forEach((wrapper) => {
      const boxes = boxesEl
      let lastMouseX = 0
      let lastMouseY = 0
      let mouseStillTimeout

      function checkMouseStillness() {
        clearTimeout(mouseStillTimeout)
        mouseStillTimeout = setTimeout(() => {
          // cursorInner.classList.add('hover')
        }, 200)
      }

      function onMouseMove(event) {
        const dx = Math.abs(event.clientX - lastMouseX)
        const dy = Math.abs(event.clientY - lastMouseY)

        if (dx > 8 || dy > 8) {
          cursorInner.classList.remove('hover')
          checkMouseStillness()
        }

        lastMouseX = event.clientX
        lastMouseY = event.clientY
      }

      boxes.forEach((box) => {
        if (!isMobile) {
          box.addEventListener('mouseenter', () => {
            lastMouseX = 0
            lastMouseY = 0
            window.addEventListener('mousemove', onMouseMove)
            checkMouseStillness()
          })

          box.addEventListener('mouseleave', () => {
            clearTimeout(mouseStillTimeout)
            window.removeEventListener('mousemove', onMouseMove)
          })
        }
      })

      if (!isMobile) {
        wrapper.addEventListener('mouseenter', () => {
          $('.cursor-el_text').text(wrapper.getAttribute('data-cursor-text'))
          gsap.set(cursorInner, { display: 'flex', overwrite: 'auto' })
          gsap.fromTo(
            '.cursor-el_text',
            { yPercent: 105 },
            {
              yPercent: 0,
              duration: 0.5,
              ease: 'power1.out',
              overwrite: 'auto',
            }
          )
          gsap.fromTo(
            '.cursor-el__bg',
            { clipPath: 'inset(50%)' },
            {
              clipPath: 'inset(0%)',
              duration: 0.6,
              ease: 'power3.out',
              clearProps: true,
              overwrite: 'auto',
            }
          )
        })
        wrapper.addEventListener('mouseleave', () => {
          gsap.to('.cursor-el_text', {
            duration: 0.5,
            yPercent: 105,
            ease: 'power3.out',
            overwrite: 'auto',
          })
          gsap.to('.cursor-el__bg', {
            clipPath: 'inset(50%)',
            duration: 0.6,
            ease: 'power3.out',
            onComplete: () => {
              gsap.set(cursorInner, { display: 'none' })
            },
          })
        })
      }
    })
  }
  initSlider('.section_cta', gsap.utils.toArray('.section_cta .padding-global'))
  initSlider('.home-project_list', gsap.utils.toArray('.home-project_wrap'))

  function initSpecIllustrations() {
    let containers = [...document.querySelectorAll('.section_cta')]

    containers.forEach((container) => {
      let doodle = container.querySelector('.doodle_svg path')
      gsap.set(doodle, {
        strokeDasharray: '1500px 99999px',
        strokeDashoffset: '-1050px',
      })
      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(doodle, {
            duration: 1,
            strokeDashoffset: '0px',
          })
        },
      })
    })
  }
  initSpecIllustrations()
}

export default customMouse
