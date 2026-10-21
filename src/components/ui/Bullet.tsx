import type { ReactNode } from 'react'

import { cn } from '#/lib/cn'

export type MarkerColor = 'butter' | 'mint' | 'lavender' | 'blush'

const markerClass: Record<MarkerColor, string> = {
  butter: 'bg-butter',
  mint: 'bg-mint',
  lavender: 'bg-lavender',
  blush: 'bg-bubblegum',
}

export function Bullet({ marker, children }: { marker: MarkerColor; children: ReactNode }) {
  return (
    <p className="relative pl-7 text-pretty">
      <span
        aria-hidden="true"
        className={cn('absolute top-[0.4em] left-0 size-3.5 rounded-full ring-4 ring-white', markerClass[marker])}
      />
      {children}
    </p>
  )
}
