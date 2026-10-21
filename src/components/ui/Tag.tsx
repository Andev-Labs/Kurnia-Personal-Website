import type { ReactNode } from 'react'

import { cn } from '#/lib/cn'

export type TagTone = 'lavender' | 'mint' | 'butter' | 'blush' | 'violet'

const toneClass: Record<TagTone, string> = {
  lavender: 'bg-lavender-50 text-violet',
  mint: 'bg-mint-100 text-[#1f6b51]',
  butter: 'bg-butter-100 text-[#7a5a00]',
  blush: 'bg-bubblegum-100 text-[#9c2a5c]',
  violet: 'bg-white/15 text-white',
}

export function TagList({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('flex flex-wrap gap-2 text-[13px] font-bold', className)}>{children}</div>
}

export function Tag({ tone = 'lavender', children }: { tone?: TagTone; children: ReactNode }) {
  return <span className={cn('rounded-full px-3 py-1.5', toneClass[tone])}>{children}</span>
}
