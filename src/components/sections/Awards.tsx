import { useId, useState } from 'react'
import type { ReactNode } from 'react'

import { Mascot } from '#/components/mascot/Mascot'
import { Reveal, RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { buttonClassName } from '#/components/ui/Button'
import { RichText } from '#/components/ui/RichText'
import type { RichMessage } from '#/components/ui/RichText'
import { Section, SectionHeader } from '#/components/ui/Section'
import { EFSET_URL, PAPER_DOI, PAPER_URL } from '#/data/site'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

interface Certification {
  year: string
  message: RichMessage
  /** Public verification page, if the issuer has one. */
  href?: string
}

/** Newest first. */
function getCertifications(): Certification[] {
  return [
    // TODO(Kurnia): review terjemahan judul pelatihan Ioda Academy (en/zh/ru).
    { year: '2026', message: m.awards_cert_ioda },
    { year: '2026', message: m.awards_cert_efset, href: EFSET_URL },
    { year: '2022–2025', message: m.awards_cert_vendor },
    { year: '2024', message: m.awards_cert_gdp },
    { year: '2023', message: m.awards_cert_ipsw },
    { year: '2023', message: m.awards_cert_jgu },
    { year: '2022', message: m.awards_cert_allround },
    { year: '2022', message: m.awards_cert_bnsp },
    { year: '2018–2021', message: m.awards_cert_lsp },
  ]
}

export function Awards() {
  return (
    <Section id="penghargaan">
      <SectionHeader
        number="05"
        title={m.awards_heading()}
        mascot={
          <>
            <Confetti />
            <Mascot pose="trophy" className="relative" />
          </>
        }
      />

      {/* Same-height cards: each award's icon panel takes up the slack, so no card ends in blank space. */}
      <RevealGroup stagger={0.12} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <RevealItem className="flex flex-col rounded-card bg-butter-100 p-6 shadow-soft">
          <AwardIconPanel>
            <svg viewBox="0 0 64 64" className="block size-20" aria-hidden="true">
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
          </AwardIconPanel>
          <h3 className="mb-2.5 font-heading font-semibold text-[16.5px] leading-[1.3]">{m.awards_qcc_title()}</h3>
          <p className="text-[14.5px] leading-[1.6] text-pretty">
            <RichText message={m.awards_qcc_body} />
          </p>
        </RevealItem>

        <RevealItem className="flex flex-col rounded-card bg-mint-100 p-6 shadow-soft">
          <AwardIconPanel>
            <svg viewBox="0 0 64 64" className="block size-20" aria-hidden="true">
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
          </AwardIconPanel>
          <h3 className="mb-2.5 font-heading font-semibold text-[16.5px] leading-[1.3]">
            {m.awards_cpu_title()} <span className="text-ink-soft">(2023)</span>
          </h3>
          <p className="text-[14.5px] leading-[1.6] text-pretty">{m.awards_cpu_body()}</p>
        </RevealItem>

        <RevealItem className="flex flex-col rounded-card bg-lavender-100 p-6 shadow-soft md:col-span-2 lg:col-span-1">
          <span className="mb-4 self-start rounded-full bg-white px-[13px] py-[7px] font-heading font-semibold text-[12px] text-violet shadow-soft-sm">
            {m.awards_publication_badge()}
          </span>
          <h3 className="mb-2.5 font-heading font-semibold text-[16.5px] leading-[1.35]">
            “Effects of Yeast Weight and Starter Volume on The Percentage Kepok Banana Based Bioethanol”
          </h3>
          <p className="mb-1.5 text-[13.5px] font-semibold text-ink-soft">
            Kurnia Dewi Budi Cantika, Anisa Sinta Nabila, Difa Afiyah Sucisatryani
          </p>
          <p className="mb-1.5 text-[14.5px] leading-[1.6] text-pretty">
            <RichText message={m.awards_publication_journal} />
          </p>
          <p className="mb-5 text-[13px] font-bold [overflow-wrap:anywhere] text-violet">DOI: {PAPER_DOI}</p>
          <a
            href={PAPER_URL}
            target="_blank"
            rel="noopener"
            className={buttonClassName('primary', 'mt-auto self-start px-[22px] py-[13px] text-[13.5px]')}
          >
            {m.awards_publication_cta()} <span className="text-[15px]">↗</span>
          </a>
        </RevealItem>
      </RevealGroup>

      <Reveal className="mt-5 rounded-card-lg bg-white p-6 shadow-soft md:p-8 lg:mt-6">
        <Certifications />
      </Reveal>
    </Section>
  )
}

/** Rows shown before "Show all". Print always lists every row. */
const VISIBLE_CERTIFICATIONS = 5

function Certifications() {
  const [isExpanded, setIsExpanded] = useState(false)
  const listId = useId()
  const certifications = getCertifications()
  const hasMore = certifications.length > VISIBLE_CERTIFICATIONS

  return (
    <>
      <h3 className="mb-4 font-heading font-semibold text-[19px]">{m.awards_certifications_title()}</h3>
      {/* Two newspaper-style columns on desktop, so the list reads top to bottom, newest first. */}
      <ul id={listId} className="gap-x-10 lg:columns-2">
        {certifications.map((cert, index) => (
          <li
            key={index}
            className={cn(
              'grid break-inside-avoid gap-1.5 border-b border-lavender-100 py-3.5 sm:grid-cols-[104px_minmax(0,1fr)] sm:gap-4',
              !isExpanded && index >= VISIBLE_CERTIFICATIONS && 'hidden print:grid',
            )}
          >
            <span className="self-start justify-self-start rounded-full bg-lavender-50 px-3 py-1 text-[12.5px] font-bold whitespace-nowrap text-violet">
              {cert.year}
            </span>
            <p className="text-[14.5px] leading-[1.6] text-pretty text-ink-soft [&_strong]:text-ink">
              <RichText message={cert.message} />
              {cert.href ? (
                <>
                  {' '}
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener"
                    className="font-bold whitespace-nowrap text-violet underline decoration-lavender underline-offset-4 hover:decoration-violet"
                  >
                    {m.awards_verify()} <span aria-hidden="true">↗</span>
                  </a>
                </>
              ) : null}
            </p>
          </li>
        ))}
      </ul>
      {hasMore ? (
        <button
          type="button"
          onClick={() => setIsExpanded((expanded) => !expanded)}
          aria-expanded={isExpanded}
          aria-controls={listId}
          className={buttonClassName('secondary', 'mt-5 px-5 py-3 text-[14px] print:hidden')}
        >
          {isExpanded ? m.awards_certifications_show_less() : m.awards_certifications_show_all()}
          <svg viewBox="0 0 12 12" aria-hidden="true" className={cn('size-3 transition-transform', isExpanded && 'rotate-180')}>
            <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ) : null}
    </>
  )
}

/** Tinted panel holding an award's icon; it grows to fill whatever height the row gives the card. */
function AwardIconPanel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 grid min-h-[112px] flex-1 place-items-center rounded-2xl bg-white/55">{children}</div>
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
