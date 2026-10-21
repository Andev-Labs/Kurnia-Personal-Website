import type { ComponentType } from 'react'

import { ChecklistIcon, ColumnIcon, FlaskIcon, GrowthIcon } from '#/components/icons/SkillIcons'
import { Mascot } from '#/components/mascot/Mascot'
import { Reveal, RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { Section, SectionHeading } from '#/components/ui/Section'
import { Tag, TagList } from '#/components/ui/Tag'
import type { TagTone } from '#/components/ui/Tag'
import { m } from '#/paraglide/messages.js'

interface SkillGroup {
  title: string
  Icon: ComponentType
  tone: TagTone
  items: string[]
}

const DATA_SYSTEMS = ['Empower (HPLC Data System)', 'Oracle']

function getSkillGroups(): SkillGroup[] {
  return [
    {
      title: m.skills_group_lab(),
      Icon: FlaskIcon,
      tone: 'lavender',
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
      tone: 'mint',
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
      tone: 'butter',
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
      tone: 'blush',
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
    <Section id="keahlian">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading number="02" badgeClassName="bg-mint-100">
          {m.skills_heading()}
        </SectionHeading>
        <Reveal direction="pop" className="-mb-2 hidden w-24 flex-none sm:block md:w-28">
          <Mascot pose="lab" className="h-auto w-full" />
        </Reveal>
      </div>

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
          <h3 className="mb-3 font-heading font-semibold text-[17px]">{m.skills_data_systems()}</h3>
          <TagList className="mb-[22px]">
            {DATA_SYSTEMS.map((item) => (
              <Tag key={item} tone="violet">
                {item}
              </Tag>
            ))}
          </TagList>
          <h3 className="mb-3 font-heading font-semibold text-[17px]">{m.skills_languages()}</h3>
          <TagList>
            {languages.map((item) => (
              <Tag key={item} tone="violet">
                {item}
              </Tag>
            ))}
          </TagList>
        </RevealItem>
      </RevealGroup>
    </Section>
  )
}
