import type { MouseEvent } from 'react'

import { cn } from '#/lib/cn'
import { GalleryPhoto } from './GalleryPhoto'
import { useGallery } from './GalleryProvider'

/** Album grid columns are at least 250px and the modal caps at 1120px, so thumbnails stay under ~360px. */
const ALBUM_THUMB_SIZES = '(max-width: 640px) calc(100vw - 90px), 360px'
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
  const { view, dispatch, canViewFullscreen } = useGallery()
  const { active } = view
  if (!view.isAlbumOpen || !active?.shots) return null

  const close = () => dispatch({ type: 'close' })

  return (
    <div onClick={close} className="fixed inset-0 z-60 grid place-items-center bg-ink/72 p-5">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gallery-album-title"
        onClick={stopPropagation}
        className="max-h-[90vh] w-[min(1120px,100%)] overflow-auto rounded-[22px] border-3 border-ink bg-cream shadow-hard-10"
      >
        <div className="sticky top-0 z-2 flex items-center justify-between gap-3.5 border-b-3 border-ink bg-lavender px-[22px] py-4">
          <span className="font-display text-[13px] tracking-[0.04em]">{view.groupLabel}</span>
          <button
            type="button"
            onClick={close}
            aria-label="Tutup galeri"
            autoFocus
            className="grid size-[38px] cursor-pointer place-items-center rounded-[10px] border-3 border-ink bg-cream font-display text-[15px] text-ink shadow-hard-3"
          >
            ×
          </button>
        </div>

        <div className="border-b-3 border-ink px-[22px] pt-[26px] pb-2">
          <h4
            id="gallery-album-title"
            className="mb-1.5 font-display text-[clamp(20px,2.6vw,30px)] leading-[1.2] tracking-[-0.02em]"
          >
            {active.title}
          </h4>
          <p className="mb-3 text-[13px] font-bold opacity-60">{active.meta}</p>
          <p className="mb-[22px] max-w-[70ch] text-[15.5px] leading-[1.65] text-pretty">{active.caption}</p>
        </div>

        <div className="px-[22px] py-6">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
            {active.shots.map((shot, shotIndex) => {
              const content = (
                <>
                  <span className="relative block aspect-[4/3] overflow-hidden border-b-3 border-ink bg-cream">
                    {shot.photo ? (
                      <GalleryPhoto
                        photo={shot.photo}
                        sizes={ALBUM_THUMB_SIZES}
                        className="absolute inset-0 size-full object-cover"
                      />
                    ) : (
                      <span className="absolute inset-3 grid place-items-center rounded-xl border-[2.5px] border-dashed border-ink">
                        <span className="block size-[30px] rounded-lg border-[2.5px] border-ink bg-lavender" />
                      </span>
                    )}
                    <span className="absolute top-2.5 right-2.5 rounded-full border-[2.5px] border-ink bg-sun px-[9px] py-1 text-[10.5px] font-bold">
                      FOTO
                    </span>
                  </span>
                  <span className="block px-4 py-3.5">
                    <span className="mb-[5px] block font-display text-[13.5px] leading-[1.3]">{shot.label}</span>
                    <span className="block text-[13px] leading-[1.55] text-pretty opacity-70">{shot.caption}</span>
                  </span>
                </>
              )
              const cardClassName =
                'block w-full overflow-hidden rounded-2xl border-3 border-ink bg-white p-0 text-left shadow-hard-5'

              // Mobile viewports have no full-screen viewer, so the photo card is display-only there.
              return canViewFullscreen ? (
                <button
                  key={shot.label}
                  type="button"
                  onClick={() => dispatch({ type: 'openShot', shotIndex })}
                  className={cn(cardClassName, 'press-sm cursor-zoom-in')}
                >
                  {content}
                </button>
              ) : (
                <div key={shot.label} className={cardClassName}>
                  {content}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t-3 border-ink px-[22px] py-4">
          <button
            type="button"
            onClick={() => dispatch({ type: 'step', delta: -1 })}
            className="cursor-pointer rounded-xl border-3 border-ink bg-white px-5 py-3 font-display text-[13.5px] text-ink shadow-hard-4"
          >
            ← Program lain
          </button>
          <span className="text-[13px] font-bold">{view.counter}</span>
          <button
            type="button"
            onClick={() => dispatch({ type: 'step', delta: 1 })}
            className="cursor-pointer rounded-xl border-3 border-ink bg-pink px-5 py-3 font-display text-[13.5px] text-ink shadow-hard-4"
          >
            Program lain →
          </button>
        </div>
      </div>
    </div>
  )
}

/** Full-screen viewer for a single photo, either an album shot or a standalone work photo. */
function ShotViewer() {
  const { view, dispatch, canViewFullscreen } = useGallery()
  const { shot } = view
  if (!shot || !canViewFullscreen) return null

  const closeShot = () => dispatch({ type: 'closeShot' })

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${shot.heading}: ${shot.label}`}
      onClick={closeShot}
      className="fixed inset-0 z-80 flex flex-col gap-3.5 bg-ink/90 p-[18px]"
    >
      <div className="flex flex-none items-center justify-between gap-3.5">
        <span className="min-w-0 flex-[0_1_auto] rounded-xl border-3 border-cream bg-sun px-4 py-[9px] font-display text-[12px] leading-[1.35] text-ink">
          {shot.heading}
        </span>
        <button
          type="button"
          onClick={closeShot}
          aria-label="Tutup foto"
          autoFocus
          className="grid size-[42px] cursor-pointer place-items-center rounded-xl border-3 border-cream bg-cream font-display text-[17px] text-ink shadow-[3px_3px_0_var(--color-pink)]"
        >
          ×
        </button>
      </div>

      <div onClick={stopPropagation} className="flex min-h-0 flex-1 items-center justify-center gap-3.5">
        <button
          type="button"
          onClick={() => dispatch({ type: 'stepShot', delta: -1 })}
          aria-label="Foto sebelumnya"
          className="grid size-[50px] flex-none cursor-pointer place-items-center rounded-full border-3 border-cream bg-cream font-display text-[17px] text-ink"
        >
          ←
        </button>

        <div className="flex h-full max-w-[1100px] min-w-0 flex-1 flex-col justify-center">
          {shot.photo ? (
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-t-[18px] border-3 border-b-0 border-cream bg-graphite">
              <GalleryPhoto
                key={shot.photo.src}
                photo={shot.photo}
                sizes={VIEWER_SIZES}
                className="absolute inset-0 size-full object-contain"
              />
            </div>
          ) : (
            <div className="grid min-h-0 flex-1 place-items-center rounded-t-[18px] border-3 border-b-0 border-cream bg-graphite p-7 text-center">
              <div>
                <div className="mx-auto mb-3.5 size-[62px] rounded-[14px] border-3 border-cream bg-lavender" />
                <p className="font-display text-[14px] text-cream">PLACEHOLDER FOTO</p>
                <p className="mt-1.5 text-[12.5px] font-semibold text-cream opacity-60">
                  Tampilan penuh · unggah foto asli untuk slot ini
                </p>
              </div>
            </div>
          )}
          <div className="flex-none rounded-b-[18px] border-3 border-cream bg-cream px-5 py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-display text-[15px] leading-[1.3]">{shot.label}</p>
              <span className="text-[12.5px] font-bold opacity-60">{shot.counter}</span>
            </div>
            {shot.meta && <p className="mt-[5px] text-[12.5px] font-bold opacity-55">{shot.meta}</p>}
            <p className="mt-[7px] text-[14.5px] leading-[1.6] text-pretty">{shot.caption}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => dispatch({ type: 'stepShot', delta: 1 })}
          aria-label="Foto berikutnya"
          className="grid size-[50px] flex-none cursor-pointer place-items-center rounded-full border-3 border-cream bg-pink font-display text-[17px] text-ink"
        >
          →
        </button>
      </div>
    </div>
  )
}
