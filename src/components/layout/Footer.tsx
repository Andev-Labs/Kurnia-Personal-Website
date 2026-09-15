import { m } from '#/paraglide/messages.js'

export function Footer() {
  return (
    <footer className="page-x flex flex-wrap items-center justify-between gap-3 border-t-3 border-ink bg-pink py-[18px] text-[13px] font-bold text-ink">
      <span>© 2026 Kurnia Dewi Budicantika</span>
      <span>{m.footer_role()}</span>
    </footer>
  )
}
