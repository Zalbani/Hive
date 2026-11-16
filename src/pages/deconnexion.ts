import { HttpStatus } from '../utils/http'
import type { APIRoute } from 'astro'
import { Routes } from '../utils/routes'
import { SESSION_COOKIE_NAME } from '../utils/session'

export const POST: APIRoute = ({ cookies, redirect }) => {
  cookies.delete(SESSION_COOKIE_NAME, { path: '/' })
  return redirect(Routes.ACCESS, HttpStatus.SEE_OTHER)
}
