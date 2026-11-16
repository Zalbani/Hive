import { z } from 'zod'

export const FaqThemes = {
  PAINT: 'paint',
  HEATING: 'heating',
  WASTE: 'waste',
  ACCESS: 'access',
  COMMUNITY: 'community',
} as const

export type FaqTheme = (typeof FaqThemes)[keyof typeof FaqThemes]

export const FAQ_THEME_ORDER: readonly FaqTheme[] = [
  FaqThemes.PAINT,
  FaqThemes.HEATING,
  FaqThemes.WASTE,
  FaqThemes.ACCESS,
  FaqThemes.COMMUNITY,
]

const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i

export const paintSwatchSchema = z.object({
  label: z.string().min(1),
  reference: z.string().min(1),
  color: z.string().regex(HEX_COLOR_PATTERN),
})

export const faqEntrySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  theme: z.enum(FaqThemes),
  question: z.string().min(1),
  answer: z.array(z.string().min(1)).min(1),
  facts: z.array(z.string().min(1)),
  swatches: z.array(paintSwatchSchema),
  documentId: z.string().nullable(),
  openByDefault: z.boolean(),
})

export const practicalFactSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  label: z.string().min(1),
  value: z.string().min(1),
  detail: z.string().min(1),
})

export type FaqEntry = z.infer<typeof faqEntrySchema>
export type PaintSwatch = z.infer<typeof paintSwatchSchema>
export type PracticalFact = z.infer<typeof practicalFactSchema>
