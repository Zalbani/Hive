import type { z } from 'zod'
import type { topicSchema } from '../../domain/topic'

type TopicFixture = z.input<typeof topicSchema>

export const topicFixtures: TopicFixture[] = [
  {
    id: 'ravalement-facade-sud',
    title: 'Ravalement de la façade sud',
    shortTitle: 'Ravalement de la façade sud',
    summary: 'Démarrage le 15 avril, 6 semaines. Échafaudage côté rue.',
    description:
      'Voté à l’AG 2025. Entreprise retenue : Façades du Lez. Démarrage le 15 avril 2026 pour 6 semaines, échafaudage côté rue.',
    area: 'Façade',
    stage: 'works',
    stageNote: 'à venir',
    updatedOn: '2026-03-02',
    works: {
      startsOn: '2026-04-15',
      endsOn: '2026-05-27',
      notices: [
        'Échafaudage côté rue',
        'Bruit en semaine, 8h – 17h',
        'Volets côté sud fermés 2 jours, date annoncée',
      ],
    },
  },
  {
    id: 'bornes-recharge-electrique',
    title: 'Installation de bornes de recharge électrique',
    shortTitle: 'Bornes de recharge électrique',
    summary: 'Résolution n° 8 de l’AG du 12 mars, 3 devis comparés.',
    description:
      '3 devis comparés par le conseil syndical. Résolution n° 8 à l’ordre du jour de l’AG du 12 mars.',
    area: 'Parking',
    stage: 'vote',
    stageNote: '12 mars',
    updatedOn: '2026-02-20',
    works: null,
  },
  {
    id: 'remplacement-interphone',
    title: 'Remplacement de l’interphone',
    shortTitle: 'Interphone du bâtiment B',
    summary: 'Pannes répétées bâtiment B, 2 devis reçus sur 3.',
    description:
      'Pannes répétées bâtiment B. 2 devis reçus sur 3, décision du conseil syndical attendue fin mars.',
    area: 'Accès',
    stage: 'quotes',
    stageNote: '2/3 reçus',
    updatedOn: '2026-02-14',
    works: null,
  },
  {
    id: 'infiltration-parking',
    title: 'Infiltration d’eau au parking − 1',
    shortTitle: 'Infiltration d’eau au parking − 1',
    summary: 'Expert passé le 3 mars, rapport attendu sous 15 jours.',
    description:
      'Traces d’humidité places 12 à 15. Expert passé le 3 mars, rapport attendu sous 15 jours.',
    area: 'Parking',
    stage: 'reported',
    stageNote: 'expertise',
    updatedOn: '2026-03-05',
    works: null,
  },
  {
    id: 'eclairage-led',
    title: 'Éclairage LED des cages d’escalier',
    shortTitle: 'Éclairage LED des cages d’escalier',
    summary: 'Remplacement terminé dans les 3 bâtiments.',
    description:
      'Remplacement terminé dans les 3 bâtiments, avec détecteurs de présence. Facture et PV de réception dans Documents.',
    area: 'Parties communes',
    stage: 'done',
    stageNote: null,
    updatedOn: '2026-02-10',
    works: null,
  },
]
