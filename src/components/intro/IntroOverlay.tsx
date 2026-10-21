import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

import { Mascot } from '#/components/mascot/Mascot'
import {
  INTRO_BOOT_SCRIPT,
  INTRO_TIMING,
  SKIP_SPEED,
  coverRadius,
  flightKeyframes,
  introStart,
  isMostlyInViewport,
  isSkipKey,
} from '#/lib/intro'
import type { Box } from '#/lib/intro'

/** Hero element Kapsi lands on. Hidden by CSS while the intro plays. */
export const INTRO_TARGET_SELECTOR = '[data-intro-target]'

const WELCOME = 'Welcome!'

const CURTAIN_SPARKLES = [
  { top: '14%', left: '12%', size: 26, color: 'text-butter', delay: 0.05 },
  { top: '22%', left: '82%', size: 20, color: 'text-violet/60', delay: 0.15 },
  { top: '70%', left: '8%', size: 18, color: 'text-bubblegum', delay: 0.25 },
  { top: '78%', left: '86%', size: 28, color: 'text-butter', delay: 0.1 },
  { top: '8%', left: '56%', size: 14, color: 'text-mint', delay: 0.3 },
] as const

const CURTAIN_DOTS = [
  { top: '32%', left: '6%', size: 12, color: 'bg-bubblegum/70', delay: 0.1 },
  { top: '12%', left: '34%', size: 8, color: 'bg-violet/40', delay: 0.2 },
  { top: '86%', left: '40%', size: 10, color: 'bg-butter/80', delay: 0.05 },
  { top: '58%', left: '92%', size: 9, color: 'bg-violet/35', delay: 0.3 },
] as const

/** Directions of the little sparkle burst when Kapsi lands. */
const BURST = [
  [-46, -30],
  [44, -36],
  [-34, 30],
  [40, 26],
  [0, -52],
] as const

type Phase = 'playing' | 'exiting' | 'landing' | 'done'

