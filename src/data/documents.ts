import { residenceDocumentSchema, type ResidenceDocument } from '../domain/document'
import { documentFixtures } from './fixtures/documents'

export async function getDocuments(): Promise<ResidenceDocument[]> {
  const documents = residenceDocumentSchema.array().parse(documentFixtures)
  return Promise.resolve(
    documents.toSorted((first, second) => second.publishedOn.localeCompare(first.publishedOn)),
  )
}

export async function getDocument(id: string): Promise<ResidenceDocument | null> {
  const documents = await getDocuments()
  return documents.find((document) => document.id === id) ?? null
}

export function getDocumentHref(id: string): string {
  return `/documents/${id}`
}
