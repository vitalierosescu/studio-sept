import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import addSplitText from './features/addSplitText'
import heroScroll from './features/home/heroScroll'
import homeMarquee from './features/home/homeMarquee'
import homeProjects from './features/home/homeProjects'
import loadingAnimation from './features/loadingAnimation'

gsap.registerPlugin(ScrollTrigger)

function home() {
  addSplitText()
  loadingAnimation()
  heroScroll()
  homeProjects()
  homeMarquee()
}

export default home
