import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { GALLERY } from './gallery'

const photos = GALLERY.flatMap((item) => item.shots ?? []).flatMap((shot) => (shot.photo ? [shot.photo] : []))

describe('GALLERY photos', () => {
  it('fills every Sechenov University shot with a photo', () => {
    const sechenov = GALLERY.find((item) => item.title.startsWith('Sechenov'))
    expect(sechenov?.shots?.length).toBeGreaterThan(0)
    expect(sechenov?.shots?.every((shot) => shot.photo)).toBe(true)
  })

  it.each(photos.map((photo) => [photo.src, photo] as const))('ships every size and format for %s', (_, photo) => {
    expect(photo.alt).not.toBe('')
    for (const width of [540, 1080]) {
      for (const ext of ['avif', 'webp', 'jpg']) {
        expect(existsSync(join(process.cwd(), 'public', `${photo.src}-${width}.${ext}`))).toBe(true)
      }
    }
  })
})
