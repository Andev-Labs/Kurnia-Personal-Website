import type { ProgramId } from '#/data/gallery'

import { GalleryPhoto } from './GalleryPhoto'
import { useGallery } from './GalleryProvider'

/** The cover spans a program card: full width on phones, half the 1200px row on desktop. */
const COVER_SIZES = '(max-width: 767px) calc(100vw - 96px), 540px'

/** Opens the program's album. Renders nothing when the program has no real photo, so no empty tile ever shows. */
export function ProgramCover({ program }: { program: ProgramId }) {
  const { items, dispatch } = useGallery()
  const index = items.findIndex((item) => item.program === program)
  const item = items[index]
  const cover = item?.shots?.[0]?.photo
  if (!item || !cover) return null

  return (
    <button
      type="button"
      onClick={() => dispatch({ type: 'open', index })}
      className="lift relative mb-4 block w-full cursor-pointer overflow-hidden rounded-[20px] bg-white/10 p-0 text-left shadow-soft print:hidden"
    >
      <span className="relative block aspect-[16/9] overflow-hidden">
        <GalleryPhoto photo={cover} sizes={COVER_SIZES} className="absolute inset-0 size-full object-cover" />
      </span>
      <span className="absolute bottom-3 left-3 inline-flex max-w-[calc(100%-24px)] items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-bold text-ink shadow-soft-sm">
        <CameraIcon />
        <span className="truncate">{item.title}</span>
        <span aria-hidden="true" className="flex-none whitespace-nowrap text-ink-soft">
          · {item.shots?.length}
        </span>
      </span>
    </button>
  )
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 flex-none text-violet" aria-hidden="true">
      <path
        d="M2.5 5.5h2l1-1.5h5l1 1.5h2v7h-11z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8.75" r="2.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
