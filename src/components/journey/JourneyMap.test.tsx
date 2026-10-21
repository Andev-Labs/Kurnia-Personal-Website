import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'

import { GalleryProvider } from '#/components/gallery/GalleryProvider'
import { m } from '#/paraglide/messages.js'
import { JourneyMap } from './JourneyMap'
import { getStops } from './stops'

const STOPS = getStops()

function renderMap() {
  return render(
    <GalleryProvider>
      <JourneyMap />
    </GalleryProvider>,
  )
}

/** The interactive map is the first ordered list; the plain timeline is the second. */
function mapStops() {
  const [map] = screen.getAllByRole('list')
  return within(map).getAllByRole('button')
}

afterEach(cleanup)

describe('JourneyMap', () => {
  it('lists the stops in chronological order with the latest job as the current step', () => {
    renderMap()
    const buttons = mapStops()
    expect(buttons).toHaveLength(STOPS.length)
    STOPS.forEach((stop, index) => expect(buttons[index].textContent).toContain(stop.title))
    expect(buttons.filter((button) => button.getAttribute('aria-current') === 'step')).toEqual([buttons[1]])
    expect(buttons[1].textContent).toContain(m.experience_kch_role())
  })

  it('opens a detail card with the role, company, period and every bullet', async () => {
    renderMap()
    await userEvent.click(mapStops()[1])

    const dialog = screen.getByRole('dialog', { name: m.experience_kch_role() })
    expect(dialog.textContent).toContain('Kalbe Consumer Health (KCH), Kalbe Group')
    expect(dialog.textContent).toContain(m.experience_kch_period())
    expect(dialog.textContent).toContain(m.experience_kch_impact_method().replace(/\{[#/]b\}/g, ''))
    expect(within(dialog).getByRole('heading', { name: m.gallery_work_heading() })).toBeTruthy()
    expect(document.activeElement).toBe(within(dialog).getByRole('button', { name: m.journey_close() }))
  })

  it('folds the daily responsibilities into a disclosure', async () => {
    renderMap()
    await userEvent.click(mapStops()[1])

    const dialog = screen.getByRole('dialog', { name: m.experience_kch_role() })
    const toggle = within(dialog).getByRole('button', { name: m.experience_daily_toggle() })
    const panel = document.getElementById(toggle.getAttribute('aria-controls') ?? '')
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(panel?.hasAttribute('inert')).toBe(true)
    expect(panel?.textContent).toContain(m.experience_kch_daily_suggestion())

    await userEvent.click(toggle)
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(panel?.hasAttribute('inert')).toBe(false)
  })

  it('shows the lead time chart on the QCC stop', async () => {
    renderMap()
    await userEvent.click(mapStops()[2])
    const dialog = screen.getByRole('dialog', { name: m.journey_qcc_title() })
    expect(dialog.textContent).toContain(m.experience_chart_title())
    expect(dialog.textContent).toContain('−67%')
    expect(dialog.textContent).toContain(m.case_title())
  })

  it('closes on Escape and returns focus to the stop', async () => {
    renderMap()
    const stop = mapStops()[0]
    await userEvent.click(stop)
    expect(screen.getByRole('dialog')).toBeTruthy()

    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(stop)
  })

  it('keeps Tab focus inside the card', async () => {
    renderMap()
    await userEvent.click(mapStops()[5])
    const dialog = screen.getByRole('dialog', { name: m.journey_next_title() })
    const close = within(dialog).getByRole('button', { name: m.journey_close() })
    const contact = within(dialog).getByRole('link', { name: m.hero_cta_contact() })

    expect(document.activeElement).toBe(close)
    await userEvent.tab()
    expect(document.activeElement).toBe(contact)
    await userEvent.tab()
    expect(document.activeElement).toBe(close)
    await userEvent.tab({ shift: true })
    expect(document.activeElement).toBe(contact)
  })

  it('opens QCC photos in the shared gallery viewer', async () => {
    renderMap()
    await userEvent.click(mapStops()[4])
    const dialog = screen.getByRole('dialog', { name: m.awards_qcc_title() })
    await userEvent.click(within(dialog).getByRole('button', { name: new RegExp(m.gallery_qcc_team_title()) }))
    expect(screen.getAllByRole('dialog').length).toBeGreaterThan(1)
  })

  it('keeps every stop in a plain timeline for print', () => {
    renderMap()
    const [, timeline] = screen.getAllByRole('list', { hidden: true })
    expect(within(timeline).getAllByRole('heading', { level: 3, hidden: true })).toHaveLength(STOPS.length)
    for (const stop of STOPS) expect(timeline.textContent).toContain(stop.title)
    expect(timeline.textContent).toContain(m.experience_intern_daily_testing())
  })
})
