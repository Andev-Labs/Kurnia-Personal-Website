import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

import { Navbar } from './Navbar'

afterEach(cleanup)

describe('Navbar mobile drawer', () => {
  const setup = () => {
    render(<Navbar />)
    return {
      user: userEvent.setup(),
      toggle: screen.getByRole('button', { name: 'Buka menu' }),
      drawer: screen.getByRole('dialog', { name: 'Menu navigasi', hidden: true }),
    }
  }

  it('starts closed', () => {
    const { toggle, drawer } = setup()
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(drawer.hasAttribute('inert')).toBe(true)
  })

  it('opens from the menu button and locks page scroll', async () => {
    const { user, toggle, drawer } = setup()
    await user.click(toggle)
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(drawer.hasAttribute('inert')).toBe(false)
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('closes with the close button, Escape, and after picking a link', async () => {
    const { user, toggle, drawer } = setup()

    await user.click(toggle)
    await user.click(screen.getByRole('button', { name: 'Tutup menu' }))
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(document.body.style.overflow).toBe('')

    await user.click(toggle)
    await user.keyboard('{Escape}')
    expect(toggle.getAttribute('aria-expanded')).toBe('false')

    await user.click(toggle)
    const links = drawer.querySelectorAll('a')
    await user.click(links[links.length - 1])
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
  })
})
