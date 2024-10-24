import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function marqueeServices() {
  let tl = gsap.timeline({
    repeat: -1,
    onReverseComplete: () => {
      tl.progress(1)
    },
  })
  tl.fromTo(
    '.marquee_track',
    {
      xPercent: 0,
    },
    {
      xPercent: -50,
      duration: 30,
      ease: 'none',
    }
  )
}

export default marqueeServices
