import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function global() {
  // START
  const menuToggle = document.querySelector('.menu-icon')

  menuToggle.addEventListener('click', () => {
    document.querySelector('.w-nav-overlay').addEventListener('click', () => {
      console.log('yup')
      window.SScroll.call.start()
    })
  })

  const addActiveClassToNav = () => {
    // Select the navbar
    const navbarBg = document.querySelector('.nav_background')

    // Ensure the element exists
    if (!navbarBg) {
      console.log('Navbar background not found')
      return
    }

    // Function to toggle 'is-active' class based on scroll position
    function toggleNavbarClass() {
      if (window.scrollY > 40) {
        navbarBg.classList.add('is-active')
      } else {
        navbarBg.classList.remove('is-active')
      }
    }

    // Attach the scroll event listener to the window
    window.addEventListener('scroll', toggleNavbarClass)

    //
    let initialDirection = false

    // Scroll Direction
    ScrollTrigger.create({
      trigger: '.page-wrapper',
      start: 'top -800px',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (self.direction !== self.prevDirection) {
          if (initialDirection === false) {
            initialDirection = true
            self.direction = -1
          }

          gsap.to('.nav_component', {
            y: `${self.direction === -1 ? '0%' : '-100%'}`,
            duration: 0.6,
            ease: 'Quart.easeOut',
          })

          self.prevDirection = self.direction
        }
      },
    })
  }

  addActiveClassToNav()
}

export default global
