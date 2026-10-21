import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { MASCOT_POSES, Mascot } from './Mascot'

afterEach(cleanup)

describe('Mascot', () => {
  it.each(MASCOT_POSES)('renders the %s pose on the shared 200×240 canvas', (pose) => {
    const { container } = render(<Mascot pose={pose} />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('viewBox')).toBe('0 0 200 240')
    expect(svg?.dataset.pose).toBe(pose)
    // The capsule body is shared by every pose.
    expect(svg?.querySelector('rect[rx="46"]')).not.toBeNull()
  })

  it('is decorative by default', () => {
    const { container } = render(<Mascot pose="wave" />)
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
    expect(screen.queryByRole('img')).toBeNull()
  })

  it('exposes the title as its accessible name', () => {
    render(<Mascot pose="mail" title="Kapsi membawa surat" />)
    expect(screen.getByRole('img', { name: 'Kapsi membawa surat' })).toBeTruthy()
  })

  it('gives each instance its own clipPath id', () => {
    const { container } = render(
      <>
        {MASCOT_POSES.map((pose) => (
          <Mascot key={pose} pose={pose} />
        ))}
      </>,
    )
    const ids = [...container.querySelectorAll('clipPath')].map((clip) => clip.id)
    expect(ids).toHaveLength(MASCOT_POSES.length)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) {
      expect(id).toMatch(/^[\w-]+$/)
      expect(container.querySelector(`[clip-path="url(#${id})"]`)).not.toBeNull()
    }
  })
})
