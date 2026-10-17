import { useEffect, useState } from 'react'

import { LanguageSwitcher } from '#/components/i18n/LanguageSwitcher'
import { ScrollProgress } from '#/components/motion/Reveal'
import { CvButton } from '#/components/ui/CvButton'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'

const DRAWER_ID = 'mobile-nav-drawer'

/** Section ids, in page order. Anchors are shared by every locale, so they stay Indonesian. */
const SECTION_IDS = ['tentang', 'pengalaman', 'keahlian', 'pendidikan', 'sertifikasi', 'kontak'] as const
type SectionId = (typeof SECTION_IDS)[number]

/** Tracks the section crossing a band just below the navbar. */
function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const visible = new Set<SectionId>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId
          if (entry.isIntersecting) visible.add(id)
          else visible.delete(id)
        }
        setActive(SECTION_IDS.find((id) => visible.has(id)) ?? null)
      },
      { rootMargin: '-80px 0px -55% 0px' },
    )
    for (const id of SECTION_IDS) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [])

  return active
}

export function Navbar() {
  const links: { id: SectionId; label: string }[] = [
    { id: 'tentang', label: m.nav_about() },
    { id: 'pengalaman', label: m.nav_experience() },
    { id: 'keahlian', label: m.nav_skills() },
    { id: 'pendidikan', label: m.nav_education() },
    { id: 'sertifikasi', label: m.nav_certifications() },
    { id: 'kontak', label: m.nav_contact() },
  ]
  const active = useActiveSection()
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
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <nav aria-label={m.nav_menu_label()} className="page-x flex h-16 items-center justify-between gap-5">
        <a href="#atas" className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-full bg-teal font-serif text-[16px] leading-none text-paper"
          >
            K
          </span>
          <span className="font-mono text-[13px] tracking-[0.02em]">kurnia.dewi</span>
        </a>
        <div className="hidden items-center gap-6 text-[14px] font-medium lg:flex">
          <ul className="flex items-center gap-5">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={cn(
                    'link-draw py-1 transition-colors duration-200',
                    active === link.id ? 'text-teal' : 'text-ink/75 hover:text-ink',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
          <CvButton className="px-4 py-2 text-[14px]" />
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={m.nav_menu_open()}
          aria-expanded={isOpen}
          aria-controls={DRAWER_ID}
          className="grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-surface lg:hidden"
        >
          <span aria-hidden="true" className="flex w-[18px] flex-col gap-[4px]">
            <span className="h-[1.5px] rounded-full bg-ink" />
            <span className="h-[1.5px] rounded-full bg-ink" />
            <span className="h-[1.5px] rounded-full bg-ink" />
          </span>
        </button>
      </nav>
      <ScrollProgress />

      <div
        onClick={close}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-50 bg-ink/40 transition-opacity duration-300 lg:hidden',
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
          'fixed inset-y-0 right-0 z-50 flex h-dvh w-[min(320px,86vw)] flex-col bg-paper shadow-2xl transition-transform duration-300 ease-out-soft lg:hidden',
          isOpen ? 'visible translate-x-0' : 'invisible translate-x-full transition-[transform,visibility]',
        )}
      >
        <div className="flex h-16 items-center justify-between gap-3 border-b border-line px-5">
          <span className="font-mono text-[12px] tracking-[0.12em] uppercase">{m.nav_menu_title()}</span>
          <button
            type="button"
            onClick={close}
            aria-label={m.nav_menu_close()}
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-surface text-[18px]"
          >
            ×
          </button>
        </div>
        <div className="border-b border-line px-5 py-4">
          <LanguageSwitcher />
        </div>
        <ul className="flex flex-col px-5 py-3 text-[17px] font-medium">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={close}
                aria-current={active === link.id ? 'true' : undefined}
                className={cn('block border-b border-line py-3.5', active === link.id && 'text-teal')}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="px-5 pt-3">
          <CvButton onClick={close} className="w-full justify-center" />
        </div>
      </div>
    </header>
  )
}
