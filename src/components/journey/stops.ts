import type { MarkerColor } from '#/components/ui/Bullet'
import type { RichMessage } from '#/components/ui/RichText'
import { m } from '#/paraglide/messages.js'

export type StopEntry = { marker: MarkerColor; message: RichMessage } | { chart: 'lead-time' }

/** `current` marks the latest job; `finish` is the flag at the end of the path. */
export type StopKind = 'passed' | 'current' | 'finish'

/** Extra block shown under a stop's bullets. */
export type StopExtra = 'work-gallery' | 'qcc-photos' | 'next'

export interface JourneyStop {
  id: string
  kind: StopKind
  title: string
  company?: string
  period?: string
  /** What Kapsi says while standing on the stop. */
  bubble: string
  entries: StopEntry[]
  extra?: StopExtra
}

const COMPANY = 'Kalbe Consumer Health (KCH), Kalbe Group'

/** Chronological stops, built per call so the copy follows the active locale. */
export function getStops(): JourneyStop[] {
  return [
    {
      id: 'kch-intern',
      kind: 'passed',
      title: m.experience_intern_role(),
      company: COMPANY,
      period: m.experience_intern_period(),
      bubble: m.journey_bubble_intern(),
      entries: [
        { marker: 'lavender', message: m.experience_intern_analysis },
        { marker: 'butter', message: m.experience_intern_reagents },
        { marker: 'blush', message: m.experience_intern_stock_opname },
      ],
    },
    {
      id: 'kch',
      kind: 'current',
      title: m.experience_kch_role(),
      company: COMPANY,
      period: m.experience_kch_period(),
      bubble: m.journey_bubble_kch(),
      entries: [
        { marker: 'butter', message: m.experience_kch_analysis },
        { marker: 'mint', message: m.experience_kch_oot_oos },
        { marker: 'butter', message: m.experience_kch_method_transfer },
        { marker: 'mint', message: m.experience_kch_troubleshooting },
        { marker: 'lavender', message: m.experience_kch_dissolution },
        { marker: 'blush', message: m.experience_kch_working_standard },
        { marker: 'butter', message: m.experience_kch_stock_opname },
        { marker: 'mint', message: m.experience_kch_suggestion_system },
      ],
      extra: 'work-gallery',
    },
    {
      id: 'kch-qcc',
      kind: 'passed',
      title: m.journey_qcc_title(),
      company: COMPANY,
      period: m.journey_qcc_period(),
      bubble: m.journey_bubble_qcc(),
      entries: [
        { marker: 'lavender', message: m.experience_kch_qcc },
        { chart: 'lead-time' },
        { marker: 'blush', message: m.experience_kch_savings },
      ],
    },
    {
      id: 'qcc-convention',
      kind: 'passed',
      title: m.awards_qcc_title(),
      bubble: m.journey_bubble_award(),
      entries: [{ marker: 'butter', message: m.awards_qcc_body }],
      extra: 'qcc-photos',
    },
    {
      id: 'next',
      kind: 'finish',
      title: m.journey_next_title(),
      bubble: m.journey_bubble_next(),
      entries: [],
      extra: 'next',
    },
  ]
}
