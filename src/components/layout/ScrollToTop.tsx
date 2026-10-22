import { useEffect, useState } from 'react'

import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

/** The wrapper around the navbar and hero; see `src/routes/index.tsx`. */
const TOP_ID = 'atas'

/**
 * Floating "back to top" pill. It only appears once the navbar and hero have scrolled out of view.
 * A plain anchor: CSS `scroll-behavior` glides there (or jumps, under reduced motion) and the next Tab lands in the navbar.
 */
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const top = document.getElementById(TOP_ID)
    if (!top || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry ? !entry.isIntersecting : false))
    observer.observe(top)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      href={`#${TOP_ID}`}
      aria-label={m.scroll_to_top()}
      title={m.scroll_to_top()}
      inert={!isVisible}
      className={cn(
        'fixed right-4 bottom-[max(16px,env(safe-area-inset-bottom))] z-30 grid size-12 place-items-center rounded-full bg-violet text-white shadow-soft-lg transition-[opacity,translate,background-color] duration-250 ease-out hover:bg-violet-deep hover:text-white md:right-6 md:bottom-6 print:hidden motion-reduce:transition-none',
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5">
        <path d="M10 15.5V4.5M4.5 10 10 4.5l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}
