// The ONLY module that reads `astro:env/server`. Every value here is a server-side secret read at
// runtime: never import this module from a client <script>.
import { DEMO_NOW, RESIDENCE_ACCESS_CODE, SESSION_SECRET } from 'astro:env/server'
import { z } from 'zod'

const serverEnvSchema = z.object({
  residenceAccessCode: z.string().min(4),
  sessionSecret: z.string().min(32),
  demoNow: z.iso.date().nullable(),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>

export const serverEnv: ServerEnv = serverEnvSchema.parse({
  residenceAccessCode: RESIDENCE_ACCESS_CODE,
  sessionSecret: SESSION_SECRET,
  demoNow: DEMO_NOW === undefined || DEMO_NOW === '' ? null : DEMO_NOW,
})
