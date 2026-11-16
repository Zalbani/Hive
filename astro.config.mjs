import { defineConfig, envField } from 'astro/config'
import node from '@astrojs/node'

// Placeholder until the portal gets its domain.
const SITE = 'https://hive.example.org'

// Every page is rendered on request: the portal sits behind the residence access code
// (src/middleware.ts) and the home page depends on today's date ("À la une").
export default defineConfig({
  site: SITE,
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  env: {
    schema: {
      // `secret` makes Astro read them at runtime instead of inlining them at build time.
      RESIDENCE_ACCESS_CODE: envField.string({ context: 'server', access: 'secret', min: 4 }),
      SESSION_SECRET: envField.string({ context: 'server', access: 'secret', min: 32 }),
      DEMO_NOW: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
})
