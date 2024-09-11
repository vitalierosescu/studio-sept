import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// import { EASE } from '../easings/easing'
import createScrollTrigger from '../helpers/createScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function homeProjects() {
  const wrap = document.querySelector('.home-project_list')
  // let docWidth = document.body.clientWidth

  const images = document.querySelectorAll('.home-project_wrap')
  // let slidesWidth = wrap.clientWidth
  // let currentOffset = 0
  // let targetOffset = 0
  // let isAnimating = false

  // window.addEventListener('resize', function () {
  //   docWidth = document.body.clientWidth
  //   slidesWidth = wrap.clientWidth
  // })

  // wrap.addEventListener('mousemove', function (e) {
  //   let mouseX = e.pageX
  //   targetOffset = -1 * ((mouseX / docWidth) * slidesWidth - mouseX / 2)

  //   if (!isAnimating) {
  //     requestAnimationFrame(updateOffset)
  //   }

  //   function updateOffset() {
  //     isAnimating = true
  //     currentOffset = lerp(currentOffset, targetOffset, 0.075)

  //     if (Math.abs(currentOffset - targetOffset) < 0.5) {
  //       currentOffset = targetOffset
  //       isAnimating = false
  //     } else {
  //       requestAnimationFrame(updateOffset)
  //     }

  //     for (let i = 0; i < images.length; i++) {
  //       images[i].style.webkitTransform =
  //         'translate3d(' + currentOffset + 'px, 0, 0)'
  //       images[i].style.transform = 'translate3d(' + currentOffset + 'px, 0, 0)'
  //     }
  //   }

  //   function lerp(a, b, t) {
  //     return (1 - t) * a + t * b
  //   }
  // })

  const tl = gsap.timeline({ paused: true })

  tl.from(
    '.home-project_wrap',
    {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      duration: 2,
      stagger: {
        amount: 0.2,
      },
    },
    '-=0.5'
  )

  tl.from(
    '.home-project_img',
    {
      duration: 2,
      scale: 0.8,
      stagger: {
        amount: 0.2,
      },
    },
    0
  )
  createScrollTrigger(wrap, tl, 'top 88%')

  images.forEach(function (element) {
    let tl = gsap.timeline({ paused: true })

    tl.from(element.querySelectorAll('.home-project_img-hover'), {
      xPercent: 100,
      duration: 1.2,
      stagger: {
        amount: 0.2,
      },
    })

    element.addEventListener('mouseenter', () => tl.play())
    element.addEventListener('mouseleave', () => tl.reverse())
  })
}

export default homeProjects
