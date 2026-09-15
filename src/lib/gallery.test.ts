import { describe, expect, it } from 'vitest'

import type { GalleryItem } from '#/data/gallery'
import { galleryReducer, getGalleryView, groupIndices, initialGalleryState } from './gallery'
import type { GalleryAction, GalleryState } from './gallery'

const items: GalleryItem[] = [
  { group: 'kerja', title: 'A', meta: 'meta A', caption: 'caption A' },
  {
    group: 'kerja',
    title: 'B',
    meta: 'meta B',
    caption: 'caption B',
    photo: { src: '/images/b', width: 16, height: 9, alt: 'alt B' },
  },
  {
    group: 'intl',
    title: 'Album 1',
    meta: 'meta album 1',
    caption: 'caption album 1',
    shots: [
      { label: 's1', caption: 'c1' },
      { label: 's2', caption: 'c2' },
      { label: 's3', caption: 'c3', photo: { src: '/images/s3', width: 4, height: 3, alt: 'alt s3' } },
    ],
  },
  { group: 'kerja', title: 'C', meta: 'meta C', caption: 'caption C' },
  {
    group: 'intl',
    title: 'Album 2',
    meta: 'meta album 2',
    caption: 'caption album 2',
    shots: [{ label: 't1', caption: 'd1' }],
  },
]

const run = (state: GalleryState, ...actions: GalleryAction[]) =>
  actions.reduce((s, action) => galleryReducer(items, s, action), state)

describe('groupIndices', () => {
  it('returns item indices that belong to a group, in order', () => {
    expect(groupIndices(items, 'kerja')).toEqual([0, 1, 3])
    expect(groupIndices(items, 'intl')).toEqual([2, 4])
  })
})

describe('galleryReducer', () => {
  it('opens a single photo straight into the viewer', () => {
    expect(run(initialGalleryState, { type: 'open', index: 1 })).toEqual({ openIndex: 1, shotIndex: 0 })
  })

  it('opens an album on its overview', () => {
    expect(run(initialGalleryState, { type: 'open', index: 2 })).toEqual({ openIndex: 2, shotIndex: null })
  })

  it('steps through items of the same group only, wrapping around', () => {
    const opened = run(initialGalleryState, { type: 'open', index: 3 })
    expect(run(opened, { type: 'step', delta: 1 }).openIndex).toBe(0)
    expect(run(opened, { type: 'step', delta: -1 }).openIndex).toBe(1)

    const album = run(initialGalleryState, { type: 'open', index: 4 })
    expect(run(album, { type: 'step', delta: 1 })).toEqual({ openIndex: 2, shotIndex: null })
  })

  it('cycles shots inside an album', () => {
    const shot = run(initialGalleryState, { type: 'open', index: 2 }, { type: 'openShot', shotIndex: 2 })
    expect(run(shot, { type: 'stepShot', delta: 1 }).shotIndex).toBe(0)
    expect(run(shot, { type: 'stepShot', delta: -1 }).shotIndex).toBe(1)
  })

  it('moves to the next item when stepping shots of a single photo', () => {
    const shot = run(initialGalleryState, { type: 'open', index: 0 })
    expect(run(shot, { type: 'stepShot', delta: 1 })).toEqual({ openIndex: 1, shotIndex: 0 })
  })

  it('returns to the album when closing an album shot', () => {
    const shot = run(initialGalleryState, { type: 'open', index: 2 }, { type: 'openShot', shotIndex: 1 })
    expect(run(shot, { type: 'closeShot' })).toEqual({ openIndex: 2, shotIndex: null })
  })

  it('closes the gallery when closing a single photo', () => {
    const shot = run(initialGalleryState, { type: 'open', index: 0 })
    expect(run(shot, { type: 'closeShot' })).toEqual(initialGalleryState)
  })

  it('ignores navigation while nothing is open', () => {
    expect(run(initialGalleryState, { type: 'step', delta: 1 })).toBe(initialGalleryState)
    expect(run(initialGalleryState, { type: 'stepShot', delta: 1 })).toBe(initialGalleryState)
  })
})

describe('getGalleryView', () => {
  it('is empty when closed', () => {
    const view = getGalleryView(items, initialGalleryState)
    expect(view.active).toBeNull()
    expect(view.isAlbumOpen).toBe(false)
    expect(view.isShotOpen).toBe(false)
  })

  it('describes a single photo with the item caption and group position', () => {
    const view = getGalleryView(items, { openIndex: 3, shotIndex: 0 })
    expect(view.isAlbumOpen).toBe(false)
    expect(view.groupLabel).toBe('GALERI KERJA')
    expect(view.shot).toEqual({
      label: 'C',
      caption: 'caption C',
      heading: 'Galeri kerja',
      meta: 'meta C',
      counter: '3 / 3',
    })
  })

  it('carries a single work photo into the viewer', () => {
    const view = getGalleryView(items, { openIndex: 1, shotIndex: 0 })
    expect(view.shot?.photo).toEqual({ src: '/images/b', width: 16, height: 9, alt: 'alt B' })
  })

  it('describes an album overview and an album shot', () => {
    const album = getGalleryView(items, { openIndex: 4, shotIndex: null })
    expect(album.isAlbumOpen).toBe(true)
    expect(album.isShotOpen).toBe(false)
    expect(album.groupLabel).toBe('GALERI PROGRAM INTERNASIONAL')
    expect(album.counter).toBe('2 / 2')

    const shot = getGalleryView(items, { openIndex: 2, shotIndex: 1 })
    expect(shot.isAlbumOpen).toBe(false)
    expect(shot.shot).toEqual({ label: 's2', caption: 'c2', heading: 'Album 1', meta: '', counter: '2 / 3' })

    const photoShot = getGalleryView(items, { openIndex: 2, shotIndex: 2 })
    expect(photoShot.shot?.photo).toEqual({ src: '/images/s3', width: 4, height: 3, alt: 'alt s3' })
  })
})
