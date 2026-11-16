import { z } from 'zod'

export const consultationSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  description: z.string().min(1),
  opensOn: z.iso.date(),
  closesOn: z.iso.date(),
  respondedLots: z.int().nonnegative(),
  answerUrl: z.url(),
  proposalsUrl: z.url(),
})

export const residenceEventSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  happensOn: z.iso.date(),
  detail: z.string().min(1),
})

export type Consultation = z.infer<typeof consultationSchema>
export type ResidenceEvent = z.infer<typeof residenceEventSchema>
