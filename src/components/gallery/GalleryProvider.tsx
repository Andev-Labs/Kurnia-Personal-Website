import { createContext, use, useCallback, useEffect, useMemo, useReducer } from 'react'
import type { Dispatch, ReactNode } from 'react'

import { GALLERY } from '#/data/gallery'
import type { GalleryItem } from '#/data/gallery'
import { galleryReducer, getGalleryView, initialGalleryState } from '#/lib/gallery'
import type { GalleryAction, GalleryView } from '#/lib/gallery'
import { MOBILE_QUERY, useMediaQuery } from '#/lib/useMediaQuery'
import { GalleryLightbox } from './GalleryLightbox'

interface GalleryContextValue {
  items: GalleryItem[]
  view: GalleryView
  dispatch: Dispatch<GalleryAction>
  /** False on mobile viewports, where photos can't be opened full-screen. */
  canViewFullscreen: boolean
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
  // The full-screen photo viewer is desktop-only; mobile visitors only get the album overview.
  const canViewFullscreen = !useMediaQuery(MOBILE_QUERY)

  const guardedDispatch = useCallback<Dispatch<GalleryAction>>(
    (action) => {
      if (!canViewFullscreen) {
        if (action.type === 'openShot' || action.type === 'stepShot') return
        // Single photos have no album, so opening one would go straight to the full-screen viewer.
        if (action.type === 'open' && !GALLERY[action.index]?.shots) return
      }
      dispatch(action)
    },
    [canViewFullscreen],
  )

  // Shrinking the window to mobile size while a photo is open drops back to the album (or closes).
  useEffect(() => {
    if (!canViewFullscreen && isShotOpen) dispatch({ type: 'closeShot' })
  }, [canViewFullscreen, isShotOpen])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') guardedDispatch(isShotOpen ? { type: 'closeShot' } : { type: 'close' })
      if (event.key === 'ArrowRight') guardedDispatch({ type: isShotOpen ? 'stepShot' : 'step', delta: 1 })
      if (event.key === 'ArrowLeft') guardedDispatch({ type: isShotOpen ? 'stepShot' : 'step', delta: -1 })
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, isShotOpen, guardedDispatch])

  const value = useMemo(
    () => ({ items: GALLERY, view, dispatch: guardedDispatch, canViewFullscreen }),
    [view, guardedDispatch, canViewFullscreen],
  )

  return (
    <GalleryContext value={value}>
      {children}
      <GalleryLightbox />
    </GalleryContext>
  )
}
