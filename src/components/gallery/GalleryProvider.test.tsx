import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { getGallery } from '#/data/gallery'
import { m } from '#/paraglide/messages.js'
import { GalleryProvider } from './GalleryProvider'
import { ProgramGallery } from './ProgramGallery'
import { WorkGallery } from './WorkGallery'

const GALLERY = getGallery()
const album = GALLERY.find((item) => item.shots?.length)!
const firstShot = album.shots![0]
const workItem = GALLERY.find((item) => item.group === 'kerja' && item.photo)!

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

/** Reports every media query as matching, i.e. the narrowest viewport the site supports. */
function stubMobileViewport() {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: true,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }))
}

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('gallery full-screen viewer', () => {
  it('opens an album photo full-screen', async () => {
    renderGallery()

    const dialog = await openAlbum()
    await userEvent.click(within(dialog).getByRole('button', { name: new RegExp(firstShot.label) }))

    const viewer = screen.getByRole('dialog', { name: `${album.title}: ${firstShot.label}` })
    expect(within(viewer).getByText(firstShot.caption)).toBeTruthy()
  })

  it('opens a work photo full-screen from its card', async () => {
    renderGallery()

    await userEvent.click(screen.getByRole('button', { name: new RegExp(workItem.title) }))

    const viewer = screen.getByRole('dialog', { name: `${m.gallery_work_heading()}: ${workItem.title}` })
    expect(within(viewer).getByText(workItem.caption)).toBeTruthy()
  })

  it('closes a full-screen work photo again', async () => {
    renderGallery()

    await userEvent.click(screen.getByRole('button', { name: new RegExp(workItem.title) }))
    await userEvent.click(screen.getByRole('button', { name: m.gallery_close_photo() }))

    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('opens a work photo full-screen on a mobile viewport too', async () => {
    stubMobileViewport()
    renderGallery()

    await userEvent.click(screen.getByRole('button', { name: new RegExp(workItem.title) }))

    expect(screen.getByRole('dialog', { name: `${m.gallery_work_heading()}: ${workItem.title}` })).toBeTruthy()
  })

  it('opens an album photo full-screen on a mobile viewport too', async () => {
    stubMobileViewport()
    renderGallery()

    const dialog = await openAlbum()
    await userEvent.click(within(dialog).getByRole('button', { name: new RegExp(firstShot.label) }))

    expect(screen.getByRole('dialog', { name: `${album.title}: ${firstShot.label}` })).toBeTruthy()
  })

  it('steps to the next photo inside an album', async () => {
    renderGallery()

    const dialog = await openAlbum()
    await userEvent.click(within(dialog).getByRole('button', { name: new RegExp(firstShot.label) }))
    // The viewer renders the step buttons twice — beside the photo on desktop, over it on mobile.
    const [nextPhoto] = screen.getAllByRole('button', { name: m.gallery_next_photo() })
    await userEvent.click(nextPhoto)

    expect(screen.getByRole('dialog', { name: `${album.title}: ${album.shots![1].label}` })).toBeTruthy()
  })
})

describe('work gallery cards', () => {
  it('shows the caption next to the title', () => {
    renderGallery()

    const card = screen.getByRole('button', { name: new RegExp(workItem.title) })
    expect(within(card).getByText(workItem.caption)).toBeTruthy()
  })

  it('shows the whole photo instead of a cropped cover', () => {
    renderGallery()

    const card = screen.getByRole('button', { name: new RegExp(workItem.title) })
    expect(within(card).getByRole('img').className).toContain('object-contain')
  })
})
