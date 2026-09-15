import type { ReactNode } from 'react'

import { cn } from '#/lib/cn'

export function TagList({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('flex flex-wrap gap-2 text-[13px] font-semibold', className)}>{children}</div>
}

export function Tag({ tone = 'light', children }: { tone?: 'light' | 'dark'; children: ReactNode }) {
  return (
    <span
      className={cn(
        'rounded-full border-2 px-[11px] py-1.5',
        tone === 'light' ? 'border-ink bg-cream' : 'border-cream',
      )}
    >
      {children}
    </span>
  )
}
