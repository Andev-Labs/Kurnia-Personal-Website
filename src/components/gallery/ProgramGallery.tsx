import { useGallery } from './GalleryProvider'

export function ProgramGallery() {
  const { items, dispatch } = useGallery()

  return (
    <div className="mt-5 border-t-3 border-cream/30 pt-5">
      <p className="mb-3.5 font-display text-[12px] tracking-[0.06em]">GALERI PROGRAM</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3.5">
        {items.map((item, index) =>
          item.group === 'intl' ? (
            <button
              key={item.title}
              type="button"
              onClick={() => dispatch({ type: 'open', index })}
              className="block w-full cursor-pointer overflow-hidden rounded-[14px] border-3 border-cream bg-graphite p-0 text-left transition-transform duration-120 hover:-translate-y-[3px]"
            >
              <span className="relative block aspect-[4/3] border-b-3 border-cream">
                <span className="absolute inset-2.5 grid place-items-center rounded-[10px] border-[2.5px] border-dashed border-cream/60">
                  <span className="block size-[26px] rounded-[7px] border-[2.5px] border-cream bg-lavender" />
                </span>
              </span>
              <span className="block px-3 py-[11px] text-[12px] leading-[1.35] font-bold text-cream">{item.title}</span>
            </button>
          ) : null,
        )}
      </div>
    </div>
  )
}
