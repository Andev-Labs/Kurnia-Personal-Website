import type { ComponentType } from 'react'

import { ChecklistIcon, ColumnIcon, FlaskIcon, GrowthIcon } from '#/components/icons/SkillIcons'
import { Mascot } from '#/components/mascot/Mascot'
import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { Section, SectionHeader } from '#/components/ui/Section'
import { Tag, TagList } from '#/components/ui/Tag'
import type { TagTone } from '#/components/ui/Tag'
import { EFSET_URL } from '#/data/site'
import { m } from '#/paraglide/messages.js'

interface SkillGroup {
  title: string
  Icon: ComponentType
  tone: TagTone
  items: string[]
}

/** Skill list as given by Kurnia (NIA-13); tool and standard names stay untranslated. */
function getSoftware() {
  return ['Microsoft Office', 'Microsoft Outlook', 'Oracle']
}

function getSkillGroups(): SkillGroup[] {
  return [
    {
      title: m.skills_group_lab(),
      Icon: FlaskIcon,
      tone: 'lavender',
      items: [
        'Analytical Skills',
        'Analytical Development',
        'Method Development',
        'Research & Development (R&D)',
        'Formulation Development',
        'Calibration',
        'Performance Qualification (PQ)',
        'Pharmaceutical',
      ],
    },
    {
      title: m.skills_group_instruments(),
      Icon: ColumnIcon,
      tone: 'mint',
      items: [
        'High Performance Liquid Chromatography',
        'Gas Chromatography',
        'Gas Chromatography-Mass Spectrometry (GC-MS)',
        'High-Performance Thin-Layer Chromatography',
        'Atomic Absorption Spectrometry',
        'ICP-OES',
        'FTIR',
        m.skills_instrument_uv_vis(),
        'Karl Fischer',
        'Moisture Analyzer',
        'TOC Analyzer',
        'Dissolution Tester',
        'Disintegration Tester',
      ],
    },
    {
      title: m.skills_group_quality(),
      Icon: ChecklistIcon,
      tone: 'butter',
      items: [
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
      ],
    },
    {
      title: m.skills_group_teamwork(),
      Icon: GrowthIcon,
      tone: 'blush',
      items: ['Team Leadership', 'Teamwork'],
    },
  ]
}

export function Skills() {
  return (
    <Section id="keahlian">
      <SectionHeader number="02" title={m.skills_heading()} mascot={<Mascot pose="lab" />} />

      <RevealGroup stagger={0.09} className="grid grid-cols-[repeat(auto-fit,minmax(min(290px,100%),1fr))] gap-[22px]">
        {getSkillGroups().map(({ title, Icon, tone, items }) => (
          <RevealItem key={title} className="rounded-card bg-white p-6 shadow-soft">
            <Icon />
            <h3 className="mb-3 font-heading font-semibold text-[17px]">{title}</h3>
            <TagList>
              {items.map((item) => (
                <Tag key={item} tone={tone}>
                  {item}
                </Tag>
              ))}
            </TagList>
          </RevealItem>
        ))}

        <RevealItem className="rounded-card bg-[linear-gradient(150deg,var(--color-violet)_0%,var(--color-lavender-800)_100%)] p-6 text-white shadow-soft print-plain">
          <h3 className="mb-3 font-heading font-semibold text-[17px]">{m.skills_group_software()}</h3>
          <TagList className="mb-[22px]">
            {getSoftware().map((item) => (
              <Tag key={item} tone="violet">
                {item}
              </Tag>
            ))}
          </TagList>
          <h3 className="mb-3 font-heading font-semibold text-[17px]">{m.skills_languages()}</h3>
          <TagList>
            <Tag tone="violet">{m.skills_language_indonesian()}</Tag>
            <Tag tone="violet">{m.skills_language_english()}</Tag>
          </TagList>
          <a
            href={EFSET_URL}
            target="_blank"
            rel="noopener"
            className="mt-3.5 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-white underline decoration-white/40 underline-offset-4 hover:text-white hover:decoration-white"
          >
            {m.skills_language_verify()} <span aria-hidden="true">↗</span>
          </a>
        </RevealItem>
      </RevealGroup>
    </Section>
  )
}
