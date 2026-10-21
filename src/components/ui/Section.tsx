import type { ReactNode } from 'react'

import { Reveal } from '#/components/motion/Reveal'
import { cn } from '#/lib/cn'

interface SectionProps {
  id: string
  className?: string
  children: ReactNode
}

/*
 * Every section only pads its top, so the gap between two sections is one step of the scale
 * (64px on mobile, 96px from lg) instead of two paddings stacked. `<main>` pads the bottom of the last one.
 */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('page-x scroll-mt-4 pt-16 lg:pt-24', className)}>
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  number: string
  title: ReactNode
  /** Kapsi pose (and its props) shown at the right edge. Hidden on phones. */
  mascot?: ReactNode
}

/**
 * Number badge, title and an optional Kapsi, identical in every section.
 * Kapsi hangs above the header's bottom edge instead of stretching it, so a tall pose never pushes the title down.
 */
export function SectionHeader({ number, title, mascot }: SectionHeaderProps) {
  return (
    <div className={cn('relative mb-8 lg:mb-10', mascot ? 'sm:pr-28 lg:pr-32' : undefined)}>
      <Reveal direction="left" className="flex flex-wrap items-center gap-3.5">
        <span className="rounded-full bg-lavender-50 px-3.5 py-1.5 font-heading text-[13px] font-semibold text-violet shadow-soft-sm">
          {number}
        </span>
        <h2 className="font-heading text-[clamp(28px,3.6vw,42px)] leading-[1.1] font-bold tracking-[-0.01em] text-balance">
          {title}
        </h2>
      </Reveal>
      {mascot ? (
        <Reveal
          direction="pop"
          className="absolute right-0 bottom-0 hidden w-20 sm:block lg:w-24 print:hidden [&_svg]:h-auto [&_svg]:w-full"
        >
          {mascot}
        </Reveal>
      ) : null}
    </div>
  )
}
