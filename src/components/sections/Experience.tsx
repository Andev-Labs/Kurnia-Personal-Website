import { WorkGallery } from '#/components/gallery/WorkGallery'
import { Bullet } from '#/components/ui/Bullet'
import type { MarkerColor } from '#/components/ui/Bullet'
import { motion } from 'framer-motion'

import { RevealGroup, RevealItem, revealVariants } from '#/components/motion/Reveal'
import { RichText } from '#/components/ui/RichText'
import type { RichMessage } from '#/components/ui/RichText'
import { Section, SectionHeading } from '#/components/ui/Section'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

type JobEntry = { marker: MarkerColor; message: RichMessage } | { chart: 'lead-time' }

interface Job {
  id: string
  role: string
  company: string
  period: string
  headerClassName: string
  entries: JobEntry[]
  /** Secondary responsibilities, hidden when the section is rendered in compact mode. */
  moreEntries?: JobEntry[]
}

const COMPANY = 'Kalbe Consumer Health (KCH), Kalbe Group'

function getJobs(): Job[] {
  return [
    {
      id: 'kch',
      role: m.experience_kch_role(),
      company: COMPANY,
      period: m.experience_kch_period(),
      headerClassName: 'bg-pink',
      entries: [
        { marker: 'sun', message: m.experience_kch_analysis },
        { marker: 'teal', message: m.experience_kch_oot_oos },
        { marker: 'lavender', message: m.experience_kch_qcc },
        { chart: 'lead-time' },
        { marker: 'pink', message: m.experience_kch_savings },
      ],
      moreEntries: [
        { marker: 'sun', message: m.experience_kch_method_transfer },
        { marker: 'teal', message: m.experience_kch_troubleshooting },
        { marker: 'lavender', message: m.experience_kch_dissolution },
        { marker: 'pink', message: m.experience_kch_working_standard },
        { marker: 'sun', message: m.experience_kch_stock_opname },
        { marker: 'teal', message: m.experience_kch_suggestion_system },
      ],
    },
    {
      id: 'kch-intern',
      role: m.experience_intern_role(),
      company: COMPANY,
      period: m.experience_intern_period(),
      headerClassName: 'bg-teal',
      entries: [
        { marker: 'lavender', message: m.experience_intern_analysis },
        { marker: 'sun', message: m.experience_intern_reagents },
        { marker: 'pink', message: m.experience_intern_stock_opname },
      ],
    },
  ]
}

export function Experience({ showAllEntries = true }: { showAllEntries?: boolean }) {
  return (
    <Section id="pengalaman" className="border-t-3 border-ink">
      <SectionHeading number="03" badgeClassName="bg-sun">
        {m.experience_heading()}
      </SectionHeading>

      <div className="flex flex-col gap-[26px]">
        {getJobs().map((job) => (
          <JobCard key={job.id} job={job} showAllEntries={showAllEntries} />
        ))}
      </div>

      <WorkGallery />
    </Section>
  )
}

/** The card rises in, then hands off to its bullet list's stagger. */
const CARD_VARIANTS = revealVariants('up')

function JobCard({ job, showAllEntries }: { job: Job; showAllEntries: boolean }) {
  const entries = showAllEntries && job.moreEntries ? [...job.entries, ...job.moreEntries] : job.entries

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={CARD_VARIANTS}
      className="overflow-hidden rounded-[20px] border-3 border-ink bg-white shadow-hard-8"
    >
      <div
        className={cn(
          'flex flex-wrap items-center justify-between gap-3 border-b-3 border-ink px-6 py-5',
          job.headerClassName,
        )}
      >
        <div>
          <h3 className="mb-1 font-display text-[clamp(17px,2vw,22px)] leading-[1.2]">{job.role}</h3>
          <p className="text-[14.5px] font-semibold">{job.company}</p>
        </div>
        <span className="rounded-full border-3 border-ink bg-cream px-3.5 py-2 text-[13px] font-bold whitespace-nowrap text-ink">
          {job.period}
        </span>
      </div>
      <RevealGroup stagger={0.07} delay={0.2} className="flex flex-col gap-3.5 p-6 text-[15.5px] leading-[1.6]">
        {entries.map((entry, index) =>
          'chart' in entry ? (
            <RevealItem key={`chart-${index}`}>
              <LeadTimeChart />
            </RevealItem>
          ) : (
            <RevealItem key={index} direction="left">
              <Bullet marker={entry.marker}>
                <RichText message={entry.message} />
              </Bullet>
            </RevealItem>
          ),
        )}
      </RevealGroup>
    </motion.article>
  )
}

function LeadTimeChart() {
  return (
    <div className="ml-[34px] rounded-[14px] border-[2.5px] border-ink bg-cream px-5 py-[18px]">
      <p className="mb-3.5 font-display text-[12.5px] tracking-[0.04em]">{m.experience_chart_title()}</p>
      <div className="flex flex-col gap-2.5 text-[13px] font-bold">
        <div className="flex items-center gap-3">
          <span className="w-[74px] flex-none">{m.experience_chart_before()}</span>
          <span className="h-6 min-w-0 flex-1 rounded-md border-[2.5px] border-ink bg-lavender" />
        </div>
        <div className="flex items-center gap-3">
          <span className="w-[74px] flex-none">{m.experience_chart_after()}</span>
          <span className="relative h-6 min-w-0 flex-1">
            <span className="absolute inset-0 rounded-md border-[2.5px] border-dashed border-ink opacity-30" />
            <span className="absolute inset-y-0 left-0 w-1/3 animate-shrink rounded-md border-[2.5px] border-ink bg-sun" />
          </span>
          <span className="flex-none font-display text-[15px]">−67%</span>
        </div>
      </div>
    </div>
  )
}
