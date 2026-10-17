import { Reveal } from '#/components/motion/Reveal'
import { RichText } from '#/components/ui/RichText'
import { Section, SectionHeading } from '#/components/ui/Section'
import { m } from '#/paraglide/messages.js'

export function About() {
  return (
    <Section id="tentang" labelledBy="tentang-heading">
      <div className="grid gap-x-16 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <SectionHeading id="tentang-heading" number="01">
          {m.about_heading()}
        </SectionHeading>
        <Reveal className="max-w-[68ch] space-y-5 text-[clamp(16px,1.4vw,18.5px)] leading-[1.75] text-pretty text-muted [&_strong]:text-ink">
          <p>
            <RichText message={m.about_body} />
          </p>
          <p>
            <RichText message={m.about_goal} />
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
