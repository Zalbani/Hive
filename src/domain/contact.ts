import { z } from 'zod'

const FRENCH_PHONE_PATTERN = /^0[1-9]( \d{2}){4}$/

export const phoneSchema = z.string().regex(FRENCH_PHONE_PATTERN)

export const syndicSchema = z.object({
  name: z.string().min(1),
  initials: z.string().min(1).max(3),
  managerName: z.string().min(1),
  phone: phoneSchema,
  email: z.email(),
  openingHours: z.string().min(1),
  shortOpeningHours: z.string().min(1),
})

export const emergencySchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  label: z.string().min(1),
  contactName: z.string().min(1),
  phone: z.string().min(1).nullable(),
  pinnedOnHome: z.boolean(),
})

export const CouncilRoles = {
  PRESIDENT: 'president',
  MEMBER: 'member',
} as const

export type CouncilRole = (typeof CouncilRoles)[keyof typeof CouncilRoles]

export const councilMemberSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  displayName: z.string().min(1),
  initials: z.string().min(1).max(3),
  role: z.enum(CouncilRoles),
  building: z.string().min(1),
  follows: z.array(z.string().min(1)).min(1),
  email: z.email(),
})

export const ProviderCategories = {
  HEATING: 'heating',
  ELEVATOR: 'elevator',
  CLEANING: 'cleaning',
  GREEN_SPACES: 'green-spaces',
  WASTE: 'waste',
} as const

export type ProviderCategory = (typeof ProviderCategories)[keyof typeof ProviderCategories]

export const providerSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  category: z.enum(ProviderCategories),
  name: z.string().min(1),
  service: z.string().min(1),
  phone: z.string().min(1),
})

export type Syndic = z.infer<typeof syndicSchema>
export type Emergency = z.infer<typeof emergencySchema>
export type CouncilMember = z.infer<typeof councilMemberSchema>
export type Provider = z.infer<typeof providerSchema>
