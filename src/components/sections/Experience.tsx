import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'

import { WorkGallery } from '#/components/gallery/WorkGallery'
import { EASE, Reveal, RevealGroup, RevealItem, VIEWPORT, RevealListItem } from '#/components/motion/Reveal'
import { Accordion } from '#/components/ui/Accordion'
import { RichText } from '#/components/ui/RichText'
import type { RichMessage } from '#/components/ui/RichText'
import { Section, SectionHeading } from '#/components/ui/Section'
import { m } from '#/paraglide/messages.js'

interface Job {
  id: string
  role: string
  company: string
  period: string
  /** Exactly three headline results; everything else goes in the "daily responsibilities" accordion. */
  impact: [RichMessage, RichMessage, RichMessage]
  daily: string[]
}

const COMPANY = 'Kalbe Consumer Health (KCH), Kalbe Group'

export function Experience() {
  const jobs: Job[] = [
    {
      id: 'kch',
      role: m.experience_kch_role(),
      company: COMPANY,
      period: m.experience_kch_period(),
      impact: [
        m.experience_kch_impact_qcc,
        /*
         * Confidential: the "three priority products" are Mixagrip Flu Kaplet, Mixagrip Flu & Batuk, and
         * Mextril Tablet. Brand names stay off the public site in every language (the CV omits them too).
         */
        m.experience_kch_impact_savings,
        m.experience_kch_impact_method,
      ],
      daily: [
        m.experience_kch_daily_testing(),
        m.experience_kch_daily_troubleshooting(),
        m.experience_kch_daily_dissolution(),
        m.experience_kch_daily_working_standard(),
        m.experience_kch_daily_oos(),
        m.experience_kch_daily_reagents(),
        m.experience_kch_daily_suggestion(),
      ],
    },
    {
      id: 'kch-intern',
      role: m.experience_intern_role(),
      company: COMPANY,
      period: m.experience_intern_period(),
      impact: [
        m.experience_intern_impact_method,
        m.experience_intern_impact_transfer,
        m.experience_intern_impact_reports,
      ],
      daily: [m.experience_intern_daily_testing()],
    },
  ]

  return (
    <Section id="pengalaman" labelledBy="pengalaman-heading" className="border-t border-line">
      <SectionHeading id="pengalaman-heading" number="02">
        {m.experience_heading()}
      </SectionHeading>

      <Timeline jobs={jobs} />
      <CaseStudy />
      <WorkGallery />
    </Section>
  )
}

/** Vertical rail whose teal fill follows the scroll position through the job list. */
function Timeline({ jobs }: { jobs: Job[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  return (
    <ol ref={ref} className="relative flex flex-col gap-12 pl-8 md:pl-12">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-line md:left-[7px]" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-teal md:left-[7px]"
      />
      {jobs.map((job) => (
        <li key={job.id} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-2 -left-8 size-[11px] rounded-full border-2 border-teal bg-paper md:-left-12 md:size-[15px]"
          />
          <RevealGroup>
            <RevealItem className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <div>
                <h3 className="font-serif text-[clamp(21px,2.4vw,27px)] leading-[1.2] font-medium">{job.role}</h3>
                <p className="mt-1 text-[15px] text-muted">{job.company}</p>
              </div>
              <p className="font-mono text-[13px] text-muted">{job.period}</p>
            </RevealItem>
            <RevealItem>
              <p className="mb-3 font-mono text-[11.5px] tracking-[0.12em] text-teal uppercase">
                {m.experience_impact_label()}
              </p>
            </RevealItem>
            <ul className="mb-6 flex max-w-[78ch] flex-col gap-3 text-[16px] leading-[1.65] text-pretty text-muted [&_strong]:text-ink">
              {job.impact.map((message, index) => (
                <RevealListItem key={index} className="relative pl-6">
                  <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-3 bg-teal" />
                  <RichText message={message} />
                </RevealListItem>
              ))}
            </ul>
            <RevealItem className="max-w-[78ch]">
              <Accordion title={m.experience_daily_toggle()}>
                <ul className="flex flex-col gap-2 pb-4 text-[15px] leading-[1.6] text-muted">
                  {job.daily.map((item) => (
                    <li key={item} className="relative pl-5">
                      <span aria-hidden="true" className="absolute top-[0.65em] left-0 size-1 rounded-full bg-muted/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Accordion>
            </RevealItem>
          </RevealGroup>
        </li>
      ))}
    </ol>
  )
}

function CaseStudy() {
  const rows: { label: string; message: RichMessage | string }[] = [
    // TODO(Kurnia): the "problem" wording is inferred from the CV; confirm it matches the QCC report.
    { label: m.case_problem_label(), message: m.case_problem() },
    { label: m.case_approach_label(), message: m.case_approach },
    { label: m.case_impact_label(), message: m.case_impact },
    { label: m.case_validation_label(), message: m.case_validation() },
  ]

  return (
    <Reveal className="mt-16">
      <article
        aria-labelledby="case-title"
        className="overflow-hidden rounded-[24px] border border-line bg-surface shadow-[0_1px_0_rgba(16,34,43,0.04)]"
      >
        <div className="border-b border-line bg-teal-soft/60 px-6 py-6 md:px-10 md:py-8">
          <p className="mb-2 font-mono text-[12px] tracking-[0.12em] text-teal uppercase">{m.case_label()}</p>
          <h3 id="case-title" className="font-serif text-[clamp(22px,2.8vw,32px)] leading-[1.2] font-medium text-balance">
            {m.case_title()}
          </h3>
          <p className="mt-2 font-mono text-[12.5px] text-muted">{m.case_meta()}</p>
        </div>
        <div className="grid gap-10 px-6 py-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:px-10 md:py-10">
          <dl className="flex flex-col gap-6">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="mb-1.5 font-mono text-[11.5px] tracking-[0.12em] text-teal uppercase">{row.label}</dt>
                <dd className="text-[15.5px] leading-[1.65] text-pretty text-muted [&_strong]:text-ink">
                  {typeof row.message === 'string' ? row.message : <RichText message={row.message} />}
                </dd>
              </div>
            ))}
          </dl>
          <LeadTimeChart />
        </div>
      </article>
    </Reveal>
  )
}

/** Before/after bars: "after" shrinks from full width to 33% the first time the chart scrolls into view. */
function LeadTimeChart() {
  return (
    <figure className="self-start rounded-2xl border border-line bg-paper p-5 md:p-6">
      <figcaption className="mb-5 font-mono text-[12px] tracking-[0.08em] text-ink uppercase">
        {m.case_chart_title()}
      </figcaption>
      <div className="flex flex-col gap-4 text-[13.5px]">
        <div>
          <div className="mb-1.5 flex justify-between font-medium">
            <span>{m.case_chart_before()}</span>
            <span className="font-mono text-muted">100%</span>
          </div>
          <span className="block h-3 rounded-full bg-ink/15" />
        </div>
        <div>
          <div className="mb-1.5 flex justify-between font-medium">
            <span>{m.case_chart_after()}</span>
            <span className="font-mono text-muted">33%</span>
          </div>
          <span className="relative block h-3 rounded-full bg-ink/[0.04]">
            <motion.span
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0.33 }}
              viewport={{ ...VIEWPORT, amount: 0.8 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="absolute inset-0 origin-left rounded-full bg-teal"
            />
          </span>
        </div>
      </div>
      <p className="mt-6 flex items-baseline gap-2">
        <span className="font-mono text-[34px] leading-none font-medium text-ink">−67%</span>
        <span className="font-mono text-[12px] text-muted">{m.impact_lead_time_note()}</span>
      </p>
    </figure>
  )
}
