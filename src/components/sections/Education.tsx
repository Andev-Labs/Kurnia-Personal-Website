import type { ReactNode } from 'react'

import { ProgramGallery } from '#/components/gallery/ProgramGallery'
import { Mascot } from '#/components/mascot/Mascot'
import { Reveal, RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { RichText } from '#/components/ui/RichText'
import { Section, SectionHeading } from '#/components/ui/Section'
import { m } from '#/paraglide/messages.js'

export function Education() {
  return (
    <Section id="pendidikan">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading number="04" badgeClassName="bg-lavender-100">
          {m.education_heading()}
        </SectionHeading>
        <Reveal direction="pop" className="-mb-2 hidden w-24 flex-none sm:block md:w-28">
          <Mascot pose="grad" className="h-auto w-full" />
        </Reveal>
      </div>

      <RevealGroup stagger={0.12} className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
        <RevealItem className="rounded-card-lg bg-white p-[26px] shadow-soft">
          <span className="mb-3.5 inline-block rounded-full bg-butter-100 px-[13px] py-[7px] text-[12.5px] font-bold text-[#7a5a00]">
            {m.education_bachelor_period()}
          </span>
          <h3 className="mb-1.5 font-heading font-semibold text-[20px] leading-[1.2]">{m.education_bachelor_degree()}</h3>
          <p className="mb-4 text-[14.5px] font-bold text-violet">Binawan University</p>
          <div className="flex flex-col gap-3 text-[15px] leading-[1.6]">
            <p className="text-pretty">
              <RichText message={m.education_bachelor_status} />
            </p>
            <p className="rounded-2xl bg-lavender-50 p-4 text-pretty">
              <strong className="mb-[5px] block font-heading font-semibold text-[12.5px] tracking-[0.04em] text-violet">
                {m.education_thesis_label()}
              </strong>
              {m.education_thesis_title()}
            </p>
            <div className="flex flex-wrap gap-3.5">
              <ExtractionCard label={m.education_extraction_maceration()}>
                <MacerationIcon />
              </ExtractionCard>
              <ExtractionCard label={m.education_extraction_ultrasonic()}>
                <UltrasonicIcon />
              </ExtractionCard>
            </div>
          </div>
        </RevealItem>

        <RevealGroup stagger={0.14} className="flex flex-col gap-6">
          <RevealItem className="rounded-card-lg bg-white p-[26px] shadow-soft">
            <span className="mb-3.5 inline-block rounded-full bg-mint-100 px-[13px] py-[7px] text-[12.5px] font-bold text-[#1f6b51]">
              {m.education_vocational_period()}
            </span>
            <h3 className="mb-1.5 font-heading font-semibold text-[20px] leading-[1.2]">{m.education_vocational_major()}</h3>
            <p className="mb-4 text-[14.5px] font-bold text-violet">SMK-SMAK Bogor</p>
            <div className="flex flex-col gap-2.5 text-[15px] leading-[1.6]">
              <p className="text-pretty">
                <RichText message={m.education_vocational_dual_system} />
              </p>
              <p className="text-pretty">
                <RichText message={m.education_vocational_certificate} />
              </p>
            </div>
          </RevealItem>

          <RevealItem className="rounded-card-lg bg-[linear-gradient(150deg,var(--color-violet)_0%,var(--color-lavender-800)_100%)] p-[26px] text-white shadow-soft">
            <h3 className="mb-4 font-heading font-semibold text-[17px]">{m.education_international_heading()}</h3>
            <div className="flex flex-col gap-3.5 text-[15px] leading-[1.6]">
              <p className="text-pretty">
                <RichText message={m.education_international_sechenov} />
              </p>
              <p className="text-pretty">
                <RichText message={m.education_international_cpu} />
              </p>
            </div>
            <ProgramGallery />
          </RevealItem>
        </RevealGroup>
      </RevealGroup>
    </Section>
  )
}

function ExtractionCard({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-[120px] flex-1 rounded-2xl bg-lavender-50 p-3.5 text-center">
      {children}
      <p className="mt-2 text-[12.5px] font-bold text-violet">{label}</p>
    </div>
  )
}

function MacerationIcon() {
  return (
    <svg viewBox="0 0 80 70" className="h-auto w-full max-w-[90px]" aria-hidden="true">
      <path
        d="M26 12h28v34a14 14 0 0 1-28 0V12z"
        fill="#D9F2E7"
        stroke="#5B3FE0"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M22 12h36" stroke="#5B3FE0" strokeWidth="2.5" strokeLinecap="round" />
      <g fill="#5B3FE0">
        <circle cx="36" cy="40" r="3" className="animate-bubble-slow" />
        <circle cx="46" cy="44" r="2.5" className="animate-bubble-slow [animation-delay:1.4s]" />
      </g>
    </svg>
  )
}

const RING_CLASS = '[transform-box:fill-box] origin-center animate-pulse-ring'

function UltrasonicIcon() {
  return (
    <svg viewBox="0 0 80 70" className="h-auto w-full max-w-[90px]" aria-hidden="true">
      <g fill="none" stroke="#FF9EC4" strokeWidth="2.5">
        <circle cx="40" cy="38" r="20" className={RING_CLASS} />
        <circle cx="40" cy="38" r="20" className={`${RING_CLASS} [animation-delay:1.1s]`} />
      </g>
      <path
        d="M26 12h28v34a14 14 0 0 1-28 0V12z"
        fill="#B9A2F5"
        stroke="#5B3FE0"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M22 12h36" stroke="#5B3FE0" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
