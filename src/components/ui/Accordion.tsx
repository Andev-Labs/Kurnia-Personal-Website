import { useId, useState } from 'react'
import type { ReactNode } from 'react'

import { cn } from '#/lib/cn'

/**
 * Disclosure with an animated height: the panel's grid row eases between `0fr` and `1fr`.
 * The collapsed panel is `inert`, so its links and text leave the tab order and accessibility tree.
 */
export function Accordion({ title, children }: { title: string; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const id = useId()
  const buttonId = `${id}-button`
  const panelId = `${id}-panel`

  return (
    <div className="border-t border-line">
      <h4>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-3.5 text-left text-[14.5px] font-semibold text-ink transition-colors duration-200 hover:text-teal"
        >
          {title}
          <span
            aria-hidden="true"
            className={cn(
              'grid size-6 place-items-center rounded-full border border-line text-[14px] leading-none transition-transform duration-300 ease-out-soft',
              isOpen && 'rotate-45',
            )}
          >
            +
          </span>
        </button>
      </h4>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!isOpen}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-400 ease-out-soft',
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
