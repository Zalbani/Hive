import type { ResidenceDocument } from '../domain/document'
import { format, type Translation } from '../i18n/t'
import { formatFileSize } from './file-size'

export function getDocumentOpenLabel(
  document: ResidenceDocument,
  translation: Translation,
): string {
  return format(translation.documents.openLabel, {
    title: document.title,
    size: formatFileSize(document.sizeBytes),
  })
}
