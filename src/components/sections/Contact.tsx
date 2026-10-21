import { Mascot } from '#/components/mascot/Mascot'
import { Reveal, RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { buttonClassName } from '#/components/ui/Button'
import { RichText } from '#/components/ui/RichText'
import { m } from '#/paraglide/messages.js'

const CONTACT_LINKS = [
  {
    href: 'mailto:kurniadewi2003@gmail.com',
    label: 'kurniadewi2003@gmail.com',
    external: false,
  },
  {
    href: 'https://linkedin.com/in/kurnia-dewi-budicantika-27b1a9216',
    label: 'LinkedIn',
    external: true,
  },
]

/** A white card on a deep violet panel, after Ahead's welcome screen. */
export function Contact() {
  return (
    <section id="kontak" className="page-x py-14">
      <div className="relative isolate overflow-hidden rounded-[36px] bg-[linear-gradient(150deg,var(--color-violet)_0%,var(--color-lavender-800)_55%,var(--color-lavender-900)_100%)] px-3 py-12 sm:px-10 md:py-16 print:rounded-none print:bg-none print:p-0">
        <span
          aria-hidden="true"
          className="absolute -top-20 -right-16 -z-10 size-64 rounded-full bg-lavender/25 blur-2xl print:hidden"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-24 -left-16 -z-10 size-72 rounded-full bg-bubblegum/20 blur-2xl print:hidden"
        />

        <Reveal
          direction="pop"
          className="mx-auto grid max-w-[880px] grid-cols-1 items-center gap-8 rounded-card-lg bg-white px-5 py-6 text-center shadow-soft-lg sm:p-9 md:grid-cols-[auto_1fr] md:text-left print:block print:p-0 print:text-left"
        >
          <Mascot pose="mail" className="mx-auto h-auto w-28 md:w-36" />

          <div className="min-w-0">
            <h2 className="mb-4 font-heading font-semibold text-[clamp(28px,4vw,46px)] leading-[1.05] tracking-[-0.02em] text-balance">
              {m.contact_heading_line1()}
              <br />
              {m.contact_heading_line2()}
              <br />
              <span className="text-violet">{m.contact_heading_line3()}</span>
            </h2>
            <p className="mb-6 max-w-[42ch] text-[16px] leading-[1.6] text-ink-soft text-pretty max-md:mx-auto [&_strong]:text-ink">
              <RichText message={m.contact_body} />
            </p>

            <RevealGroup stagger={0.12} delay={0.15} className="flex flex-wrap justify-center gap-3 md:justify-start">
              {CONTACT_LINKS.map((link, index) => (
                // The link keeps its CSS `lift` hover transform, so the motion wrapper stays outside it.
                <RevealItem key={link.href} direction="pop" className="max-w-full">
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
                    className={buttonClassName(index === 0 ? 'primary' : 'secondary', 'max-w-full [overflow-wrap:anywhere]')}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden="true" className="max-[400px]:hidden">
                      →
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mt-5 text-[14px] font-bold text-ink-soft">Bekasi, Indonesia 17411</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