function toBox(rect: DOMRect): Box {
  return { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
}

/** Ends the intro on `<html>`: unlocks scroll and reveals the Hero Kapsi. */
function releasePage() {
  const root = document.documentElement
  const timer = Number(root.getAttribute('data-intro-timer'))
  if (timer) window.clearTimeout(timer)
  root.removeAttribute('data-intro')
  root.removeAttribute('data-intro-start')
  root.removeAttribute('data-intro-timer')
}

/**
 * "Kapsi Says Hi": a ~2.4s welcome played on every full page load. The markup and entry animation are
 * pure CSS so they run before hydration; JS only drives Kapsi's flight to the Hero and skipping.
 */
export function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>('playing')
  const [landingAt, setLandingAt] = useState<{ x: number; y: number } | null>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const kapsiRef = useRef<HTMLDivElement>(null)
  const exitingRef = useRef(false)
  const timersRef = useRef<number[]>([])

  const later = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms))
  }, [])

  const finish = useCallback(() => {
    releasePage()
    setPhase('done')
  }, [])

  const exit = useCallback(
    (speed = 1) => {
      if (exitingRef.current) return
      exitingRef.current = true
      setPhase('exiting')

      const kapsi = kapsiRef.current
      const curtain = curtainRef.current
      if (!kapsi || !curtain) return finish()

      const vw = window.innerWidth
      const vh = window.innerHeight
      const from = toBox(kapsi.getBoundingClientRect())
      const holeX = from.left + from.width / 2
      const holeY = from.top + from.height / 2

      // The curtain opens as a growing circle centred on Kapsi.
      curtain.style.setProperty('--intro-hole-x', `${holeX}px`)
      curtain.style.setProperty('--intro-hole-y', `${holeY}px`)
      curtain.style.setProperty('--intro-hole-ms', `${Math.round(700 * speed)}ms`)
      requestAnimationFrame(() => {
        curtain.style.setProperty('--intro-hole', `${coverRadius(holeX, holeY, vw, vh)}px`)
      })

      const target = document.querySelector<HTMLElement>(INTRO_TARGET_SELECTOR)
      const targetBox = target ? toBox(target.getBoundingClientRect()) : null
      const canAnimate = typeof kapsi.animate === 'function'

      if (!canAnimate) return later(finish, Math.round(700 * speed))

      if (target && targetBox && isMostlyInViewport(targetBox, vw, vh)) {
        const flight = kapsi.animate(flightKeyframes(from, targetBox), {
          duration: Math.round(INTRO_TIMING.flight * speed),
          easing: 'cubic-bezier(0.45, 0, 0.25, 1)',
          fill: 'forwards',
        })
        flight.onfinish = () => {
          releasePage()
          target.classList.add('intro-landed')
          setLandingAt({ x: targetBox.left + targetBox.width / 2, y: targetBox.top + targetBox.height / 2 })
          setPhase('landing')
          later(() => {
            target.classList.remove('intro-landed')
            setPhase('done')
          }, INTRO_TIMING.landing)
        }
        return
      }

      // The Hero is scrolled away (e.g. restored scroll on refresh): Kapsi just shrinks away in place.
      const vanish = kapsi.animate(
        [
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(0)', opacity: 0 },
        ],
        { duration: Math.round(INTRO_TIMING.vanish * speed), easing: 'cubic-bezier(0.55, 0, 1, 0.45)', fill: 'forwards' },
      )
      vanish.onfinish = () => later(finish, Math.round(300 * speed))
    },
    [finish, later],
  )

  useEffect(() => {
    const root = document.documentElement
    // Reduced motion, a language switch, or a page that took too long to hydrate.
    if (root.getAttribute('data-intro') !== 'playing') {
      setPhase('done')
      return
    }

    const started = Number(root.getAttribute('data-intro-start')) || 0
    const { action, delay } = introStart(performance.now() - started)
    if (action === 'gone') {
      finish()
      return
    }
    if (action === 'exit') exit()
    else later(() => exit(), delay)

    const skip = () => exit(SKIP_SPEED)
    const onKey = (event: KeyboardEvent) => {
      if (isSkipKey(event.key)) skip()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('touchstart', skip, { passive: true })

    const timers = timersRef.current
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchstart', skip)
      for (const id of timers) window.clearTimeout(id)
    }
  }, [exit, finish, later])

  // Covers every way the intro ends, including when it never played.
  useEffect(() => {
    if (phase === 'done') releasePage()
  }, [phase])

  if (phase === 'done') return null

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
      <div
        data-testid="intro"
        data-state={phase}
        className="intro fixed inset-0 z-[100] print:hidden"
        onClick={() => exit(SKIP_SPEED)}
      >
        <div
          ref={curtainRef}
          aria-hidden="true"
          className="intro-curtain absolute inset-0 bg-[linear-gradient(150deg,var(--color-lavender-100)_0%,#f1e4f8_50%,var(--color-blush)_100%)]"
        >
          {CURTAIN_SPARKLES.map((s) => (
            <span
              key={`${s.top}-${s.left}`}
              className={`intro-pop-in absolute leading-none ${s.color}`}
              style={{ top: s.top, left: s.left, fontSize: s.size, animationDelay: `${s.delay}s` }}
            >
              <span className="block animate-twinkle">✦</span>
            </span>
          ))}
          {CURTAIN_DOTS.map((d) => (
            <span
              key={`${d.top}-${d.left}`}
              className={`intro-pop-in absolute rounded-full ${d.color}`}
              style={{ top: d.top, left: d.left, width: d.size, height: d.size, animationDelay: `${d.delay}s` }}
            />
          ))}
        </div>

        <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <div ref={kapsiRef} className="intro-kapsi relative w-[clamp(120px,34vw,176px)]">
            <div className="intro-rise">
              <Mascot pose="wave" className="block w-full drop-shadow-[0_14px_18px_rgb(91_63_224/0.25)]" />
            </div>
            <p className="intro-bubble absolute bottom-[78%] left-[72%] w-max rounded-2xl rounded-bl-[6px] bg-white px-3.5 py-2 font-heading font-semibold text-[clamp(14px,3.6vw,17px)] text-ink shadow-soft">
              Hi there!
            </p>
          </div>
          <div className="intro-text">
            <p className="font-heading font-semibold text-[clamp(44px,14vw,92px)] leading-none tracking-[-0.03em] text-violet">
              {[...WELCOME].map((char, i) => (
                <span key={i} className="intro-letter inline-block" style={{ '--i': i } as CSSProperties}>
                  {char}
                </span>
              ))}
            </p>
            <p className="intro-subtitle mt-3 font-heading font-medium text-[clamp(16px,4.4vw,22px)] text-ink-soft">
              to Kurnia&rsquo;s portfolio
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            exit(SKIP_SPEED)
          }}
          className="intro-skip absolute right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] rounded-full bg-white/85 px-4 py-2.5 text-[13px] font-extrabold text-violet shadow-soft-sm hover:bg-white"
        >
          Skip intro
        </button>

        {phase === 'landing' && landingAt ? (
          <div aria-hidden="true" className="pointer-events-none fixed" style={{ left: landingAt.x, top: landingAt.y }}>
            {BURST.map(([dx, dy], i) => (
              <span
                key={i}
                className="intro-burst absolute -translate-x-1/2 -translate-y-1/2 text-[18px] leading-none text-butter"
                style={{ '--dx': `${dx}px`, '--dy': `${dy}px`, animationDelay: `${i * 0.03}s` } as CSSProperties}
              >
                ✦
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </>
  )
}
