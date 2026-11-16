import { z } from 'zod'

export const AssemblyKinds = {
  ORDINARY: 'ordinary',
  EXTRAORDINARY: 'extraordinary',
} as const

export type AssemblyKind = (typeof AssemblyKinds)[keyof typeof AssemblyKinds]

export const assemblySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  kind: z.enum(AssemblyKinds),
  heldAt: z.iso.datetime({ offset: true }),
  location: z.string().min(1),
  convocationSentOn: z.iso.date(),
  agendaDocumentId: z.string().min(1),
  proxyDocumentId: z.string().min(1),
})

export type Assembly = z.infer<typeof assemblySchema>
