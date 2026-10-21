import { Reveal } from '#/components/motion/Reveal'
import { RichText } from '#/components/ui/RichText'
import { Section, SectionHeader } from '#/components/ui/Section'
import { m } from '#/paraglide/messages.js'

export function About() {
  return (
    <Section id="tentang">
      <SectionHeader number="01" title={m.about_heading()} />

      <Reveal className="relative rounded-card-lg bg-white p-[26px] shadow-soft md:p-8">
        <p className="text-[16px] leading-[1.7] text-ink-soft text-pretty [&_strong]:text-ink">
          <RichText message={m.about_body} />
        </p>
        <p className="mt-4 text-[16px] leading-[1.7] text-ink-soft text-pretty [&_strong]:text-ink">
          <RichText message={m.about_goal} />
        </p>
      </Reveal>
    </Section>
  )
}
