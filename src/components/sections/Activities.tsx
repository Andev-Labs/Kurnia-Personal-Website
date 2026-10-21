import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { Bullet } from '#/components/ui/Bullet'
import type { MarkerColor } from '#/components/ui/Bullet'
import { RichText } from '#/components/ui/RichText'
import type { RichMessage } from '#/components/ui/RichText'
import { Section, SectionHeading } from '#/components/ui/Section'
import { m } from '#/paraglide/messages.js'

/** Deliberately quiet: one card of bullets below the main credentials. */
export function Activities() {
  const activities: { marker: MarkerColor; message: RichMessage }[] = [
    { marker: 'lavender', message: m.activities_volunteer },
    { marker: 'butter', message: m.activities_scholarship },
    { marker: 'mint', message: m.activities_olympiad },
    { marker: 'blush', message: m.activities_tutor },
    { marker: 'lavender', message: m.activities_mentor },
  ]

  return (
    <Section id="aktivitas">
      <SectionHeading number="06" badgeClassName="bg-mint-100">
        {m.activities_heading()}
      </SectionHeading>

      <RevealGroup className="rounded-card-lg bg-white p-6 shadow-soft md:p-8">
        <div className="grid gap-x-10 gap-y-4 text-[15px] leading-[1.6] text-ink-soft md:grid-cols-2 [&_strong]:text-ink">
          {activities.map((activity, index) => (
            <RevealItem key={index}>
              <Bullet marker={activity.marker}>
                <RichText message={activity.message} />
              </Bullet>
            </RevealItem>
          ))}
        </div>
      </RevealGroup>
    </Section>
  )
}
