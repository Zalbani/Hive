import { HttpStatus } from '../../utils/http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { APIRoute } from 'astro'
import { getDocument } from '../../data/documents'

const PRIVATE_DOCUMENTS_DIRECTORY = path.resolve(process.cwd(), 'private', 'documents')

// Files never sit in public/: the middleware has already checked the resident session here.
// Opened inline: the links open the PDF in a new tab, the browser viewer offers the download.
export const GET: APIRoute = async ({ params }) => {
  const document = params.id === undefined ? null : await getDocument(params.id)
  if (document === null) return new Response(null, { status: HttpStatus.NOT_FOUND })

  const file = await readPrivateFile(document.fileName)
  if (file === null) return new Response(null, { status: HttpStatus.NOT_FOUND })

  return new Response(new Uint8Array(file), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${document.fileName}"`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

async function readPrivateFile(fileName: string): Promise<Buffer | null> {
  try {
    return await readFile(path.join(PRIVATE_DOCUMENTS_DIRECTORY, fileName))
  } catch {
    return null
  }
}
