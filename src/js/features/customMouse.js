import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import $ from 'jquery'

// import { EASE } from '../easings/easing'

gsap.registerPlugin(ScrollTrigger)

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
