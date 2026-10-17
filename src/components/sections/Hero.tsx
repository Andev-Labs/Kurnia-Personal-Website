import type { CSSProperties } from 'react'

import { CvButton, SECONDARY_CTA } from '#/components/ui/CvButton'
import { RichText } from '#/components/ui/RichText'
import { HERO_PORTRAIT } from '#/data/site'
import { m } from '#/paraglide/messages.js'

/** Photo column is ~40% of a 1200px row on desktop and a 96px thumbnail on phones. */
const PORTRAIT_SIZES = '(max-width: 767px) 96px, 440px'

const delay = (ms: number) => ({ '--delay': `${ms}ms` }) as CSSProperties

function portraitSrcSet(ext: 'avif' | 'webp' | 'jpg') {
  return HERO_PORTRAIT.widths.map((w) => `${HERO_PORTRAIT.base}-${w}.${ext} ${w}w`).join(', ')
}

/** Sum of Gaussian peaks sampled along x — a stylised HPLC trace. Baseline at y=110. */
const CHROMATOGRAM_PATH = (() => {
  const peaks = [
    { x: 180, h: 28, w: 14 },
    { x: 330, h: 74, w: 11 },
    { x: 470, h: 20, w: 16 },
    { x: 640, h: 92, w: 10 },
    { x: 700, h: 36, w: 12 },
    { x: 900, h: 58, w: 13 },
    { x: 1080, h: 18, w: 18 },
  ]
  const points: string[] = []
  for (let x = 0; x <= 1200; x += 4) {
    const y = peaks.reduce((acc, p) => acc - p.h * Math.exp(-((x - p.x) ** 2) / (2 * p.w ** 2)), 110)
    points.push(`${x} ${y.toFixed(1)}`)
  }
  return `M${points.join(' L')}`
})()

export function Hero() {
  return (
    <header id="atas" className="page-x relative overflow-hidden pt-10 pb-14 md:pt-20 md:pb-24">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[90px] w-full text-teal opacity-[0.16] md:h-[130px]"
      >
        <path
          d={CHROMATOGRAM_PATH}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          className="intro-draw"
          style={delay(700)}
        />
      </svg>

      <div className="relative grid items-center gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-14">
        <div className="relative w-24 md:order-last md:w-full md:max-w-[440px] md:justify-self-end">
          <div className="intro-photo overflow-hidden rounded-2xl md:rounded-[28px]" style={delay(450)}>
            <picture>
              <source type="image/avif" srcSet={portraitSrcSet('avif')} sizes={PORTRAIT_SIZES} />
              <source type="image/webp" srcSet={portraitSrcSet('webp')} sizes={PORTRAIT_SIZES} />
              <img
                src={`${HERO_PORTRAIT.base}-800.jpg`}
                srcSet={portraitSrcSet('jpg')}
                sizes={PORTRAIT_SIZES}
                width={HERO_PORTRAIT.width}
                height={HERO_PORTRAIT.height}
                alt={m.hero_portrait_alt()}
                fetchPriority="high"
                decoding="async"
                className="block aspect-[4/5] w-full bg-teal-soft object-cover"
              />
            </picture>
          </div>
          <div aria-hidden="true" className="hidden md:block">
            <Badge className="top-6 -left-6" delayMs={750}>
              HPLC ✓
            </Badge>
            <Badge className="top-[42%] -right-4" delayMs={850} driftDelay="-2s">
              GMP
            </Badge>
          </div>
          <p
            className="intro-fade absolute -bottom-4 left-4 hidden items-center gap-2 rounded-full bg-surface px-3.5 py-2 text-[13px] font-medium shadow-[0_6px_24px_rgba(16,34,43,0.12)] md:inline-flex"
            style={delay(950)}
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-teal" />
            </span>
            {m.hero_open_badge()}
          </p>
        </div>

        <div className="min-w-0">
          <p className="intro-fade mb-5 font-mono text-[13px] tracking-[0.04em] text-teal" style={delay(0)}>
            {m.hero_greeting()}
          </p>
          <h1 className="mb-6 font-serif text-[clamp(40px,7vw,84px)] leading-[1.02] font-medium tracking-[-0.03em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="intro-rise block" style={delay(80)}>
                {m.hero_title_line1()}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="intro-rise block text-teal italic" style={delay(160)}>
                {m.hero_title_line2()}
              </span>
            </span>
          </h1>
          <p
            className="intro-fade mb-8 max-w-[52ch] text-[clamp(16px,1.4vw,18px)] leading-[1.65] text-pretty text-muted [&_strong]:text-ink"
            style={delay(300)}
          >
            <RichText message={m.hero_summary} />
          </p>
          <div className="intro-fade flex flex-wrap items-center gap-3" style={delay(380)}>
            <CvButton />
            <a href="#kontak" className={SECONDARY_CTA}>
              {m.hero_cta_contact()} <span aria-hidden="true" className="arrow-nudge">→</span>
            </a>
          </div>
          <p className="intro-fade mt-6 inline-flex items-center gap-2 text-[13.5px] text-muted md:hidden" style={delay(450)}>
            <span className="size-2 rounded-full bg-teal" aria-hidden="true" />
            {m.hero_open_badge()}
          </p>
        </div>
      </div>
    </header>
  )
}

function Badge({
  className,
  delayMs,
  driftDelay = '0s',
  children,
}: {
  className: string
  delayMs: number
  driftDelay?: string
  children: string
}) {
  return (
    <span className={`intro-fade absolute ${className}`} style={delay(delayMs)}>
      <span
        className="block animate-drift rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[12.5px] shadow-[0_6px_24px_rgba(16,34,43,0.10)]"
        style={{ animationDelay: driftDelay }}
      >
        {children}
      </span>
    </span>
  )
}
