import { cn } from '#/lib/cn'

const INSTRUMENTS = [
  'HPLC',
  'GC',
  'AAS',
  'FTIR',
  'ICP-OES',
  'UV-VIS',
  'TLC UV SCANNER',
  'KARL FISCHER',
  'DISSOLUTION TESTER',
  'POLARIMETER',
  'EMPOWER',
  'ORACLE',
]

function PillRun({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex gap-3 pr-3" aria-hidden={hidden || undefined}>
      {INSTRUMENTS.map((name, index) => (
        <li
          key={name}
          className={cn(
            'rounded-full px-4 py-2 font-heading font-semibold text-[14px] whitespace-nowrap',
            index % 2 === 0 ? 'bg-white text-violet shadow-soft-sm' : 'bg-violet text-white',
          )}
        >
          {name}
        </li>
      ))}
    </ul>
  )
}

export function Marquee() {
  return (
    <div className="overflow-hidden bg-lavender-100/70 py-4">
      {/* Two identical runs; the track slides by exactly half its width for a seamless loop. */}
      <div className="flex w-max animate-marquee">
        <PillRun />
        <PillRun hidden />
      </div>
    </div>
  )
}
