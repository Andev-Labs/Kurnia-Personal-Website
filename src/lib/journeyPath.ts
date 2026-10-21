/**
 * Geometry of the Journey Map. Everything lives on a 1000×1000 grid that the map stretches to its
 * own box, so the same stops work for the tall mobile map and the wide desktop one.
 */
export const MAP_GRID = 1000

export interface MapPoint {
  x: number
  y: number
}

/** Stops zig-zag between the left and right lanes, top to bottom. */
export const LANE_LEFT = 300
export const LANE_RIGHT = 700

export const STOP_POINTS: readonly MapPoint[] = [
  { x: LANE_LEFT, y: 110 },
  { x: LANE_RIGHT, y: 265 },
  { x: LANE_LEFT, y: 420 },
  { x: LANE_RIGHT, y: 575 },
  { x: LANE_LEFT, y: 730 },
  { x: LANE_RIGHT, y: 885 },
]

/** How far the S-curve control points reach towards the next stop, as a share of the vertical gap. */
const BEND = 0.58

/** A smooth winding path through the points, each segment leaving and arriving vertically. */
export function windingPath(points: readonly MapPoint[]): string {
  if (points.length === 0) return ''
  const [first, ...rest] = points
  let d = `M${first.x} ${first.y}`
  let prev = first
  for (const point of rest) {
    const reach = (point.y - prev.y) * BEND
    d += ` C${prev.x} ${prev.y + reach} ${point.x} ${point.y - reach} ${point.x} ${point.y}`
    prev = point
  }
  return d
}

export interface PathSample {
  length: number
  x: number
  y: number
}

/** Anything that can measure an SVG path; `SVGPathElement` satisfies it. */
export interface MeasurablePath {
  getTotalLength(): number
  getPointAtLength(length: number): { x: number; y: number }
}

/** Evenly spaced samples along the path, used to invert "height on the map" into "distance along the path". */
export function samplePath(path: MeasurablePath, count = 400): PathSample[] {
  const total = path.getTotalLength()
  return Array.from({ length: count + 1 }, (_, index) => {
    const length = (total * index) / count
    const { x, y } = path.getPointAtLength(length)
    return { length, x, y }
  })
}

/** Distance along the path of the sample closest to each point. */
export function lengthsAtPoints(samples: readonly PathSample[], points: readonly MapPoint[]): number[] {
  return points.map((point) => {
    let best = samples[0]
    let bestDistance = Number.POSITIVE_INFINITY
    for (const sample of samples) {
      const distance = (sample.x - point.x) ** 2 + (sample.y - point.y) ** 2
      if (distance < bestDistance) {
        best = sample
        bestDistance = distance
      }
    }
    return best.length
  })
}

/**
 * Distance along the path where it first reaches height `y`. The path only ever runs downwards,
 * so the samples are sorted by `y` and a linear interpolation between neighbours is exact enough.
 */
export function lengthAtHeight(samples: readonly PathSample[], y: number): number {
  if (samples.length === 0) return 0
  if (y <= samples[0].y) return samples[0].length
  for (let index = 1; index < samples.length; index++) {
    const current = samples[index]
    if (current.y >= y) {
      const previous = samples[index - 1]
      const span = current.y - previous.y
      const t = span === 0 ? 0 : (y - previous.y) / span
      return previous.length + (current.length - previous.length) * t
    }
  }
  return samples[samples.length - 1].length
}

/** Index of the stop within `radius` of `length`, or `null` while walking between stops. */
export function stopNear(stopLengths: readonly number[], length: number, radius: number): number | null {
  let nearest: number | null = null
  let nearestDistance = radius
  stopLengths.forEach((stopLength, index) => {
    const distance = Math.abs(stopLength - length)
    if (distance <= nearestDistance) {
      nearest = index
      nearestDistance = distance
    }
  })
  return nearest
}

/**
 * Eases `length` towards any stop within `radius`, so a walker lingers on each stop instead of
 * sliding past it. Continuous at the edge of the radius, flat at the stop itself.
 */
export function dwellAtStops(stopLengths: readonly number[], length: number, radius: number): number {
  const stop = stopNear(stopLengths, length, radius)
  if (stop === null || radius <= 0) return length
  const offset = length - stopLengths[stop]
  const t = Math.abs(offset) / radius
  return stopLengths[stop] + Math.sign(offset) * radius * t ** 3
}
