import type { z } from 'zod'
import type { consultationSchema, residenceEventSchema } from '../../domain/consultation'

export const consultationFixtures: z.input<typeof consultationSchema>[] = [
  {
    id: 'amenagement-jardin-2026',
    title: 'Consultation : quelles améliorations pour le jardin commun ?',
    description:
      'Le conseil syndical prépare les projets de la prochaine AG. 3 questions, 2 minutes.',
    opensOn: '2026-06-01',
    closesOn: '2026-06-30',
    respondedLots: 21,
    answerUrl: 'https://forms.example.org/harmony-jardin',
    proposalsUrl: 'https://forms.example.org/harmony-jardin/propositions',
  },
]

export const eventFixtures: z.input<typeof residenceEventSchema>[] = [
  {
    id: 'nettoyage-2026-03',
    title: 'Nettoyage des parties communes',
    happensOn: '2026-03-07',
    detail: 'halls et cages',
  },
  {
    id: 'nettoyage-2026-11',
    title: 'Nettoyage des parties communes',
    happensOn: '2026-11-28',
    detail: 'halls et cages',
  },
  {
    id: 'ramonage-2027-01',
    title: 'Contrôle annuel de la chaudière',
    happensOn: '2027-01-14',
    detail: 'chauffage coupé de 8h à 12h',
  },
]
