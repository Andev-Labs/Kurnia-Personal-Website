import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { deLocalizeUrl, localizeUrl } from './paraglide/runtime.js'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    // Routes stay canonical (`/`); Paraglide maps `/en`, `/ru`, `/zh` onto them and back.
    rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
