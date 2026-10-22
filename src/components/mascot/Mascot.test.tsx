import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

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

  it.each(MASCOT_POSES.filter((pose) => pose !== 'walk'))('gives the %s pose an idle motion', (pose) => {
    const { container } = render(<Mascot pose={pose} className="w-24" />)
    const svg = container.querySelector('svg')
    expect(svg?.getAttribute('class')).toBe('kapsi w-24')
    expect(svg?.querySelector('.kapsi-idle')?.getAttribute('class')).toMatch(/animate-kapsi-/)
  })

  it('leaves the walk pose to its own bob', () => {
    const { container } = render(<Mascot pose="walk" />)
    expect(container.querySelector('.kapsi-idle')).toBeNull()
    expect(container.querySelector('.animate-bob')).not.toBeNull()
  })

  it('cheers with happy eyes and hearts when tapped, then settles back', () => {
    vi.useFakeTimers()
    try {
      const { container } = render(<Mascot pose="lab" />)
      const svg = container.querySelector('svg')!
      expect(container.querySelector('.kapsi-pupil')).not.toBeNull()

      fireEvent.click(svg)
      expect(svg.dataset.cheering).toBe('true')
      expect(screen.getByTestId('kapsi-hearts')).toBeTruthy()
      // Happy eyes replace the open ones, so no pupils while cheering.
      expect(container.querySelector('.kapsi-pupil')).toBeNull()

      act(() => vi.advanceTimersByTime(1500))
      expect(svg.dataset.cheering).toBeUndefined()
      expect(screen.queryByTestId('kapsi-hearts')).toBeNull()
      expect(container.querySelector('.kapsi-pupil')).not.toBeNull()
    } finally {
      vi.useRealTimers()
    }
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
