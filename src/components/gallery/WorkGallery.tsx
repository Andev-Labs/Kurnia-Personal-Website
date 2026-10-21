import type { GalleryItem } from '#/data/gallery'
import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { m } from '#/paraglide/messages.js'
import { GalleryPhoto } from './GalleryPhoto'
import { useGallery } from './GalleryProvider'

/** Cards sit in a 210px+ grid that tops out around 360px, so the 540px export covers 1x and most 1.5x screens. */
const COVER_SIZES = '(max-width: 640px) calc(100vw - 40px), 360px'

export function WorkGallery() {
  const { items, dispatch } = useGallery()

  return (
    <div className="mt-10">
      <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-heading font-semibold text-[clamp(19px,2.2vw,26px)] tracking-[-0.02em]">{m.gallery_work_heading()}</h3>
        <p className="text-[13px] font-semibold text-ink-soft">{m.gallery_work_hint()}</p>
      </div>
      <RevealGroup stagger={0.08} className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-5">
        {items.map((item, index) =>
          item.group === 'kerja' ? (
            // The motion wrapper sits outside the card so it doesn't override the `lift` hover transform.
            <RevealItem key={item.title} direction="pop">
              <button
                type="button"
                onClick={() => dispatch({ type: 'open', index })}
                className="lift block w-full cursor-pointer overflow-hidden rounded-card bg-white p-0 text-left shadow-soft"
              >
                <WorkCardContent item={item} />
              </button>
            </RevealItem>
          ) : null,
        )}
      </RevealGroup>
    </div>
  )
}

function WorkCardContent({ item }: { item: GalleryItem }) {
  return (
    <>
      {/* Slides carry text to the edges, so the thumbnail letterboxes the whole frame instead of cropping it. */}
      <span className="relative block aspect-[4/3] overflow-hidden bg-lavender-50">
        {item.photo ? (
          <GalleryPhoto photo={item.photo} sizes={COVER_SIZES} className="absolute inset-0 size-full object-contain" />
        ) : (
          <span className="absolute inset-3 grid place-items-center rounded-2xl border-2 border-dashed border-lavender-300">
            <span className="block size-[34px] rounded-xl bg-lavender" />
          </span>
        )}
        <span className="absolute top-2.5 right-2.5 rounded-full bg-butter px-[9px] py-1 text-[10.5px] font-bold text-ink shadow-soft-sm">
          {m.gallery_photo_badge()}
        </span>
      </span>
      <span className="block px-[18px] py-4">
        <span className="block font-heading font-semibold text-[14.5px] leading-[1.3] text-ink">{item.title}</span>
        <span className="mt-1.5 block text-[12.5px] font-bold text-violet">{item.meta}</span>
        <span className="mt-2.5 block text-[12.5px] leading-[1.55] text-pretty text-ink-soft">
          {item.caption}
        </span>
      </span>
    </>
  )
}
