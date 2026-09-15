import { act, cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { getGallery } from '#/data/gallery'
import { GalleryProvider } from './GalleryProvider'
import { ProgramGallery } from './ProgramGallery'
import { WorkGallery } from './WorkGallery'

const GALLERY = getGallery()
const album = GALLERY.find((item) => item.shots?.length)!
const firstShot = album.shots![0]
const workItem = GALLERY.find((item) => item.group === 'kerja')!

/** Fakes `window.matchMedia` so every query reports `matches`, and lets tests flip it later. */
function mockViewport(isMobile: boolean) {
  const listeners = new Set<() => void>()
  const state = { matches: isMobile }
  vi.stubGlobal('matchMedia', (query: string) => ({
    get matches() {
      return state.matches
    },
    media: query,
    addEventListener: (_: string, listener: () => void) => listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
  }))
  return (next: boolean) => {
    state.matches = next
    listeners.forEach((listener) => listener())
  }
}

function renderGallery() {
  return render(
    <GalleryProvider>
      <ProgramGallery />
      <WorkGallery />
    </GalleryProvider>,
  )
}

async function openAlbum() {
  await userEvent.click(screen.getByRole('button', { name: new RegExp(album.title) }))
  return screen.getByRole('dialog', { name: album.title })
}

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('gallery full-screen viewer', () => {
  it('opens an album photo full-screen on desktop', async () => {
    mockViewport(false)
    renderGallery()

    const dialog = await openAlbum()
    await userEvent.click(within(dialog).getByRole('button', { name: new RegExp(firstShot.label) }))

    expect(screen.getByRole('dialog', { name: `${album.title}: ${firstShot.label}` })).toBeTruthy()
  })

  it('shows album photos as display-only cards on mobile', async () => {
    mockViewport(true)
    renderGallery()

    const dialog = await openAlbum()

    expect(within(dialog).getByText(firstShot.label)).toBeTruthy()
    expect(within(dialog).queryByRole('button', { name: new RegExp(firstShot.label) })).toBeNull()
    expect(screen.queryByRole('dialog', { name: `${album.title}: ${firstShot.label}` })).toBeNull()
  })

  it('does not let work photos open on mobile', () => {
    mockViewport(true)
    renderGallery()

    expect(screen.getByText(workItem.title)).toBeTruthy()
    expect(screen.queryByRole('button', { name: new RegExp(workItem.title) })).toBeNull()
  })

  it('closes an open full-screen photo when the viewport shrinks to mobile', async () => {
    const setMobile = mockViewport(false)
    renderGallery()

    const dialog = await openAlbum()
    await userEvent.click(within(dialog).getByRole('button', { name: new RegExp(firstShot.label) }))
    act(() => setMobile(true))

    expect(screen.queryByRole('dialog', { name: `${album.title}: ${firstShot.label}` })).toBeNull()
    expect(screen.getByRole('dialog', { name: album.title })).toBeTruthy()
  })
})
