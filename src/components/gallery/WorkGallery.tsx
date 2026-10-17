import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { m } from '#/paraglide/messages.js'
import { GalleryPhoto } from './GalleryPhoto'
import { useGallery } from './GalleryProvider'

/** Cards sit in a 260px+ grid that tops out around 400px, so the 540px export covers 1x and most 1.5x screens. */
const COVER_SIZES = '(max-width: 640px) calc(100vw - 40px), 400px'

export function WorkGallery() {
  const { items, dispatch, originRect } = useGallery()

  return (
    <div className="mt-16">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-serif text-[clamp(20px,2.2vw,24px)] font-medium">{m.gallery_work_heading()}</h3>
        <p className="text-[13.5px] text-muted">{m.gallery_work_hint()}</p>
      </div>
      <RevealGroup className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
        {items.map((item, index) =>
          item.group === 'kerja' && item.photo ? (
            // The motion wrapper sits outside the card so it doesn't override the hover transform.
            <RevealItem key={item.title}>
              <button
                type="button"
                onClick={(event) => {
                  originRect.current = event.currentTarget.querySelector('img')?.getBoundingClientRect() ?? null
                  dispatch({ type: 'open', index })
                }}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line bg-surface p-0 text-left"
              >
                {/* Slides carry text to the edges, so the thumbnail letterboxes the whole frame instead of cropping it. */}
                <span className="relative block aspect-[16/10] overflow-hidden bg-teal-soft/50">
                  <GalleryPhoto
                    photo={item.photo}
                    sizes={COVER_SIZES}
                    className="absolute inset-0 size-full object-contain transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]"
                  />
                </span>
                <span className="block border-t border-line px-5 py-4">
                  <span className="block font-medium text-ink">{item.title}</span>
                  <span className="mt-1 block font-mono text-[12px] text-muted">{item.meta}</span>
                  <span className="mt-2 block text-[13.5px] leading-[1.55] text-pretty text-muted">{item.caption}</span>
                </span>
              </button>
            </RevealItem>
          ) : null,
        )}
      </RevealGroup>
    </div>
  )
}
