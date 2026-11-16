export const Routes = {
  HOME: '/',
  DOCUMENTS: '/documents',
  TOPICS: '/sujets-en-cours',
  FAQ: '/infos-pratiques',
  CONTACTS: '/contacts',
  ACCESS: '/acces',
  SIGN_OUT: '/deconnexion',
  LEGAL: '/mentions-legales',
  PRIVACY: '/confidentialite',
} as const

export type Route = (typeof Routes)[keyof typeof Routes]

const NEXT_PARAMETER = 'next'

export function toSafeNextPath(candidate: string | null): string {
  if (candidate === null) return Routes.HOME
  const isInternalPath = candidate.startsWith('/') && !candidate.startsWith('//')
  const hasNoBackslash = !candidate.includes('\\')
  const isAccessPage = candidate.startsWith(Routes.ACCESS)
  if (!isInternalPath || !hasNoBackslash || isAccessPage) return Routes.HOME
  return candidate
}

export function buildAccessPath(nextPath: string): string {
  const query = new URLSearchParams({ [NEXT_PARAMETER]: nextPath })
  return `${Routes.ACCESS}?${query.toString()}`
}

export function readNextParameter(url: URL): string | null {
  return url.searchParams.get(NEXT_PARAMETER)
}

export function toMailtoHref(email: string, subject: string | null): string {
  if (subject === null) return `mailto:${email}`
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`
}

export const NavSections = {
  HOME: 'home',
  DOCUMENTS: 'documents',
  TOPICS: 'topics',
  FAQ: 'faq',
  CONTACTS: 'contacts',
} as const

export type NavSection = (typeof NavSections)[keyof typeof NavSections]
