import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { m } from '#/paraglide/messages.js'

import { GalleryPhoto } from './GalleryPhoto'
import { useGallery } from './GalleryProvider'

/** Covers sit in a narrow card grid, so the 540px export is always enough. */
const COVER_SIZES = '300px'

export function ProgramGallery() {
  const { items, dispatch } = useGallery()

  return (
    <div className="mt-6">
      <p className="mb-3 font-mono text-[11.5px] tracking-[0.12em] text-teal uppercase">{m.gallery_program_heading()}</p>
      <RevealGroup className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
        {items.map((item, index) => {
          const cover = item.shots?.[0]?.photo
          return item.group === 'intl' && cover ? (
            <RevealItem key={item.title}>
              <button
                type="button"
                onClick={() => dispatch({ type: 'open', index })}
                className="group block w-full cursor-pointer overflow-hidden rounded-xl border border-line bg-surface p-0 text-left"
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <GalleryPhoto
                    photo={cover}
                    sizes={COVER_SIZES}
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
                  />
                </span>
                <span className="block px-3 py-2.5 text-[13px] leading-[1.35] font-medium">{item.title}</span>
              </button>
            </RevealItem>
          ) : null
        })}
      </RevealGroup>
    </div>
  )
}
