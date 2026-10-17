import { motion, useScroll, useSpring } from 'framer-motion'
import type { HTMLMotionProps, Variants } from 'framer-motion'

/** Shared ease-out; mirrors `--ease-out-soft` in styles.css. */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Start a little before the element is fully on screen, and only animate the first time. */
export const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -40px 0px' } as const

export type RevealDirection = 'up' | 'fade'

const HIDDEN: Record<RevealDirection, { opacity: number; y?: number }> = {
  up: { opacity: 0, y: 16 },
  fade: { opacity: 0 },
}

export function revealVariants(direction: RevealDirection = 'up', delay = 0): Variants {
  return {
    hidden: HIDDEN[direction],
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE, delay } },
  }
}

const groupVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

/*
 * Motion writes an inline `transform`, which would override CSS hover transforms.
 * Keep these wrappers on plain layout boxes and put interactive elements inside them.
 * `<MotionConfig reducedMotion="user">` (routes/index.tsx) drops the transforms for reduced-motion users.
 */

interface RevealProps extends HTMLMotionProps<'div'> {
  direction?: RevealDirection
  delay?: number
}

/** Fades and lifts a single block in when it scrolls into view. */
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
export function RevealGroup({ stagger = 0.06, delay = 0, ...props }: RevealGroupProps) {
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

/** `<li>` flavour of `RevealItem`, so lists keep valid `ul > li` markup. */
export function RevealListItem({ direction = 'up', ...props }: HTMLMotionProps<'li'> & { direction?: RevealDirection }) {
  return <motion.li variants={revealVariants(direction)} {...props} />
}

/** Hairline under the sticky navbar that fills as the page is scrolled. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none absolute inset-x-0 -bottom-px h-[2px] origin-left bg-teal"
    />
  )
}
