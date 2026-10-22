import { useId } from 'react'
import type { ReactNode } from 'react'

import { cn } from '#/lib/cn'

/** Kapsi, Kurnia's pill-capsule mascot. Drawn on a 200×240 canvas. */
export type MascotPose = 'wave' | 'lab' | 'walk' | 'grad' | 'trophy' | 'mail'

export const MASCOT_POSES: readonly MascotPose[] = ['wave', 'lab', 'walk', 'grad', 'trophy', 'mail']

const LAV = '#B9A2F5'
const LAV_D = '#9C83EE'
const VIO = '#5B3FE0'
const LIMB = '#7C5CE6'
const INK = '#2A1B5C'
const YEL = '#F7C52B'
const MINT = '#3DB48A'
const PINK = '#FF9EC4'

/* Rotating or scaling an SVG part around its own box needs `transform-box: fill-box`. */
const BLINK_CLASS = 'origin-center animate-blink [transform-box:fill-box]'
const TWINKLE_CLASS = 'origin-center animate-twinkle [transform-box:fill-box]'

/**
 * Idle motion for the whole figure, anchored at the feet so Kapsi stays planted. The walking pose
 * already bobs, so it has none. Hovering swaps it for a jump (`.kapsi:hover .kapsi-idle` in styles.css).
 */
const IDLE_CLASS: Record<MascotPose, string | null> = {
  wave: 'animate-kapsi-breathe',
  lab: 'animate-kapsi-breathe [animation-delay:-0.8s]',
  walk: null,
  grad: 'animate-kapsi-breathe [animation-delay:-1.6s]',
  trophy: 'animate-kapsi-hop',
  mail: 'animate-kapsi-breathe [animation-delay:-2.4s]',
}

interface MascotProps {
  pose: MascotPose
  className?: string
  /** Accessible name. Without it the mascot is decorative and hidden from assistive tech. */
  title?: string
}

export function Mascot({ pose, className, title }: MascotProps) {
  const reactId = useId()
  const uid = `kapsi-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`
  const clipId = `${uid}-clip`
  const titleId = `${uid}-title`
  const a11y = title ? { role: 'img', 'aria-labelledby': titleId } : { 'aria-hidden': true, focusable: false }

  return (
    <svg viewBox="0 0 200 240" className={cn('kapsi', className)} data-pose={pose} {...a11y}>
      {title ? <title id={titleId}>{title}</title> : null}
      {IDLE_CLASS[pose] ? (
        <g className={cn('kapsi-idle origin-[100px_222px]', IDLE_CLASS[pose])}>{renderPose(pose, clipId)}</g>
      ) : (
        renderPose(pose, clipId)
      )}
    </svg>
  )
}

function renderPose(pose: MascotPose, clipId: string): ReactNode {
  switch (pose) {
    case 'wave':
      return (
        <>
          <Arm x1={56} y1={132} x2={38} y2={158} />
          <Body clipId={clipId} mouth="open" />
          <g className="origin-[144px_128px] animate-wave">
            <Arm x1={144} y1={128} x2={170} y2={92} />
            <path
              d="M178 78 q6 6 4 14 M186 72 q9 9 6 22"
              stroke={VIO}
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              opacity={0.5}
            />
          </g>
          <Sparkle x={30} y={60} scale={1.1} className={TWINKLE_CLASS} />
          <Sparkle x={176} y={190} scale={0.7} color={MINT} className={cn(TWINKLE_CLASS, '[animation-delay:-1.6s]')} />
        </>
      )
    case 'lab':
      return (
        <>
          <Arm x1={56} y1={132} x2={38} y2={158} />
          <Body clipId={clipId} accessory={<Goggles />} />
          {/* Kapsi swirls the flask around the hand holding it. */}
          <g className="origin-[158px_150px] animate-kapsi-swirl">
            <Flask />
          </g>
          <Arm x1={144} y1={130} x2={158} y2={150} />
        </>
      )
    case 'walk':
      return (
        <g className="animate-bob">
          <g transform="rotate(-5 100 120)">
            <rect x={38} y={96} width={24} height={44} rx={10} fill={YEL} />
            <rect x={42} y={116} width={16} height={12} rx={4} fill="#E2AE10" />
            <Body clipId={clipId} legs="walk" mouth="open" />
            <Arm x1={56} y1={132} x2={40} y2={154} />
          </g>
          <path d="M168 78 V170" stroke={INK} strokeWidth={4} strokeLinecap="round" />
          <path d="M170 80 h30 l-8 10 8 10 h-30z" fill={VIO} />
          <Sparkle x={185} y={90} scale={0.45} color="#fff" />
          <Arm x1={143} y1={128} x2={166} y2={140} />
        </g>
      )
    case 'grad':
      return (
        <>
          <Arm x1={56} y1={132} x2={38} y2={158} />
          <Body clipId={clipId} accessory={<GradCap />} />
          {/* The diploma waves from the hand. */}
          <g className="origin-[160px_150px] animate-kapsi-sway">
            <g transform="rotate(-20 165 150)">
              <rect x={150} y={142} width={34} height={14} rx={7} fill="#FFF7E0" stroke={INK} strokeWidth={2} />
              <rect x={164} y={141} width={6} height={16} fill={PINK} />
            </g>
          </g>
          <Arm x1={144} y1={130} x2={160} y2={150} />
        </>
      )
    case 'trophy':
      return (
        <>
          {CONFETTI.map(([x, y, fill, r], i) => (
            <g key={`${x}-${y}`} className={TWINKLE_CLASS} style={{ animationDelay: `${i * -0.6}s` }}>
              <rect x={x} y={y} width={6} height={10} rx={2} fill={fill} transform={`rotate(${r} ${x} ${y})`} />
            </g>
          ))}
          <Body clipId={clipId} eyes="happy" mouth="open" accessory={<Crown />} />
          <path d="M62 120 L140 178 L130 186 L56 132z" fill={VIO} opacity={0.9} />
          {/* Both arms pump in a cheer. */}
          <g className="origin-[56px_126px] animate-kapsi-pump-l">
            <Arm x1={56} y1={126} x2={30} y2={90} />
          </g>
          <g className="origin-[144px_126px] animate-kapsi-pump-r">
            <Arm x1={144} y1={126} x2={170} y2={90} />
          </g>
        </>
      )
    case 'mail':
      return (
        <>
          <Body clipId={clipId} />
          <Arm x1={56} y1={130} x2={80} y2={150} />
          <Arm x1={144} y1={130} x2={120} y2={150} />
          {/* The letter rocks gently while its heart beats. */}
          <g className="origin-[100px_155px] animate-kapsi-tilt">
            <g transform="translate(78 140)">
              <rect width={44} height={30} rx={5} fill="#fff" stroke={INK} strokeWidth={2.5} />
              <path d="M2 3 l20 15 20 -15" stroke={INK} strokeWidth={2.5} fill="none" strokeLinejoin="round" />
              <g className="origin-center animate-kapsi-heartbeat [transform-box:fill-box]">
                <path d="M22 -10 c-3 -6 -11 -3 -8 3 l8 7 8 -7 c3 -6 -5 -9 -8 -3z" fill={PINK} />
              </g>
            </g>
          </g>
        </>
      )
  }
}

