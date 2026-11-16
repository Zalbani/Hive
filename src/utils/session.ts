import { createHmac, timingSafeEqual } from 'node:crypto'
import { serverEnv } from '../config/server-env'

export const SESSION_COOKIE_NAME = 'hive_session'
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 90
const MILLISECONDS_PER_SECOND = 1000
const TOKEN_VERSION = 'v1'
const TOKEN_SEPARATOR = '.'

export function createSessionToken(nowMs: number): string {
  const expiresAtMs = nowMs + SESSION_MAX_AGE_SECONDS * MILLISECONDS_PER_SECOND
  return `${String(expiresAtMs)}${TOKEN_SEPARATOR}${sign(String(expiresAtMs))}`
}

export function isSessionTokenValid(token: string, nowMs: number): boolean {
  const [expiresAt, signature, ...rest] = token.split(TOKEN_SEPARATOR)
  if (expiresAt === undefined || signature === undefined || rest.length > 0) return false
  const expiresAtMs = Number(expiresAt)
  if (!Number.isSafeInteger(expiresAtMs) || expiresAtMs <= nowMs) return false
  return safeEqual(signature, sign(expiresAt))
}

export function isAccessCodeValid(candidate: string): boolean {
  return safeEqual(sign(candidate.trim()), sign(serverEnv.residenceAccessCode))
}

function sign(value: string): string {
  return createHmac('sha256', serverEnv.sessionSecret)
    .update(`${TOKEN_VERSION}${TOKEN_SEPARATOR}${value}`)
    .digest('base64url')
}

function safeEqual(first: string, second: string): boolean {
  const firstBuffer = Buffer.from(first)
  const secondBuffer = Buffer.from(second)
  if (firstBuffer.length !== secondBuffer.length) return false
  return timingSafeEqual(firstBuffer, secondBuffer)
}
