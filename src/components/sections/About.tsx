import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { RichText } from '#/components/ui/RichText'
import { Section, SectionHeading } from '#/components/ui/Section'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

export function About() {
  const stats = [
    { value: '3+', label: m.about_stat_years(), className: 'bg-butter-100', dotClassName: 'bg-butter' },
    { value: '10', label: m.about_stat_team(), className: 'bg-bubblegum-100', dotClassName: 'bg-bubblegum' },
    { value: 'Top 10', label: m.about_stat_award(), className: 'bg-lavender-100', dotClassName: 'bg-violet' },
  ]

  return (
    <Section id="tentang">
      <SectionHeading number="01" badgeClassName="bg-bubblegum-100">
        {m.about_heading()}
      </SectionHeading>

      <RevealGroup stagger={0.12} className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
        <RevealItem className="relative rounded-card-lg bg-white p-[26px] shadow-soft md:p-8">
          <p className="text-[16px] leading-[1.7] text-ink-soft text-pretty [&_strong]:text-ink">
            <RichText message={m.about_body} />
          </p>
        </RevealItem>

        <RevealGroup
          stagger={0.1}
          className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] content-start gap-[18px]"
        >
          {stats.map((stat) => (
            <RevealItem
              key={stat.value}
              direction="pop"
              className={cn('relative rounded-card p-5 shadow-soft-sm', stat.className)}
            >
              <span aria-hidden="true" className={cn('absolute top-4 right-4 size-2.5 rounded-full', stat.dotClassName)} />
              <p className="mb-1.5 font-heading font-semibold text-[clamp(28px,3.6vw,40px)] leading-none text-ink">
                {stat.value}
              </p>
              <p className="text-[13.5px] leading-[1.4] font-bold text-ink-soft">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </RevealGroup>
    </Section>
  )
}

