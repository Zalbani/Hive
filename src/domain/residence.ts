import { z } from 'zod'

export const residenceSchema = z.object({
  name: z.string().min(1),
  city: z.string().min(1),
  district: z.string().min(1),
  syndicName: z.string().min(1),
  councilEmail: z.email(),
  totalLots: z.int().positive(),
  nextAssemblyNote: z.string().min(1),
  links: z.object({
    sharedSpacesBooking: z.url(),
    visitorParking: z.url(),
    residentsGroup: z.url(),
  }),
})

export type Residence = z.infer<typeof residenceSchema>
