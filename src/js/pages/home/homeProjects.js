import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// import createScrollTrigger from '../../helpers/createScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function homeProjects() {
  // const wrap = document.querySelector('.home-project_list')

  // let tl = gsap.timeline({ paused: true })

  // tl.to('.home-project_wrap', {
  //   clipPath: 'polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%)',
  //   duration: 1,
  //   ease: 'quart4.out',
  //   stagger: {
  //     amount: 0.1,
  //   },
  // })

  // tl.to('.home-project_wrap', {
  //   ease: 'quart4.out',
  //   duration: 1,
  //   clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  // })
  // createScrollTrigger(wrap, tl, 'top 88%')

  const cases = [...document.querySelectorAll('.home-project_wrap')]

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

export default homeProjects
