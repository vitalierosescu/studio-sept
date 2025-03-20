import gsap from 'gsap'

import addSplitText from '../../features/addSplitText'
import homeProjects from '../home/homeProjects'

function cases() {
  addSplitText()

  let mm = gsap.matchMedia(),
    breakPoint = 479

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions
      console.log(isMobile, reduceMotion)

      if (isDesktop) {
        const imgWraps = document.querySelectorAll('.img-large_wrap')
        const imgSections = document.querySelectorAll('.case-fullscreen_parent')

        imgWraps.forEach((imgWrap) => {
          if (imgWrap) {
            const tl = gsap.timeline({
              defaults: {
                ease: 'none',
              },
              scrollTrigger: {
                trigger: imgWrap,
                start: 'clamp(top bottom)',
                end: 'bottom top',
                scrub: true,
              },
            })

            tl.to(imgWrap, {
              // y: '7.5rem',
              y: '7.5em',
            })
          }
        })

        imgSections.forEach((section) => {
          if (section) {
            const tl = gsap.timeline({
              defaults: {
                ease: 'none',
              },
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
              },
            })

            tl.to(section, {
              y: '25vh',
            })
          }
        })

        // Function to animate the HERO
        const animateHero = () => {
          const hero = document.querySelector('.section_case-hero')

          if (hero) {
            const tl = gsap.timeline({
              defaults: {
                ease: 'none',
              },
              scrollTrigger: {
                trigger: hero,
                start: 'clamp(top bottom)',
                end: 'bottom top',
                scrub: true,
              },
            })

            tl.to(hero, {
              yPercent: 30,
            })
          }
        }

        animateHero()
        homeProjects()
      } else {
        //
      }
      // Get the relevant part of the URL (e.g., "/cases/andremare")
      const pageSlug = window.location.pathname.replace(/\/$/, '') // Remove trailing slash if present

      // Ensure we are on a /cases/ page before running the script
      if (!pageSlug.startsWith('/cases/')) return

      // Loop over all elements with class ".home-project_wrap"
      document.querySelectorAll('.home-project_wrap').forEach((projectWrap) => {
        const link = projectWrap.querySelector('.link-cover')

        if (link && link.href && link.getAttribute('href') !== '#') {
          const linkPath = new URL(
            link.href,
            window.location.origin
          ).pathname.replace(/\/$/, '') // Normalize path

          // Check if the link is also within /cases/ and matches the page slug exactly
          if (linkPath.startsWith('/cases/') && pageSlug === linkPath) {
            projectWrap.style.display = 'none' // Hide the element
          }
        }
      })
    }
  )
}

export default cases
