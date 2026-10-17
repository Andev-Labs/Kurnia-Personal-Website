import { RevealGroup, RevealListItem } from '#/components/motion/Reveal'
import { RichText } from '#/components/ui/RichText'
import { Section, SectionHeading } from '#/components/ui/Section'
import { m } from '#/paraglide/messages.js'

/** Deliberately quiet: a plain list below the main credentials. */
export function Activities() {
  const activities = [
    m.activities_volunteer,
    m.activities_scholarship,
    m.activities_olympiad,
    m.activities_tutor,
    m.activities_mentor,
  ]

  return (
    <Section id="aktivitas" labelledBy="aktivitas-heading" className="border-t border-line py-14 md:py-16">
      <SectionHeading id="aktivitas-heading" number="06" className="mb-8 md:mb-8">
        {m.activities_heading()}
      </SectionHeading>
      <RevealGroup>
        <ul className="grid max-w-[1000px] gap-x-10 gap-y-4 text-[14.5px] leading-[1.6] text-pretty text-muted md:grid-cols-2 [&_strong]:font-medium [&_strong]:text-ink">
          {activities.map((message, index) => (
            <RevealListItem key={index}>
              <RichText message={message} />
            </RevealListItem>
          ))}
        </ul>
      </RevealGroup>
    </Section>
  )
}
