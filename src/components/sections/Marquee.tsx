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

const TEXT = `${INSTRUMENTS.join(' · ')} · `

export function Marquee() {
  return (
    <div className="overflow-hidden border-y-3 border-ink bg-lavender py-[13px]">
      {/* Two identical runs; the track slides by exactly half its width for a seamless loop. */}
      <div className="flex w-max animate-marquee font-display text-[16px] tracking-[0.01em]">
        <span className="pr-[26px]">{TEXT}</span>
        <span className="pr-[26px]" aria-hidden="true">
          {TEXT}
        </span>
      </div>
    </div>
  )
}
