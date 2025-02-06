import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import $ from 'jquery'

// import { EASE } from '../easings/easing'

gsap.registerPlugin(ScrollTrigger)

// const customMouse = () => {
//   gsap.defaults({
//     ease: EASE,
//     duration: 0.8,
//   })

//   let isMobile = window.innerWidth < 480

//   window.addEventListener('resize', () => {
//     isMobile = window.innerWidth < 480
//   })

//   function initSlider(wrapElement, boxesEl) {
//     const wrappers = [...document.querySelectorAll(wrapElement)]
//     let cursorInner = document.querySelector('.cursor-el')

//     wrappers.forEach((wrapper) => {
//       const boxes = boxesEl
//       let lastMouseX = 0
//       let lastMouseY = 0
//       let mouseStillTimeout

//       function checkMouseStillness() {
//         clearTimeout(mouseStillTimeout)
//         mouseStillTimeout = setTimeout(() => {
//           // cursorInner.classList.add('hover')
//         }, 200)
//       }

//       function onMouseMove(event) {
//         const dx = Math.abs(event.clientX - lastMouseX)
//         const dy = Math.abs(event.clientY - lastMouseY)

//         if (dx > 8 || dy > 8) {
//           cursorInner.classList.remove('hover')
//           checkMouseStillness()
//         }

//         lastMouseX = event.clientX
//         lastMouseY = event.clientY
//       }

//       boxes.forEach((box) => {
//         if (!isMobile) {
//           box.addEventListener('mouseenter', () => {
//             lastMouseX = 0
//             lastMouseY = 0
//             window.addEventListener('mousemove', onMouseMove)
//             checkMouseStillness()
//           })

//           box.addEventListener('mouseleave', () => {
//             clearTimeout(mouseStillTimeout)
//             window.removeEventListener('mousemove', onMouseMove)
//           })
//         }
//       })

//       if (!isMobile) {
//         wrapper.addEventListener('mouseenter', () => {
//           $('.cursor-el_text').text(wrapper.getAttribute('data-cursor-text'))
//           gsap.set(cursorInner, { display: 'flex', overwrite: 'auto' })
//           gsap.fromTo(
//             '.cursor-el_text',
//             { yPercent: 105 },
//             {
//               yPercent: 0,
//               duration: 0.5,
//               ease: 'power1.out',
//               overwrite: 'auto',
//             }
//           )
//           gsap.fromTo(
//             '.cursor-el__bg',
//             { clipPath: 'inset(50%)' },
//             {
//               clipPath: 'inset(0%)',
//               duration: 0.6,
//               ease: 'power3.out',
//               clearProps: true,
//               overwrite: 'auto',
//             }
//           )
//         })
//         wrapper.addEventListener('mouseleave', () => {
//           gsap.to('.cursor-el_text', {
//             duration: 0.5,
//             yPercent: 105,
//             ease: 'power3.out',
//             overwrite: 'auto',
//           })
//           gsap.to('.cursor-el__bg', {
//             clipPath: 'inset(50%)',
//             duration: 0.6,
//             ease: 'power3.out',
//             onComplete: () => {
//               gsap.set(cursorInner, { display: 'none' })
//             },
//           })
//         })
//       }
//     })
//   }
//   initSlider('.section_cta', gsap.utils.toArray('.section_cta .padding-global'))
//   initSlider('.home-project_list', gsap.utils.toArray('.home-project_wrap'))

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
// }

const customMouse = () => {
  let cursorItem = document.querySelector('.cursor')
  if (cursorItem) {
    let cursorParagraph = cursorItem.querySelector('p')
    let targets = document.querySelectorAll('[data-cursor-text]')
    let xOffset = 6
    let yOffset = 56
    let cursorIsOnRight = false
    let currentTarget = null
    let lastText = ''

    // Position cursor relative to actual cursor position on page load
    gsap.set(cursorItem, { xPercent: xOffset, yPercent: yOffset })

    // Use GSAP quick.to for a more performative tween on the cursor
    let xTo = gsap.quickTo(cursorItem, 'x', { ease: 'power4' })
    let yTo = gsap.quickTo(cursorItem, 'y', { ease: 'power4' })

    // On mousemove, call the quickTo functions to the actual cursor position
    window.addEventListener('mousemove', (e) => {
      let windowWidth = window.innerWidth
      let windowHeight = window.innerHeight
      let scrollY = window.scrollY
      let cursorX = e.clientX
      let cursorY = e.clientY + scrollY // Adjust cursorY to account for scroll

      // Default offsets
      let xPercent = xOffset
      let yPercent = yOffset

      // Adjust X offset if in the rightmost 19% of the window
      if (cursorX > windowWidth * 0.93) {
        cursorIsOnRight = true
        xPercent = -100
      } else {
        cursorIsOnRight = false
      }

      // Adjust Y offset if in the bottom 10% of the current viewport
      if (cursorY > scrollY + windowHeight * 0.9) {
        yPercent = -120
      }

      if (currentTarget) {
        let newText = currentTarget.getAttribute('data-cursor-text')
        if (currentTarget.hasAttribute('data-easteregg') && cursorIsOnRight) {
          newText = currentTarget.getAttribute('data-easteregg')
        }

        if (newText !== lastText) {
          // Only update if the text is different
          cursorParagraph.innerHTML = newText
          lastText = newText
        }
      }

      gsap.to(cursorItem, {
        xPercent: xPercent,
        yPercent: yPercent,
        duration: 0.9,
        ease: 'power3',
      })
      xTo(cursorX)
      yTo(cursorY - scrollY) // Subtract scroll for viewport positioning
    })

    // Add a mouse enter listener for each link that has a data-cursor-text attribute
    targets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        currentTarget = target // Set the current target
        gsap.fromTo(
          '.cursor-el',
          { clipPath: 'inset(50%)' },
          {
            clipPath: 'inset(0%)',
            duration: 0.6,
            ease: 'power3.out',
            clearProps: true,
            overwrite: 'auto',
          }
        )

        // If element has data-easteregg attribute, load different text
        let newText = target.getAttribute('data-cursor-text')

        // Update only if the text changes
        if (newText !== lastText) {
          cursorParagraph.innerHTML = newText
          lastText = newText
        }
      })

      target.addEventListener('mouseleave', () => {
        gsap.to('.cursor-el', {
          clipPath: 'inset(50%)',
          duration: 0.6,
          ease: 'power3.out',
        })
      })
    })
  }
}

export default customMouse
