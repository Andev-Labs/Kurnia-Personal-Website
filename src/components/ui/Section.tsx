import type { ReactNode } from 'react'

import { Reveal } from '#/components/motion/Reveal'
import { cn } from '#/lib/cn'

interface SectionProps {
  id: string
  className?: string
  /** Id of the heading that names this landmark. */
  labelledBy?: string
  children: ReactNode
}

export function Section({ id, className, labelledBy, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('page-x py-16 md:py-24', className)}>
      {children}
    </section>
  )
}

interface SectionHeadingProps {
  id: string
  /** Two-digit index shown in mono above the title. */
  number: string
  children: ReactNode
  className?: string
}

export function SectionHeading({ id, number, children, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('mb-10 md:mb-12', className)}>
      <p aria-hidden="true" className="mb-3 font-mono text-[12px] tracking-[0.12em] text-teal uppercase">
        {number}
      </p>
      <h2 id={id} className="font-serif text-[clamp(28px,3.6vw,42px)] leading-[1.1] font-medium tracking-[-0.02em]">
        {children}
      </h2>
    </Reveal>
  )
}
