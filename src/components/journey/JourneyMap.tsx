import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, RefObject } from 'react'

import { useGallery } from '#/components/gallery/GalleryProvider'
import { Mascot } from '#/components/mascot/Mascot'
import { cn } from '#/lib/cn'
import {
  LANE_LEFT,
  MAP_GRID,
  dwellAtStops,
  STOP_POINTS,
  lengthAtHeight,
  lengthsAtPoints,
  samplePath,
  stopNear,
  windingPath,
} from '#/lib/journeyPath'
import type { PathSample } from '#/lib/journeyPath'
import { useHydrated, useMediaQuery } from '#/lib/useMediaQuery'
import { m } from '#/paraglide/messages.js'
import { JourneyLandscape } from './JourneyLandscape'
import { StopBody, StopMeta } from './StopDetails'
import { getStops } from './stops'
import type { JourneyStop, StopKind } from './stops'

const DESKTOP_QUERY = '(min-width: 64rem)'
const PATH_D = windingPath(STOP_POINTS)

const anchorId = (stop: JourneyStop) => `journey-stop-${stop.id}`

/**
 * Work experience as a winding map. Each stop opens a detail card (a bottom sheet on mobile, a side
 * card on desktop). Without JavaScript, and in print, the same content reads as a plain timeline.
 */
export function JourneyMap() {
  const stops = useMemo(() => getStops(), [])
  const hydrated = useHydrated()
  const isDesktop = useMediaQuery(DESKTOP_QUERY)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const nodeRefs = useRef(new Map<string, HTMLElement>())

  const selectedIndex = stops.findIndex((stop) => stop.id === selectedId)
  const selected = selectedIndex === -1 ? null : stops[selectedIndex]

  const close = useCallback(() => {
    if (selectedId) nodeRefs.current.get(selectedId)?.focus()
    setSelectedId(null)
  }, [selectedId])

  const registerNode = useCallback((id: string, node: HTMLElement | null) => {
    if (node) nodeRefs.current.set(id, node)
    else nodeRefs.current.delete(id)
  }, [])

  return (
    <>
      <div className="print:hidden lg:grid lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-7">
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="font-heading text-[18px] font-semibold text-violet">{m.journey_title()}</p>
            <p className="text-[13px] font-semibold text-ink-soft">{m.journey_hint()}</p>
          </div>
          <MapCanvas
            stops={stops}
            interactive={hydrated}
            selectedId={selectedId}
            onSelect={setSelectedId}
            registerNode={registerNode}
          />
        </div>
        {selected ? (
          <StopDialog
            key={selected.id}
            stop={selected}
            number={selectedIndex + 1}
            modal={!isDesktop}
            onClose={close}
          />
        ) : (
          <DesktopPlaceholder />
        )}
      </div>
      <JourneyTimeline stops={stops} className={hydrated ? 'hidden print:block' : undefined} />
    </>
  )
}

interface MapCanvasProps {
  stops: JourneyStop[]
  interactive: boolean
  selectedId: string | null
  onSelect: (id: string) => void
  registerNode: (id: string, node: HTMLElement | null) => void
}

