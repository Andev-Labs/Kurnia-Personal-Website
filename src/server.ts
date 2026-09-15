import handler, { createServerEntry } from '@tanstack/react-start/server-entry'

import { paraglideMiddleware } from './paraglide/server.js'

export default createServerEntry({
  fetch(request) {
    // TanStack Router owns URL rewriting (see router.tsx), so hand it the original request.
    return paraglideMiddleware(request, () => handler.fetch(request))
  },
})
