import { motion, useScroll, useSpring } from 'framer-motion'
import type { HTMLMotionProps, Variants } from 'framer-motion'

/** Snappy ease-out that suits the hard-shadow, neo-brutalist look. */
const EASE = [0.22, 1, 0.36, 1] as const

/** Start a little before the element is fully on screen, and only animate the first time. */
const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -60px 0px' } as const

export type RevealDirection = 'up' | 'left' | 'right' | 'pop'

const HIDDEN: Record<RevealDirection, { opacity: number; x?: number; y?: number; scale?: number }> = {
  up: { opacity: 0, y: 36 },
  left: { opacity: 0, x: -48 },
  right: { opacity: 0, x: 48 },
  pop: { opacity: 0, scale: 0.9, y: 16 },
}

export function revealVariants(direction: RevealDirection = 'up', delay = 0): Variants {
  return {
    hidden: HIDDEN[direction],
    visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE, delay } },
  }
}

const groupVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

/*
 * Motion writes an inline `transform`, which would override CSS hover transforms (`press`, `hover:-translate-y`).
 * Keep these wrappers on plain layout boxes and put interactive elements inside them.
 */

interface RevealProps extends HTMLMotionProps<'div'> {
  direction?: RevealDirection
  delay?: number
}

/** Fades and slides a single block in when it scrolls into view. */
export function Reveal({ direction = 'up', delay = 0, ...props }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={revealVariants(direction, delay)}
      {...props}
    />
  )
}

interface RevealGroupProps extends HTMLMotionProps<'div'> {
  stagger?: number
  delay?: number
}

/** Container that reveals its `RevealItem` children one after another once it scrolls into view. */
export function RevealGroup({ stagger = 0.1, delay = 0, ...props }: RevealGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={groupVariants(stagger, delay)}
      {...props}
    />
  )
}

interface RevealItemProps extends HTMLMotionProps<'div'> {
  direction?: RevealDirection
}

/** Child of `RevealGroup`; inherits the group's timing. */
export function RevealItem({ direction = 'up', ...props }: RevealItemProps) {
  return <motion.div variants={revealVariants(direction)} {...props} />
}

/** Thin bar pinned under the sticky navbar that fills as the page is scrolled. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none absolute inset-x-0 -bottom-[3px] h-[5px] origin-left bg-pink"
    />
  )
}
