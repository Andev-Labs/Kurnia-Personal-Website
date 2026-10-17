import { PERSON_NAME } from '#/data/site'
import { m } from '#/paraglide/messages.js'

export function Footer() {
  return (
    <footer className="page-x flex flex-wrap items-center justify-between gap-3 border-t border-paper/10 bg-ink py-6 font-mono text-[12.5px] text-paper/70">
      <span>
        © 2026 {PERSON_NAME} · {m.footer_role()}
      </span>
      <a href="#atas" className="link-draw text-paper/80 hover:text-paper">
        {m.footer_back_to_top()} ↑
      </a>
    </footer>
  )
}
