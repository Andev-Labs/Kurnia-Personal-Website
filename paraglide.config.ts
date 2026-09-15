import type { paraglideVitePlugin } from '@inlang/paraglide-js'

/**
 * Shared by the app and test builds. Indonesian lives at `/`; every other locale gets a
 * path prefix (`/en`, `/ru`, `/zh`) so each language has its own crawlable URL.
 */
export const paraglideOptions: Parameters<typeof paraglideVitePlugin>[0] = {
  project: './project.inlang',
  outdir: './src/paraglide',
  emitTsDeclarations: true,
  strategy: ['url', 'baseLocale'],
  urlPatterns: [
    {
      pattern: '/',
      localized: [
        ['en', '/en'],
        ['ru', '/ru'],
        ['zh', '/zh'],
        ['id', '/'],
      ],
    },
    {
      pattern: '/:path(.*)?',
      localized: [
        ['en', '/en/:path(.*)?'],
        ['ru', '/ru/:path(.*)?'],
        ['zh', '/zh/:path(.*)?'],
        ['id', '/:path(.*)?'],
      ],
    },
  ],
}