function MapCanvas({ stops, interactive, selectedId, onSelect, registerNode }: MapCanvasProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const currentIndex = stops.findIndex((stop) => stop.kind === 'current')

  return (
    <div
      ref={mapRef}
      className="relative h-[1160px] overflow-hidden rounded-card-lg shadow-soft sm:h-[1060px] lg:h-[920px]"
    >
      <JourneyLandscape />
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${MAP_GRID} ${MAP_GRID}`}
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
      >
        <path d={PATH_D} fill="none" stroke="#fff" strokeOpacity={0.4} strokeWidth={16} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path
          ref={pathRef}
          d={PATH_D}
          fill="none"
          stroke="#fff"
          strokeWidth={4}
          strokeDasharray="2 12"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ol className="absolute inset-0">
        {stops.map((stop, index) => (
          <StopNode
            key={stop.id}
            stop={stop}
            number={index + 1}
            interactive={interactive}
            selected={stop.id === selectedId}
            onSelect={onSelect}
            registerNode={registerNode}
          />
        ))}
      </ol>

      {interactive ? (
        <KapsiWalker stops={stops} currentIndex={currentIndex} mapRef={mapRef} pathRef={pathRef} />
      ) : null}
    </div>
  )
}

/** Half the pill width, so the pill (not the label) is centred on the stop point. */
const PILL_HALF: Record<StopKind, number> = { passed: 32, current: 40, finish: 32 }

const PILL_CLASS: Record<StopKind, string> = {
  passed:
    'h-12 w-16 bg-lavender text-[20px] text-ink shadow-[0_6px_0_#9c83ee,0_14px_22px_-10px_rgb(42_27_92/0.45)]',
  current:
    'h-14 w-20 bg-violet text-[24px] text-white shadow-[0_7px_0_#3f2a9e,0_16px_26px_-10px_rgb(42_27_92/0.55)]',
  finish: 'h-12 w-16 bg-white shadow-[0_6px_0_#c7b4f8,0_14px_22px_-10px_rgb(42_27_92/0.45)]',
}

interface StopNodeProps {
  stop: JourneyStop
  number: number
  interactive: boolean
  selected: boolean
  onSelect: (id: string) => void
  registerNode: (id: string, node: HTMLElement | null) => void
}

function StopNode({ stop, number, interactive, selected, onSelect, registerNode }: StopNodeProps) {
  const point = STOP_POINTS[number - 1]
  const labelRight = point.x === LANE_LEFT
  const half = PILL_HALF[stop.kind]

  const className = cn(
    'group absolute top-0 flex -translate-y-1/2 cursor-pointer items-center gap-3 rounded-full text-left',
    labelRight ? 'flex-row' : 'flex-row-reverse',
  )
  const style = labelRight ? { left: -half } : { right: -half }
  const ref = (node: HTMLElement | null) => registerNode(stop.id, node)

  const content = (
    <>
      <span
        className={cn(
          'relative grid flex-none place-items-center rounded-full font-heading font-bold ring-4 transition-transform duration-200 group-hover:-translate-y-0.5',
          PILL_CLASS[stop.kind],
          selected ? 'ring-butter' : 'ring-white',
        )}
      >
        {stop.kind === 'current' ? (
          <span aria-hidden="true" className="absolute -inset-2 animate-pulse-ring rounded-full border-4 border-violet/50" />
        ) : null}
        {stop.kind === 'finish' ? <FlagIcon /> : <span aria-hidden="true">{number}</span>}
      </span>
      <span
        className={cn(
          'block w-max max-w-[min(44vw,230px)] rounded-2xl bg-white/92 px-3 py-2 shadow-soft-sm backdrop-blur-[2px] transition-colors',
          selected && 'bg-white ring-2 ring-violet',
        )}
      >
        <span className="sr-only">{number}. </span>
        <span className="block font-heading text-[13.5px] leading-[1.25] font-semibold text-ink">{stop.title}</span>
        {stop.kind === 'finish' ? (
          <span className="mt-1 flex items-center gap-1.5 text-[11.5px] font-bold text-ink-soft">
            <span aria-hidden="true" className="size-1.5 flex-none rounded-full bg-mint" />
            {m.hero_open_badge()}
          </span>
        ) : stop.period ? (
          <span className="mt-1 block text-[11.5px] font-bold text-ink-soft">{stop.period}</span>
        ) : null}
      </span>
    </>
  )

  return (
    <li className="absolute size-0" style={{ left: `${point.x / 10}%`, top: `${point.y / 10}%` }}>
      {interactive ? (
        <button
          ref={ref}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={selected}
          aria-current={stop.kind === 'current' ? 'step' : undefined}
          onClick={() => onSelect(stop.id)}
          className={className}
          style={style}
        >
          {content}
        </button>
      ) : (
        <a
          ref={ref}
          href={`#${anchorId(stop)}`}
          aria-current={stop.kind === 'current' ? 'step' : undefined}
          className={className}
          style={style}
        >
          {content}
        </a>
      )}
    </li>
  )
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="size-7">
      <path d="M9 4 V28" stroke="#2A1B5C" strokeWidth={3} strokeLinecap="round" />
      <path d="M10 5 H26 L22 11 L26 17 H10z" fill="#5B3FE0" />
      <path d="M14 9 l1 2 2 1 -2 1 -1 2 -1 -2 -2 -1 2 -1z" fill="#F7C52B" />
    </svg>
  )
}

interface KapsiWalkerProps {
  stops: JourneyStop[]
  currentIndex: number
  mapRef: RefObject<HTMLDivElement | null>
  pathRef: RefObject<SVGPathElement | null>
}

/** Share of the path around each stop where Kapsi lingers, and where it speaks. */
const DWELL_RADIUS = 0.07
const BUBBLE_RADIUS = 0.01