const CONFETTI: ReadonlyArray<readonly [number, number, string, number]> = [
  [30, 50, PINK, 20],
  [170, 40, MINT, -30],
  [24, 120, YEL, 45],
  [178, 120, VIO, 10],
  [150, 20, YEL, 60],
]

interface BodyProps {
  clipId: string
  eyes?: 'open' | 'happy'
  mouth?: 'smile' | 'open'
  legs?: 'stand' | 'walk'
  /** Headwear drawn over the face. */
  accessory?: ReactNode
}

/** Shared capsule body, legs and face. Arms and props are layered per pose. */
function Body({ clipId, eyes = 'open', mouth = 'smile', legs = 'stand', accessory }: BodyProps) {
  return (
    <>
      <ellipse cx={100} cy={224} rx={42} ry={6} fill={INK} opacity={0.08} />
      {legs === 'walk' ? (
        <>
          <Limb d="M86 186 L76 210" />
          <ellipse cx={72} cy={213} rx={10} ry={6} fill={VIO} />
          <Limb d="M114 186 L122 208" />
          <ellipse cx={127} cy={210} rx={10} ry={6} fill={VIO} transform="rotate(-12 127 210)" />
        </>
      ) : (
        <>
          <Limb d="M86 186 L85 210" />
          <ellipse cx={81} cy={213} rx={10} ry={6} fill={VIO} />
          <Limb d="M114 186 L115 210" />
          <ellipse cx={119} cy={213} rx={10} ry={6} fill={VIO} />
        </>
      )}
      <g>
        <rect x={54} y={38} width={92} height={152} rx={46} fill="#fff" />
        <path d="M54 84 a46 46 0 0 1 92 0 V114 H54z" fill={LAV} />
        <rect x={54} y={112} width={92} height={5} fill={LAV_D} />
        <clipPath id={clipId}>
          <rect x={54} y={38} width={92} height={152} rx={46} />
        </clipPath>
        <path d="M54 117 H146 V190 H54z" fill="#FFF6E8" clipPath={`url(#${clipId})`} />
        <rect x={128} y={38} width={22} height={152} fill={INK} opacity={0.07} clipPath={`url(#${clipId})`} />
        <rect x={54} y={38} width={92} height={152} rx={46} fill="none" stroke={LAV_D} strokeWidth={2.5} opacity={0.55} />
        <path d="M68 70 q4 -14 16 -20" stroke="#fff" strokeWidth={5} fill="none" strokeLinecap="round" opacity={0.7} />
        <circle cx={80} cy={150} r={3} fill={LAV} opacity={0.6} />
        <circle cx={118} cy={160} r={2.5} fill={LAV} opacity={0.6} />
        <circle cx={100} cy={142} r={2} fill={LAV} opacity={0.6} />
      </g>
      {eyes === 'happy' ? <HappyEyes /> : <OpenEyes />}
      <ellipse cx={71} cy={105} rx={7} ry={4.5} fill={PINK} opacity={0.75} />
      <ellipse cx={129} cy={105} rx={7} ry={4.5} fill={PINK} opacity={0.75} />
      {mouth === 'open' ? (
        <>
          <path d="M92 103 q8 12 16 0 z" fill={INK} />
          <path d="M96 107 q4 3 8 0" fill={PINK} />
        </>
      ) : (
        <path d="M93 104 q7 8 14 0" stroke={INK} strokeWidth={3.5} fill="none" strokeLinecap="round" />
      )}
      {accessory}
    </>
  )
}

