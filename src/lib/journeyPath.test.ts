import { describe, expect, it } from 'vitest'

import { STOP_POINTS, dwellAtStops, lengthAtHeight, lengthsAtPoints, samplePath, stopNear, windingPath } from './journeyPath'
import type { MeasurablePath } from './journeyPath'

/** A straight vertical line from (0, 0) to (0, 100). */
const line: MeasurablePath = {
  getTotalLength: () => 100,
  getPointAtLength: (length) => ({ x: 0, y: length }),
}

describe('windingPath', () => {
  it('starts on the first stop and ends on the last one', () => {
    const d = windingPath(STOP_POINTS)
    const first = STOP_POINTS[0]
    const last = STOP_POINTS[STOP_POINTS.length - 1]
    expect(d.startsWith(`M${first.x} ${first.y}`)).toBe(true)
    expect(d.endsWith(`${last.x} ${last.y}`)).toBe(true)
    expect(d.match(/C/g)).toHaveLength(STOP_POINTS.length - 1)
  })

  it('runs strictly downwards so heights map to one place on the path', () => {
    for (let index = 1; index < STOP_POINTS.length; index++) {
      expect(STOP_POINTS[index].y).toBeGreaterThan(STOP_POINTS[index - 1].y)
    }
  })

  it('returns nothing for no points', () => {
    expect(windingPath([])).toBe('')
  })
})

describe('path sampling', () => {
  const samples = samplePath(line, 10)

  it('samples evenly from start to end', () => {
    expect(samples).toHaveLength(11)
    expect(samples[0]).toEqual({ length: 0, x: 0, y: 0 })
    expect(samples[10]).toEqual({ length: 100, x: 0, y: 100 })
  })

  it('finds the length closest to each point', () => {
    expect(lengthsAtPoints(samples, [{ x: 0, y: 31 }, { x: 5, y: 88 }])).toEqual([30, 90])
  })

  it('interpolates the length at a height and clamps outside the path', () => {
    expect(lengthAtHeight(samples, 45)).toBeCloseTo(45)
    expect(lengthAtHeight(samples, -20)).toBe(0)
    expect(lengthAtHeight(samples, 400)).toBe(100)
  })
})

describe('stopNear', () => {
  const stops = [10, 50, 90]

  it('picks the nearest stop within the radius', () => {
    expect(stopNear(stops, 47, 6)).toBe(1)
    expect(stopNear(stops, 93, 6)).toBe(2)
  })

  it('returns null between stops', () => {
    expect(stopNear(stops, 30, 6)).toBeNull()
  })
})

describe('dwellAtStops', () => {
  const stops = [100, 500]

  it('holds still on a stop and eases out to the edge of the radius', () => {
    expect(dwellAtStops(stops, 100, 50)).toBe(100)
    expect(dwellAtStops(stops, 125, 50)).toBeCloseTo(106.25)
    expect(dwellAtStops(stops, 150, 50)).toBeCloseTo(150)
    expect(dwellAtStops(stops, 475, 50)).toBeCloseTo(493.75)
  })

  it('leaves lengths between stops alone', () => {
    expect(dwellAtStops(stops, 300, 50)).toBe(300)
  })
})
