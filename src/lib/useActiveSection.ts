import { useEffect, useState } from 'react'

/** A thin band around the middle of the viewport: whichever section crosses it counts as the one being read. */
const ROOT_MARGIN = '-45% 0px -50% 0px'

/** Returns the id of the section currently in the middle of the viewport, or `null` before any has been seen. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const targets = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: ROOT_MARGIN },
    )
    for (const target of targets) observer.observe(target)
    return () => observer.disconnect()
  }, [key])

  return active
}
