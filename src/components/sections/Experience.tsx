import { JourneyMap } from '#/components/journey/JourneyMap'
import { Section, SectionHeading } from '#/components/ui/Section'
import { m } from '#/paraglide/messages.js'

export function Experience() {
  return (
    <Section id="pengalaman">
      <SectionHeading number="03" badgeClassName="bg-butter">
        {m.experience_heading()}
      </SectionHeading>
      <JourneyMap />
    </Section>
  )
}
