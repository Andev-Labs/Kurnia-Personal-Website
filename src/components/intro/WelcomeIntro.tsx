import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

import { Mascot } from '#/components/mascot/Mascot'
import { cn } from '#/lib/cn'
import {
  INTRO_CURTAIN_MS,
  INTRO_FALLBACK_MS,
  INTRO_FLIGHT_MS,
  clampToScreenEdge,
  flightKeyframes,
  remainingHoldMs,
  restoreIntroState,
  setIntroState,
} from '#/lib/intro'

/* The greeting is English on every locale by design, so it is not in messages/*.json. */
const WELCOME = 'Welcome!'

/** Where the overlay's Kapsi lands: the waving Kapsi in the Hero. */
const TARGET_SELECTOR = '[data-intro-target] [data-pose]'

const SCROLL_KEYS = new Set(['Escape', ' ', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'])

type Phase = 'enter' | 'exit' | 'gone'

/**
 * Full-screen welcome intro: Kapsi bounces in and waves, "Welcome!" pops in letter by letter,
 * then the curtain opens around Kapsi while it flies onto its spot in the Hero.
 *
 * The overlay is server-rendered and its entrance is pure CSS, so it plays before hydration.
 * Whether it shows at all is decided by the inline head script (`<html data-intro>`).
 */
export function WelcomeIntro() {
  const [phase, setPhase] = useState<Phase>('enter')
  const [hydrated, setHydrated] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const flyerRef = useRef<HTMLDivElement>(null)

  // Runs before paint, so the overlay and the hidden Hero Kapsi never flash if `data-intro` was wiped.
  useLayoutEffect(() => {
    if (restoreIntroState() !== 'play') {
      setPhase('gone')
      return
    }
    const paintedFor = paintedForMs()
    // Hydrated so late that the CSS fallback has already hidden the overlay: just hand over.
    if (paintedFor >= INTRO_FALLBACK_MS) {
      setIntroState('done')
      setPhase('gone')
      return
    }
    setHydrated(true)
    const timer = window.setTimeout(() => setPhase('exit'), remainingHoldMs(paintedFor))
    return () => window.clearTimeout(timer)
  }, [])

  // Any attempt to scroll, Esc or a click skips straight to the hand-off.
  useEffect(() => {
    if (phase !== 'enter' || !hydrated) return
    const skip = (event: Event) => {
      if (event instanceof KeyboardEvent) {
        if (!SCROLL_KEYS.has(event.key) || event.target instanceof HTMLButtonElement) return
      }
      if (event.cancelable) event.preventDefault()
      setPhase('exit')
    }
    const options = { passive: false } as const
    window.addEventListener('wheel', skip, options)
    window.addEventListener('touchmove', skip, options)
    window.addEventListener('keydown', skip)
    return () => {
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchmove', skip)
      window.removeEventListener('keydown', skip)
    }
  }, [phase, hydrated])

  useEffect(() => {
    if (phase !== 'exit') return
    let cancelled = false
    const finish = () => {
      if (cancelled) return
      setIntroState('done')
      setPhase('gone')
    }
    playExit(rootRef.current, flyerRef.current).then(finish, finish)
    return () => {
      cancelled = true
    }
  }, [phase])

  if (phase === 'gone') return null

  return (
    <div
      ref={rootRef}
      className="kapsi-intro print:hidden"
      data-phase={phase}
      data-hydrated={hydrated ? '' : undefined}
      onClick={() => setPhase((current) => (current === 'enter' ? 'exit' : current))}
    >
      <div aria-hidden="true" className="kapsi-intro__curtain">
        <IntroDecorations />
        <div className="kapsi-intro__text">
          <p className="kapsi-intro__title font-heading">
            {Array.from(WELCOME).map((char, i) => (
              <span key={i} className="kapsi-intro__letter" style={{ '--i': i } as CSSProperties}>
                {char}
              </span>
            ))}
          </p>
          <p className="kapsi-intro__subtitle">to Kurnia&rsquo;s portfolio</p>
        </div>
      </div>

      {/* Kapsi sits above the curtain, so the opening curtain never masks it mid-flight. */}
      <div aria-hidden="true" className="kapsi-intro__kapsi">
        <span className="kapsi-intro__ring" />
        <p className="kapsi-intro__bubble font-heading">Hi there! 👋</p>
        <div ref={flyerRef} className="kapsi-intro__flyer">
          <div className="kapsi-intro__drop">
            <Mascot pose="wave" className="block w-full drop-shadow-[0_14px_18px_rgb(91_63_224/0.25)]" />
          </div>
        </div>
      </div>

      <button
        type="button"
        className={cn(
          'kapsi-intro__skip rounded-full bg-white/85 px-4 py-2 text-[13px] font-bold text-violet shadow-soft-sm',
          'hover:bg-white',
        )}
        onClick={(event) => {
          event.stopPropagation()
          setPhase('exit')
        }}
      >
        Skip intro
      </button>
    </div>
  )
}

/** Time since the page first painted, i.e. since the CSS entrance started. */
function paintedForMs(): number {
  const paint = performance.getEntriesByName?.('first-contentful-paint')[0]
  return performance.now() - (paint?.startTime ?? 0)
}

/**
 * Opens the curtain around Kapsi and flies it onto the Hero mascot. Resolves when both are done.
 * If the Hero mascot is off screen, Kapsi flies off the nearest edge toward it instead.
 */
async function playExit(root: HTMLDivElement | null, flyer: HTMLDivElement | null): Promise<void> {
  const mascot = flyer?.querySelector('[data-pose]')
  if (!root || !flyer || !mascot || typeof flyer.animate !== 'function') return

  const from = mascot.getBoundingClientRect()
  root.style.setProperty('--hole-x', `${from.left + from.width / 2}px`)
  root.style.setProperty('--hole-y', `${from.top + from.height / 2}px`)

  const target = document.querySelector(TARGET_SELECTOR)?.getBoundingClientRect()
  const destination = target && target.width > 0 ? clampToScreenEdge(target, window.innerHeight) : undefined

  const flight = destination
    ? flyer.animate(flightKeyframes(from, destination), {
        duration: INTRO_FLIGHT_MS,
        easing: 'cubic-bezier(0.55, 0, 0.25, 1)',
        fill: 'forwards',
      })
    : flyer.animate(
        [
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(0.3)', opacity: 0 },
        ],
        { duration: INTRO_CURTAIN_MS, easing: 'cubic-bezier(0.5, 0, 0.75, 0)', fill: 'forwards' },
      )

  await Promise.all([flight.finished, delay(INTRO_CURTAIN_MS)])
}

function delay(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms))
}

/** Sparkles and soft dots scattered over the curtain. Purely decorative. */
function IntroDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none">
      <span className="kapsi-intro__blob top-[-12%] left-[-10%] size-[46vmax] bg-white/55" />
      <span className="kapsi-intro__blob right-[-14%] bottom-[-16%] size-[52vmax] bg-bubblegum-100/70" />
      <Sparkle className="top-[16%] left-[14%] text-[26px] text-butter" order={0} />
      <Sparkle className="top-[22%] right-[16%] text-[20px] text-violet/50" order={1} />
      <Sparkle className="bottom-[20%] left-[20%] text-[18px] text-bubblegum" order={2} />
      <Sparkle className="right-[12%] bottom-[26%] text-[30px] text-butter" order={3} />
      <Sparkle className="top-[44%] left-[7%] hidden text-[16px] text-violet/40 sm:block" order={4} />
      <Sparkle className="top-[10%] left-[48%] text-[14px] text-mint" order={5} />
    </div>
  )
}

function Sparkle({ className, order }: { className: string; order: number }) {
  return (
    <span className={cn('kapsi-intro__sparkle absolute leading-none', className)} style={{ '--i': order } as CSSProperties}>
      ✦
    </span>
  )
}
