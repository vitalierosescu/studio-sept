import gsap from 'gsap'

import addSplitText from '../../features/addSplitText'

function overview() {
  addSplitText()

  const cases = [...document.querySelectorAll('.overview_item')]

  cases.forEach(function (el) {
    const tl = gsap.timeline({ paused: true })

    tl.to(el.querySelector('.overview_item-img.is-clipped'), {
      duration: 1.2,
      ease: 'power4.out',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    })

    el.addEventListener('mouseenter', () => {
      tl.play()
    })
    el.addEventListener('mouseleave', () => {
      tl.reverse()
    })
  })
}

export default overview
