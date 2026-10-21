import { JourneyMap } from '#/components/journey/JourneyMap'
import { Section, SectionHeader } from '#/components/ui/Section'
import { m } from '#/paraglide/messages.js'

export function Experience() {
  return (
    <Section id="pengalaman">
      <SectionHeader number="03" title={m.experience_heading()} />
      <JourneyMap />
    </Section>
  )
}
