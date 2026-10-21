import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { m } from '#/paraglide/messages.js'

import { GalleryPhoto } from './GalleryPhoto'
import { useGallery } from './GalleryProvider'

/** Covers sit in a narrow card grid, so the 540px export is always enough. */
const COVER_SIZES = '270px'

export function ProgramGallery() {
  const { items, dispatch } = useGallery()

  return (
    <div className="mt-5 border-t border-white/25 pt-5 print:hidden">
      <p className="mb-3.5 font-heading font-semibold text-[12px] tracking-[0.06em] text-lavender-100">{m.gallery_program_heading()}</p>
      <RevealGroup stagger={0.08} className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3.5">
        {items.map((item, index) =>
          item.group === 'intl' ? (
            <RevealItem key={item.title} direction="pop">
              <button
                type="button"
                onClick={() => dispatch({ type: 'open', index })}
                className="lift block w-full cursor-pointer overflow-hidden rounded-[20px] bg-white p-0 text-left shadow-soft"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-lavender-50">
                  {item.shots?.[0]?.photo ? (
                    <GalleryPhoto
                      photo={item.shots[0].photo}
                      sizes={COVER_SIZES}
                      className="absolute inset-0 size-full object-cover"
                    />
                  ) : (
                    <span className="absolute inset-2.5 grid place-items-center rounded-xl border-2 border-dashed border-lavender-300">
                      <span className="block size-[26px] rounded-lg bg-lavender" />
                    </span>
                  )}
                </span>
                <span className="block px-3 py-[11px] text-[12px] leading-[1.35] font-bold text-ink">{item.title}</span>
              </button>
            </RevealItem>
          ) : null,
        )}
      </RevealGroup>
    </div>
  )
}
