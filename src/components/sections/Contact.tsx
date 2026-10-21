import { Reveal, RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { RichText } from '#/components/ui/RichText'
import { Section } from '#/components/ui/Section'
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

export function Contact() {
  return (
    <Section id="kontak" className="border-t-3 border-ink bg-ink text-cream">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-9">
        <Reveal direction="left">
          <h2 className="mb-4 font-heading font-semibold text-[clamp(30px,4.4vw,54px)] leading-none tracking-[-0.03em]">
            {m.contact_heading_line1()}
            <br />
            {m.contact_heading_line2()}
            <br />
            {m.contact_heading_line3()}
          </h2>
          <p className="max-w-[34ch] text-[16px] leading-[1.6] text-pretty">
            <RichText message={m.contact_body} />
          </p>
        </Reveal>

        <RevealGroup stagger={0.12} delay={0.15} className="flex flex-col gap-3.5">
          {CONTACT_LINKS.map((link) => (
            // The link keeps its CSS `lift` hover transform, so the motion wrapper stays outside it.
            <RevealItem key={link.href} direction="right">
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener' } : {})}
                className="lift flex items-center justify-between gap-3.5 rounded-[14px] border-3 border-cream bg-cream px-[22px] py-[18px] text-[15px] font-bold text-ink hover:text-ink shadow-soft"
              >
                <span>{link.label}</span>
                <span className="font-heading font-semibold">→</span>
              </a>
            </RevealItem>
          ))}
          <RevealItem direction="right">
            <p className="mt-2 text-[14.5px] font-semibold opacity-80">Bekasi, Indonesia 17411</p>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  )
}
