import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  INTRO_HEAD_SCRIPT,
  INTRO_HOLD_MS,
  INTRO_MIN_HOLD_MS,
  INTRO_SKIP_KEY,
  clampToScreenEdge,
  flightKeyframes,
  readIntroState,
  remainingHoldMs,
  requestIntroSkip,
} from './intro'

function runHeadScript({ reducedMotion = false } = {}) {
  vi.stubGlobal(
    'matchMedia',
    (query: string) => ({ matches: reducedMotion && query.includes('reduce') }) as MediaQueryList,
  )
  new Function(INTRO_HEAD_SCRIPT)()
}

afterEach(() => {
  vi.unstubAllGlobals()
  sessionStorage.clear()
  delete document.documentElement.dataset.intro
})

describe('intro head script', () => {
  it('plays the intro on a normal load or refresh', () => {
    runHeadScript()
    expect(readIntroState()).toBe('play')
  })

  it('plays again on the next load too', () => {
    runHeadScript()
    runHeadScript()
    expect(readIntroState()).toBe('play')
  })

  it('skips the intro for reduced motion', () => {
    runHeadScript({ reducedMotion: true })
    expect(readIntroState()).toBe('skip')
  })

  it('skips once after a language switch, then plays again', () => {
    requestIntroSkip()
    expect(sessionStorage.getItem(INTRO_SKIP_KEY)).toBe('1')

    runHeadScript()
    expect(readIntroState()).toBe('skip')
    expect(sessionStorage.getItem(INTRO_SKIP_KEY)).toBeNull()

    runHeadScript()
    expect(readIntroState()).toBe('play')
  })
})

describe('remainingHoldMs', () => {
  it('holds for what is left of the entrance', () => {
    expect(remainingHoldMs(0)).toBe(INTRO_HOLD_MS)
    expect(remainingHoldMs(1000)).toBe(INTRO_HOLD_MS - 1000)
  })

  it('never cuts the entrance shorter than the minimum', () => {
    expect(remainingHoldMs(INTRO_HOLD_MS + 2000)).toBe(INTRO_MIN_HOLD_MS)
  })
})

describe('clampToScreenEdge', () => {
  const box = { left: 20, top: 500, width: 100, height: 120 }

  it('keeps a target that is on screen', () => {
    expect(clampToScreenEdge(box, 800)).toEqual(box)
  })

  it('stops just below the screen for a target below the fold', () => {
    expect(clampToScreenEdge({ ...box, top: 900 }, 800)).toEqual({ ...box, top: 824 })
  })

  it('stops just above the screen for a target scrolled past', () => {
    expect(clampToScreenEdge({ ...box, top: -400 }, 800)).toEqual({ ...box, top: -144 })
  })
})

describe('flightKeyframes', () => {
  it('ends exactly on the target, scaled to its size', () => {
    const from = { left: 100, top: 100, width: 160, height: 192 }
    const to = { left: 20, top: 500, width: 80, height: 96 }
    const frames = flightKeyframes(from, to)

    expect(frames[0].transform).toBe('translate(0px, 0px) scale(1) rotate(0deg)')
    // Centres: (180, 196) → (60, 548).
    expect(frames.at(-1)?.transform).toBe('translate(-120px, 352px) scale(0.5) rotate(0deg)')
  })

  it('arcs upward on the way', () => {
    const frames = flightKeyframes({ left: 0, top: 0, width: 100, height: 100 }, { left: 0, top: 300, width: 50, height: 50 })
    const mid = String(frames[1].transform)
    const midY = Number(mid.match(/translate\([^,]+, (-?[\d.]+)px\)/)?.[1])
    expect(frames[1].offset).toBe(0.45)
    expect(midY).toBeLessThan(275 * 0.4)
  })
})
