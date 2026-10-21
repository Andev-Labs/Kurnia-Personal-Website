import { buttonClassName } from '#/components/ui/Button'
import type { ButtonVariant } from '#/components/ui/Button'
import { CV_PDF_PATH } from '#/data/site'
import { m } from '#/paraglide/messages.js'

interface CvButtonProps {
  variant?: ButtonVariant
  className?: string
  onClick?: () => void
}

/** Downloads the CV PDF. Used in the hero, the navbar (desktop and drawer) and the contact card. */
export function CvButton({ variant = 'primary', className, onClick }: CvButtonProps) {
  return (
    <a
      href={CV_PDF_PATH}
      download
      type="application/pdf"
      aria-label={m.cv_download_label()}
      onClick={onClick}
      className={buttonClassName(variant, className)}
    >
      <DownloadIcon />
      {m.cv_download()}
    </a>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 flex-none" aria-hidden="true">
      <path
        d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M3 13h10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
