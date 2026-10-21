import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { EMAIL } from '#/data/site'
import { CopyEmailButton } from './Contact'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('CopyEmailButton', () => {
  it('copies the address and announces it', async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    render(<CopyEmailButton />)

    await user.click(screen.getByRole('button', { name: 'Salin email' }))

    expect(writeText).toHaveBeenCalledWith(EMAIL)
    expect(screen.getByRole('status').textContent).toBe('Email tersalin')
    expect(screen.getByRole('button', { name: 'Email tersalin' })).toBeTruthy()
  })

  it('announces a failure when the clipboard is unavailable', async () => {
    const user = userEvent.setup()
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('denied'))
    render(<CopyEmailButton />)

    await user.click(screen.getByRole('button', { name: 'Salin email' }))

    expect(screen.getByRole('status').textContent).toBe('Gagal menyalin email')
  })
})
