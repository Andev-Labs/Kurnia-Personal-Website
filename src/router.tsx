import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { deLocalizeUrl, localizeUrl } from './paraglide/runtime.js'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    // In-page anchors are left to the browser so CSS `scroll-behavior: smooth` glides to them; the router would
    // call `scrollIntoView` on every hash change and restart the glide halfway.
    scrollRestoration: ({ location }) => !location.hash,
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
