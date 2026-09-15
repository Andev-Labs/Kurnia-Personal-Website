import { useCallback, useSyncExternalStore } from 'react'

/** Matches Tailwind's `max-md` range, i.e. viewports narrower than the `md` breakpoint (48rem). */
export const MOBILE_QUERY = '(max-width: 47.99rem)'

/** Subscribes to a CSS media query. Renders as `false` on the server and during hydration. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window.matchMedia !== 'function') return () => {}
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    [query],
  )

  return useSyncExternalStore(
    subscribe,
    () => typeof window.matchMedia === 'function' && window.matchMedia(query).matches,
    () => false,
  )
}
