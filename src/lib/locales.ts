import type { Locale } from '#/paraglide/runtime.js'

interface LocaleOption {
  /** Short label shown in the switcher. */
  label: string
  /** The language's own name, used for screen readers and tooltips. */
  name: string
  /** BCP 47 tag for `<html lang>` and `hreflang`. */
  tag: string
  /** Open Graph `og:locale`. */
  ogLocale: string
}

/*
 * Russian (`messages/ru.json`) and Chinese (`messages/zh.json`) are careful translations of the English copy
 * and still need review by a native speaker (perlu review penutur asli).
 */
export const LOCALE_OPTIONS: Record<Locale, LocaleOption> = {
  id: { label: 'ID', name: 'Bahasa Indonesia', tag: 'id', ogLocale: 'id_ID' },
  en: { label: 'EN', name: 'English', tag: 'en', ogLocale: 'en_US' },
  ru: { label: 'RU', name: 'Русский', tag: 'ru', ogLocale: 'ru_RU' },
  zh: { label: '中文', name: '中文', tag: 'zh-CN', ogLocale: 'zh_CN' },
}
