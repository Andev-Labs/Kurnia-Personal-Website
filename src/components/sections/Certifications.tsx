import { RevealGroup, RevealItem, RevealListItem } from '#/components/motion/Reveal'
import { RichText } from '#/components/ui/RichText'
import type { RichMessage } from '#/components/ui/RichText'
import { Section, SectionHeading } from '#/components/ui/Section'
import { EFSET_URL, PAPER_DOI, PAPER_URL } from '#/data/site'
import { m } from '#/paraglide/messages.js'

const LABEL = 'mb-4 font-mono text-[12px] tracking-[0.12em] text-teal uppercase'

export function Certifications() {
  const awards = [
    { year: '2025', title: m.certs_qcc_title(), body: m.certs_qcc_body() },
    { year: '2023', title: m.certs_cpu_title(), body: m.certs_cpu_body() },
  ]

  const certifications: { year: string; message: RichMessage; href?: string }[] = [
    { year: '2026', message: m.certs_efset, href: EFSET_URL },
    { year: '2022–2025', message: m.certs_vendor },
    { year: '2024', message: m.certs_gdp },
    { year: '2023', message: m.certs_ipsw },
    { year: '2023', message: m.certs_jgu },
    { year: '2022', message: m.certs_allround },
    { year: '2022', message: m.certs_bnsp },
    { year: '2018–2021', message: m.certs_lsp },
  ]

  return (
    <Section id="sertifikasi" labelledBy="sertifikasi-heading" className="border-t border-line">
      <SectionHeading id="sertifikasi-heading" number="05">
        {m.certs_heading()}
      </SectionHeading>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
        <div className="flex flex-col gap-10">
          <div>
            <h3 className={LABEL}>{m.certs_awards_label()}</h3>
            <RevealGroup className="flex flex-col gap-4">
              {awards.map((award) => (
                <RevealItem key={award.title} className="rounded-[20px] border border-line bg-surface p-6">
                  <p className="mb-2 font-mono text-[13px] text-muted">{award.year}</p>
                  <p className="font-serif text-[20px] leading-[1.3] font-medium">{award.title}</p>
                  <p className="mt-2 text-[14.5px] leading-[1.6] text-pretty text-muted">{award.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div>
            <h3 className={LABEL}>{m.certs_publication_label()}</h3>
            <RevealGroup>
              <RevealItem className="rounded-[20px] bg-teal p-6 text-paper">
                <p className="font-serif text-[19px] leading-[1.35] font-medium">
                  “Effects of Yeast Weight and Starter Volume on The Percentage Kepok Banana Based Bioethanol”
                </p>
                <p className="mt-2 text-[13.5px] text-paper/80">
                  Kurnia Dewi Budi Cantika, Anisa Sinta Nabila, Difa Afiyah Sucisatryani
                </p>
                <p className="mt-3 text-[14px] leading-[1.6] text-pretty text-paper/90">
                  <RichText message={m.certs_publication_journal} />
                </p>
                <p className="mt-2 font-mono text-[12.5px] text-paper/80">DOI: {PAPER_DOI}</p>
                <a
                  href={PAPER_URL}
                  target="_blank"
                  rel="noopener"
                  className="group mt-5 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 text-[14px] font-semibold text-teal-deep"
                >
                  {m.certs_publication_cta()} <span aria-hidden="true" className="arrow-nudge">↗</span>
                </a>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>

        <div>
          <h3 className={LABEL}>{m.certs_certifications_label()}</h3>
          <RevealGroup>
            <ul className="divide-y divide-line border-y border-line">
              {certifications.map((cert, index) => (
                <RevealListItem key={index} className="grid gap-1 py-4 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-5">
                    <span className="font-mono text-[13px] text-muted">{cert.year}</span>
                    <span className="text-[15px] leading-[1.6] text-pretty text-muted [&_strong]:font-medium [&_strong]:text-ink">
                      <RichText message={cert.message} />
                      {cert.href && (
                        <>
                          {' '}
                          <a href={cert.href} target="_blank" rel="noopener" className="link-draw font-medium whitespace-nowrap text-teal">
                            {m.certs_verify()} ↗
                          </a>
                        </>
                      )}
                    </span>
                </RevealListItem>
              ))}
            </ul>
          </RevealGroup>
        </div>
      </div>
    </Section>
  )
}
