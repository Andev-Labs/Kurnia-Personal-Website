import type { ComponentType } from 'react'

import { ChecklistIcon, ColumnIcon, FlaskIcon, GrowthIcon } from '#/components/icons/SkillIcons'
import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { Section, SectionHeading } from '#/components/ui/Section'
import { Tag, TagList } from '#/components/ui/Tag'

interface SkillGroup {
  title: string
  Icon: ComponentType
  items: string[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Analisis & Laboratorium',
    Icon: FlaskIcon,
    items: [
      'Pengujian bahan baku',
      'Produk antara & jadi',
      'Validasi & transfer metode',
      'Kalibrasi instrumen',
      'Troubleshooting instrumen',
      'Standarisasi Working Standard',
      'Uji kesesuaian Reference Standard',
    ],
  },
  {
    title: 'Instrumen',
    Icon: ColumnIcon,
    items: [
      'HPLC (Waters Alliance)',
      'Gas Chromatography',
      'AAS',
      'FTIR',
      'ICP-OES',
      'Spektrofotometer UV-Vis',
      'TLC UV Scanner',
      'Dissolution Tester',
      'Disintegration Tester',
      'Karl Fischer',
      'Polarimeter',
      'pH Meter',
    ],
  },
  {
    title: 'Kualitas & Kepatuhan',
    Icon: ChecklistIcon,
    items: [
      'GMP',
      'GLP',
      'ISO 17025',
      'Farmakope',
      'Dokumentasi audit & sertifikasi kualitas',
      'Prosedur keselamatan penyimpanan bahan kimia',
    ],
  },
  {
    title: 'Continuous Improvement & Kepemimpinan',
    Icon: GrowthIcon,
    items: [
      'Quality Control Circle (QCC)',
      '8 Steps Problem Solving',
      '7 QC Tools',
      'Root Cause Analysis',
      'Risk Priority Number (RPN)',
      'Analisis SWOT',
      'Suggestion System (SS)',
      'Kepemimpinan tim lintas fungsi',
    ],
  },
]

const DATA_SYSTEMS = ['Empower (HPLC Data System)', 'Oracle']
const LANGUAGES = ['Indonesia — Native', 'English — Professional working']

export function Skills() {
  return (
    <Section id="keahlian" className="border-t-3 border-ink bg-sand">
      <SectionHeading number="02" badgeClassName="bg-teal">
        Keahlian &amp; kompetensi
      </SectionHeading>

      <RevealGroup stagger={0.09} className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[22px]">
        {SKILL_GROUPS.map(({ title, Icon, items }) => (
          <RevealItem key={title} className="rounded-[18px] border-3 border-ink bg-white p-6 shadow-hard-6">
            <Icon />
            <h3 className="mb-3 font-display text-[17px]">{title}</h3>
            <TagList>
              {items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </TagList>
          </RevealItem>
        ))}

        <RevealItem className="rounded-[18px] border-3 border-ink bg-ink p-6 text-cream shadow-[6px_6px_0_var(--color-pink)]">
          <h3 className="mb-3 font-display text-[17px]">Sistem data</h3>
          <TagList className="mb-[22px]">
            {DATA_SYSTEMS.map((item) => (
              <Tag key={item} tone="dark">
                {item}
              </Tag>
            ))}
          </TagList>
          <h3 className="mb-3 font-display text-[17px]">Bahasa</h3>
          <TagList>
            {LANGUAGES.map((item) => (
              <Tag key={item} tone="dark">
                {item}
              </Tag>
            ))}
          </TagList>
        </RevealItem>
      </RevealGroup>
    </Section>
  )
}
