import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { LanguageSwitcher } from './LanguageSwitcher'

afterEach(cleanup)

describe('LanguageSwitcher', () => {
  it('links every supported language to its own URL', () => {
    render(<LanguageSwitcher />)

    const hrefs = Object.fromEntries(
      screen.getAllByRole('link').map((link) => [link.getAttribute('hreflang'), link.getAttribute('href')]),
    )
    expect(hrefs).toEqual({ id: '/', en: '/en', ru: '/ru', zh: '/zh' })
  })

  it('marks the active language', () => {
    render(<LanguageSwitcher />)

    expect(screen.getByRole('group', { name: 'Pilih bahasa' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Bahasa Indonesia' }).getAttribute('aria-current')).toBe('true')
    expect(screen.getByRole('link', { name: 'English' }).hasAttribute('aria-current')).toBe(false)
  })
})
