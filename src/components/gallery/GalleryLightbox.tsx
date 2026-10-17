import { useLayoutEffect, useRef } from 'react'
import type { MouseEvent, RefObject } from 'react'

import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'
import { GalleryPhoto } from './GalleryPhoto'
import { useGallery } from './GalleryProvider'

/** Album grid columns are at least 230px and the modal caps at 1120px, so thumbnails stay under ~360px. */
const ALBUM_THUMB_SIZES = '(max-width: 640px) calc(100vw - 60px), 360px'
/** The viewer caps at 1100px wide next to the step buttons. */
const VIEWER_SIZES = '(max-width: 1240px) calc(100vw - 170px), 1100px'

const stopPropagation = (event: MouseEvent) => event.stopPropagation()

const ICON_BUTTON =
  'grid size-11 flex-none cursor-pointer place-items-center rounded-full border border-line bg-surface text-[18px] text-ink transition-colors duration-200 hover:border-teal hover:text-teal'

export function GalleryLightbox() {
  return (
    <>
      <AlbumModal />
      <ShotViewer />
    </>
  )
}

/** Overview of an album item (e.g. an international program) with its photo grid. */
function AlbumModal() {
  const { view, dispatch, originRect } = useGallery()
  const { active } = view
  if (!view.isAlbumOpen || !active?.shots) return null

  const close = () => dispatch({ type: 'close' })

  return (
    <div onClick={close} className="lightbox-fade fixed inset-0 z-60 grid place-items-center bg-ink/60 p-3 md:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-album-title"
        data-gallery-dialog
        onClick={stopPropagation}
        className="lightbox-pop max-h-[90vh] w-[min(1120px,100%)] overflow-auto rounded-[24px] bg-paper shadow-2xl"
      >
        <div className="sticky top-0 z-2 flex items-center justify-between gap-3.5 border-b border-line bg-paper/95 px-5 py-3 backdrop-blur md:px-7">
          <span className="font-mono text-[12px] tracking-[0.12em] text-teal uppercase">{view.groupLabel}</span>
          <button type="button" onClick={close} aria-label={m.gallery_close_album()} autoFocus className={ICON_BUTTON}>
            ×
          </button>
        </div>

        <div className="px-5 pt-7 md:px-7">
          <h2
            id="gallery-album-title"
            className="mb-1.5 font-serif text-[clamp(22px,2.6vw,30px)] leading-[1.2] font-medium"
          >
            {active.title}
          </h2>
          <p className="mb-3 font-mono text-[12.5px] text-muted">{active.meta}</p>
          <p className="max-w-[70ch] text-[15.5px] leading-[1.65] text-pretty text-muted">{active.caption}</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5 px-5 py-7 md:px-7">
          {active.shots.map((shot, shotIndex) => (
            <button
              key={shot.label}
              type="button"
              onClick={(event) => {
                originRect.current = event.currentTarget.querySelector('img')?.getBoundingClientRect() ?? null
                dispatch({ type: 'openShot', shotIndex })
              }}
              className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-surface p-0 text-left"
            >
              {/* Portrait and landscape shots share one grid, so the thumbnail fits the frame instead of cropping it. */}
              <span className="relative block aspect-[4/3] overflow-hidden bg-teal-soft/50">
                {shot.photo && (
                  <GalleryPhoto
                    photo={shot.photo}
                    sizes={ALBUM_THUMB_SIZES}
                    className="absolute inset-0 size-full object-contain transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]"
                  />
                )}
              </span>
              <span className="block border-t border-line px-4 py-3.5">
                <span className="mb-1 block font-medium">{shot.label}</span>
                <span className="block text-[13.5px] leading-[1.55] text-pretty text-muted">{shot.caption}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 md:px-7">
          <button
            type="button"
            onClick={() => dispatch({ type: 'step', delta: -1 })}
            className="group cursor-pointer rounded-full border border-line px-4 py-2.5 text-[14px] font-medium hover:border-teal hover:text-teal"
          >
            ← {m.gallery_previous_program()}
          </button>
          <span className="order-last w-full text-center font-mono text-[13px] text-muted sm:order-none sm:w-auto">
            {view.counter}
          </span>
          <button
            type="button"
            onClick={() => dispatch({ type: 'step', delta: 1 })}
            className="group cursor-pointer rounded-full border border-line px-4 py-2.5 text-[14px] font-medium hover:border-teal hover:text-teal"
          >
            {m.gallery_next_program()} <span className="arrow-nudge">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

/** Steps the full-screen viewer one photo forward or back. Sits beside the photo on desktop, below it on mobile. */
function StepShotButton({ delta, className }: { delta: 1 | -1; className?: string }) {
  const { dispatch } = useGallery()

  return (
    <button
      type="button"
      onClick={() => dispatch({ type: 'stepShot', delta })}
      aria-label={delta < 0 ? m.gallery_previous_photo() : m.gallery_next_photo()}
      className={cn(ICON_BUTTON, 'md:size-12', className)}
    >
      {delta < 0 ? '←' : '→'}
    </button>
  )
}

/**
 * Grows the photo frame out of the thumbnail that was clicked (FLIP with the Web Animations API).
 * Runs only for the first photo after a thumbnail click; stepping between photos just crossfades.
 */
function useGrowFromThumbnail(frame: RefObject<HTMLDivElement | null>, key: string | undefined) {
  const { originRect } = useGallery()

  useLayoutEffect(() => {
    const element = frame.current
    const from = originRect.current
    originRect.current = null
    if (!element || !from || typeof element.animate !== 'function') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const to = element.getBoundingClientRect()
    if (to.width === 0 || to.height === 0) return
    const dx = from.left + from.width / 2 - (to.left + to.width / 2)
    const dy = from.top + from.height / 2 - (to.top + to.height / 2)
    const scale = Math.min(from.width / to.width, from.height / to.height)
    element.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${scale})`, opacity: 0.4 },
        { transform: 'none', opacity: 1 },
      ],
      { duration: 450, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    )
  }, [frame, key, originRect])
}

/** Full-screen viewer for a single photo, either an album shot or a standalone work photo. */
function ShotViewer() {
  const { view, dispatch } = useGallery()
  const frame = useRef<HTMLDivElement>(null)
  const { shot } = view
  useGrowFromThumbnail(frame, shot?.photo?.src)
  if (!shot) return null

  const closeShot = () => dispatch({ type: 'closeShot' })

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${shot.heading}: ${shot.label}`}
      data-gallery-dialog
      onClick={closeShot}
      className="lightbox-fade fixed inset-0 z-80 flex flex-col gap-3 bg-ink/92 p-3 md:gap-4 md:p-5"
    >
      <div className="flex flex-none items-center justify-between gap-3.5">
        <span className="min-w-0 truncate font-mono text-[12px] tracking-[0.12em] text-paper/80 uppercase">
          {shot.heading}
        </span>
        <button type="button" onClick={closeShot} aria-label={m.gallery_close_photo()} autoFocus className={ICON_BUTTON}>
          ×
        </button>
      </div>

      <div onClick={stopPropagation} className="flex min-h-0 flex-1 items-center justify-center gap-4">
        <StepShotButton delta={-1} className="hidden md:grid" />

        <div ref={frame} className="flex h-full max-w-[1100px] min-w-0 flex-1 flex-col justify-center">
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-t-2xl bg-ink">
            {shot.photo && (
              <GalleryPhoto
                key={shot.photo.src}
                photo={shot.photo}
                sizes={VIEWER_SIZES}
                className="lightbox-fade absolute inset-0 size-full object-contain"
              />
            )}
          </div>
          {/* Capped so a long caption scrolls on short screens instead of squeezing the photo out. */}
          <div className="flex max-h-[55%] flex-none flex-col rounded-b-2xl bg-paper px-4 py-3.5 md:px-6 md:py-4">
            <div className="min-h-0 overflow-y-auto">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-medium">{shot.label}</p>
                <span className="font-mono text-[12.5px] text-muted">{shot.counter}</span>
              </div>
              {shot.meta && <p className="mt-1 font-mono text-[12px] text-muted">{shot.meta}</p>}
              <p className="mt-1.5 text-[14.5px] leading-[1.6] text-pretty text-muted">{shot.caption}</p>
            </div>
            {/* Mobile has no room for arrows beside the photo, and floating them over it would cover the photo. */}
            <div className="mt-3 flex flex-none items-center justify-between gap-3 md:hidden">
              <StepShotButton delta={-1} />
              <StepShotButton delta={1} />
            </div>
          </div>
        </div>

        <StepShotButton delta={1} className="hidden md:grid" />
      </div>
    </div>
  )
}
