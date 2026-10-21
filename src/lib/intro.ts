/**
 * Timing and decision logic for the "Kapsi Says Hi" welcome intro.
 *
 * The overlay is server-rendered and animated with CSS so it starts before hydration. A tiny inline
 * boot script (below) decides on the client whether it should play at all and flags `<html>`:
 * `data-intro="playing"` locks scroll and hides the Hero Kapsi; `data-intro="skip"` hides the overlay.
 */

/** sessionStorage key set by the language switcher so the reload it triggers skips the intro. */
export const INTRO_SKIP_KEY = 'kapsi-intro-skip-once'

/** Milliseconds from the first paint. Keep in sync with the `intro-*` keyframes in styles.css. */
export const INTRO_TIMING = {
  /** The text drops out, the curtain opens and Kapsi flies to the Hero. */
  exitAt: 1900,
  /** Without JS, the overlay fades out on its own from here (CSS `intro-fallback-out`). */
  fallbackOutAt: 3600,
  /** The boot script unlocks the page from here even if the app never hydrates. */
  unlockAt: 4300,
  flight: 800,
  vanish: 350,
  landing: 600,
} as const

/** Skips run the exit at this fraction of its normal length. */
export const SKIP_SPEED = 0.55

export type IntroStart = 'exit' | 'wait' | 'gone'

/**
 * What the app should do once it hydrates `elapsed` ms after the intro began: wait for the scheduled
 * exit, start it now (hydration was late), or drop the overlay because the CSS fallback already hid it.
 */
export function introStart(elapsed: number): { action: IntroStart; delay: number } {
  if (elapsed >= INTRO_TIMING.fallbackOutAt) return { action: 'gone', delay: 0 }
  if (elapsed >= INTRO_TIMING.exitAt) return { action: 'exit', delay: 0 }
  return { action: 'wait', delay: INTRO_TIMING.exitAt - elapsed }
}

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

function sessionStore(): StorageLike | undefined {
  try {
    return typeof window === 'undefined' ? undefined : window.sessionStorage
  } catch {
    // Storage can throw when cookies are blocked.
    return undefined
  }
}

/** Called right before a language switch reloads the page, so the new page opens without the intro. */
export function markIntroSkipOnce(storage: StorageLike | undefined = sessionStore()) {
  try {
    storage?.setItem(INTRO_SKIP_KEY, '1')
  } catch {
    // Quota or privacy mode: the intro simply plays again.
  }
}

export interface IntroEnv {
  /** Whether the language switcher left a one-time skip flag. */
  skipOnce: boolean
  reducedMotion: boolean
}

export type IntroMode = 'playing' | 'skip' | 'off'

/** `off` leaves the page untouched; `skip` additionally hides the server-rendered overlay. */
export function introMode({ skipOnce, reducedMotion }: IntroEnv): IntroMode {
  if (reducedMotion) return 'off'
  if (skipOnce) return 'skip'
  return 'playing'
}

/** Keys that dismiss the intro. Space and Enter stay with the focused "Skip intro" button. */
export function isSkipKey(key: string) {
  return key === 'Escape' || key === 'Esc'
}

export interface Box {
  left: number
  top: number
  width: number
  height: number
}

/** Kapsi only flies to the Hero when at least half of its landing spot is on screen. */
export function isMostlyInViewport(box: Box, viewportWidth: number, viewportHeight: number) {
  if (box.width <= 0 || box.height <= 0) return false
  const visibleW = Math.min(box.left + box.width, viewportWidth) - Math.max(box.left, 0)
  const visibleH = Math.min(box.top + box.height, viewportHeight) - Math.max(box.top, 0)
  if (visibleW <= 0 || visibleH <= 0) return false
  return (visibleW * visibleH) / (box.width * box.height) >= 0.5
}

/** Radius that lets a circle centred at (x, y) cover the whole viewport. */
export function coverRadius(x: number, y: number, viewportWidth: number, viewportHeight: number) {
  const dx = Math.max(x, viewportWidth - x)
  const dy = Math.max(y, viewportHeight - y)
  return Math.ceil(Math.hypot(dx, dy))
}

/** A type alias (not an interface) so it is assignable to the Web Animations `Keyframe`. */
export type FlightFrame = {
  transform: string
  offset: number
}

/**
 * Keyframes that carry the element at `from` onto `to` along an arc (a quadratic Bézier bowed upward),
 * scaling it to the target size on the way. Transforms are relative to the element's own box with a
 * top-left origin.
 */
export function flightKeyframes(from: Box, to: Box, steps = 12): FlightFrame[] {
  const scale = from.width > 0 ? to.width / from.width : 1
  const dx = to.left - from.left
  const dy = to.top - from.top
  // Bow upward by a share of the distance so short hops still read as a jump.
  const lift = Math.max(80, Math.hypot(dx, dy) * 0.35)
  const cx = dx / 2
  const cy = Math.min(0, dy) - lift

  const frames: FlightFrame[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const u = 1 - t
    const x = 2 * u * t * cx + t * t * dx
    const y = 2 * u * t * cy + t * t * dy
    const s = 1 + (scale - 1) * t
    // A little spin mid-air, settling upright on landing.
    const rotate = Math.sin(t * Math.PI) * -12
    frames.push({
      transform: `translate(${round(x)}px, ${round(y)}px) scale(${round(s, 4)}) rotate(${round(rotate)}deg)`,
      offset: round(t, 4),
    })
  }
  return frames
}

function round(value: number, digits = 2) {
  const f = 10 ** digits
  // `+ 0` folds -0 into 0 so keyframes stay tidy.
  return Math.round(value * f) / f + 0
}

/**
 * Runs inline before the overlay is parsed, so the decision lands before the first paint.
 * Mirrors `introMode`; kept dependency-free because it ships as a string.
 */
export const INTRO_BOOT_SCRIPT = `(function(){var d=document.documentElement;try{if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;}catch(e){}try{var s=window.sessionStorage;if(s.getItem(${JSON.stringify(INTRO_SKIP_KEY)})){s.removeItem(${JSON.stringify(INTRO_SKIP_KEY)});d.setAttribute('data-intro','skip');return;}}catch(e){}d.setAttribute('data-intro','playing');d.setAttribute('data-intro-start',String(Math.round(performance.now())));d.setAttribute('data-intro-timer',String(setTimeout(function(){if(d.getAttribute('data-intro')==='playing')d.removeAttribute('data-intro');},${INTRO_TIMING.unlockAt})));})();`