/** Kapsi steps away from the path by this much, towards the outer edge, so it never covers a stop. */
const SIDE_STEP = { mobile: 62, desktop: 84 }

/**
 * Kapsi walks the path as the page scrolls: it stands where the path crosses the middle of the
 * viewport and says something while it is near a stop. With reduced motion it waits at the current stop.
 */
function KapsiWalker({ stops, currentIndex, mapRef, pathRef }: KapsiWalkerProps) {
  const reduceMotion = useReducedMotion() ?? false
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [ready, setReady] = useState(false)
  const [side, setSide] = useState<'left' | 'right'>('left')
  const [facingLeft, setFacingLeft] = useState(false)
  const [bubble, setBubble] = useState<{ index: number; visible: boolean }>({ index: 0, visible: true })

  const geometry = useRef<{ samples: PathSample[]; stopLengths: number[]; total: number } | null>(null)
  const size = useRef({ width: 0, height: 0 })
  const lastLength = useRef(0)

  const place = useCallback(
    (length: number) => {
      const path = pathRef.current
      const geo = geometry.current
      if (!path || !geo || size.current.width === 0) return
      const point = path.getPointAtLength(length)
      const { width, height } = size.current
      const outward = Math.max(-1, Math.min(1, (point.x - MAP_GRID / 2) / 200))
      const step = width >= 640 ? SIDE_STEP.desktop : SIDE_STEP.mobile
      x.set((point.x / MAP_GRID) * width + outward * step)
      y.set((point.y / MAP_GRID) * height)
      setSide(outward < 0 ? 'left' : 'right')
      if (length !== lastLength.current) {
        // Face the way the path runs when walking forward, and the other way when scrolling back up.
        const forward = length > lastLength.current
        setFacingLeft(isHeadingLeft(path, length) === forward)
      }
      lastLength.current = length

      const near = stopNear(geo.stopLengths, length, geo.total * BUBBLE_RADIUS)
      setBubble((previous) =>
        near === null
          ? previous.visible
            ? { ...previous, visible: false }
            : previous
          : previous.index === near && previous.visible
            ? previous
            : { index: near, visible: true },
      )
    },
    [pathRef, x, y],
  )

  const { scrollYProgress } = useScroll({ target: mapRef, offset: ['start center', 'end center'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.0005 })

  const lengthForProgress = useCallback((value: number) => {
    const geo = geometry.current
    if (!geo) return 0
    const length = dwellAtStops(geo.stopLengths, lengthAtHeight(geo.samples, value * MAP_GRID), geo.total * DWELL_RADIUS)
    return Math.max(geo.stopLengths[0], Math.min(geo.stopLengths[geo.stopLengths.length - 1], length))
  }, [])

  const restingLength = useCallback(() => {
    const geo = geometry.current
    if (!geo) return 0
    return reduceMotion ? geo.stopLengths[currentIndex] : lengthForProgress(progress.get())
  }, [currentIndex, lengthForProgress, progress, reduceMotion])

  useLayoutEffect(() => {
    const path = pathRef.current
    const map = mapRef.current
    // jsdom (tests) cannot measure SVG paths; Kapsi simply stays hidden there.
    if (!path || !map || typeof path.getTotalLength !== 'function') return

    const samples = samplePath(path)
    geometry.current = {
      samples,
      stopLengths: lengthsAtPoints(samples, STOP_POINTS),
      total: path.getTotalLength(),
    }

    const measure = () => {
      size.current = { width: map.clientWidth, height: map.clientHeight }
      place(restingLength())
    }
    measure()
    setReady(true)

    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(map)
    return () => observer.disconnect()
  }, [mapRef, pathRef, place, restingLength])

  useMotionValueEvent(progress, 'change', (value) => {
    if (!reduceMotion) place(lengthForProgress(value))
  })

  useEffect(() => {
    if (reduceMotion) place(restingLength())
  }, [place, reduceMotion, restingLength])

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y }}
      className={cn(
        'pointer-events-none absolute top-0 left-0 z-10 transition-opacity duration-300',
        ready ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div className="relative w-[54px] -translate-x-1/2 -translate-y-[60%] sm:w-[70px]">
        <p
          className={cn(
            'absolute bottom-[calc(100%+4px)] w-max max-w-[128px] rounded-2xl bg-white px-3 py-2 font-heading text-[12.5px] leading-[1.3] font-semibold text-ink shadow-soft transition-opacity duration-300 sm:max-w-[200px]',
            side === 'left' ? 'left-0 rounded-bl-[6px]' : 'right-0 rounded-br-[6px]',
            bubble.visible ? 'opacity-100' : 'opacity-0',
          )}
        >
          {stops[bubble.index]?.bubble}
        </p>
        <Mascot
          pose="walk"
          className={cn(
            'block w-full drop-shadow-[0_8px_10px_rgb(42_27_92/0.25)] transition-[scale] duration-300',
            facingLeft && '-scale-x-100',
          )}
        />
      </div>
    </motion.div>
  )
}

