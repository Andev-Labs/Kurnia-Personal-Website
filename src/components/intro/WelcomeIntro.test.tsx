import { act, cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

import { readIntroState, setIntroState } from '#/lib/intro'

import { WelcomeIntro } from './WelcomeIntro'

afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.intro
  delete window.__kapsiIntro
})

describe('WelcomeIntro', () => {
  it('greets in English with a skip button', () => {
    setIntroState('play')
    const { container } = render(<WelcomeIntro />)

    expect(container.querySelector('.kapsi-intro__title')?.textContent).toBe('Welcome!')
    expect(container.textContent).toContain('Hi there!')
    expect(screen.getByRole('button', { name: 'Skip intro' })).toBeTruthy()
  })

  it('renders nothing when the head script skipped the intro', async () => {
    setIntroState('skip')
    const { container } = render(<WelcomeIntro />)

    await waitFor(() => expect(container.querySelector('.kapsi-intro')).toBeNull())
    expect(readIntroState()).toBe('skip')
  })

  it('still plays when a full client re-render wiped `<html data-intro>`', async () => {
    // What the head script left behind, after React discarded the server HTML (e.g. Netlify's injected comment).
    setIntroState('play')
    delete document.documentElement.dataset.intro
    const { container } = render(<WelcomeIntro />)

    expect(document.documentElement.dataset.intro).toBe('play')
    expect(container.querySelector('.kapsi-intro')).not.toBeNull()

    await userEvent.click(screen.getByRole('button', { name: 'Skip intro' }))
    await waitFor(() => expect(container.querySelector('.kapsi-intro')).toBeNull())
    expect(document.documentElement.dataset.intro).toBe('done')
  })

  it('stays skipped when the wiped state was `skip`', async () => {
    setIntroState('skip')
    delete document.documentElement.dataset.intro
    const { container } = render(<WelcomeIntro />)

    await waitFor(() => expect(container.querySelector('.kapsi-intro')).toBeNull())
    expect(document.documentElement.dataset.intro).toBe('skip')
  })

  it('hands over to the Hero when skipped', async () => {
    setIntroState('play')
    const { container } = render(<WelcomeIntro />)

    await userEvent.click(screen.getByRole('button', { name: 'Skip intro' }))

    await waitFor(() => expect(container.querySelector('.kapsi-intro')).toBeNull())
    expect(readIntroState()).toBe('done')
  })

  it('skips on Escape', async () => {
    setIntroState('play')
    const { container } = render(<WelcomeIntro />)

    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }))
    })

    await waitFor(() => expect(container.querySelector('.kapsi-intro')).toBeNull())
    expect(readIntroState()).toBe('done')
  })
})
