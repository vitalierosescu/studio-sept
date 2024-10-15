import gsap from 'gsap'

import addSplitText from '../../features/addSplitText'

function cases() {
  addSplitText()

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
        y: '7.5rem',
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
}

export default cases
