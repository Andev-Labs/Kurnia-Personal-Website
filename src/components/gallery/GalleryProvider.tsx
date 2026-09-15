import { createContext, use, useEffect, useMemo, useReducer } from 'react'
import type { Dispatch, ReactNode } from 'react'

import { GALLERY } from '#/data/gallery'
import type { GalleryItem } from '#/data/gallery'
import { galleryReducer, getGalleryView, initialGalleryState } from '#/lib/gallery'
import type { GalleryAction, GalleryView } from '#/lib/gallery'
import { GalleryLightbox } from './GalleryLightbox'

interface GalleryContextValue {
  items: GalleryItem[]
  view: GalleryView
  dispatch: Dispatch<GalleryAction>
}

const GalleryContext = createContext<GalleryContextValue | null>(null)

export function useGallery() {
  const context = use(GalleryContext)
  if (!context) throw new Error('useGallery must be used inside <GalleryProvider>')
  return context
}

/** Owns the lightbox state shared by the work gallery and the international program gallery. */
export function GalleryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    (current: typeof initialGalleryState, action: GalleryAction) => galleryReducer(GALLERY, current, action),
    initialGalleryState,
  )
  const view = useMemo(() => getGalleryView(GALLERY, state), [state])
  const isOpen = view.active !== null
  const isShotOpen = view.isShotOpen

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dispatch(isShotOpen ? { type: 'closeShot' } : { type: 'close' })
      if (event.key === 'ArrowRight') dispatch({ type: isShotOpen ? 'stepShot' : 'step', delta: 1 })
      if (event.key === 'ArrowLeft') dispatch({ type: isShotOpen ? 'stepShot' : 'step', delta: -1 })
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, isShotOpen])

  const value = useMemo(() => ({ items: GALLERY, view, dispatch }), [view])

  return (
    <GalleryContext value={value}>
      {children}
      <GalleryLightbox />
    </GalleryContext>
  )
}
