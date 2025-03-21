import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// import { EASE } from '../easings/easing'

gsap.registerPlugin(ScrollTrigger)
const lenis = new Lenis()

function loadingAnimation() {
  let mm = gsap.matchMedia(),
    breakPoint = 479

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile } = context.conditions
      console.log(isDesktop, isMobile)

      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
      })
      gsap.ticker.lagSmoothing(0)
      window.addEventListener('resize', () => lenis.resize())

      lenis.stop()
      console.log('stopped')

      const revealLandingPage = () => {
        if (isMobile) {
          gsap.set('.section_hero', {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
            transform: 'translate(-50%, -50%) scale(1)',
          })
          gsap.set('.hero_overlay', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          })
          gsap.set('.hero_img', { transform: 'scale(1)' })
          gsap.set('.hero_img-wrap', {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          })
          gsap.set('.hero_h1 span', { y: 0 })
          gsap.set('.nav_link', { translateY: '0%' })

          gsap.set('.counter', { opacity: '0%' })

          console.log('Mobile detected, setting animations instantly.')
          gsap.to('.hero_mobile-whipe', {
            scaleY: 0,
            duration: 1.5,
            ease: 'power3.inOut',
          })

          lenis.start() // ✅ Resumes smooth scrolling
          return
        }

        gsap.to('.section_hero', {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
          duration: 2,
          ease: 'power3.inOut',
          onStart: () => {
            gsap.to('.section_hero', {
              transform: 'translate(-50%, -50%) scale(1)',
              duration: 2.25,
              ease: 'power3.inOut',
              delay: 0.25,
            })

            gsap.to('.hero_overlay', {
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
              duration: 2,
              delay: 0.5,
              ease: 'power3.inOut',
            })

            gsap.to('.hero_img', {
              transform: 'scale(1)',
              duration: 2.25,
              ease: 'power3.inOut',
              delay: 0.25,
            })
            gsap.to('.hero_img-wrap', {
              clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
              duration: 2,
              ease: 'power3.inOut',
              delay: 0.25,
            })

            gsap.to('.hero_h1 span', {
              y: 0,
              stagger: 0.1,
              duration: 2,
              ease: 'power4.inOut',
              delay: 0.75,
            })

            gsap.fromTo(
              '.nav_link',
              {
                translateY: '100%',
              },
              {
                translateY: '0%',
                stagger: 0.1,
                duration: 2,
                ease: 'power4.inOut',
                delay: 1,
              }
            )
          },
          onComplete: () => {
            console.log('Landing page animation complete!')
            // **START Lenis when animation ends**
            lenis.start() // ✅ Resumes smooth scrolling
          },
        })
      }

      function animateCounter() {
        const counterElement = document.querySelector('.counter p')
        if (isMobile) {
          // Set final value instantly on mobile
          counterElement.textContent = 100
          revealLandingPage()
          console.log('revealing')
        } else {
          let currentValue = 0
          const updateInterval = 300
          const maxDuration = 1000
          const endValue = 100
          const startTime = Date.now()

          const updateCounter = () => {
            const elapsedTime = Date.now() - startTime
            if (elapsedTime < maxDuration) {
              currentValue = Math.min(
                currentValue + Math.floor(Math.random() * 30) + 5,
                endValue
              )
              counterElement.textContent = currentValue
              console.log(currentValue)
              setTimeout(updateCounter, updateInterval)
            } else {
              counterElement.textContent = endValue
              setTimeout(() => {
                gsap.to(counterElement, {
                  y: -20,
                  duration: 0.5,
                  ease: 'power3.inOut',
                  onStart: () => {
                    revealLandingPage()
                  },
                })
              }, -500)
            }
          }

          updateCounter()
        }
      }

      gsap.to('.counter p', {
        y: 0,
        duration: isMobile ? 0 : 0.5,
        ease: 'power3.out',
        delay: isMobile ? 0 : 0.2,
        onComplete: () => {
          animateCounter()
        },
      })
    }
  )
}

export default loadingAnimation
