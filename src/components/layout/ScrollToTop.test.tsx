import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ScrollToTop } from './ScrollToTop'

let report: (isIntersecting: boolean) => void = () => {}

/** Lets each test say whether the top of the page is on screen. */
class ControlledObserver {
  constructor(callback: IntersectionObserverCallback) {
    report = (isIntersecting) =>
      act(() => callback([{ isIntersecting } as IntersectionObserverEntry], this as unknown as IntersectionObserver))
  }
  observe() {}
  disconnect() {}
}

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  document.body.innerHTML = ''
})

describe('ScrollToTop', () => {
  const setup = () => {
    vi.stubGlobal('IntersectionObserver', ControlledObserver)
    const top = document.createElement('div')
    top.id = 'atas'
    document.body.append(top)
    render(<ScrollToTop />)
    return screen.getByRole('link', { name: 'Kembali ke atas', hidden: true })
  }

  it('links to the top of the page', () => {
    expect(setup().getAttribute('href')).toBe('#atas')
  })

  it('stays out of reach while the top is on screen and appears once it scrolls away', () => {
    const link = setup()
    report(true)
    expect(link.hasAttribute('inert')).toBe(true)

    report(false)
    expect(link.hasAttribute('inert')).toBe(false)

    report(true)
    expect(link.hasAttribute('inert')).toBe(true)
  })
})
