import type { MouseEvent } from 'react'

import { LOCALE_OPTIONS } from '#/lib/locales'
import { cn } from '#/lib/cn'
import { markIntroSkipOnce } from '#/lib/intro'
import { m } from '#/paraglide/messages.js'
import { getLocale, locales, localizeHref, setLocale } from '#/paraglide/runtime.js'
import type { Locale } from '#/paraglide/runtime.js'

export function LanguageSwitcher() {
  const current = getLocale()

  const switchTo = (event: MouseEvent<HTMLAnchorElement>, locale: Locale) => {
    // Let modified clicks (new tab, etc.) follow the plain link.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (locale === current) return
    // setLocale reloads the page; the welcome intro is for arriving, not for switching language.
    markIntroSkipOnce()
    setLocale(locale)
  }

  return (
    <div
      role="group"
      aria-label={m.language_switcher_label()}
      className="inline-flex items-center gap-0.5 rounded-full bg-lavender-50 p-1 ring-1 ring-lavender-100"
    >
      {locales.map((locale) => {
        const { label, name } = LOCALE_OPTIONS[locale]
        const isActive = locale === current
        return (
          <a
            key={locale}
            href={localizeHref('/', { locale })}
            hrefLang={locale}
            lang={locale}
            title={name}
            aria-label={name}
            aria-current={isActive ? 'true' : undefined}
            onClick={(event) => switchTo(event, locale)}
            className={cn(
              'rounded-full px-2.5 py-[7px] text-[12.5px] leading-none font-extrabold transition-colors duration-150',
              isActive ? 'bg-white text-violet shadow-soft-sm hover:text-violet' : 'text-ink-soft hover:bg-white/60 hover:text-violet',
            )}
          >
            {label}
          </a>
        )
      })}
    </div>
  )
}
