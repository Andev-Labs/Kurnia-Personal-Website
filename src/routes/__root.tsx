import { HeadContent, ScriptOnce, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { EMAIL, HERO_PORTRAIT, LINKEDIN_URL, PERSON_NAME, SITE_URL } from '#/data/site'
import { LOCALE_OPTIONS } from '#/lib/locales'
import { m } from '#/paraglide/messages.js'
import { INTRO_HEAD_SCRIPT } from '#/lib/intro'
import { getLocale, locales, localizeHref } from '#/paraglide/runtime.js'
import fredoka600 from '@fontsource/fredoka/files/fredoka-latin-600-normal.woff2?url'
import nunito400 from '@fontsource/nunito/files/nunito-latin-400-normal.woff2?url'
import nunito700 from '@fontsource/nunito/files/nunito-latin-700-normal.woff2?url'
import appCss from '../styles.css?url'

const OG_IMAGE = `${SITE_URL}/og-image.png`

/*
 * Faces the hero text renders with. Preloading them lets the first paint use the real fonts, so the hero
 * does not reflow (and push the portrait down) when they swap in.
 */
const CRITICAL_FONTS = [fredoka600, nunito400, nunito700]

export const Route = createRootRoute({
  head: () => {
    const locale = getLocale()
    const url = `${SITE_URL}${localizeHref('/', { locale })}`
    const title = m.meta_title()
    const description = m.meta_description()

    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: PERSON_NAME,
      jobTitle: 'Analytical Scientist',
      email: `mailto:${EMAIL}`,
      url: SITE_URL,
      image: `${SITE_URL}${HERO_PORTRAIT.base}-800.jpg`,
      sameAs: [LINKEDIN_URL],
      address: { '@type': 'PostalAddress', addressLocality: 'Bekasi', addressRegion: 'Jawa Barat', addressCountry: 'ID' },
      alumniOf: [
        { '@type': 'CollegeOrUniversity', name: 'Binawan University' },
        { '@type': 'EducationalOrganization', name: 'SMK-SMAK Bogor' },
      ],
      knowsAbout: ['HPLC', 'GC', 'ICP-OES', 'AAS', 'FTIR', 'UV-Vis', 'GMP', 'GLP', 'ISO 17025'],
    }

    return {
      meta: [
        { charSet: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { title },
        { name: 'description', content: description },
        { name: 'theme-color', content: '#f1eafe' },
        { property: 'og:type', content: 'profile' },
        { property: 'og:site_name', content: PERSON_NAME },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { property: 'og:locale', content: LOCALE_OPTIONS[locale].ogLocale },
        { property: 'og:image', content: OG_IMAGE },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: m.og_image_alt() },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: OG_IMAGE },
        { name: 'twitter:image:alt', content: m.og_image_alt() },
      ],
      links: [
        { rel: 'canonical', href: url },
        ...locales.map((l) => ({
          rel: 'alternate',
          hrefLang: LOCALE_OPTIONS[l].tag,
          href: `${SITE_URL}${localizeHref('/', { locale: l })}`,
        })),
        { rel: 'alternate', hrefLang: 'x-default', href: `${SITE_URL}/` },
        { rel: 'icon', href: '/favicon.svg?v=2', type: 'image/svg+xml' },
        { rel: 'icon', href: '/favicon-32.png?v=2', type: 'image/png', sizes: '32x32' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png?v=2' },
        ...CRITICAL_FONTS.map((href) => ({ rel: 'preload', href, as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' as const })),
        { rel: 'stylesheet', href: appCss },
      ],
      scripts: [{ type: 'application/ld+json', children: JSON.stringify(person) }],
    }
  },
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    // The intro head script writes `data-intro` before hydration, so React must not flag the extra attribute.
    <html lang={LOCALE_OPTIONS[getLocale()].tag} suppressHydrationWarning>
      <head>
        {/* Decides whether the welcome intro plays, before the first paint. */}
        <ScriptOnce>{INTRO_HEAD_SCRIPT}</ScriptOnce>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
