import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  INTRO_BOOT_SCRIPT,
  INTRO_SKIP_KEY,
  INTRO_TIMING,
  coverRadius,
  flightKeyframes,
  introMode,
  introStart,
  isMostlyInViewport,
  isSkipKey,
  markIntroSkipOnce,
} from './intro'

function runBootScript() {
  new Function(INTRO_BOOT_SCRIPT)()
}

function mockReducedMotion(matches: boolean) {
  vi.stubGlobal('matchMedia', (query: string) => ({ matches: matches && query.includes('reduce'), media: query }))
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
  sessionStorage.clear()
  for (const name of ['data-intro', 'data-intro-start', 'data-intro-timer']) document.documentElement.removeAttribute(name)
})

describe('introMode', () => {
  it('plays on a normal load and refresh', () => {
    expect(introMode({ skipOnce: false, reducedMotion: false })).toBe('playing')
  })

  it('skips once after a language switch', () => {
    expect(introMode({ skipOnce: true, reducedMotion: false })).toBe('skip')
  })

  it('never plays with reduced motion', () => {
    expect(introMode({ skipOnce: false, reducedMotion: true })).toBe('off')
    expect(introMode({ skipOnce: true, reducedMotion: true })).toBe('off')
  })
})

describe('introStart', () => {
  it('waits for the scheduled exit when the app hydrates early', () => {
    expect(introStart(400)).toEqual({ action: 'wait', delay: INTRO_TIMING.exitAt - 400 })
  })

  it('exits right away when hydration is late', () => {
    expect(introStart(INTRO_TIMING.exitAt + 200)).toEqual({ action: 'exit', delay: 0 })
  })

  it('gives up once the CSS fallback has hidden the overlay', () => {
    expect(introStart(INTRO_TIMING.fallbackOutAt).action).toBe('gone')
  })
})

describe('isSkipKey', () => {
  it('accepts Escape only', () => {
    expect(isSkipKey('Escape')).toBe(true)
    expect(isSkipKey('Esc')).toBe(true)
    expect(isSkipKey('Enter')).toBe(false)
    expect(isSkipKey('Tab')).toBe(false)
  })
})

describe('isMostlyInViewport', () => {
  it('is true for a box on screen', () => {
    expect(isMostlyInViewport({ left: 40, top: 300, width: 100, height: 120 }, 360, 740)).toBe(true)
  })

  it('is false when the Hero has been scrolled away', () => {
    expect(isMostlyInViewport({ left: 40, top: -900, width: 100, height: 120 }, 360, 740)).toBe(false)
    expect(isMostlyInViewport({ left: 40, top: 700, width: 100, height: 120 }, 360, 740)).toBe(false)
  })

  it('is false for an element that is not laid out', () => {
    expect(isMostlyInViewport({ left: 0, top: 0, width: 0, height: 0 }, 360, 740)).toBe(false)
  })
})

describe('coverRadius', () => {
  it('reaches the farthest corner', () => {
    expect(coverRadius(0, 0, 300, 400)).toBe(500)
    expect(coverRadius(150, 200, 300, 400)).toBe(250)
  })
})

describe('flightKeyframes', () => {
  const from = { left: 100, top: 300, width: 160, height: 192 }
  const to = { left: 20, top: 500, width: 96, height: 115 }

  it('starts in place and ends exactly on the target, scaled to its size', () => {
    const frames = flightKeyframes(from, to, 10)
    expect(frames).toHaveLength(11)
    expect(frames[0]).toEqual({ transform: 'translate(0px, 0px) scale(1) rotate(0deg)', offset: 0 })
    expect(frames.at(-1)).toEqual({ transform: 'translate(-80px, 200px) scale(0.6) rotate(0deg)', offset: 1 })
  })

  it('arcs above both ends on the way', () => {
    const ys = flightKeyframes(from, to, 10).map((f) => Number(/translate\([^,]+, (-?[\d.]+)px\)/.exec(f.transform)?.[1]))
    expect(Math.min(...ys)).toBeLessThan(0)
  })
})

describe('markIntroSkipOnce', () => {
  it('leaves a one-time flag in session storage', () => {
    markIntroSkipOnce()
    expect(sessionStorage.getItem(INTRO_SKIP_KEY)).toBe('1')
  })

  it('swallows storage errors', () => {
    const storage = {
      getItem: () => null,
      removeItem: () => {},
      setItem: () => {
        throw new Error('QuotaExceededError')
      },
    }
    expect(() => markIntroSkipOnce(storage)).not.toThrow()
  })
})

describe('INTRO_BOOT_SCRIPT', () => {
  it('marks the page as playing on a normal load', () => {
    mockReducedMotion(false)
    runBootScript()
    const root = document.documentElement
    expect(root.getAttribute('data-intro')).toBe('playing')
    expect(root.getAttribute('data-intro-start')).toMatch(/^\d+$/)
  })

  it('consumes the language-switch flag and skips', () => {
    mockReducedMotion(false)
    sessionStorage.setItem(INTRO_SKIP_KEY, '1')
    runBootScript()
    expect(document.documentElement.getAttribute('data-intro')).toBe('skip')
    expect(sessionStorage.getItem(INTRO_SKIP_KEY)).toBeNull()

    // The next refresh plays again.
    runBootScript()
    expect(document.documentElement.getAttribute('data-intro')).toBe('playing')
  })

  it('does nothing with reduced motion', () => {
    mockReducedMotion(true)
    runBootScript()
    expect(document.documentElement.hasAttribute('data-intro')).toBe(false)
  })

  it('unlocks the page on its own if the app never hydrates', () => {
    vi.useFakeTimers()
    mockReducedMotion(false)
    runBootScript()
    vi.advanceTimersByTime(INTRO_TIMING.unlockAt)
    expect(document.documentElement.hasAttribute('data-intro')).toBe(false)
  })
})
