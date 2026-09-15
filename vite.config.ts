import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { paraglideVitePlugin } from '@inlang/paraglide-js'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { paraglideOptions } from './paraglide.config.ts'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [devtools(), paraglideVitePlugin(paraglideOptions), tailwindcss(), tanstackStart(), viteReact()],
})

export default config
