import gsap from 'gsap'

import addSplitText from '../../features/addSplitText'

function overview() {
  addSplitText()

  const cases = [...document.querySelectorAll('.overview_item')]

  cases.forEach(function (el) {
    const tl = gsap.timeline({ paused: true })

    tl.fromTo(
      el.querySelector('.overview_item-img.is-clipped'),
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

export default overview
