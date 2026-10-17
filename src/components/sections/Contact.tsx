import { useEffect, useState } from 'react'

import { Reveal } from '#/components/motion/Reveal'
import { CvButton } from '#/components/ui/CvButton'
import { RichText } from '#/components/ui/RichText'
import { EMAIL, LINKEDIN_URL, WHATSAPP } from '#/data/site'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

const ROW =
  'group flex items-center justify-between gap-4 border-b border-paper/15 py-4 text-[clamp(16px,1.8vw,19px)] font-medium transition-colors duration-200 hover:text-amber'

export function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      // Clipboard blocked (insecure context or denied): the mailto link next to the button still works.
    }
  }

  return (
    <section id="kontak" aria-labelledby="kontak-heading" className="page-x bg-ink py-20 text-paper md:py-28">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16">
        <Reveal>
          <p aria-hidden="true" className="mb-3 font-mono text-[12px] tracking-[0.12em] text-amber uppercase">
            07
          </p>
          <h2 id="kontak-heading" className="font-serif text-[clamp(34px,5vw,60px)] leading-[1.05] font-medium tracking-[-0.02em]">
            {m.contact_heading()}
          </h2>
          <p className="mt-5 max-w-[40ch] text-[17px] leading-[1.65] text-pretty text-paper/80 [&_strong]:text-paper">
            <RichText message={m.contact_body} />
          </p>
          <CvButton className="mt-8" />
        </Reveal>

        <Reveal delay={0.1} className="self-end">
          <ul className="border-t border-paper/15">
            <li className="flex items-center gap-3 border-b border-paper/15">
              <a href={`mailto:${EMAIL}`} className={cn(ROW, 'min-w-0 flex-1 border-b-0')}>
                <span className="truncate">{EMAIL}</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="flex-none cursor-pointer rounded-full border border-paper/25 px-3 py-1.5 font-mono text-[12px] text-paper/85 transition-colors duration-200 hover:border-amber hover:text-amber"
              >
                {m.contact_copy_email()}
              </button>
            </li>
            <li>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener" className={ROW}>
                LinkedIn <span aria-hidden="true" className="arrow-nudge">↗</span>
              </a>
            </li>
            {WHATSAPP.enabled && WHATSAPP.number && (
              <li>
                <a href={`https://wa.me/${WHATSAPP.number}`} target="_blank" rel="noopener" className={ROW}>
                  {m.contact_whatsapp()} <span aria-hidden="true" className="arrow-nudge">↗</span>
                </a>
              </li>
            )}
          </ul>
          <p className="mt-5 font-mono text-[13px] text-paper/70">{m.contact_location()}</p>
        </Reveal>
      </div>

      {/* Polite live region: announces the toast to screen readers without stealing focus. */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-70 flex justify-center">
        <span
          className={cn(
            'rounded-full bg-paper px-4 py-2 text-[14px] font-medium text-ink shadow-xl transition-[opacity,transform] duration-300 ease-out-soft',
            copied ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          )}
        >
          {copied ? `✓ ${m.contact_copied()}` : ''}
        </span>
      </div>
    </section>
  )
}
