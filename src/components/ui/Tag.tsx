import type { ReactNode } from 'react'

import { cn } from '#/lib/cn'

export function TagList({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('flex flex-wrap gap-2 text-[13px] font-bold', className)}>{children}</div>
}

export function Tag({ tone = 'light', children }: { tone?: 'light' | 'dark'; children: ReactNode }) {
  return (
    <span
      className={cn(
        'rounded-full px-3 py-1.5',
        tone === 'light' ? 'bg-lavender-50 text-violet' : 'bg-white/15 text-white',
      )}
    >
      {children}
    </span>
  )
}
