import { Reveal, RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { Section, SectionHeading } from '#/components/ui/Section'
import { Tag, TagList } from '#/components/ui/Tag'
import { EFSET_URL } from '#/data/site'
import { m } from '#/paraglide/messages.js'

/*
 * TODO(Kurnia): confirm the split. "Primary" = instruments named in the KCH QC role; "familiar" = the rest
 * of the CV instrument list.
 */
const FAMILIAR_INSTRUMENTS = ['Gas Chromatography (GC)', 'AAS', 'Disintegration Tester', 'Polarimeter', 'pH Meter', 'Centrifuge']

export function Skills() {
  const primary = [
    'HPLC (Waters Alliance)',
    m.skills_instrument_uv_vis(),
    'FTIR',
    'ICP-OES',
    'TLC UV Scanner',
    'Karl Fischer',
    'Dissolution Tester',
  ]

  const groups: { title: string; items: string[] }[] = [
    {
      title: m.skills_group_lab(),
      items: [
        m.skills_lab_testing(),
        m.skills_lab_method_validation(),
        m.skills_lab_calibration(),
        m.skills_lab_working_standard(),
        m.skills_lab_reference_standard(),
      ],
    },
    {
      title: m.skills_group_quality(),
      items: [
        'GMP',
        'GLP',
        'ISO 17025',
        'Good Documentation Practices (GDP)',
        m.skills_quality_pharmacopoeia(),
        m.skills_quality_oos(),
        'CAPA',
        m.skills_quality_audit(),
        m.skills_quality_chemical_safety(),
      ],
    },
    {
      title: m.skills_group_improvement(),
      items: [
        'Quality Control Circle (QCC)',
        '8 Steps Problem Solving',
        '7 QC Tools',
        'Root Cause Analysis',
        'Risk Priority Number (RPN)',
        'SWOT',
        'Suggestion System',
        m.skills_improvement_leadership(),
      ],
    },
    {
      title: m.skills_group_software(),
      items: ['Waters Empower', m.skills_software_oracle(), 'Microsoft 365', 'Google Workspace', 'LibreOffice'],
    },
  ]

  return (
    <Section id="keahlian" labelledBy="keahlian-heading" className="border-t border-line">
      <SectionHeading id="keahlian-heading" number="03">
        {m.skills_heading()}
      </SectionHeading>

      <RevealGroup className="mb-12 grid gap-5 md:grid-cols-2">
        <RevealItem className="rounded-[20px] bg-teal p-6 text-paper md:p-8">
          <h3 className="font-serif text-[22px] font-medium">{m.skills_primary()}</h3>
          <p className="mt-1 mb-5 text-[14px] text-paper/75">{m.skills_primary_note()}</p>
          <ul className="flex flex-wrap gap-2 font-mono text-[13.5px]">
            {primary.map((item) => (
              <li key={item} className="rounded-full border border-paper/25 bg-paper/10 px-3 py-1">
                {item}
              </li>
            ))}
          </ul>
        </RevealItem>
        <RevealItem className="rounded-[20px] border border-line bg-surface p-6 md:p-8">
          <h3 className="font-serif text-[22px] font-medium">{m.skills_familiar()}</h3>
          <p className="mt-1 mb-5 text-[14px] text-muted">{m.skills_familiar_note()}</p>
          <TagList className="font-mono">
            {FAMILIAR_INSTRUMENTS.map((item) => (
              <Tag key={item}>{item}</Tag>
            ))}
          </TagList>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="grid gap-x-10 gap-y-9 md:grid-cols-2">
        {groups.map((group) => (
          <RevealItem key={group.title}>
            <h3 className="mb-3 font-mono text-[12px] tracking-[0.12em] text-teal uppercase">{group.title}</h3>
            <TagList>
              {group.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </TagList>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-10 border-t border-line pt-8">
        <h3 className="mb-3 font-mono text-[12px] tracking-[0.12em] text-teal uppercase">{m.skills_group_languages()}</h3>
        <ul className="flex flex-col gap-1.5 text-[15.5px]">
          <li>{m.skills_language_indonesian()}</li>
          <li>
            {m.skills_language_english()}{' '}
            <a href={EFSET_URL} target="_blank" rel="noopener" className="link-draw font-medium whitespace-nowrap text-teal">
              {m.skills_language_verify()} ↗
            </a>
          </li>
        </ul>
      </Reveal>
    </Section>
  )
}
