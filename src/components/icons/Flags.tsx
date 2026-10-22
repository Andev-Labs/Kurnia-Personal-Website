/** Five-point star as an SVG `points` list, pointing at `rotation` degrees (0 = straight up). */
function starPoints(cx: number, cy: number, r: number, rotation = 0) {
  return Array.from({ length: 10 }, (_, i) => {
    const radius = i % 2 === 0 ? r : r * 0.382
    const angle = ((rotation + i * 36 - 90) * Math.PI) / 180
    return `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`
  }).join(' ')
}

/** Round flags: the square SVG fills its box and the caller clips it to a circle. */
export function RussiaFlag() {
  return (
    <svg viewBox="0 0 30 30" className="block size-full" aria-hidden="true">
      <rect width="30" height="10" fill="#FFFFFF" />
      <rect y="10" width="30" height="10" fill="#0039A6" />
      <rect y="20" width="30" height="10" fill="#D52B1E" />
    </svg>
  )
}

export function ChinaFlag() {
  return (
    <svg viewBox="0 0 30 30" className="block size-full" aria-hidden="true">
      <rect width="30" height="30" fill="#EE1C25" />
      <g fill="#FFDE00">
        <polygon points={starPoints(10, 11, 5)} />
        <polygon points={starPoints(17.5, 5.5, 1.6, 23)} />
        <polygon points={starPoints(20.5, 8.5, 1.6, 45)} />
        <polygon points={starPoints(20.5, 12.5, 1.6, 70)} />
        <polygon points={starPoints(17.5, 15.5, 1.6, 21)} />
      </g>
    </svg>
  )
}
