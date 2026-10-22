import { GalleryPhoto } from '#/components/gallery/GalleryPhoto'
import { useGallery } from '#/components/gallery/GalleryProvider'
import { WorkGallery } from '#/components/gallery/WorkGallery'
import { Accordion } from '#/components/ui/Accordion'
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
      {stop.caseStudy ? <CaseStudyHeader {...stop.caseStudy} /> : null}
      {stop.entries.length > 0 ? (
        <div className="flex flex-col gap-3.5 text-[15px] leading-[1.6]">
          {stop.entriesLabel ? <p className={LABEL_CLASS}>{stop.entriesLabel}</p> : null}
          {stop.entries.map((entry, index) => (
            <StopEntryView key={index} entry={entry} />
          ))}
        </div>
      ) : null}
      {stop.daily?.length ? <DailyDuties items={stop.daily} collapsible={withMedia} /> : null}
      {stop.extra === 'next' ? <NextAdventure withMedia={withMedia} /> : null}
      {withMedia && stop.extra === 'qcc-photos' ? <QccPhotos /> : null}
      {withMedia && stop.extra === 'work-gallery' ? <WorkGallery stop={stop.id} /> : null}
    </>
  )
}

const LABEL_CLASS = 'font-heading text-[12.5px] font-semibold tracking-[0.04em] text-violet uppercase'

function CaseStudyHeader({ label, title, meta }: { label: string; title: string; meta: string }) {
  return (
    <div className="rounded-[18px] bg-butter-100 px-5 py-4">
      <p className="mb-1.5 font-heading text-[12.5px] font-semibold tracking-[0.04em] text-[#7a5a00]">{label}</p>
      <p className="font-heading text-[17px] leading-[1.3] font-semibold text-pretty">{title}</p>
      <p className="mt-1.5 text-[13px] font-bold text-ink-soft">{meta}</p>
    </div>
  )
}

function StopEntryView({ entry }: { entry: StopEntry }) {
  if ('chart' in entry) return <LeadTimeChart />
  if ('label' in entry) {
    return (
      <div>
        <p className={`mb-1 ${LABEL_CLASS}`}>{entry.label}</p>
        <p className="text-pretty text-ink-soft [&_strong]:text-ink">
          {typeof entry.message === 'string' ? entry.message : <RichText message={entry.message} />}
        </p>
      </div>
    )
  }
  return (
    <Bullet marker={entry.marker}>
      <RichText message={entry.message} />
    </Bullet>
  )
}

/** Routine duties: a disclosure in the interactive card, an open list in the print / no-JS timeline. */
function DailyDuties({ items, collapsible }: { items: string[]; collapsible: boolean }) {
  const list = (
    <ul className="flex flex-col gap-2 px-4 pb-4 text-[14.5px] leading-[1.6] text-ink-soft">
      {items.map((item) => (
        <li key={item} className="relative pl-5 text-pretty">
          <span aria-hidden="true" className="absolute top-[0.6em] left-0 size-2 rounded-full bg-lavender" />
          {item}
        </li>
      ))}
    </ul>
  )
  if (collapsible) return <Accordion title={m.experience_daily_toggle()}>{list}</Accordion>
  return (
    <div className="rounded-[18px] bg-lavender-50 pt-3">
      <h4 className="px-4 pb-2 font-heading text-[14.5px] font-semibold text-violet">{m.experience_daily_toggle()}</h4>
      {list}
    </div>
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
