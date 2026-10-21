import { PERSON_NAME } from '#/data/site'
import { m } from '#/paraglide/messages.js'

export function Footer() {
  return (
    <footer className="page-x flex flex-wrap items-center justify-between gap-3 bg-lavender-100 py-[18px] text-[13px] font-bold text-ink print:hidden">
      <span>© 2026 {PERSON_NAME}</span>
      <span>{m.footer_role()}</span>
    </footer>
  )
}
