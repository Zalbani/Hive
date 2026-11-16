const BYTES_PER_KILOBYTE = 1000
const BYTES_PER_MEGABYTE = 1_000_000

const megabyteFormatter = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 })
const kilobyteFormatter = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 })

export function formatFileSize(sizeBytes: number): string {
  if (sizeBytes >= BYTES_PER_MEGABYTE) {
    return `${megabyteFormatter.format(sizeBytes / BYTES_PER_MEGABYTE)}\u00a0Mo`
  }
  return `${kilobyteFormatter.format(Math.max(1, sizeBytes / BYTES_PER_KILOBYTE))}\u00a0Ko`
}