/** Whether the path runs right-to-left just after `length`. */
function isHeadingLeft(path: SVGPathElement, length: number) {
  const here = path.getPointAtLength(length)
  const ahead = path.getPointAtLength(length + 4)
  return ahead.x < here.x
}

interface StopDialogProps {
  stop: JourneyStop
  number: number
  /** Mobile bottom sheet: dims the page and locks scrolling. */
  modal: boolean
  onClose: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function StopDialog({ stop, number, modal, onClose }: StopDialogProps) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const { view } = useGallery()
  const galleryOpen = view.active !== null

  // Focus the card on open, and again when the photo viewer on top of it closes.
  useEffect(() => {
    if (!galleryOpen) closeRef.current?.focus({ preventScroll: true })
  }, [galleryOpen])

  useEffect(() => {
    if (!modal) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [modal])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // The photo viewer sits on top and handles its own keys.
    if (galleryOpen) return
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
      return
    }
    if (event.key !== 'Tab' || !dialogRef.current) return
    const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)]
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <>
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] lg:hidden"
      />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal={modal}
        aria-labelledby={titleId}
        onKeyDown={onKeyDown}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-soft-lg lg:sticky lg:top-24 lg:bottom-auto lg:z-auto lg:max-h-[calc(100dvh-8rem)] lg:rounded-card-lg"
      >
        <span aria-hidden="true" className="mx-auto mt-2.5 h-1.5 w-12 flex-none rounded-full bg-lavender-200 lg:hidden" />
        <div className="flex flex-none items-start gap-3 px-6 pt-4 pb-3 lg:pt-6">
          <span
            aria-hidden="true"
            className={cn(
              'grid h-9 min-w-12 flex-none place-items-center rounded-full px-2 font-heading text-[16px] font-bold',
              stop.kind === 'current' ? 'bg-violet text-white' : 'bg-lavender text-ink',
            )}
          >
            {stop.kind === 'finish' ? '🚩' : number}
          </span>
          <h3
            id={titleId}
            className="min-w-0 flex-1 pt-1 font-heading text-[clamp(18px,2vw,21px)] leading-[1.25] font-semibold text-pretty"
          >
            {stop.title}
          </h3>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={m.journey_close()}
            className="grid size-10 flex-none cursor-pointer place-items-center rounded-full bg-lavender-50 font-heading text-[20px] leading-none text-violet transition-colors hover:bg-lavender-100"
          >
            ×
          </button>
        </div>
        <div className="flex flex-col gap-5 overflow-y-auto overscroll-contain px-6 pb-7">
          <StopMeta stop={stop} />
          <StopBody stop={stop} />
        </div>
      </motion.div>
    </>
  )
}

function DesktopPlaceholder() {
  return (
    <div className="hidden rounded-card-lg bg-white/80 p-7 text-center shadow-soft lg:sticky lg:top-24 lg:block">
      <Mascot pose="walk" className="mx-auto mb-4 block w-[96px]" />
      <p className="font-heading text-[18px] font-semibold text-violet">{m.journey_title()}</p>
      <p className="mt-2 text-[14px] font-semibold text-ink-soft">{m.journey_hint()}</p>
    </div>
  )
}

/** The plain timeline used without JavaScript and when printing. */
function JourneyTimeline({ stops, className }: { stops: JourneyStop[]; className?: string }) {
  return (
    <ol className={cn('mt-8 flex flex-col gap-5 print:mt-0', className)}>
      {stops.map((stop, index) => (
        <li
          key={stop.id}
          id={anchorId(stop)}
          className="flex break-inside-avoid flex-col gap-3.5 rounded-card bg-white p-6 shadow-soft print:rounded-none print:p-0 print:shadow-none"
        >
          <h3 className="font-heading text-[19px] leading-[1.25] font-semibold">
            {stop.kind === 'finish' ? '🚩 ' : `${index + 1}. `}
            {stop.title}
          </h3>
          <StopMeta stop={stop} />
          <StopBody stop={stop} withMedia={false} />
        </li>
      ))}
    </ol>
  )
}
