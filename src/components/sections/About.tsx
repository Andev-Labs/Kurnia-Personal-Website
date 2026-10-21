import type { CSSProperties } from 'react'

import { Reveal, RevealGroup, RevealItem } from '#/components/motion/Reveal'
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

      <Reveal className="mt-6 overflow-hidden rounded-card-lg bg-white px-6 py-[22px] shadow-soft print:hidden">
        <Chromatogram />
      </Reveal>
    </Section>
  )
}

/** Decorative chromatogram: a peak trace that draws itself while a scan line sweeps across. */
function Chromatogram() {
  return (
    <svg viewBox="0 0 800 170" className="block h-auto w-full" aria-hidden="true">
      <g stroke="#D6C6FB" strokeWidth="2" strokeDasharray="4 8" strokeLinecap="round">
        <line x1="40" y1="30" x2="770" y2="30" />
        <line x1="40" y1="70" x2="770" y2="70" />
        <line x1="40" y1="110" x2="770" y2="110" />
      </g>
      <g className="animate-scan">
        <line x1="44" y1="14" x2="44" y2="140" stroke="#FF9EC4" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      </g>
      <path
        d="M40 140 L150 140 Q168 140 176 92 Q184 140 205 140 L300 140 Q322 140 332 34 Q344 140 372 140 L470 140 Q492 140 500 106 Q510 140 536 140 L620 140 Q640 140 650 62 Q662 140 690 140 L770 140"
        fill="none"
        stroke="#5B3FE0"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="1400"
        className="animate-draw"
        style={{ '--len': 1400 } as CSSProperties}
      />
      <path d="M40 14 V140 H770" fill="none" stroke="#B9A2F5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <g fill="#F7C52B">
        <circle cx="332" cy="40" r="7" />
        <circle cx="650" cy="68" r="7" />
      </g>
    </svg>
  )
}
