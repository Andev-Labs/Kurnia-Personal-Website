import { Section } from '#/components/ui/Section'
import { cn } from '#/lib/cn'

const CONTACT_LINKS = [
  {
    href: 'mailto:kurniadewi2003@gmail.com',
    label: 'kurniadewi2003@gmail.com',
    shadowClassName: 'shadow-[5px_5px_0_var(--color-pink)] [--press-shadow:var(--color-pink)]',
    external: false,
  },
  {
    href: 'https://linkedin.com/in/kurnia-dewi-budicantika-27b1a9216',
    label: 'LinkedIn',
    shadowClassName: 'shadow-[5px_5px_0_var(--color-teal)] [--press-shadow:var(--color-teal)]',
    external: true,
  },
]

export function Contact() {
  return (
    <Section id="kontak" className="border-t-3 border-ink bg-ink text-cream">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-9">
        <div>
          <h2 className="mb-4 font-display text-[clamp(30px,4.4vw,54px)] leading-none tracking-[-0.03em]">
            MARI
            <br />
            BEKERJA
            <br />
            SAMA.
          </h2>
          <p className="max-w-[34ch] text-[16px] leading-[1.6] text-pretty">
            Terbuka untuk peran <strong>QC, analytical development, dan quality assurance</strong> di industri farmasi.
          </p>
        </div>

        <div className="flex flex-col gap-3.5">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
              className={cn(
                'press-sm flex items-center justify-between gap-3.5 rounded-[14px] border-3 border-cream bg-cream px-[22px] py-[18px] text-[15px] font-bold text-ink hover:text-ink',
                link.shadowClassName,
              )}
            >
              <span>{link.label}</span>
              <span className="font-display">→</span>
            </a>
          ))}
          <p className="mt-2 text-[14.5px] font-semibold opacity-80">Bekasi, Indonesia 17411</p>
        </div>
      </div>
    </Section>
  )
}
