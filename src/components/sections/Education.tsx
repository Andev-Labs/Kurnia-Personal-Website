import { ProgramGallery } from '#/components/gallery/ProgramGallery'
import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { RichText } from '#/components/ui/RichText'
import { Section, SectionHeading } from '#/components/ui/Section'
import { m } from '#/paraglide/messages.js'

const CARD = 'rounded-[20px] border border-line bg-surface p-6 md:p-8'

export function Education() {
  return (
    <Section id="pendidikan" labelledBy="pendidikan-heading" className="border-t border-line">
      <SectionHeading id="pendidikan-heading" number="04">
        {m.education_heading()}
      </SectionHeading>

      <RevealGroup className="grid gap-5 lg:grid-cols-2">
        <RevealItem className={CARD}>
          <p className="mb-3 font-mono text-[13px] text-muted">{m.education_bachelor_period()}</p>
          <h3 className="font-serif text-[22px] leading-[1.25] font-medium">{m.education_bachelor_degree()}</h3>
          <p className="mt-1 mb-5 text-[15px] font-medium text-teal">Binawan University</p>
          {/*
           * TODO(Kurnia): confirm the status sentence below ("SKL issued, graduation December 2026") and make it
           * match the CV, which only says "2022–2026". Kept as-is until confirmed.
           */}
          <p className="mb-5 text-[15px] leading-[1.65] text-pretty text-muted [&_strong]:text-ink">
            <RichText message={m.education_bachelor_status} />
          </p>
          <div className="rounded-xl bg-paper p-4">
            <p className="mb-1.5 font-mono text-[11.5px] tracking-[0.12em] text-teal uppercase">
              {m.education_thesis_label()}
            </p>
            <p className="text-[14.5px] leading-[1.6] text-pretty">{m.education_thesis_title()}</p>
          </div>
        </RevealItem>

        <RevealItem className={CARD}>
          <p className="mb-3 font-mono text-[13px] text-muted">{m.education_vocational_period()}</p>
          <h3 className="font-serif text-[22px] leading-[1.25] font-medium">{m.education_vocational_major()}</h3>
          <p className="mt-1 mb-5 text-[15px] font-medium text-teal">SMK-SMAK Bogor</p>
          <ul className="flex flex-col gap-3 text-[15px] leading-[1.65] text-pretty text-muted [&_strong]:text-ink">
            <li>
              <RichText message={m.education_vocational_certificate} />
            </li>
            <li>
              <RichText message={m.education_vocational_dual_system} />
            </li>
          </ul>
        </RevealItem>

        <RevealItem className={`${CARD} lg:col-span-2`}>
          <h3 className="mb-4 font-serif text-[22px] font-medium">{m.education_international_heading()}</h3>
          <ul className="flex flex-col gap-3 text-[15px] leading-[1.65] text-pretty text-muted [&_strong]:text-ink">
            <li>
              <RichText message={m.education_international_sechenov} />
            </li>
            <li>
              <RichText message={m.education_international_cpu} />
            </li>
          </ul>
          <ProgramGallery />
        </RevealItem>
      </RevealGroup>
    </Section>
  )
}
