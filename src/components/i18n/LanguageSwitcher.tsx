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
      className="inline-flex items-center rounded-full border border-line bg-surface p-[3px]"
    >
      {locales.map((locale) => {
        const { label, name, tag } = LOCALE_OPTIONS[locale]
        const isActive = locale === current
        return (
          <a
            key={locale}
            href={localizeHref('/', { locale })}
            hrefLang={tag}
            lang={tag}
            title={name}
            aria-label={name}
            aria-current={isActive ? 'true' : undefined}
            onClick={(event) => switchTo(event, locale)}
            className={cn(
              'rounded-full px-2.5 py-[7px] font-mono text-[12px] leading-none transition-colors duration-200',
              isActive ? 'bg-teal text-paper' : 'text-ink/75 hover:bg-teal-soft hover:text-ink',
            )}
          >
            {label}
          </a>
        )
      })}
    </div>
  )
}
