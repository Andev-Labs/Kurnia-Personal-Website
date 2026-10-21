import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

import { Awards } from './Awards'

afterEach(cleanup)

describe('Awards certifications list', () => {
  const rows = (list: HTMLElement) => Array.from(list.querySelectorAll('li'))
  const hiddenOnScreen = (row: HTMLElement) => row.classList.contains('hidden')

  it('shows five rows, keeps the rest for print, and expands from the keyboard', async () => {
    render(<Awards />)
    const user = userEvent.setup()
    const toggle = screen.getByRole('button', { name: /Lihat semua/ })
    const list = document.getElementById(toggle.getAttribute('aria-controls') ?? '') as HTMLElement

    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(rows(list).filter((row) => !hiddenOnScreen(row))).toHaveLength(5)
    for (const row of rows(list).filter(hiddenOnScreen)) expect(row.classList.contains('print:grid')).toBe(true)

    toggle.focus()
    await user.keyboard('{Enter}')
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(rows(list).some(hiddenOnScreen)).toBe(false)
    expect(toggle.textContent).toContain('Tampilkan lebih sedikit')

    await user.keyboard(' ')
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
  })
})
