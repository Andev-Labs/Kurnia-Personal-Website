import { m } from '#/paraglide/messages.js'

const INSTRUMENTS = [
  'HPLC',
  'GC',
  'ICP-OES',
  'AAS',
  'FTIR',
  'UV-Vis',
  'TLC UV Scanner',
  'Karl Fischer',
  'Dissolution Tester',
  'Polarimeter',
  'Waters Empower',
  'Oracle',
]

export function Marquee() {
  const run = (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {INSTRUMENTS.map((name) => (
        <span key={name} className="flex items-center gap-8">
          {name}
          <span aria-hidden="true" className="size-1 rounded-full bg-teal/50" />
        </span>
      ))}
    </span>
  )

  return (
    // Focusable so keyboard users can pause it too; hover or focus pauses the scroll.
    <div
      role="region"
      aria-label={m.marquee_label()}
      tabIndex={0}
      className="group overflow-hidden border-b border-line bg-paper py-4"
    >
      {/* Two identical runs; the track slides by exactly half its width for a seamless loop. */}
      <div className="flex w-max animate-marquee font-mono text-[13.5px] tracking-[0.02em] text-muted group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]">
        {run}
        <span aria-hidden="true" className="flex">
          {run}
        </span>
      </div>
    </div>
  )
}
