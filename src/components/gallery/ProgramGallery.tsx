import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { m } from '#/paraglide/messages.js'

import { GalleryPhoto } from './GalleryPhoto'
import { useGallery } from './GalleryProvider'

/** Covers sit in a narrow card grid, so the 540px export is always enough. */
const COVER_SIZES = '270px'

export function ProgramGallery() {
  const { items, dispatch } = useGallery()

  return (
    <div className="mt-5 border-t-3 border-cream/30 pt-5">
      <p className="mb-3.5 font-display text-[12px] tracking-[0.06em]">{m.gallery_program_heading()}</p>
      <RevealGroup stagger={0.08} className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3.5">
        {items.map((item, index) =>
          item.group === 'intl' ? (
            <RevealItem key={item.title} direction="pop">
              <button
                type="button"
                onClick={() => dispatch({ type: 'open', index })}
                className="block w-full cursor-pointer overflow-hidden rounded-[14px] border-3 border-cream bg-graphite p-0 text-left transition-transform duration-120 hover:-translate-y-[3px]"
              >
                <span className="relative block aspect-[4/3] overflow-hidden border-b-3 border-cream">
                  {item.shots?.[0]?.photo ? (
                    <GalleryPhoto
                      photo={item.shots[0].photo}
                      sizes={COVER_SIZES}
                      className="absolute inset-0 size-full object-cover"
                    />
                  ) : (
                    <span className="absolute inset-2.5 grid place-items-center rounded-[10px] border-[2.5px] border-dashed border-cream/60">
                      <span className="block size-[26px] rounded-[7px] border-[2.5px] border-cream bg-lavender" />
                    </span>
                  )}
                </span>
                <span className="block px-3 py-[11px] text-[12px] leading-[1.35] font-bold text-cream">{item.title}</span>
              </button>
            </RevealItem>
          ) : null,
        )}
      </RevealGroup>
    </div>
  )
}
