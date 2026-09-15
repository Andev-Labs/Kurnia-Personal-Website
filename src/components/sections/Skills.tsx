import type { ComponentType } from 'react'

import { ChecklistIcon, ColumnIcon, FlaskIcon, GrowthIcon } from '#/components/icons/SkillIcons'
import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { Section, SectionHeading } from '#/components/ui/Section'
import { Tag, TagList } from '#/components/ui/Tag'
import { m } from '#/paraglide/messages.js'

interface SkillGroup {
  title: string
  Icon: ComponentType
  items: string[]
}

const DATA_SYSTEMS = ['Empower (HPLC Data System)', 'Oracle']

function getSkillGroups(): SkillGroup[] {
  return [
    {
      title: m.skills_group_lab(),
      Icon: FlaskIcon,
      items: [
        m.skills_lab_raw_materials(),
        m.skills_lab_products(),
        m.skills_lab_method_validation(),
        m.skills_lab_calibration(),
        m.skills_lab_troubleshooting(),
        m.skills_lab_working_standard(),
        m.skills_lab_reference_standard(),
      ],
    },
    {
      title: m.skills_group_instruments(),
      Icon: ColumnIcon,
      items: [
        'HPLC (Waters Alliance)',
        'Gas Chromatography',
        'AAS',
        'FTIR',
        'ICP-OES',
        m.skills_instrument_uv_vis(),
        'TLC UV Scanner',
        'Dissolution Tester',
        'Disintegration Tester',
        'Karl Fischer',
        'Polarimeter',
        'pH Meter',
      ],
    },
    {
      title: m.skills_group_quality(),
      Icon: ChecklistIcon,
      items: [
        'GMP',
        'GLP',
        'ISO 17025',
        m.skills_quality_pharmacopoeia(),
        m.skills_quality_audit(),
        m.skills_quality_chemical_safety(),
      ],
    },
    {
      title: m.skills_group_improvement(),
      Icon: GrowthIcon,
      items: [
        'Quality Control Circle (QCC)',
        '8 Steps Problem Solving',
        '7 QC Tools',
        'Root Cause Analysis',
        'Risk Priority Number (RPN)',
        m.skills_improvement_swot(),
        'Suggestion System (SS)',
        m.skills_improvement_leadership(),
      ],
    },
  ]
}

export function Skills() {
  const languages = [m.skills_language_indonesian(), m.skills_language_english()]

  return (
    <Section id="keahlian" className="border-t-3 border-ink bg-sand">
      <SectionHeading number="02" badgeClassName="bg-teal">
        {m.skills_heading()}
      </SectionHeading>

      <RevealGroup stagger={0.09} className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[22px]">
        {getSkillGroups().map(({ title, Icon, items }) => (
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
          <h3 className="mb-3 font-display text-[17px]">{m.skills_data_systems()}</h3>
          <TagList className="mb-[22px]">
            {DATA_SYSTEMS.map((item) => (
              <Tag key={item} tone="dark">
                {item}
              </Tag>
            ))}
          </TagList>
          <h3 className="mb-3 font-display text-[17px]">{m.skills_languages()}</h3>
          <TagList>
            {languages.map((item) => (
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
