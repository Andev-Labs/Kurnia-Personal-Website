/**
 * Welcome intro ("Kapsi Says Hi"): plays on every full page load, including refreshes.
 *
 * `<html data-intro>` carries the state so CSS can react before React hydrates:
 * - `play`: the intro overlay is showing and Kapsi in the Hero is hidden, waiting for the hand-off.
 * - `skip`: no intro (reduced motion, or a language switch reloaded the page).
 * - `done`: Kapsi has landed in the Hero.
 *
 * The same state is mirrored on `window.__kapsiIntro`, outside the DOM React manages. Hosts can inject
 * markup into `<head>` (Netlify adds an HTML comment), which makes React throw away the server HTML
 * and re-render the whole document, wiping `data-intro`. The mirror lets the intro restore it.
 */
export type IntroState = 'play' | 'skip' | 'done'

declare global {
  interface Window {
    __kapsiIntro?: IntroState
  }
}

/** Session flag set just before a language switch reloads the page, so the intro does not replay. */
export const INTRO_SKIP_KEY = 'kapsi:skip-intro'

/** How long the entrance plays, from first paint, before Kapsi flies to the Hero. */
export const INTRO_HOLD_MS = 1850
/** Never cut the entrance shorter than this after hydration, even on a slow first paint. */
export const INTRO_MIN_HOLD_MS = 500
export const INTRO_FLIGHT_MS = 800
/** The CSS fallback hides an overlay that never hydrated after this long (`.kapsi-intro:not([data-hydrated])`). */
export const INTRO_FALLBACK_MS = 4500
/** Matches the curtain-opening animation in styles.css. */
export const INTRO_CURTAIN_MS = 750

/**
 * Runs inline in `<head>` before the first paint. It must stay self-contained (no imports).
 * Reduced motion skips the intro entirely; a pending language-switch flag skips it once.
 */
export const INTRO_HEAD_SCRIPT = `(function(){var s="skip";function set(v){document.documentElement.dataset.intro=window.__kapsiIntro=v}try{if(sessionStorage.getItem("${INTRO_SKIP_KEY}")){sessionStorage.removeItem("${INTRO_SKIP_KEY}");set(s);return}}catch(e){}set(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches?s:"play")})()`

function isIntroState(value: unknown): value is IntroState {
  return value === 'play' || value === 'skip' || value === 'done'
}

/** `<html data-intro>`, or the `window` mirror if a client re-render wiped the attribute. */
export function readIntroState(): IntroState | undefined {
  const state = document.documentElement.dataset.intro
  if (isIntroState(state)) return state
  return isIntroState(window.__kapsiIntro) ? window.__kapsiIntro : undefined
}

export function setIntroState(state: IntroState) {
  document.documentElement.dataset.intro = state
  window.__kapsiIntro = state
}

/** Puts `data-intro` back on `<html>` if a client re-render dropped it, so the CSS sees the state again. */
export function restoreIntroState(): IntroState | undefined {
  const state = readIntroState()
  if (state && document.documentElement.dataset.intro !== state) setIntroState(state)
  return state
}

/** Call right before a client-side reload (e.g. switching language) to skip the next intro. */
export function requestIntroSkip() {
  try {
    sessionStorage.setItem(INTRO_SKIP_KEY, '1')
  } catch {
    // Storage can be blocked (private mode, strict cookies). The intro then simply plays again.
  }
}

/** Milliseconds to keep the entrance on screen, given how long the page has been painted. */
export function remainingHoldMs(paintedForMs: number): number {
  return Math.max(INTRO_MIN_HOLD_MS, INTRO_HOLD_MS - paintedForMs)
}

interface Box {
  left: number
  top: number
  width: number
  height: number
}

/**
 * Where to fly when the target is above or below the screen (a refresh restored the scroll position,
 * or on phones where the Hero mascot sits below the fold): just past the nearest screen edge, in line
 * with the target, so Kapsi still heads off toward its spot.
 */
export function clampToScreenEdge<T extends Box>(box: T, viewportHeight: number, margin = 24): Box {
  if (box.top >= viewportHeight) return { ...box, top: viewportHeight + margin }
  if (box.top + box.height <= 0) return { ...box, top: -box.height - margin }
  return box
}

/**
 * Keyframes that fly an element from `from` onto `to` along a little arc, with a spin on the way.
 * Both boxes are viewport rects; the element must use `transform-origin: center`.
 */
export function flightKeyframes(from: Box, to: Box): Keyframe[] {
  const dx = to.left + to.width / 2 - (from.left + from.width / 2)
  const dy = to.top + to.height / 2 - (from.top + from.height / 2)
  const scale = from.width > 0 ? to.width / from.width : 1
  const midScale = (1 + scale) / 2
  /* Lift the arc by a share of the distance so short hops stay subtle and long ones swoop. */
  const lift = Math.min(140, Math.hypot(dx, dy) * 0.35)
  const round = (n: number) => Math.round(n * 100) / 100

  return [
    { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
    {
      offset: 0.45,
      transform: `translate(${round(dx * 0.4)}px, ${round(dy * 0.4 - lift)}px) scale(${round(midScale)}) rotate(-14deg)`,
    },
    { transform: `translate(${round(dx)}px, ${round(dy)}px) scale(${round(scale)}) rotate(0deg)` },
  ]
}
