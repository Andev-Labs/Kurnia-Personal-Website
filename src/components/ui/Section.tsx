import type { ReactNode } from 'react'

import { Reveal } from '#/components/motion/Reveal'
import { cn } from '#/lib/cn'

interface SectionProps {
  id: string
  className?: string
  children: ReactNode
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('page-x py-14', className)}>
      {children}
    </section>
  )
}

interface SectionHeadingProps {
  number: string
  /** Tailwind background class for the number badge. */
  badgeClassName: string
  children: ReactNode
}

export function SectionHeading({ number, badgeClassName, children }: SectionHeadingProps) {
  return (
    <Reveal direction="left" className="mb-[26px] flex flex-wrap items-center gap-3.5">
      <span
        className={cn(
          'rounded-full px-3.5 py-1.5 font-heading text-[13px] font-semibold text-ink shadow-soft-sm',
          badgeClassName,
        )}
      >
        {number}
      </span>
      <h2 className="font-heading text-[clamp(28px,3.6vw,42px)] leading-[1.1] font-bold tracking-[-0.01em] text-balance">
        {children}
      </h2>
    </Reveal>
  )
}
