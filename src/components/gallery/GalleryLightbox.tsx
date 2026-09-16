import type { MouseEvent } from 'react'

import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'
import { GalleryPhoto } from './GalleryPhoto'
import { useGallery } from './GalleryProvider'

/** Album grid columns are at least 250px and the modal caps at 1120px, so thumbnails stay under ~360px. */
const ALBUM_THUMB_SIZES = '(max-width: 640px) calc(100vw - 60px), 360px'
/** The viewer caps at 1100px wide next to the step buttons. */
const VIEWER_SIZES = '(max-width: 1240px) calc(100vw - 170px), 1100px'

const stopPropagation = (event: MouseEvent) => event.stopPropagation()

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
  const { view, dispatch } = useGallery()
  const { active } = view
  if (!view.isAlbumOpen || !active?.shots) return null

  const close = () => dispatch({ type: 'close' })

  return (
    <div onClick={close} className="fixed inset-0 z-60 grid place-items-center bg-ink/72 p-3 md:p-5">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-album-title"
        onClick={stopPropagation}
        className="max-h-[90vh] w-[min(1120px,100%)] overflow-auto rounded-[22px] border-3 border-ink bg-cream shadow-hard-10"
      >
        <div className="sticky top-0 z-2 flex items-center justify-between gap-3.5 border-b-3 border-ink bg-lavender px-4 py-4 md:px-[22px]">
          <span className="font-display text-[13px] tracking-[0.04em]">{view.groupLabel}</span>
          <button
            type="button"
            onClick={close}
            aria-label={m.gallery_close_album()}
            autoFocus
            className="grid size-[38px] cursor-pointer place-items-center rounded-[10px] border-3 border-ink bg-cream font-display text-[15px] text-ink shadow-hard-3"
          >
            ×
          </button>
        </div>

        <div className="border-b-3 border-ink px-4 pt-[26px] pb-2 md:px-[22px]">
          <h4
            id="gallery-album-title"
            className="mb-1.5 font-display text-[clamp(20px,2.6vw,30px)] leading-[1.2] tracking-[-0.02em]"
          >
            {active.title}
          </h4>
          <p className="mb-3 text-[13px] font-bold opacity-60">{active.meta}</p>
          <p className="mb-[22px] max-w-[70ch] text-[15.5px] leading-[1.65] text-pretty">{active.caption}</p>
        </div>

        <div className="px-4 py-6 md:px-[22px]">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
            {active.shots.map((shot, shotIndex) => (
              <button
                key={shot.label}
                type="button"
                onClick={() => dispatch({ type: 'openShot', shotIndex })}
                className="press-sm block w-full cursor-zoom-in overflow-hidden rounded-2xl border-3 border-ink bg-white p-0 text-left shadow-hard-5"
              >
                {/* Portrait and landscape shots share one grid, so the thumbnail fits the frame instead of cropping it. */}
                <span className="relative block aspect-[4/3] overflow-hidden border-b-3 border-ink bg-cream">
                  {shot.photo ? (
                    <GalleryPhoto
                      photo={shot.photo}
                      sizes={ALBUM_THUMB_SIZES}
                      className="absolute inset-0 size-full object-contain"
                    />
                  ) : (
                    <span className="absolute inset-3 grid place-items-center rounded-xl border-[2.5px] border-dashed border-ink">
                      <span className="block size-[30px] rounded-lg border-[2.5px] border-ink bg-lavender" />
                    </span>
                  )}
                  <span className="absolute top-2.5 right-2.5 rounded-full border-[2.5px] border-ink bg-sun px-[9px] py-1 text-[10.5px] font-bold">
                    {m.gallery_photo_badge()}
                  </span>
                </span>
                <span className="block px-4 py-3.5">
                  <span className="mb-[5px] block font-display text-[13.5px] leading-[1.3]">{shot.label}</span>
                  <span className="block text-[13px] leading-[1.55] text-pretty opacity-70">{shot.caption}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t-3 border-ink px-4 py-4 md:px-[22px]">
          <button
            type="button"
            onClick={() => dispatch({ type: 'step', delta: -1 })}
            className="cursor-pointer rounded-xl border-3 border-ink bg-white px-3.5 py-2.5 font-display text-[12.5px] text-ink shadow-hard-4 md:px-5 md:py-3 md:text-[13.5px]"
          >
            ← {m.gallery_previous_program()}
          </button>
          <span className="order-last w-full text-center text-[13px] font-bold sm:order-none sm:w-auto">
            {view.counter}
          </span>
          <button
            type="button"
            onClick={() => dispatch({ type: 'step', delta: 1 })}
            className="cursor-pointer rounded-xl border-3 border-ink bg-pink px-3.5 py-2.5 font-display text-[12.5px] text-ink shadow-hard-4 md:px-5 md:py-3 md:text-[13.5px]"
          >
            {m.gallery_next_program()} →
          </button>
        </div>
      </div>
    </div>
  )
}

/** Steps the full-screen viewer one photo forward or back. Sits beside the photo on desktop, over it on mobile. */
function StepShotButton({ delta, className }: { delta: 1 | -1; className?: string }) {
  const { dispatch } = useGallery()

  return (
    <button
      type="button"
      onClick={() => dispatch({ type: 'stepShot', delta })}
      aria-label={delta < 0 ? m.gallery_previous_photo() : m.gallery_next_photo()}
      className={cn(
        'grid size-[44px] flex-none cursor-pointer place-items-center rounded-full border-3 border-cream font-display text-[17px] text-ink md:size-[50px]',
        delta < 0 ? 'bg-cream' : 'bg-pink',
        className,
      )}
    >
      {delta < 0 ? '←' : '→'}
    </button>
  )
}

/** Full-screen viewer for a single photo, either an album shot or a standalone work photo. */
function ShotViewer() {
  const { view, dispatch } = useGallery()
  const { shot } = view
  if (!shot) return null

  const closeShot = () => dispatch({ type: 'closeShot' })

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${shot.heading}: ${shot.label}`}
      onClick={closeShot}
      className="fixed inset-0 z-80 flex flex-col gap-3 bg-ink/90 p-3 md:gap-3.5 md:p-[18px]"
    >
      <div className="flex flex-none items-center justify-between gap-3.5">
        <span className="min-w-0 flex-[0_1_auto] rounded-xl border-3 border-cream bg-sun px-4 py-[9px] font-display text-[12px] leading-[1.35] text-ink">
          {shot.heading}
        </span>
        <button
          type="button"
          onClick={closeShot}
          aria-label={m.gallery_close_photo()}
          autoFocus
          className="grid size-[42px] flex-none cursor-pointer place-items-center rounded-xl border-3 border-cream bg-cream font-display text-[17px] text-ink shadow-[3px_3px_0_var(--color-pink)]"
        >
          ×
        </button>
      </div>

      <div onClick={stopPropagation} className="flex min-h-0 flex-1 items-center justify-center gap-3.5">
        <StepShotButton delta={-1} className="hidden md:grid" />

        <div className="flex h-full max-w-[1100px] min-w-0 flex-1 flex-col justify-center">
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-t-[18px] border-3 border-b-0 border-cream bg-graphite">
            {shot.photo ? (
              <GalleryPhoto
                key={shot.photo.src}
                photo={shot.photo}
                sizes={VIEWER_SIZES}
                className="absolute inset-0 size-full object-contain"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center p-7 text-center">
                <div>
                  <div className="mx-auto mb-3.5 size-[62px] rounded-[14px] border-3 border-cream bg-lavender" />
                  <p className="font-display text-[14px] text-cream">{m.gallery_placeholder_title()}</p>
                  <p className="mt-1.5 text-[12.5px] font-semibold text-cream opacity-60">
                    {m.gallery_placeholder_hint()}
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Capped so a long caption scrolls on short screens instead of squeezing the photo out. */}
          <div className="flex max-h-[55%] flex-none flex-col rounded-b-[18px] border-3 border-cream bg-cream px-4 py-3.5 md:px-5 md:py-4">
            <div className="min-h-0 overflow-y-auto">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-display text-[15px] leading-[1.3]">{shot.label}</p>
                <span className="text-[12.5px] font-bold opacity-60">{shot.counter}</span>
              </div>
              {shot.meta && <p className="mt-[5px] text-[12.5px] font-bold opacity-55">{shot.meta}</p>}
              <p className="mt-[7px] text-[14px] leading-[1.6] text-pretty md:text-[14.5px]">{shot.caption}</p>
            </div>
            {/* Mobile has no room for arrows beside the photo, and floating them over it would cover the photo. */}
            <div className="mt-3.5 flex flex-none items-center justify-between gap-3 md:hidden">
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
