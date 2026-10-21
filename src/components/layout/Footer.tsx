import { m } from '#/paraglide/messages.js'

export function Footer() {
  return (
    <footer className="page-x flex flex-wrap items-center justify-between gap-3 bg-lavender-100 py-[18px] text-[13px] font-bold text-ink">
      <span>© 2026 Kurnia Dewi Budi Cantika</span>
      <span>{m.footer_role()}</span>
    </footer>
  )
}
