import type { ReactNode } from 'react'

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
    <div className="mb-[26px] flex flex-wrap items-baseline gap-3.5">
      <span className={cn('rounded-lg border-3 border-ink px-3 py-1.5 font-display text-[12px]', badgeClassName)}>
        {number}
      </span>
      <h2 className="font-display text-[clamp(26px,3.4vw,40px)] tracking-[-0.03em]">{children}</h2>
    </div>
  )
}
