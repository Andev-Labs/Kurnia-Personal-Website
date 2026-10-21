import { useSyncExternalStore } from 'react'

const noop = () => {}
const subscribeNever = () => noop

/** `false` on the server and during hydration, `true` once the page runs in the browser. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  )
}

/** Live `matchMedia` result; `false` on the server and wherever `matchMedia` is missing. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window.matchMedia !== 'function') return noop
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    () => (typeof window.matchMedia === 'function' ? window.matchMedia(query).matches : false),
    () => false,
  )
}
