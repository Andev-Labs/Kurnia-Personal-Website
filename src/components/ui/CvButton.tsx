import { CV_PDF_PATH } from '#/data/site'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

/** The amber primary CTA. Amber is reserved for this button and the impact numbers. */
export const PRIMARY_CTA =
  'group inline-flex items-center gap-2 rounded-full bg-amber px-5 py-3 text-[15px] font-semibold text-ink transition-colors duration-200 hover:bg-[#d79a28]'

export const SECONDARY_CTA =
  'group inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-3 text-[15px] font-semibold text-ink transition-colors duration-200 hover:border-teal hover:text-teal'

export function CvButton({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <a
      href={CV_PDF_PATH}
      download
      type="application/pdf"
      aria-label={m.cv_download_label()}
      onClick={onClick}
      className={cn(PRIMARY_CTA, className)}
    >
      <DownloadIcon />
      {m.cv_download()}
    </a>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-4 transition-transform duration-250 ease-out-soft group-hover:translate-y-0.5" aria-hidden="true">
      <path d="M8 2v8m0 0L4.5 6.5M8 10l3.5-3.5M3 13h10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
