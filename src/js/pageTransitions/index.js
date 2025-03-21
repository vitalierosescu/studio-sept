import gsap from 'gsap'
import $ from 'jquery'

export const enterTransition = (nextContainer) => {
  /**
   * Set defaults
   */
  gsap.defaults({ ease: 'expo.out' })
  gsap.to('.transition', {
    height: '0%',
    duration: 1,
    delay: 0.3,
  })

  gsap.from(nextContainer, {
    duration: 1,
  })

  $('body').css('cursor', 'default')
}

export const leaveTransition = async (currentContainer) => {
  /**
   * Set defaults & initial state
   */
  gsap.defaults({ ease: 'expo.in' })
  gsap.set('.transition', { top: 'auto', bottom: '0%' })
  $('body').css('cursor', 'progress !important')

  gsap.to('.transition', {
    height: '100%',
    duration: 1,
    onComplete: () => {
      gsap.set('.transition', {
        height: '100%',
        bottom: 'auto',
        top: '0%',
        delay: 0,
      })
    },
  })

  await gsap.to(currentContainer, {
    duration: 1,
    onComplete: () => {},
  })
}
