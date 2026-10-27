import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

import { Mascot } from '#/components/mascot/Mascot'
import { Reveal, RevealGroup, RevealItem } from '#/components/motion/Reveal'
import { RichText } from '#/components/ui/RichText'
import { CV_PDF_PATH, EMAIL, LINKEDIN_URL, WHATSAPP } from '#/data/site'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

interface ContactAction {
  key: string
  href: string
  label: string
  detail: string
  icon: ReactNode
  external?: boolean
  ariaLabel?: string
}

function getActions(): ContactAction[] {
  const actions: ContactAction[] = [
    { key: 'email', href: `mailto:${EMAIL}`, label: m.contact_email_label(), detail: EMAIL, icon: <MailIcon /> },
    { key: 'linkedin', href: LINKEDIN_URL, label: 'LinkedIn', detail: 'linkedin.com', icon: <LinkedInIcon />, external: true },
  ]
  // Off by default (see `WHATSAPP` in data/site.ts), so no phone number is published.
  if (WHATSAPP.enabled && WHATSAPP.number) {
    actions.push({
      key: 'whatsapp',
      href: `https://wa.me/${WHATSAPP.number}`,
      label: m.contact_whatsapp(),
      detail: 'wa.me',
      icon: <ChatIcon />,
      external: true,
    })
  }
  actions.push({
    key: 'cv',
    href: CV_PDF_PATH,
    label: m.cv_download(),
    detail: 'PDF',
    icon: <DownloadIcon />,
    external: true,
    ariaLabel: m.cv_download_label(),
  })
  return actions
}

/** The violet panel is the background itself: headline, the email as the main action, then one tile per channel. */
export function Contact() {
  const actions = getActions()

  return (
    <section id="kontak" className="page-x scroll-mt-4 pt-16 lg:pt-24">
      <div className="relative isolate overflow-hidden rounded-[36px] bg-[linear-gradient(150deg,var(--color-violet)_0%,var(--color-lavender-800)_55%,var(--color-lavender-900)_100%)] px-6 py-10 text-white sm:px-10 md:py-14 lg:px-14 print-plain print:rounded-none print:p-0">
        <span
          aria-hidden="true"
          className="absolute -top-20 -right-16 -z-10 size-72 rounded-full bg-lavender/25 blur-2xl print:hidden"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-24 -left-16 -z-10 size-72 rounded-full bg-bubblegum/20 blur-2xl print:hidden"
        />

        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
          <Reveal className="min-w-0">
            <h2 className="mb-4 font-heading font-semibold text-[clamp(34px,5.2vw,64px)] leading-[1.02] tracking-[-0.02em] text-balance">
              {m.contact_heading_line1()} {m.contact_heading_line2()}{' '}
              <span className="text-butter print:text-violet">{m.contact_heading_line3()}</span>
            </h2>
            <p className="mb-7 max-w-[46ch] text-[16.5px] leading-[1.6] text-lavender-50 text-pretty [&_strong]:text-white">
              <RichText message={m.contact_body} />
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <a
                href={`mailto:${EMAIL}`}
                className="font-heading font-semibold text-[clamp(20px,2.6vw,30px)] leading-tight text-white underline decoration-white/40 decoration-2 underline-offset-[6px] [overflow-wrap:anywhere] hover:text-white hover:decoration-butter"
              >
                {EMAIL}
              </a>
              <CopyEmailButton />
            </div>
          </Reveal>

          <Reveal direction="pop" className="justify-self-start max-lg:order-first lg:justify-self-center print:hidden">
            <Mascot pose="mail" className="h-auto w-24 drop-shadow-[0_14px_20px_rgb(20_10_60/0.35)] sm:w-28 lg:w-44 xl:w-52" />
          </Reveal>
        </div>

        <RevealGroup
          stagger={0.1}
          delay={0.1}
          className="mt-9 grid gap-3 sm:grid-cols-2 lg:mt-11 lg:auto-cols-fr lg:grid-flow-col lg:gap-4"
        >
          {actions.map((action, index) => (
            // The tile keeps its CSS hover lift, so the motion wrapper stays outside it.
            <RevealItem
              key={action.key}
              // With an odd count the last tile spans the two-column tablet row instead of sitting alone.
              className={cn(
                'min-w-0',
                actions.length % 2 === 1 && index === actions.length - 1 && 'sm:max-lg:col-span-2',
                // Print keeps only links that need their URL spelled out; the email is already printed above.
                !action.external && 'print:hidden',
              )}
            >
              <a
                href={action.href}
                aria-label={action.ariaLabel}
                {...(action.external ? { target: '_blank', rel: 'noopener' } : {})}
                className="lift flex items-center gap-3.5 rounded-2xl border border-white/20 bg-white/10 p-4 text-white transition-colors hover:border-white/40 hover:bg-white/15 hover:text-white print:block"
              >
                <span
                  aria-hidden="true"
                  className="grid size-11 flex-none place-items-center rounded-full bg-white text-violet"
                >
                  {action.icon}
                </span>
                <span className="min-w-0 print:inline">
                  <span className="block font-heading font-semibold text-[16px] leading-tight print:inline">{action.label}</span>
                  <span className="block truncate text-[13.5px] text-lavender-100 print:hidden">{action.detail}</span>
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-7 text-[14px] font-bold text-lavender-100">Bekasi, Indonesia 17411</p>
      </div>
    </section>
  )
}

type CopyStatus = 'idle' | 'copied' | 'failed'

/** Copies the address with the Clipboard API; the result is announced through a polite live region. */
export function CopyEmailButton() {
  const [status, setStatus] = useState<CopyStatus>('idle')

  useEffect(() => {
    if (status === 'idle') return
    const timer = window.setTimeout(() => setStatus('idle'), 2500)
    return () => window.clearTimeout(timer)
  }, [status])

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setStatus('copied')
    } catch {
      // No Clipboard API (old browser, insecure context) or permission denied.
      setStatus('failed')
    }
  }

  const message = status === 'copied' ? m.contact_copied() : status === 'failed' ? m.contact_copy_failed() : ''

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="lift inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2.5 font-heading text-[14px] leading-none font-semibold text-violet shadow-soft-sm hover:text-violet-deep print:hidden"
      >
        {status === 'copied' ? <CheckIcon /> : <CopyIcon />}
        {status === 'copied' ? m.contact_copied() : m.contact_copy_email()}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {message}
      </span>
    </>
  )
}

const ICON_PROPS = {
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

function MailIcon() {
  return (
    <svg {...ICON_PROPS} className="size-5">
      <rect x="2.5" y="4.5" width="15" height="11" rx="2" />
      <path d="m3 5.5 7 5.5 7-5.5" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M4.2 7.3h2.9V16H4.2zM5.65 3a1.65 1.65 0 1 1 0 3.3 1.65 1.65 0 0 1 0-3.3zM8.9 7.3h2.8v1.2h.04c.39-.74 1.34-1.5 2.76-1.5 2.95 0 3.5 1.94 3.5 4.46V16h-2.9v-4.04c0-.96-.02-2.2-1.34-2.2-1.34 0-1.55 1.05-1.55 2.13V16H8.9z" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg {...ICON_PROPS} className="size-5">
      <path d="M4 15.5 5 12a6 6 0 1 1 2.5 2.4z" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg {...ICON_PROPS} className="size-5">
      <path d="M10 3v9m0 0L6 8m4 4 4-4M4 16h12" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg {...ICON_PROPS} className="size-4">
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M13 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg {...ICON_PROPS} className="size-4">
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  )
}
