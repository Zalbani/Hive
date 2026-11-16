import { z } from 'zod'

export const DocumentCategories = {
  ASSEMBLY: 'assembly',
  REGULATION: 'regulation',
  TECHNICAL: 'technical',
  REFERENCES: 'references',
  FINANCES: 'finances',
} as const

export type DocumentCategory = (typeof DocumentCategories)[keyof typeof DocumentCategories]

export const DatePrecisions = {
  DAY: 'day',
  MONTH: 'month',
  YEAR: 'year',
} as const

export type DatePrecision = (typeof DatePrecisions)[keyof typeof DatePrecisions]

const PDF_FILE_NAME_PATTERN = /^[a-z0-9-]+\.pdf$/

export const residenceDocumentSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  category: z.enum(DocumentCategories),
  publishedOn: z.iso.date(),
  datePrecision: z.enum(DatePrecisions),
  sizeBytes: z.int().positive(),
  fileName: z.string().regex(PDF_FILE_NAME_PATTERN),
  essential: z.boolean(),
})

export type ResidenceDocument = z.infer<typeof residenceDocumentSchema>
