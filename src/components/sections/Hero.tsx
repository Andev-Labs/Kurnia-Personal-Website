import { motion } from 'framer-motion'

import { Mascot } from '#/components/mascot/Mascot'
import { RevealGroup } from '#/components/motion/Reveal'
import { Button } from '#/components/ui/Button'
import { CvButton } from '#/components/ui/CvButton'
import { RichText } from '#/components/ui/RichText'
import { HERO_PORTRAIT } from '#/data/site'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

/** Frame caps at 380px wide; the photo sits inside 12px of white padding. */
const PORTRAIT_SIZES = '(max-width: 440px) calc(100vw - 110px), 356px'

/** Organic blob outline shared by the portrait frame and the photo inside it. */
const BLOB_RADIUS = 'rounded-[46%_54%_42%_58%/54%_44%_56%_46%]'

const EASE = [0.22, 1, 0.36, 1] as const

/*
 * Hero text and portrait are above the fold and hold the LCP, so they move without fading:
 * starting at opacity 0 would keep them invisible until hydration and delay LCP by seconds.
 */
const SLIDE_UP = {
  hidden: { y: 24 },
  visible: { y: 0, transition: { duration: 0.6, ease: EASE } },
} as const

const SETTLE = {
  hidden: { scale: 0.96 },
  visible: { scale: 1, transition: { duration: 0.6, ease: EASE } },
} as const

/** Stickers and Kapsi land on the portrait after it has faded in. */
const POP_VARIANTS = {
  hidden: { opacity: 0, scale: 0.6, y: 12 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
} as const

function portraitSrcSet(ext: 'avif' | 'webp' | 'jpg') {
  return HERO_PORTRAIT.widths.map((w) => `${HERO_PORTRAIT.base}-${w}.${ext} ${w}w`).join(', ')
}

export function Hero() {
  return (
    <header id="atas" className="page-x flex flex-1 flex-col pt-5 pb-12 md:pt-7 lg:pb-8 print:pb-6">
      <div className="relative isolate flex flex-1 flex-col justify-center overflow-hidden rounded-[36px] bg-[linear-gradient(140deg,var(--color-lavender-100)_0%,#f1e4f8_52%,var(--color-blush)_100%)] px-6 py-12 sm:px-10 md:py-16 lg:px-14 print:rounded-none print:bg-none print:p-0">
        <HeroDecorations />
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 print:grid-cols-[1fr_150px] print:gap-8">
          <RevealGroup stagger={0.12} className="@container min-w-0">
            <motion.p
              variants={SLIDE_UP}
              className="mb-5 inline-block rounded-full bg-white/80 px-4 py-2 text-[13.5px] font-bold text-violet shadow-soft-sm"
            >
              {m.hero_greeting()}
            </motion.p>
            <motion.h1
              variants={SLIDE_UP}
              className="mb-5 font-heading font-semibold text-[clamp(28px,11.5cqi,76px)] leading-[0.98] tracking-[-0.03em] text-balance [overflow-wrap:anywhere]"
            >
              {m.hero_title_line1()}
              <br />
              <span className="text-violet">{m.hero_title_line2()}</span>
            </motion.h1>
            <motion.p
              variants={SLIDE_UP}
              className="mb-8 max-w-[46ch] text-[clamp(15px,1.3vw,17.5px)] leading-[1.65] text-ink-soft text-pretty [&_strong]:text-ink"
            >
              <RichText message={m.hero_summary} />
            </motion.p>
            <motion.div variants={SLIDE_UP} className="flex flex-wrap items-center gap-3 print:hidden">
              <CvButton />
              <Button href="#kontak" variant="secondary">
                {m.hero_cta_contact()}
              </Button>
            </motion.div>
          </RevealGroup>

          <div className="flex min-w-0 justify-center">
            <RevealGroup stagger={0.15} delay={0.15} className="relative w-full max-w-[380px] pb-6 pl-6 sm:pl-10 print:p-0">
              <motion.div variants={SETTLE} className="relative">
                <span
                  aria-hidden="true"
                  className={cn('absolute inset-0 translate-x-4 translate-y-3 rotate-6 bg-lavender/60 print:hidden', BLOB_RADIUS)}
                />
                <div className={cn('relative bg-white p-3 shadow-soft-lg print:p-0', BLOB_RADIUS)}>
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
                      className={cn('block aspect-[4/5] w-full bg-lavender-50 object-cover', BLOB_RADIUS)}
                    />
                  </picture>
                </div>
              </motion.div>
              <motion.div
                variants={POP_VARIANTS}
                className="absolute top-2 right-0 rotate-6 print:hidden rounded-full bg-white px-3.5 py-2 font-heading font-semibold text-[12.5px] text-mint-700 shadow-soft-sm"
              >
                HPLC ✓
              </motion.div>
              <motion.div
                variants={POP_VARIANTS}
                className="absolute right-2 bottom-0 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[12.5px] font-bold shadow-soft print:hidden"
              >
                <span aria-hidden="true" className="size-2 rounded-full bg-mint shadow-[0_0_0_4px_rgb(61_180_138/0.18)]" />
                {m.hero_open_badge()}
              </motion.div>
              <motion.div variants={POP_VARIANTS} className="absolute -bottom-2 -left-3 w-[96px] sm:-left-6 sm:w-[118px] print:hidden">
                <p className="absolute bottom-[calc(100%-4px)] left-0 w-max max-w-[128px] rounded-2xl rounded-bl-[6px] bg-white px-3 py-2 font-heading font-semibold text-[12.5px] leading-[1.3] text-ink shadow-soft">
                  {m.hero_mascot_bubble()}
                </p>
                <Mascot pose="wave" className="block w-full drop-shadow-[0_10px_14px_rgb(91_63_224/0.22)]" />
              </motion.div>
            </RevealGroup>
          </div>
        </div>
      </div>
    </header>
  )
}

/** Sparkles, clouds and dots scattered over the gradient. Purely decorative. */
function HeroDecorations() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none print:hidden">
      <Cloud className="absolute -top-4 -left-10 w-[180px] opacity-80" />
      <Cloud className="absolute right-[8%] -bottom-6 w-[220px] opacity-70" />
      <Cloud className="absolute top-[38%] right-[44%] hidden w-[120px] opacity-50 lg:block" />
      <Sparkle className="top-[4%] right-[34%] text-[20px] text-violet/50" />
      <Sparkle className="top-[8%] right-[10%] text-[28px] text-butter [animation-delay:0.8s]" />
      <Sparkle className="bottom-[16%] left-[6%] text-[18px] text-bubblegum [animation-delay:1.6s]" />
      <Sparkle className="right-[38%] bottom-[10%] hidden text-[16px] text-violet/50 [animation-delay:2.2s] lg:block" />
      <Dot className="top-[3%] left-[52%] size-3 bg-bubblegum/70" />
      <Dot className="bottom-[4%] left-[40%] size-2 bg-violet/40 [animation-delay:0.6s]" />
      <Dot className="top-[60%] right-[6%] size-2.5 bg-butter/80 [animation-delay:1.2s]" />
    </div>
  )
}

function Sparkle({ className }: { className: string }) {
  return <span className={cn('absolute animate-twinkle leading-none', className)}>✦</span>
}

function Dot({ className }: { className: string }) {
  return <span className={cn('absolute animate-bob rounded-full', className)} />
}

function Cloud({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} fill="#fff">
      <path d="M30 52 a18 18 0 0 1 -2 -36 a22 22 0 0 1 40 -6 a16 16 0 0 1 26 12 a15 15 0 0 1 -2 30z" />
    </svg>
  )
}