function OpenEyes() {
  return (
    <g className={BLINK_CLASS}>
      {[84, 116].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={90} r={11.5} fill="#fff" />
          <circle cx={cx + 1} cy={91} r={7.5} fill={INK} />
          <path
            d={`M${cx - 2} 85.5 l1.2 2.6 2.6 1.2 -2.6 1.2 -1.2 2.6 -1.2 -2.6 -2.6 -1.2 2.6 -1.2z`}
            fill="#fff"
          />
          <circle cx={cx + 4} cy={94} r={1.4} fill="#fff" />
        </g>
      ))}
    </g>
  )
}

function HappyEyes() {
  return (
    <>
      <path d="M75 92 q9 -10 18 0" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M107 92 q9 -10 18 0" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
    </>
  )
}

function Limb({ d }: { d: string }) {
  return <path d={d} stroke={LIMB} strokeWidth={8} strokeLinecap="round" />
}

/** A curved arm from the shoulder (x1, y1) to a round hand at (x2, y2). */
function Arm({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const cx = (x1 + x2) / 2 + (x2 > x1 ? 6 : -6)
  const cy = (y1 + y2) / 2 + 6
  return (
    <>
      <path d={`M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`} stroke={LIMB} strokeWidth={7} fill="none" strokeLinecap="round" />
      <circle cx={x2} cy={y2} r={6.5} fill={LIMB} />
    </>
  )
}

interface SparkleProps {
  x: number
  y: number
  scale?: number
  color?: string
  className?: string
}

/* The wrapper carries any animation: a CSS transform would replace the path's own `transform`. */
function Sparkle({ x, y, scale = 1, color = YEL, className }: SparkleProps) {
  return (
    <g className={className}>
      <path
        transform={`translate(${x} ${y}) scale(${scale})`}
        d="M0 -10 C1 -3 3 -1 10 0 C3 1 1 3 0 10 C-1 3 -3 1 -10 0 C-3 -1 -1 -3 0 -10z"
        fill={color}
      />
    </g>
  )
}

function Goggles() {
  return (
    <>
      <rect x={62} y={56} width={76} height={8} rx={4} fill={VIO} />
      <rect x={70} y={50} width={26} height={18} rx={8} fill="#DDF3FF" stroke={VIO} strokeWidth={3} />
      <rect x={104} y={50} width={26} height={18} rx={8} fill="#DDF3FF" stroke={VIO} strokeWidth={3} />
      <path d="M75 55 l6 0" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M109 55 l6 0" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" />
    </>
  )
}

function Flask() {
  return (
    <g transform="translate(150 118)">
      <path
        d="M10 0 h14 v4 h-2 v14 l14 26 a6 6 0 0 1 -5 9 h-28 a6 6 0 0 1 -5 -9 l14 -26 v-14 h-2z"
        fill="#E9F7F2"
        stroke={INK}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <path d="M6 36 h22 l5 9 a3 3 0 0 1 -3 4 h-26 a3 3 0 0 1 -3 -4z" fill={MINT} />
      <circle cx={14} cy={42} r={2} fill="#fff" />
      <circle cx={21} cy={39} r={1.5} fill="#fff" />
      {/* Bubbles rise out of the flask. */}
      {FLASK_BUBBLES.map(([cx, r, delay]) => (
        <circle
          key={cx}
          cx={cx}
          cy={-4}
          r={r}
          fill={MINT}
          opacity={0.7}
          className="animate-bubble"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </g>
  )
}

const FLASK_BUBBLES: ReadonlyArray<readonly [number, number, number]> = [
  [20, 3, 0],
  [13, 2, -0.8],
  [17, 2.5, -1.6],
]

function GradCap() {
  return (
    <>
      <path d="M100 22 l46 16 -46 16 -46 -16z" fill={INK} />
      <path d="M76 44 v12 q24 12 48 0 v-12 l-24 9z" fill="#3B2A7A" />
      <g className="origin-[140px_40px] animate-kapsi-tassel">
        <path d="M140 40 v22" stroke={YEL} strokeWidth={3} />
        <circle cx={140} cy={64} r={4.5} fill={YEL} />
      </g>
    </>
  )
}

function Crown() {
  return (
    <g transform="translate(0 10)">
      <path
        d="M78 40 l8 -18 14 14 14 -14 8 18z"
        fill={YEL}
        stroke="#E2AE10"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <circle cx={86} cy={22} r={3.5} fill={YEL} />
      <circle cx={114} cy={22} r={3.5} fill={YEL} />
      <circle cx={100} cy={36} r={3} fill={PINK} />
    </g>
  )
}
