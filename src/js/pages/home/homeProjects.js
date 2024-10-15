import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import createScrollTrigger from '../../helpers/createScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function homeProjects() {
  const wrap = document.querySelector('.home-project_list')

  // const images = document.querySelectorAll('.home-project_wrap')

  let tl = gsap.timeline({ paused: true })

  tl.fromTo(
    '.home-project_wrap',
    { clipPath: 'polygon(15% 85%, 85% 85%, 85% 85%, 15% 85%);' },
    {
      clipPath: 'polygon(15% 15%, 85% 15%, 85% 85%, 15% 85%)',
      duration: 1,
      ease: 'quart4.out',
      stagger: {
        amount: 0.1,
      },
    }
  )

  tl.to('.home-project_wrap', {
    ease: 'quart4.out',
    duration: 1,
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  })
  createScrollTrigger(wrap, tl, 'top 88%')

  // images.forEach(function (element) {
  //   let tl = gsap.timeline({ paused: true })

  //   tl.from(element.querySelectorAll('.home-project_img-hover'), {
  //     xPercent: 100,
  //     duration: 1.2,
  //     stagger: {
  //       amount: 0.2,
  //     },
  //   })

  //   element.addEventListener('mouseenter', () => tl.play())
  //   element.addEventListener('mouseleave', () => tl.reverse())
  // })
}

export default homeProjects
