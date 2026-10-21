import type { MarkerColor } from '#/components/ui/Bullet'
import type { RichMessage } from '#/components/ui/RichText'
import { m } from '#/paraglide/messages.js'

export type StopEntry =
  | { marker: MarkerColor; message: RichMessage }
  | { chart: 'lead-time' }
  /** A labelled paragraph, used by the QCC case study (problem, approach, impact, validation). */
  | { label: string; message: RichMessage | string }

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
  /** Small heading above the entries, e.g. "Main impact". */
  entriesLabel?: string
  entries: StopEntry[]
  /** Routine duties, folded into a "Daily responsibilities" disclosure under the entries. */
  daily?: string[]
  /** Case study header shown above the entries. */
  caseStudy?: { label: string; title: string; meta: string }
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
      entriesLabel: m.experience_impact_label(),
      entries: [
        { marker: 'lavender', message: m.experience_intern_impact_method },
        { marker: 'butter', message: m.experience_intern_impact_transfer },
        { marker: 'blush', message: m.experience_intern_impact_reports },
      ],
      daily: [m.experience_intern_daily_testing()],
    },
    {
      id: 'kch',
      kind: 'current',
      title: m.experience_kch_role(),
      company: COMPANY,
      period: m.experience_kch_period(),
      bubble: m.journey_bubble_kch(),
      entriesLabel: m.experience_impact_label(),
      entries: [
        { marker: 'butter', message: m.experience_kch_impact_qcc },
        /*
         * Confidential: the "three priority products" are Mixagrip Flu Kaplet, Mixagrip Flu & Batuk, and
         * Mextril Tablet. Brand names stay off the public site in every language (the CV omits them too).
         */
        { marker: 'mint', message: m.experience_kch_impact_savings },
        { marker: 'lavender', message: m.experience_kch_impact_method },
      ],
      daily: [
        m.experience_kch_daily_testing(),
        m.experience_kch_daily_troubleshooting(),
        m.experience_kch_daily_dissolution(),
        m.experience_kch_daily_working_standard(),
        m.experience_kch_daily_oos(),
        m.experience_kch_daily_reagents(),
        m.experience_kch_daily_suggestion(),
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
      caseStudy: { label: m.case_label(), title: m.case_title(), meta: m.case_meta() },
      entries: [
        // TODO(Kurnia): the "problem" wording is inferred from the CV; confirm it matches the QCC report.
        { label: m.case_problem_label(), message: m.case_problem() },
        { label: m.case_approach_label(), message: m.case_approach },
        { chart: 'lead-time' },
        { label: m.case_impact_label(), message: m.case_impact },
        { label: m.case_validation_label(), message: m.case_validation() },
      ],
    },
    // Source copy is Kurnia's English CV. TODO(Kurnia): review terjemahan (id/zh/ru).
    {
      id: 'unissula-research',
      kind: 'passed',
      title: m.experience_research_role(),
      company: 'Universitas Islam Sultan Agung (UNISSULA)',
      period: m.experience_research_period(),
      bubble: m.journey_bubble_research(),
      entriesLabel: m.experience_responsibilities_label(),
      entries: [
        { marker: 'lavender', message: m.experience_research_thesis },
        { marker: 'mint', message: m.experience_research_literature },
        { marker: 'blush', message: m.experience_research_editing },
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
