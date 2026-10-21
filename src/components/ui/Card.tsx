import type { HTMLAttributes } from 'react'

import { cn } from '#/lib/cn'

/** Soft rounded white surface used for content blocks. */
export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-card bg-white p-6 shadow-soft', className)} {...rest} />
}
