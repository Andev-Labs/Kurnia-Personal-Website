import { RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { RichText } from '#/components/ui/RichText'
import { Section, SectionHeading } from '#/components/ui/Section'
import { m } from '#/paraglide/messages.js'

const PAPER_URL = 'https://journal.unpak.ac.id/index.php/he_jsac/article/view/4541/2703'

export function Awards() {
  return (
    <Section id="penghargaan" className="border-t-3 border-ink">
      <SectionHeading number="05" badgeClassName="bg-pink">
        {m.awards_heading()}
      </SectionHeading>

      <RevealGroup stagger={0.12} className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[22px]">
        <RevealItem className="rounded-[18px] border-3 border-ink bg-sun p-6 shadow-hard-6">
          <svg viewBox="0 0 64 64" className="mb-4 block size-16" aria-hidden="true">
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="#121212"
              strokeWidth="3"
              strokeDasharray="9 9"
              className="origin-center animate-spin-slow [transform-box:fill-box]"
            />
            <circle cx="32" cy="32" r="17" fill="#fff" stroke="#121212" strokeWidth="3" />
            <text x="32" y="38" textAnchor="middle" fontFamily="Archivo Black, sans-serif" fontSize="15" fill="#121212">
              10
            </text>
          </svg>
          <h3 className="mb-2.5 font-display text-[16.5px] leading-[1.3]">{m.awards_qcc_title()}</h3>
          <p className="text-[14.5px] leading-[1.6] text-pretty">
            <RichText message={m.awards_qcc_body} />
          </p>
        </RevealItem>

        <RevealItem className="rounded-[18px] border-3 border-ink bg-white p-6 shadow-hard-6">
          <svg viewBox="0 0 64 64" className="mb-4 block size-16" aria-hidden="true">
            <g className="origin-center animate-spin-slower [transform-box:fill-box]">
              <g stroke="#121212" strokeWidth="3">
                <line x1="32" y1="32" x2="32" y2="12" />
                <line x1="32" y1="32" x2="49" y2="43" />
                <line x1="32" y1="32" x2="15" y2="43" />
              </g>
              <circle cx="32" cy="32" r="8" fill="#0FA38C" stroke="#121212" strokeWidth="3" />
              <circle cx="32" cy="11" r="6" fill="#FFD23F" stroke="#121212" strokeWidth="3" />
              <circle cx="50" cy="44" r="6" fill="#FF5C9E" stroke="#121212" strokeWidth="3" />
              <circle cx="14" cy="44" r="6" fill="#9AA3F5" stroke="#121212" strokeWidth="3" />
            </g>
          </svg>
          <h3 className="mb-2.5 font-display text-[16.5px] leading-[1.3]">{m.awards_training_title()}</h3>
          <p className="mb-3.5 text-[14.5px] leading-[1.6] text-pretty">
            <RichText message={m.awards_training_hplc} />
          </p>
          <p className="text-[14.5px] leading-[1.6] text-pretty">
            <RichText message={m.awards_training_certificate} />
          </p>
        </RevealItem>

        <RevealItem className="rounded-[18px] border-3 border-ink bg-lavender p-6 shadow-hard-6">
          <span className="mb-4 inline-block rounded-full border-3 border-ink bg-cream px-[13px] py-[7px] font-display text-[12px]">
            {m.awards_publication_badge()}
          </span>
          <h3 className="mb-2.5 font-display text-[16.5px] leading-[1.35]">
            “Effects of Yeast Weight and Starter Volume on The Percentage Kepok Banana Based Bioethanol”
          </h3>
          <p className="mb-5 text-[14.5px] leading-[1.6] text-pretty">
            <RichText message={m.awards_publication_journal} />
          </p>
          <a
            href={PAPER_URL}
            target="_blank"
            rel="noopener"
            className="press-sm inline-flex items-center gap-2.5 rounded-xl border-3 border-ink bg-cream px-[22px] py-[13px] font-display text-[13.5px] text-ink shadow-hard-4 hover:text-ink"
          >
            {m.awards_publication_cta()} <span className="text-[15px]">↗</span>
          </a>
        </RevealItem>
      </RevealGroup>
    </Section>
  )
}
