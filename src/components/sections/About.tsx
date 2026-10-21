import { Reveal, RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { RichText } from '#/components/ui/RichText'
import { Section, SectionHeader } from '#/components/ui/Section'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

interface Stat {
  value: string
  label: string
  className: string
}

/** Every figure here repeats one already in `about_body`; never add a number that is not in the copy. */
function getStats(): Stat[] {
  return [
    { value: m.about_stat_years_value(), label: m.about_stat_years_label(), className: 'bg-lavender-100' },
    { value: m.about_stat_leadtime_value(), label: m.about_stat_leadtime_label(), className: 'bg-mint-100' },
    { value: m.about_stat_savings_value(), label: m.about_stat_savings_label(), className: 'bg-butter-100' },
    { value: m.about_stat_standard_value(), label: m.about_stat_standard_label(), className: 'bg-bubblegum-100' },
  ]
}

/** Narrative on the left at a readable measure, key figures on the right. Phones show the figures first. */
export function About() {
  return (
    <Section id="tentang">
      <SectionHeader number="01" title={m.about_heading()} />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-6">
        <Reveal className="rounded-card-lg bg-white p-[26px] shadow-soft md:p-8">
          <div className="max-w-[65ch] text-[16px] leading-[1.7] text-ink-soft text-pretty [&_strong]:text-ink">
            <p>
              <RichText message={m.about_body} />
            </p>
            <p className="mt-4">
              <RichText message={m.about_goal} />
            </p>
          </div>
        </Reveal>

        <RevealGroup stagger={0.08} className="grid grid-cols-2 gap-3 max-lg:order-first md:grid-cols-4 lg:grid-cols-2 lg:gap-4">
          {getStats().map((stat) => (
            <RevealItem
              key={stat.label}
              direction="pop"
              className={cn('flex flex-col justify-between gap-2 rounded-card p-4 shadow-soft-sm md:p-5', stat.className)}
            >
              <p className="font-heading text-[clamp(22px,2.4vw,30px)] leading-[1.05] font-semibold tracking-[-0.01em] text-violet">
                {stat.value}
              </p>
              <p className="text-[13px] leading-[1.4] font-bold text-ink-soft">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}
