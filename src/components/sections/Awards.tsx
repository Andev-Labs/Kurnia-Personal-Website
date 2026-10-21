import { Mascot } from '#/components/mascot/Mascot'
import { Reveal, RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { buttonClassName } from '#/components/ui/Button'
import { RichText } from '#/components/ui/RichText'
import { Section, SectionHeading } from '#/components/ui/Section'
import { m } from '#/paraglide/messages.js'

const PAPER_URL = 'https://journal.unpak.ac.id/index.php/he_jsac/article/view/4541/2703'

export function Awards() {
  return (
    <Section id="penghargaan">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading number="05" badgeClassName="bg-butter-100">
          {m.awards_heading()}
        </SectionHeading>
        <Reveal direction="pop" className="relative -mb-2 hidden w-24 flex-none sm:block md:w-28">
          <Confetti />
          <Mascot pose="trophy" className="relative h-auto w-full" />
        </Reveal>
      </div>

      <RevealGroup stagger={0.12} className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-[22px]">
        <RevealItem className="rounded-card bg-butter-100 p-6 shadow-soft">
          <svg viewBox="0 0 64 64" className="mb-4 block size-16" aria-hidden="true">
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="#5B3FE0"
              strokeWidth="2.5"
              strokeDasharray="9 9"
              className="origin-center animate-spin-slow [transform-box:fill-box]"
            />
            <circle cx="32" cy="32" r="17" fill="#fff" stroke="#5B3FE0" strokeWidth="2.5" />
            <text x="32" y="38" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="15" fill="#5B3FE0">
              10
            </text>
          </svg>
          <h3 className="mb-2.5 font-heading font-semibold text-[16.5px] leading-[1.3]">{m.awards_qcc_title()}</h3>
          <p className="text-[14.5px] leading-[1.6] text-pretty">
            <RichText message={m.awards_qcc_body} />
          </p>
        </RevealItem>

        <RevealItem className="rounded-card bg-lavender-50 p-6 shadow-soft">
          <svg viewBox="0 0 64 64" className="mb-4 block size-16" aria-hidden="true">
            <g className="origin-center animate-spin-slower [transform-box:fill-box]">
              <g stroke="#5B3FE0" strokeWidth="2.5">
                <line x1="32" y1="32" x2="32" y2="12" />
                <line x1="32" y1="32" x2="49" y2="43" />
                <line x1="32" y1="32" x2="15" y2="43" />
              </g>
              <circle cx="32" cy="32" r="8" fill="#3DB48A" stroke="#5B3FE0" strokeWidth="2.5" />
              <circle cx="32" cy="11" r="6" fill="#F7C52B" stroke="#5B3FE0" strokeWidth="2.5" />
              <circle cx="50" cy="44" r="6" fill="#FF9EC4" stroke="#5B3FE0" strokeWidth="2.5" />
              <circle cx="14" cy="44" r="6" fill="#B9A2F5" stroke="#5B3FE0" strokeWidth="2.5" />
            </g>
          </svg>
          <h3 className="mb-2.5 font-heading font-semibold text-[16.5px] leading-[1.3]">{m.awards_training_title()}</h3>
          <p className="mb-3.5 text-[14.5px] leading-[1.6] text-pretty">
            <RichText message={m.awards_training_hplc} />
          </p>
          <p className="text-[14.5px] leading-[1.6] text-pretty">
            <RichText message={m.awards_training_certificate} />
          </p>
        </RevealItem>

        <RevealItem className="rounded-card bg-lavender-100 p-6 shadow-soft">
          <span className="mb-4 inline-block rounded-full bg-white px-[13px] py-[7px] font-heading font-semibold text-[12px] text-violet shadow-soft-sm">
            {m.awards_publication_badge()}
          </span>
          <h3 className="mb-2.5 font-heading font-semibold text-[16.5px] leading-[1.35]">
            “Effects of Yeast Weight and Starter Volume on The Percentage Kepok Banana Based Bioethanol”
          </h3>
          <p className="mb-5 text-[14.5px] leading-[1.6] text-pretty">
            <RichText message={m.awards_publication_journal} />
          </p>
          <a
            href={PAPER_URL}
            target="_blank"
            rel="noopener"
            className={buttonClassName('primary', 'px-[22px] py-[13px] text-[13.5px]')}
          >
            {m.awards_publication_cta()} <span className="text-[15px]">↗</span>
          </a>
        </RevealItem>
      </RevealGroup>
    </Section>
  )
}

const CONFETTI_CLASS = 'absolute size-2.5 rounded-[3px] animate-twinkle print:hidden'

/** A few extra confetti pieces scattered around Kapsi's trophy pose. */
function Confetti() {
  return (
    <span aria-hidden="true">
      <span className={`${CONFETTI_CLASS} -top-2 left-1 rotate-12 bg-bubblegum`} />
      <span className={`${CONFETTI_CLASS} top-6 -left-4 -rotate-12 bg-butter [animation-delay:.6s]`} />
      <span className={`${CONFETTI_CLASS} -top-3 right-2 rotate-45 bg-mint [animation-delay:1.2s]`} />
      <span className={`${CONFETTI_CLASS} top-10 -right-4 rotate-6 bg-violet [animation-delay:1.8s]`} />
    </span>
  )
}
