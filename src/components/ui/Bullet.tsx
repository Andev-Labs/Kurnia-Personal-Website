import type { ReactNode } from 'react'

import { cn } from '#/lib/cn'

export type MarkerColor = 'sun' | 'teal' | 'lavender' | 'pink'

const markerClass: Record<MarkerColor, string> = {
  sun: 'bg-sun',
  teal: 'bg-teal',
  lavender: 'bg-lavender',
  pink: 'bg-pink',
}

export function Bullet({ marker, children }: { marker: MarkerColor; children: ReactNode }) {
  return (
    <p className="relative pl-[34px] text-pretty">
      <span
        aria-hidden="true"
        className={cn('absolute top-0.5 left-0 size-[22px] rounded-md border-[2.5px] border-ink', markerClass[marker])}
      />
      {children}
    </p>
  )
}
