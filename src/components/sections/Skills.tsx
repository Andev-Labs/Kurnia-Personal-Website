import type { ComponentType, ReactNode } from 'react'

import { ChecklistIcon, ColumnIcon, FlaskIcon } from '#/components/icons/SkillIcons'
import { Mascot } from '#/components/mascot/Mascot'
import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { Section, SectionHeader } from '#/components/ui/Section'
import { Tag, TagList } from '#/components/ui/Tag'
import type { TagTone } from '#/components/ui/Tag'
import { EFSET_URL } from '#/data/site'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

interface Instrument {
  name: string
  /** Short label shown on the tile; `name` stays available as tooltip and to screen readers. */
  short?: string
}

/** Skill lists as given by Kurnia (NIA-13); tool and standard names stay untranslated. */
function getInstruments(): Instrument[] {
  return [
    { name: 'High Performance Liquid Chromatography', short: 'HPLC' },
    { name: 'Gas Chromatography', short: 'GC' },
    { name: 'Gas Chromatography-Mass Spectrometry (GC-MS)', short: 'GC-MS' },
    { name: 'High-Performance Thin-Layer Chromatography', short: 'HPTLC' },
    { name: 'Atomic Absorption Spectrometry', short: 'AAS' },
    { name: 'ICP-OES', short: 'ICP-OES' },
    { name: 'FTIR', short: 'FTIR' },
    { name: m.skills_instrument_uv_vis(), short: 'UV-Vis' },
    { name: 'Karl Fischer' },
    { name: 'Moisture Analyzer' },
    { name: 'TOC Analyzer' },
    { name: 'Dissolution Tester' },
    { name: 'Disintegration Tester' },
  ]
}

const LAB_SKILLS = [
  'Analytical Skills',
  'Analytical Development',
  'Method Development',
  'Research & Development (R&D)',
  'Formulation Development',
  'Calibration',
  'Performance Qualification (PQ)',
  'Pharmaceutical',
]

const QUALITY_SKILLS = [
  'Quality Control',
  'Good Manufacturing Practices',
  'CPOB',
  'CPKB',
  'Good Laboratory Practices',
  'Good Documentation Practice',
  'Data Integrity',
  'Out of Specification (OOS)',
  'Out of Trend (OOT)',
  'Corrective Action and Preventive Action (CAPA)',
]

const TEAMWORK_SKILLS = ['Team Leadership', 'Teamwork']

const SOFTWARE = ['Microsoft Office', 'Microsoft Outlook', 'Oracle']

/*
 * Bento grid. From lg: Instruments is the large card on the left, Lab and Quality stack beside it,
 * and the three short groups share the last row. Tablet: two columns. Phone: one column, same order.
 */
export function Skills() {
  const instruments = getInstruments()
  const abbreviated = instruments.filter((item) => item.short)
  const others = instruments.filter((item) => !item.short)

  return (
    <Section id="keahlian">
      <SectionHeader number="02" title={m.skills_heading()} mascot={<Mascot pose="lab" />} />

      <RevealGroup stagger={0.08} className="grid gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
        <SkillCard
          title={m.skills_group_instruments()}
          Icon={ColumnIcon}
          className="md:col-span-2 lg:col-span-6 lg:row-span-2"
        >
          {/* Tiles stretch to fill the card, so it matches the Lab + Quality stack beside it without dead space. */}
          <ul className="grid flex-1 auto-rows-fr grid-cols-3 gap-2.5 sm:grid-cols-4">
            {abbreviated.map((item) => (
              <li
                key={item.name}
                title={item.name === item.short ? undefined : item.name}
                className="grid min-h-[72px] place-items-center rounded-2xl bg-mint-100 px-2 py-3 text-center font-heading text-[clamp(16px,1.6vw,21px)] leading-none font-semibold text-mint-700"
              >
                <span aria-hidden={item.name === item.short ? undefined : true}>{item.short}</span>
                {item.name === item.short ? null : <span className="sr-only">{item.name}</span>}
              </li>
            ))}
          </ul>
          <SkillTags items={others.map((item) => item.name)} tone="mint" className="pt-5" />
        </SkillCard>

        <SkillCard title={m.skills_group_lab()} Icon={FlaskIcon} className="lg:col-span-6">
          <SkillTags items={LAB_SKILLS} tone="lavender" />
        </SkillCard>

        <SkillCard title={m.skills_group_quality()} Icon={ChecklistIcon} className="lg:col-span-6">
          <SkillTags items={QUALITY_SKILLS} tone="butter" />
        </SkillCard>

        <SkillCard title={m.skills_group_teamwork()} className="lg:col-span-3">
          <SkillTags items={TEAMWORK_SKILLS} tone="blush" />
        </SkillCard>

        <SkillCard title={m.skills_group_software()} className="lg:col-span-3">
          <SkillTags items={SOFTWARE} tone="lavender" />
        </SkillCard>

        <SkillCard
          title={m.skills_languages()}
          className="bg-[linear-gradient(150deg,var(--color-violet)_0%,var(--color-lavender-800)_100%)] text-white md:col-span-2 lg:col-span-6 print-plain"
        >
          {/* Plain lines rather than chips: the English entry is a full sentence and would wrap inside a pill. */}
          <ul className="flex flex-col gap-2 text-[14px] leading-[1.5] font-bold">
            <li>{m.skills_language_indonesian()}</li>
            <li>{m.skills_language_english()}</li>
          </ul>
          <a
            href={EFSET_URL}
            target="_blank"
            rel="noopener"
            className="mt-3 inline-flex items-center gap-1.5 self-start text-[13.5px] font-bold text-white underline decoration-white/40 underline-offset-4 hover:text-white hover:decoration-white"
          >
            {m.skills_language_verify()} <span aria-hidden="true">↗</span>
          </a>
        </SkillCard>
      </RevealGroup>
    </Section>
  )
}

interface SkillCardProps {
  title: string
  Icon?: ComponentType
  className?: string
  children: ReactNode
}

/** Content sits at the top; the card stretches to its grid row so every card in a row is the same height. */
function SkillCard({ title, Icon, className, children }: SkillCardProps) {
  return (
    <RevealItem className={cn('flex flex-col rounded-card bg-white p-6 shadow-soft', className)}>
      {Icon ? <Icon /> : null}
      <h3 className="mb-3 font-heading font-semibold text-[17px]">{title}</h3>
      {children}
    </RevealItem>
  )
}

function SkillTags({ items, tone, className }: { items: string[]; tone: TagTone; className?: string }) {
  return (
    <TagList className={cn('lg:[&>*]:whitespace-nowrap', className)}>
      {items.map((item) => (
        <Tag key={item} tone={tone}>
          {item}
        </Tag>
      ))}
    </TagList>
  )
}
