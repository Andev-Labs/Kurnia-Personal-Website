import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { INTRO_TIMING } from '#/lib/intro'

import { IntroOverlay } from './IntroOverlay'

const root = document.documentElement

function startIntro() {
  root.setAttribute('data-intro', 'playing')
  root.setAttribute('data-intro-start', String(Math.round(performance.now())))
}

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  cleanup()
  vi.useRealTimers()
  for (const name of ['data-intro', 'data-intro-start', 'data-intro-timer']) root.removeAttribute(name)
})

describe('IntroOverlay', () => {
  it('greets in English and offers a skip button', () => {
    startIntro()
    render(<IntroOverlay />)
    expect(screen.getByText('Hi there!')).toBeTruthy()
    expect(screen.getByText("to Kurnia’s portfolio")).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Skip intro' })).toBeTruthy()
  })

  it('removes itself when the boot script decided not to play', () => {
    render(<IntroOverlay />)
    expect(screen.queryByTestId('intro')).toBeNull()
  })

  it('removes itself after a language switch', () => {
    root.setAttribute('data-intro', 'skip')
    render(<IntroOverlay />)
    expect(screen.queryByTestId('intro')).toBeNull()
    expect(root.hasAttribute('data-intro')).toBe(false)
  })

  it('exits on schedule and unlocks the page', () => {
    startIntro()
    render(<IntroOverlay />)
    expect(screen.getByTestId('intro').dataset.state).toBe('playing')

    act(() => {
      vi.advanceTimersByTime(INTRO_TIMING.exitAt)
    })
    expect(screen.getByTestId('intro').dataset.state).toBe('exiting')
    expect(root.getAttribute('data-intro')).toBe('playing')

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.queryByTestId('intro')).toBeNull()
    expect(root.hasAttribute('data-intro')).toBe(false)
  })

  it.each([
    ['the skip button', () => fireEvent.click(screen.getByRole('button', { name: 'Skip intro' }))],
    ['a click anywhere', () => fireEvent.click(screen.getByTestId('intro'))],
    ['Escape', () => fireEvent.keyDown(window, { key: 'Escape' })],
    ['the mouse wheel', () => fireEvent.wheel(window)],
    ['a touch', () => fireEvent.touchStart(window)],
  ])('can be skipped with %s', (_, skip) => {
    startIntro()
    render(<IntroOverlay />)
    act(skip)
    expect(screen.getByTestId('intro').dataset.state).toBe('exiting')

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.queryByTestId('intro')).toBeNull()
  })

  it('ignores other keys', () => {
    startIntro()
    render(<IntroOverlay />)
    fireEvent.keyDown(window, { key: 'Enter' })
    expect(screen.getByTestId('intro').dataset.state).toBe('playing')
  })

  it('exits immediately when the app hydrates late', () => {
    startIntro()
    root.setAttribute('data-intro-start', String(Math.round(performance.now()) - INTRO_TIMING.exitAt - 100))
    render(<IntroOverlay />)
    expect(screen.getByTestId('intro').dataset.state).toBe('exiting')
  })

  it('stays out of the way when the CSS fallback already hid it', () => {
    startIntro()
    root.setAttribute('data-intro-start', String(Math.round(performance.now()) - INTRO_TIMING.fallbackOutAt - 100))
    render(<IntroOverlay />)
    expect(screen.queryByTestId('intro')).toBeNull()
    expect(root.hasAttribute('data-intro')).toBe(false)
  })
})
