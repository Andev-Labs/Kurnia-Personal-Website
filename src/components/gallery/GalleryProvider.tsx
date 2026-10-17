import { createContext, use, useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import type { Dispatch, ReactNode, RefObject } from 'react'

import { getGallery } from '#/data/gallery'
import type { GalleryItem } from '#/data/gallery'
import { galleryReducer, getGalleryView, initialGalleryState } from '#/lib/gallery'
import type { GalleryAction, GalleryView } from '#/lib/gallery'
import { GalleryLightbox } from './GalleryLightbox'

interface GalleryContextValue {
  items: GalleryItem[]
  view: GalleryView
  dispatch: Dispatch<GalleryAction>
  /** Box of the thumbnail that opened the viewer, so the photo can grow out of it. Cleared once used. */
  originRect: RefObject<DOMRect | null>
}

const FOCUSABLE = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'

/** Keeps Tab / Shift+Tab inside the topmost gallery dialog. */
function trapTab(event: KeyboardEvent) {
  const dialogs = document.querySelectorAll<HTMLElement>('[data-gallery-dialog]')
  const dialog = dialogs[dialogs.length - 1]
  if (!dialog) return
  const focusable = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null)
  if (focusable.length === 0) return
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const inside = dialog.contains(document.activeElement)
  if (event.shiftKey && (!inside || document.activeElement === first)) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && (!inside || document.activeElement === last)) {
    event.preventDefault()
    first.focus()
  }
}

const GalleryContext = createContext<GalleryContextValue | null>(null)

export function useGallery() {
  const context = use(GalleryContext)
  if (!context) throw new Error('useGallery must be used inside <GalleryProvider>')
  return context
}

/** Owns the lightbox state shared by the work gallery and the international program gallery. */
export function GalleryProvider({ children }: { children: ReactNode }) {
  // The locale is fixed for the lifetime of a page (switching reloads), so the items never change.
  const items = useMemo(() => getGallery(), [])
  const [state, dispatch] = useReducer(
    (current: typeof initialGalleryState, action: GalleryAction) => galleryReducer(items, current, action),
    initialGalleryState,
  )
  const view = useMemo(() => getGalleryView(items, state), [items, state])
  const isOpen = view.active !== null
  const isShotOpen = view.isShotOpen
  const originRect = useRef<DOMRect | null>(null)

  // Whatever opened the gallery (or an album photo) gets focus back when it closes. Captured at dispatch
  // time, before the dialog's autofocused close button takes focus.
  const openers = useRef<{ gallery: HTMLElement | null; shot: HTMLElement | null }>({ gallery: null, shot: null })
  const focusedElement = () => (document.activeElement instanceof HTMLElement ? document.activeElement : null)
  const dispatchWithFocus = useCallback((action: GalleryAction) => {
    if (action.type === 'open' && !openers.current.gallery) openers.current.gallery = focusedElement()
    if (action.type === 'openShot') openers.current.shot = focusedElement()
    dispatch(action)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    return () => {
      openers.current.gallery?.focus({ preventScroll: true })
      openers.current = { gallery: null, shot: null }
    }
  }, [isOpen])

  useEffect(() => {
    if (!isShotOpen) return
    return () => {
      openers.current.shot?.focus({ preventScroll: true })
      openers.current.shot = null
    }
  }, [isShotOpen])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dispatch(isShotOpen ? { type: 'closeShot' } : { type: 'close' })
      if (event.key === 'ArrowRight') dispatch({ type: isShotOpen ? 'stepShot' : 'step', delta: 1 })
      if (event.key === 'ArrowLeft') dispatch({ type: isShotOpen ? 'stepShot' : 'step', delta: -1 })
      if (event.key === 'Tab') trapTab(event)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, isShotOpen])

  const value = useMemo(() => ({ items, view, dispatch: dispatchWithFocus, originRect }), [items, view, dispatchWithFocus])

  return (
    <GalleryContext value={value}>
      {children}
      <GalleryLightbox />
    </GalleryContext>
  )
}
