import type { z } from 'zod'
import type { assemblySchema } from '../../domain/assembly'

export const assemblyFixtures: z.input<typeof assemblySchema>[] = [
  {
    id: 'ag-2026-03-12',
    kind: 'ordinary',
    heldAt: '2026-03-12T18:30:00+01:00',
    location: 'Salle commune · RDC',
    convocationSentOn: '2026-02-20',
    agendaDocumentId: 'convocation-ag-2026-03-12',
    proxyDocumentId: 'pouvoir-ag-2026-03-12',
  },
]
