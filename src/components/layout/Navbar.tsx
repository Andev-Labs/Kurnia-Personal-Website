import { useEffect, useRef, useState } from 'react'

import { LanguageSwitcher } from '#/components/i18n/LanguageSwitcher'
import { buttonClassName } from '#/components/ui/Button'
import { CvButton } from '#/components/ui/CvButton'
import { cn } from '#/lib/cn'
import { useActiveSection } from '#/lib/useActiveSection'
import { m } from '#/paraglide/messages.js'

const DRAWER_ID = 'mobile-nav-drawer'
const MORE_ID = 'nav-more-menu'

/** Sections the scroll spy watches. The hero is included so no link stays lit once you scroll back to the top. */
const SPY_IDS = ['atas', 'tentang', 'keahlian', 'pengalaman', 'pendidikan', 'penghargaan', 'aktivitas', 'kontak'] as const

interface NavLink {
  href: string
  label: string
}

export function Navbar() {
  const primaryLinks: NavLink[] = [
    { href: '#tentang', label: m.nav_about() },
    { href: '#keahlian', label: m.nav_skills() },
    { href: '#pengalaman', label: m.nav_experience() },
    { href: '#pendidikan', label: m.nav_education() },
  ]
  const certifications: NavLink = { href: '#penghargaan', label: m.nav_certifications() }
  const activities: NavLink = { href: '#aktivitas', label: m.nav_activities() }
  const links = [...primaryLinks, certifications, activities]

  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)
  const active = useActiveSection(SPY_IDS)
  const isActive = (href: string) => href === `#${active}`

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
    <header className="page-x relative z-40 pt-3 md:pt-4 print:hidden">
      <nav className="flex items-center justify-between gap-4 py-2">
        <a href="#atas" className="flex items-center gap-2.5 rounded-full pr-2">
          <img src="/kurnia-icon.svg" alt="" width={38} height={38} className="size-[38px]" />
          <span className="font-heading font-semibold text-[15px] tracking-[-0.02em]">kurnia</span>
        </a>
        <div className="hidden items-center gap-1 text-[14.5px] font-bold lg:flex">
          {primaryLinks.map((link) => (
            <DesktopLink key={link.href} link={link} active={isActive(link.href)} />
          ))}
          {/* The row is capped at 1200px and Russian labels already fill it, so the last two sections share "More". */}
          <MoreMenu links={[certifications, activities]} isActive={isActive} />
        </div>
        <div className="hidden items-center gap-2.5 lg:flex">
          <LanguageSwitcher />
          {/* At lg the RU / EN labels leave no room for a third control; the hero has the same button. */}
          <span className="hidden xl:block">
            <CvButton variant="secondary" className="px-5 py-3 text-[14.5px] whitespace-nowrap" />
          </span>
          <a
            href="#kontak"
            aria-current={isActive('#kontak') ? 'location' : undefined}
            className={buttonClassName('primary', 'px-5 py-3 text-[14.5px]')}
          >
            {m.nav_contact()}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={m.nav_menu_open()}
          aria-expanded={isOpen}
          aria-controls={DRAWER_ID}
          className="grid size-[42px] cursor-pointer place-items-center rounded-full bg-lavender-50 text-violet transition-colors hover:bg-lavender-100 lg:hidden"
        >
          <span aria-hidden="true" className="flex w-[18px] flex-col gap-[4px]">
            <span className="h-[2.5px] rounded-full bg-current" />
            <span className="h-[2.5px] rounded-full bg-current" />
            <span className="h-[2.5px] rounded-full bg-current" />
          </span>
        </button>
      </nav>

      <div
        onClick={close}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden',
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
          'fixed inset-y-3 right-3 z-50 flex w-[min(320px,calc(100vw-24px))] flex-col overflow-y-auto rounded-card-lg bg-white shadow-soft-lg transition-transform duration-250 ease-out lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-[calc(100%+24px)]',
        )}
      >
        <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3">
          <span className="font-heading font-semibold text-[13px] tracking-[0.08em] text-violet">{m.nav_menu_title()}</span>
          <button
            type="button"
            onClick={close}
            aria-label={m.nav_menu_close()}
            className="grid size-[38px] cursor-pointer place-items-center rounded-full bg-lavender-50 font-heading font-semibold text-[18px] leading-none text-violet transition-colors hover:bg-lavender-100"
          >
            ×
          </button>
        </div>
        <div className="px-5 pb-2">
          <LanguageSwitcher />
        </div>
        <div className="flex flex-col gap-1 px-3 py-4 text-[17px] font-bold">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              aria-current={isActive(link.href) ? 'location' : undefined}
              className={cn(
                'rounded-2xl px-4 py-3.5 transition-colors duration-150',
                isActive(link.href) ? 'bg-lavender-50 text-violet' : 'hover:bg-lavender-50',
              )}
            >
              {link.label}
            </a>
          ))}
          <CvButton variant="secondary" onClick={close} className="mx-2 mt-4 py-4 text-[16px]" />
          <a href="#kontak" onClick={close} className={buttonClassName('primary', 'mx-2 mt-2 py-4 text-[16px]')}>
            {m.nav_contact()}
          </a>
        </div>
      </div>
    </header>
  )
}

function DesktopLink({ link, active }: { link: NavLink; active: boolean }) {
  return (
    <a
      href={link.href}
      aria-current={active ? 'location' : undefined}
      className={cn(
        'rounded-full px-3.5 py-2 whitespace-nowrap transition-colors duration-150',
        active ? 'bg-lavender-50 text-violet' : 'text-ink-soft hover:text-violet',
      )}
    >
      {link.label}
    </a>
  )
}

interface MoreMenuProps {
  links: NavLink[]
  isActive: (href: string) => boolean
}

/** Disclosure button with a short list of section links. Closes on Escape, outside click, focus leaving, or a pick. */
function MoreMenu({ links, isActive }: MoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const hasActive = links.some((link) => isActive(link.href))

  useEffect(() => {
    if (!isOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setIsOpen(false)
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={MORE_ID}
        className={cn(
          'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 whitespace-nowrap transition-colors duration-150',
          hasActive || isOpen ? 'bg-lavender-50 text-violet' : 'text-ink-soft hover:text-violet',
        )}
      >
        {m.nav_more()}
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={cn('size-3 transition-transform duration-150', isOpen && 'rotate-180')}
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ul
        id={MORE_ID}
        hidden={!isOpen}
        className="absolute top-[calc(100%+8px)] right-0 z-50 min-w-[200px] rounded-2xl bg-white p-2 shadow-soft-lg"
      >
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={() => setIsOpen(false)}
              aria-current={isActive(link.href) ? 'location' : undefined}
              className={cn(
                'block rounded-xl px-3.5 py-2.5 whitespace-nowrap transition-colors duration-150',
                isActive(link.href) ? 'bg-lavender-50 text-violet' : 'text-ink-soft hover:bg-lavender-50 hover:text-violet',
              )}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
