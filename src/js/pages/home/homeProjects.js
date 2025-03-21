import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// import createScrollTrigger from '../../helpers/createScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function homeProjects() {
  let mm = gsap.matchMedia(),
    breakPoint = 479

  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      let { isDesktop, isMobile, reduceMotion } = context.conditions
      console.log(isDesktop, isMobile, reduceMotion)

      const cases = [...document.querySelectorAll('.home-project_wrap')]

      if (isDesktop) {
        cases.forEach(function (el) {
          const tl = gsap.timeline({ paused: true })

          tl.fromTo(
            el.querySelector('.home-project_img.is-clipped'),
            { clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' },
            {
              duration: 1.2,
              ease: 'power4.out',
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            }
          )

          el.addEventListener('mouseenter', () => {
            tl.timeScale(1)
            tl.play()
          })
          el.addEventListener('mouseleave', () => {
            tl.timeScale(1.75)
            tl.reverse()
          })
        })
      }
    }
  )
}

export default homeProjects
