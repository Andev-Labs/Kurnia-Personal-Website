import type { MouseEvent } from 'react'

import { LOCALE_OPTIONS } from '#/lib/locales'
import { cn } from '#/lib/cn'
import { m } from '#/paraglide/messages.js'
import { getLocale, locales, localizeHref, setLocale } from '#/paraglide/runtime.js'
import type { Locale } from '#/paraglide/runtime.js'

export function LanguageSwitcher() {
  const current = getLocale()

  const switchTo = (event: MouseEvent<HTMLAnchorElement>, locale: Locale) => {
    // Let modified clicks (new tab, etc.) follow the plain link.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (locale !== current) setLocale(locale)
  }

  return (
    <div
      role="group"
      aria-label={m.language_switcher_label()}
      className="flex items-center rounded-full border-3 border-ink bg-white p-[3px] shadow-hard-3"
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
              'rounded-full px-2.5 py-[5px] text-[12.5px] leading-none font-bold transition-colors duration-120',
              isActive ? 'bg-ink text-cream hover:text-cream' : 'text-ink hover:bg-sun hover:text-ink',
            )}
          >
            {label}
          </a>
        )
      })}
    </div>
  )
}
