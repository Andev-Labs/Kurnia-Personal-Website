import { cn } from '#/lib/cn'
import { useGallery } from './GalleryProvider'

export function WorkGallery() {
  const { items, dispatch, canViewFullscreen } = useGallery()

  return (
    <div className="mt-10">
      <div className="mb-[18px] flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-display text-[clamp(19px,2.2vw,26px)] tracking-[-0.02em]">Galeri kerja</h3>
        <p className="text-[13px] font-semibold opacity-60">
          {canViewFullscreen && 'Klik untuk melihat foto & keterangan · '}semua masih placeholder
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-5">
        {items.map((item, index) =>
          item.group === 'kerja' ? (
            // Work photos open straight into the full-screen viewer, which mobile viewports don't get.
            canViewFullscreen ? (
              <button
                key={item.title}
                type="button"
                onClick={() => dispatch({ type: 'open', index })}
                className={cn(CARD_CLASS_NAME, 'press cursor-pointer')}
              >
                <WorkCardContent title={item.title} meta={item.meta} />
              </button>
            ) : (
              <div key={item.title} className={CARD_CLASS_NAME}>
                <WorkCardContent title={item.title} meta={item.meta} />
              </div>
            )
          ) : null,
        )}
      </div>
    </div>
  )
}

const CARD_CLASS_NAME = 'block w-full overflow-hidden rounded-[18px] border-3 border-ink bg-white p-0 text-left shadow-hard-6'

function WorkCardContent({ title, meta }: { title: string; meta: string }) {
  return (
    <>
      <span className="relative block aspect-[4/3] border-b-3 border-ink bg-cream">
        <span className="absolute inset-3 grid place-items-center rounded-xl border-[2.5px] border-dashed border-ink">
          <span className="block size-[34px] rounded-lg border-[2.5px] border-ink bg-lavender" />
        </span>
        <span className="absolute top-2.5 right-2.5 rounded-full border-[2.5px] border-ink bg-sun px-[9px] py-1 text-[10.5px] font-bold">
          FOTO
        </span>
      </span>
      <span className="block px-[18px] py-4">
        <span className="block font-display text-[14.5px] leading-[1.3] text-ink">{title}</span>
        <span className="mt-1.5 block text-[12.5px] font-semibold text-ink opacity-60">{meta}</span>
      </span>
    </>
  )
}
