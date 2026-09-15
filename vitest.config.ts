import { defineConfig } from 'vitest/config'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import viteReact from '@vitejs/plugin-react'

import { paraglideOptions } from './paraglide.config.ts'

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [paraglideVitePlugin(paraglideOptions), viteReact()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['src/test/setup.ts'],
  },
})
