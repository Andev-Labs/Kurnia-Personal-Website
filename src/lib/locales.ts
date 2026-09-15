import type { Locale } from '#/paraglide/runtime.js'

interface LocaleOption {
  /** Short label shown in the switcher. */
  label: string
  /** The language's own name, used for screen readers and tooltips. */
  name: string
}

export const LOCALE_OPTIONS: Record<Locale, LocaleOption> = {
  id: { label: 'ID', name: 'Bahasa Indonesia' },
  en: { label: 'EN', name: 'English' },
  ru: { label: 'RU', name: 'Русский' },
  zh: { label: '中文', name: '中文' },
}
