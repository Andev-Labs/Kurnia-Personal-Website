import { useEffect, useState } from 'react'

import { LanguageSwitcher } from '#/components/i18n/LanguageSwitcher'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

const DRAWER_ID = 'mobile-nav-drawer'

export function Navbar() {
  const links = [
    { href: '#tentang', label: m.nav_about() },
    { href: '#keahlian', label: m.nav_skills() },
    { href: '#pengalaman', label: m.nav_experience() },
    { href: '#pendidikan', label: m.nav_education() },
  ]
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  // While the drawer is open: lock page scroll and let Escape close it.
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  return (
    <header className="sticky top-0 z-40 border-b-3 border-ink bg-cream">
      <nav className="page-x flex items-center justify-between gap-5 py-4 md:py-5">
        <a href="#atas" className="flex items-center gap-2.5">
          <span className="grid size-[38px] place-items-center rounded-[10px] border-3 border-ink bg-lavender font-display text-[17px] leading-none">
            K
          </span>
          <span className="font-display text-[15px] tracking-[-0.02em]">kurnia.qc</span>
        </a>
        <div className="hidden items-center gap-[22px] text-[14.5px] font-semibold lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
          <a href="#kontak" className="rounded-full border-3 border-ink bg-sun px-[18px] py-[9px] shadow-hard-3">
            {m.nav_contact()}
          </a>
          <LanguageSwitcher />
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={m.nav_menu_open()}
          aria-expanded={isOpen}
          aria-controls={DRAWER_ID}
          className="grid size-[42px] cursor-pointer place-items-center rounded-xl border-3 border-ink bg-sun shadow-hard-3 lg:hidden"
        >
          <span aria-hidden="true" className="flex w-[18px] flex-col gap-[4px]">
            <span className="h-[2.5px] rounded-full bg-ink" />
            <span className="h-[2.5px] rounded-full bg-ink" />
            <span className="h-[2.5px] rounded-full bg-ink" />
          </span>
        </button>
      </nav>

      <div
        onClick={close}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-50 bg-ink/60 transition-opacity duration-200 lg:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <div
        id={DRAWER_ID}
        role="dialog"
        aria-modal="true"
        aria-label={m.nav_menu_label()}
        inert={!isOpen}
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-[min(300px,85vw)] flex-col border-l-3 border-ink bg-cream transition-transform duration-200 lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b-3 border-ink bg-lavender px-[22px] py-4">
          <span className="font-display text-[13px] tracking-[0.04em]">{m.nav_menu_title()}</span>
          <button
            type="button"
            onClick={close}
            aria-label={m.nav_menu_close()}
            className="grid size-[38px] cursor-pointer place-items-center rounded-[10px] border-3 border-ink bg-cream font-display text-[15px] text-ink shadow-hard-3"
          >
            ×
          </button>
        </div>
        <div className="border-b-3 border-ink px-[22px] py-4">
          <LanguageSwitcher />
        </div>
        <div className="flex flex-col gap-1 px-[22px] py-5 text-[17px] font-semibold">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={close} className="border-b-2 border-ink/15 py-3.5">
              {link.label}
            </a>
          ))}
          <a
            href="#kontak"
            onClick={close}
            className="mt-5 rounded-full border-3 border-ink bg-sun px-[18px] py-3 text-center shadow-hard-3"
          >
            {m.nav_contact()}
          </a>
        </div>
      </div>
    </header>
  )
}
