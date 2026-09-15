import type { CSSProperties } from 'react'

import { RichText } from '#/components/ui/RichText'
import { Section, SectionHeading } from '#/components/ui/Section'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

export function About() {
  const stats = [
    { value: '3+', label: m.about_stat_years(), className: 'bg-sun' },
    { value: '10', label: m.about_stat_team(), className: 'bg-pink' },
    { value: 'Top 10', label: m.about_stat_award(), className: 'bg-lavender' },
  ]

  return (
    <Section id="tentang">
      <SectionHeading number="01" badgeClassName="bg-pink">
        {m.about_heading()}
      </SectionHeading>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        <div className="rounded-[18px] border-3 border-ink bg-white p-[26px] shadow-hard-6">
          <p className="text-[16px] leading-[1.65] text-pretty">
            <RichText message={m.about_body} />
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] content-start gap-[18px]">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className={cn('rounded-[18px] border-3 border-ink p-5 shadow-hard-6', stat.className)}
            >
              <p className="mb-1.5 font-display text-[clamp(28px,3.6vw,40px)] leading-none">{stat.value}</p>
              <p className="text-[13.5px] leading-[1.4] font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[18px] border-3 border-ink bg-white px-6 py-[22px] shadow-hard-6">
        <Chromatogram />
      </div>
    </Section>
  )
}

/** Decorative chromatogram: a peak trace that draws itself while a scan line sweeps across. */
function Chromatogram() {
  return (
    <svg viewBox="0 0 800 170" className="block h-auto w-full" aria-hidden="true">
      <g stroke="#121212" strokeWidth="2" opacity=".18">
        <line x1="40" y1="30" x2="770" y2="30" />
        <line x1="40" y1="70" x2="770" y2="70" />
        <line x1="40" y1="110" x2="770" y2="110" />
      </g>
      <g className="animate-scan">
        <line x1="44" y1="14" x2="44" y2="140" stroke="#FF5C9E" strokeWidth="4" />
      </g>
      <path
        d="M40 140 L150 140 Q168 140 176 92 Q184 140 205 140 L300 140 Q322 140 332 34 Q344 140 372 140 L470 140 Q492 140 500 106 Q510 140 536 140 L620 140 Q640 140 650 62 Q662 140 690 140 L770 140"
        fill="none"
        stroke="#121212"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="1400"
        className="animate-draw"
        style={{ '--len': 1400 } as CSSProperties}
      />
      <line x1="40" y1="140" x2="770" y2="140" stroke="#121212" strokeWidth="4" />
      <line x1="40" y1="14" x2="40" y2="140" stroke="#121212" strokeWidth="4" />
      <g stroke="#121212" strokeWidth="3" fill="#FFD23F">
        <circle cx="332" cy="40" r="7" />
        <circle cx="650" cy="68" r="7" />
      </g>
    </svg>
  )
}
