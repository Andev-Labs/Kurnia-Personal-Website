import { HeadContent, ScriptOnce, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { m } from '#/paraglide/messages.js'
import { INTRO_HEAD_SCRIPT } from '#/lib/intro'
import { getLocale } from '#/paraglide/runtime.js'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: m.meta_title(),
      },
      {
        name: 'description',
        content: m.meta_description(),
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        href: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    // The intro head script writes `data-intro` before hydration, so React must not flag the extra attribute.
    <html lang={getLocale()} suppressHydrationWarning>
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
