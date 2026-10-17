import type { ReactNode } from 'react'

import { cn } from '#/lib/cn'

export function TagList({ className, children }: { className?: string; children: ReactNode }) {
  return <ul className={cn('flex flex-wrap gap-2 text-[13.5px]', className)}>{children}</ul>
}

export function Tag({ tone = 'light', children }: { tone?: 'light' | 'teal'; children: ReactNode }) {
  return (
    <li
      className={cn(
        'rounded-full border px-3 py-1',
        tone === 'light' ? 'border-line bg-surface text-ink' : 'border-teal/20 bg-teal-soft text-teal-deep',
      )}
    >
      {children}
    </li>
  )
}
