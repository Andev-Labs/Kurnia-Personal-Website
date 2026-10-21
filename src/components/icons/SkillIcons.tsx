const ICON_CLASS = 'mb-3.5 block size-14 rounded-2xl bg-lavender-50 p-1.5'

/** Flask with rising bubbles. */
export function FlaskIcon() {
  return (
    <svg viewBox="0 0 56 56" className={ICON_CLASS} aria-hidden="true">
      <path
        d="M21 7h14v15l9 19a5 5 0 0 1-4.5 7h-23A5 5 0 0 1 12 41l9-19V7z"
        fill="#FFFFFF"
        stroke="#5B3FE0"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 34h25l3.5 7a5 5 0 0 1-4.5 7h-23A5 5 0 0 1 12 41l3.5-7z"
        fill="#FF9EC4"
        stroke="#5B3FE0"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <g fill="#FFFFFF">
        <circle cx="24" cy="40" r="3" className="animate-bubble" />
        <circle cx="32" cy="43" r="2.4" className="animate-bubble [animation-delay:.8s]" />
        <circle cx="28" cy="44" r="2" className="animate-bubble [animation-delay:1.6s]" />
      </g>
      <path d="M19 7h18" stroke="#5B3FE0" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Chromatography column with eluent flowing through. */
export function ColumnIcon() {
  return (
    <svg viewBox="0 0 56 56" className={ICON_CLASS} aria-hidden="true">
      <defs>
        <clipPath id="skill-column-clip">
          <rect x="15" y="10" width="17" height="36" rx="5" />
        </clipPath>
      </defs>
      <rect x="15" y="10" width="17" height="36" rx="5" fill="#FFFFFF" stroke="#5B3FE0" strokeWidth="2.5" />
      <g clipPath="url(#skill-column-clip)">
        <rect x="15" y="10" width="17" height="11" fill="#3DB48A" className="animate-flow" />
      </g>
      <rect x="15" y="10" width="17" height="36" rx="5" fill="none" stroke="#5B3FE0" strokeWidth="2.5" />
      <path d="M38 18v16a6 6 0 0 0 6 6" fill="none" stroke="#5B3FE0" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="44" cy="44" r="4" fill="#F7C52B" stroke="#5B3FE0" strokeWidth="2.5" />
    </svg>
  )
}

/** Clipboard with a check mark being ticked. */
export function ChecklistIcon() {
  return (
    <svg viewBox="0 0 56 56" className={ICON_CLASS} aria-hidden="true">
      <rect x="11" y="11" width="34" height="38" rx="5" fill="#F7C52B" stroke="#5B3FE0" strokeWidth="2.5" />
      <rect x="21" y="6" width="14" height="9" rx="3" fill="#FFFFFF" stroke="#5B3FE0" strokeWidth="2.5" />
      <path
        d="M18 33l6.5 7L39 24"
        fill="none"
        stroke="#5B3FE0"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="40"
        className="animate-tick"
      />
    </svg>
  )
}
