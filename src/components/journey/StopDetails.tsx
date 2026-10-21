import { GalleryPhoto } from '#/components/gallery/GalleryPhoto'
import { useGallery } from '#/components/gallery/GalleryProvider'
import { WorkGallery } from '#/components/gallery/WorkGallery'
import { Bullet } from '#/components/ui/Bullet'
import { Button } from '#/components/ui/Button'
import { RichText } from '#/components/ui/RichText'
import { m } from '#/paraglide/messages.js'
import type { JourneyStop, StopEntry } from './stops'

/** Company and period line shared by the detail card and the plain timeline. */
export function StopMeta({ stop }: { stop: JourneyStop }) {
  if (!stop.company && !stop.period) return null
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {stop.company ? <p className="text-[14px] font-semibold text-ink-soft">{stop.company}</p> : null}
      {stop.period ? (
        <span className="rounded-full bg-lavender-50 px-3 py-1.5 text-[12.5px] font-bold whitespace-nowrap text-violet">
          {stop.period}
        </span>
      ) : null}
    </div>
  )
}

interface StopBodyProps {
  stop: JourneyStop
  /** Photos and call-to-action buttons; left out of the print / no-JS timeline. */
  withMedia?: boolean
}

/** Bullets, chart and extras of a stop. */
export function StopBody({ stop, withMedia = true }: StopBodyProps) {
  return (
    <>
      {stop.entries.length > 0 ? (
        <div className="flex flex-col gap-3.5 text-[15px] leading-[1.6]">
          {stop.entries.map((entry, index) => (
            <StopEntryView key={index} entry={entry} />
          ))}
        </div>
      ) : null}
      {stop.extra === 'next' ? <NextAdventure withMedia={withMedia} /> : null}
      {withMedia && stop.extra === 'qcc-photos' ? <QccPhotos /> : null}
      {withMedia && stop.extra === 'work-gallery' ? <WorkGallery /> : null}
    </>
  )
}

function StopEntryView({ entry }: { entry: StopEntry }) {
  if ('chart' in entry) return <LeadTimeChart />
  return (
    <Bullet marker={entry.marker}>
      <RichText message={entry.message} />
    </Bullet>
  )
}

function LeadTimeChart() {
  return (
    <div className="ml-7 rounded-[18px] bg-lavender-50 px-5 py-[18px]">
      <p className="mb-3.5 font-heading text-[12.5px] font-semibold tracking-[0.04em] text-violet">
        {m.experience_chart_title()}
      </p>
      <div className="flex flex-col gap-2.5 text-[13px] font-bold">
        <div className="flex items-center gap-3">
          <span className="w-[74px] flex-none">{m.experience_chart_before()}</span>
          <span className="h-5 min-w-0 flex-1 rounded-full bg-lavender" />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-[74px] flex-none">{m.experience_chart_after()}</span>
          <span className="relative h-5 min-w-0 flex-1">
            <span className="absolute inset-0 rounded-full border-2 border-dashed border-lavender-300" />
            <span className="absolute inset-y-0 left-0 w-1/3 animate-shrink rounded-full bg-butter" />
          </span>
          <span className="flex-none font-heading text-[15px] font-semibold text-violet">−67%</span>
        </div>
      </div>
    </div>
  )
}

function OpenBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] font-bold shadow-soft-sm">
      <span aria-hidden="true" className="size-2 rounded-full bg-mint shadow-[0_0_0_4px_rgb(61_180_138/0.18)]" />
      {m.hero_open_badge()}
    </span>
  )
}

function NextAdventure({ withMedia }: { withMedia: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <OpenBadge />
      {withMedia ? <Button href="#kontak">{m.hero_cta_contact()}</Button> : null}
    </div>
  )
}

const QCC_THUMB_SIZES = '(max-width: 1024px) 45vw, 180px'

/** The QCC Convention and team photos from the work gallery, opening the shared lightbox. */
function QccPhotos() {
  const { items, dispatch } = useGallery()

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item, index) =>
        item.group === 'kerja' && item.photo?.src.includes('/qcc-') ? (
          <button
            key={item.title}
            type="button"
            onClick={() => dispatch({ type: 'open', index })}
            className="lift block cursor-pointer overflow-hidden rounded-[16px] bg-white p-0 text-left shadow-soft-sm"
          >
            <span className="relative block aspect-[4/3] bg-lavender-50">
              <GalleryPhoto photo={item.photo} sizes={QCC_THUMB_SIZES} className="absolute inset-0 size-full object-cover" />
            </span>
            <span className="block px-3 py-2.5 font-heading text-[13px] leading-[1.3] font-semibold text-ink">
              {item.title}
            </span>
          </button>
        ) : null,
      )}
    </div>
  )
}
