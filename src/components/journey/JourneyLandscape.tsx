import type { CSSProperties } from 'react'

import { cn } from '#/lib/cn'

/*
 * Misty teal landscape behind the Journey Map. Ground shapes stretch with the map box; trees,
 * the lab and the boat are positioned by percentage at a fixed size so they never get squashed.
 */

const PINE_DARK = '#7FB3AD'
const PINE_LIGHT = '#9CC6C1'
const TRUNK = '#6E9E99'

/** Position on the 0–100 map grid (percent of the box). */
const at = (x: number, y: number): CSSProperties => ({ left: `${x}%`, top: `${y}%` })

export function JourneyLandscape() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#E3F0EE_0%,#CFE4E1_30%,#BCD9D5_62%,#A9CFCB_100%)] select-none"
    >
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <defs>
          <filter id="journey-mist" x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        {/* Far hills */}
        <path d="M0 120 C120 70 220 90 320 110 S520 60 640 95 S860 70 1000 105 V230 H0z" fill="#D6E9E6" />
        <path d="M0 210 C150 170 260 200 380 190 S640 150 760 185 S920 170 1000 190 V320 H0z" fill="#C8E0DC" />
        {/* Plateau the path winds across */}
        <path
          d="M0 300 C180 270 330 300 500 285 S820 260 1000 290 V1000 H0z"
          fill="#B4D5D1"
          opacity="0.55"
        />
        {/* River into the lake */}
        <path
          d="M1000 560 C900 580 860 640 880 700 S960 780 900 820 C860 845 820 850 800 860 L1000 860z"
          fill="#D9EFF2"
          opacity="0.9"
        />
        {/* Lake with a darker shore */}
        <path
          d="M560 905 C600 845 700 830 790 845 C880 858 960 830 1000 840 V1000 H520 C520 960 540 930 560 905z"
          fill="#8FBDB8"
        />
        <path
          d="M575 915 C615 862 705 850 790 862 C880 874 955 850 1000 858 V1000 H540 C540 965 555 938 575 915z"
          fill="#D3EDF2"
        />
        <path d="M640 940 h70 M780 905 h50 M860 960 h60" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
        {/* Mist bands */}
        <g fill="#fff" filter="url(#journey-mist)">
          <ellipse cx="200" cy="250" rx="260" ry="26" opacity="0.55" />
          <ellipse cx="820" cy="420" rx="240" ry="22" opacity="0.45" />
          <ellipse cx="260" cy="640" rx="280" ry="24" opacity="0.4" />
          <ellipse cx="760" cy="790" rx="230" ry="20" opacity="0.45" />
        </g>
      </svg>

      <PineCluster style={at(80, 6)} className="w-[92px] opacity-70" />
      <PineCluster style={at(4, 17)} className="w-[78px] opacity-60" />
      <LabZone style={at(3, 37)} className="w-[96px] lg:w-[118px]" />
      <PineCluster style={at(86, 47)} className="w-[70px] opacity-75" />
      <Stump style={at(52, 42)} />
      <PineCluster style={at(2, 66)} className="w-[86px] opacity-80" />
      <Stump style={at(45, 76)} />
      <PineCluster style={at(88, 72)} className="w-[64px] opacity-70" />
      <Boat style={at(74, 96)} className="w-[64px] lg:w-[78px]" />
    </div>
  )
}

interface PieceProps {
  style: CSSProperties
  className?: string
}

function Pine({ x, scale, fill }: { x: number; scale: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${100 - 100 * scale}) scale(${scale})`}>
      <rect x={-3} y={84} width={6} height={16} rx={2} fill={TRUNK} />
      <path d="M0 0 L22 40 H12 L28 66 H14 L32 90 H-32 L-14 66 H-28 L-12 40 H-22z" fill={fill} />
    </g>
  )
}

function PineCluster({ style, className }: PieceProps) {
  return (
    <svg viewBox="-40 0 160 100" style={style} className={cn('absolute', className)}>
      <Pine x={70} scale={0.72} fill={PINE_LIGHT} />
      <Pine x={0} scale={0.86} fill={PINE_LIGHT} />
      <Pine x={34} scale={1} fill={PINE_DARK} />
    </svg>
  )
}

function Stump({ style }: { style: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 20" style={style} className="absolute w-[34px] opacity-70">
      <ellipse cx={20} cy={16} rx={18} ry={4} fill="#9CC6C1" />
      <rect x={10} y={4} width={20} height={12} fill={TRUNK} />
      <ellipse cx={20} cy={4} rx={10} ry={3.5} fill="#B9DAD6" />
    </svg>
  )
}

/** A small factory and lab building for the Kalbe Consumer Health stops. */
function LabZone({ style, className }: PieceProps) {
  return (
    <svg viewBox="0 0 120 100" style={style} className={cn('absolute', className)}>
      <ellipse cx={60} cy={96} rx={58} ry={5} fill="#8FBDB8" opacity={0.5} />
      {/* Chimney steam */}
      <g fill="#fff" opacity={0.85}>
        <circle cx={24} cy={14} r={6} />
        <circle cx={32} cy={8} r={5} />
        <circle cx={40} cy={4} r={3.5} />
      </g>
      <rect x={18} y={22} width={12} height={34} rx={2} fill="#C5DFDB" />
      <path d="M8 96 V52 L32 40 V52 L56 40 V52 L80 40 V96z" fill="#E7F3F1" />
      <path d="M8 96 V52 L32 40 V52 L56 40 V52 L80 40 V96z" fill="none" stroke="#8FBDB8" strokeWidth={2} />
      <rect x={70} y={48} width={44} height={48} rx={4} fill="#F4FAF9" stroke="#8FBDB8" strokeWidth={2} />
      {/* Flask sign on the lab */}
      <g transform="translate(83 54)">
        <circle cx={9} cy={9} r={11} fill="#B9A2F5" />
        <path d="M6 3 h6 v4 l4 8 a2 2 0 0 1 -2 3 h-10 a2 2 0 0 1 -2 -3 l4 -8z" fill="#fff" />
      </g>
      {[16, 30, 44, 60].map((x) => (
        <rect key={x} x={x} y={64} width={8} height={10} rx={1.5} fill="#A9CFCB" />
      ))}
      <rect x={78} y={78} width={10} height={18} rx={2} fill="#A9CFCB" />
      <rect x={94} y={78} width={12} height={10} rx={2} fill="#A9CFCB" />
    </svg>
  )
}

function Boat({ style, className }: PieceProps) {
  return (
    <svg viewBox="0 0 80 40" style={style} className={cn('absolute -translate-x-1/2 -translate-y-1/2', className)}>
      <ellipse cx={40} cy={34} rx={34} ry={4} fill="#8FBDB8" opacity={0.6} />
      <path d="M6 18 H74 L64 32 H16z" fill="#E86A5C" />
      <path d="M10 18 H70 L66 23 H14z" fill="#B9A2F5" />
      <path d="M40 18 L58 4" stroke="#7C5CE6" strokeWidth={3} strokeLinecap="round" />
      <path d="M58 4 l6 -2" stroke="#7C5CE6" strokeWidth={4} strokeLinecap="round" />
    </svg>
  )
}
