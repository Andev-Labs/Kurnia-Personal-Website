import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { GALLERY } from './gallery'

const photos = GALLERY.flatMap((item) => item.shots ?? []).flatMap((shot) => (shot.photo ? [shot.photo] : []))

describe('GALLERY photos', () => {
  it.each(['Sechenov University', 'China Pharmaceutical University'])('fills every %s shot with a photo', (title) => {
    const item = GALLERY.find((entry) => entry.title.startsWith(title))
    expect(item?.shots?.length).toBeGreaterThan(0)
    expect(item?.shots?.every((shot) => shot.photo)).toBe(true)
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
