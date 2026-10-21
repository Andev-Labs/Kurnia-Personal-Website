import type { ReactNode } from 'react'

import { ProgramCover } from '#/components/gallery/ProgramCover'
import { Mascot } from '#/components/mascot/Mascot'
import { Reveal, RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { RichText } from '#/components/ui/RichText'
import type { RichMessage } from '#/components/ui/RichText'
import { Section, SectionHeader } from '#/components/ui/Section'
import { Tag, TagList } from '#/components/ui/Tag'
import type { ProgramId } from '#/data/gallery'
import { m } from '#/paraglide/messages.js'

export function Education() {
  return (
    <Section id="pendidikan">
      <SectionHeader number="04" title={m.education_heading()} mascot={<Mascot pose="grad" />} />

      {/* Two schools side by side at the same height; the tinted callout at the bottom of each absorbs the difference. */}
      <RevealGroup stagger={0.12} className="grid gap-5 md:grid-cols-2 lg:gap-6">
        <SchoolCard
          period={m.education_bachelor_period()}
          periodClassName="bg-butter-100 text-[#7a5a00]"
          title={m.education_bachelor_degree()}
          school="Binawan University"
        >
          {/*
           * TODO(Kurnia): confirm the status sentence below ("SKL issued, graduation December 2026") and make it
           * match the CV, which only says "Binawan University, 2022–2026". Kept as-is until confirmed.
           */}
          <p className="text-pretty">
            <RichText message={m.education_bachelor_status} />
          </p>
          <div className="flex-1 rounded-2xl bg-lavender-50 p-4">
            <strong className="mb-[5px] block font-heading font-semibold text-[12.5px] tracking-[0.04em] text-violet">
              {m.education_thesis_label()}
            </strong>
            <p className="text-pretty">{m.education_thesis_title()}</p>
            <TagList className="mt-3 [&>*]:bg-white">
              <Tag>{m.education_extraction_maceration()}</Tag>
              <Tag>{m.education_extraction_ultrasonic()}</Tag>
            </TagList>
          </div>
        </SchoolCard>

        <SchoolCard
          period={m.education_vocational_period()}
          periodClassName="bg-mint-100 text-[#1f6b51]"
          title={m.education_vocational_major()}
          school="SMK-SMAK Bogor"
        >
          <p className="text-pretty">
            <RichText message={m.education_vocational_dual_system} />
          </p>
          <p className="flex-1 rounded-2xl bg-mint-100/60 p-4 text-pretty">
            <RichText message={m.education_vocational_certificate} />
          </p>
        </SchoolCard>
      </RevealGroup>

      <Reveal className="mt-5 rounded-card-lg bg-[linear-gradient(150deg,var(--color-violet)_0%,var(--color-lavender-800)_100%)] p-6 text-white shadow-soft md:p-8 lg:mt-6 print-plain">
        <h3 className="mb-5 font-heading font-semibold text-[19px]">{m.education_international_heading()}</h3>
        <div className="grid gap-5 md:grid-cols-2 lg:gap-6">
          <ProgramCard program="sechenov" message={m.education_international_sechenov} />
          <ProgramCard program="cpu" message={m.education_international_cpu} />
        </div>
      </Reveal>
    </Section>
  )
}

interface SchoolCardProps {
  period: string
  periodClassName: string
  title: string
  school: string
  children: ReactNode
}

function SchoolCard({ period, periodClassName, title, school, children }: SchoolCardProps) {
  return (
    <RevealItem className="flex flex-col rounded-card-lg bg-white p-[26px] shadow-soft">
      <span className={`mb-3.5 self-start rounded-full px-[13px] py-[7px] text-[12.5px] font-bold ${periodClassName}`}>
        {period}
      </span>
      <h3 className="mb-1.5 font-heading font-semibold text-[20px] leading-[1.2]">{title}</h3>
      <p className="mb-4 text-[14.5px] font-bold text-violet">{school}</p>
      <div className="flex flex-1 flex-col gap-3 text-[15px] leading-[1.6]">{children}</div>
    </RevealItem>
  )
}

function ProgramCard({ program, message }: { program: ProgramId; message: RichMessage }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 md:p-5 print:bg-transparent print:p-0">
      <ProgramCover program={program} />
      <p className="text-[15px] leading-[1.6] text-pretty">
        <RichText message={message} />
      </p>
    </div>
  )
}
