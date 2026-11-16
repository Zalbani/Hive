import { HttpStatus } from './utils/http'
import { defineMiddleware } from 'astro:middleware'
import { Routes, buildAccessPath } from './utils/routes'
import { SESSION_COOKIE_NAME, isSessionTokenValid } from './utils/session'

const PUBLIC_PATHS = new Set<string>([Routes.ACCESS, '/robots.txt', '/favicon.svg'])
const PUBLIC_PREFIXES = ['/_astro/']

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url
  if (isPublicPath(pathname)) return withPrivateHeaders(await next())

  const token = context.cookies.get(SESSION_COOKIE_NAME)?.value ?? null
  if (token !== null && isSessionTokenValid(token, Date.now())) {
    return withPrivateHeaders(await next())
  }
  return context.redirect(buildAccessPath(`${pathname}${search}`), HttpStatus.SEE_OTHER)
})

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.has(pathname) || PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

function withPrivateHeaders(response: Response): Response {
  if (response.headers.has('Cache-Control')) return response
  response.headers.set('Cache-Control', 'private, no-store')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}
