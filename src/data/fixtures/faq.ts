import type { z } from 'zod'
import type { faqEntrySchema, practicalFactSchema } from '../../domain/faq'

type FaqEntryFixture = z.input<typeof faqEntrySchema>

export const faqFixtures: FaqEntryFixture[] = [
  {
    id: 'peinture-halls',
    theme: 'paint',
    question: 'Quelle est la référence de la peinture des halls et cages d’escalier ?',
    answer: [
      'Les murs des parties communes ont été repeints en 2022. Pour une retouche, utilisez exactement ces références :',
    ],
    facts: [],
    swatches: [
      { label: 'Murs halls', reference: 'Seigneurie · « Lin clair » · velours', color: '#EFE6D8' },
      { label: 'Soubassements', reference: 'Seigneurie · « Grège » · satin', color: '#D9CDBB' },
      { label: 'Plafonds & portes', reference: 'Blanc RAL 9010 · mat / satin', color: '#FBFAF7' },
    ],
    documentId: 'references-peinture-halls',
    openByDefault: true,
  },
  {
    id: 'couleur-porte-volets',
    theme: 'paint',
    question: 'Puis-je changer la couleur de ma porte d’entrée ou de mes volets ?',
    answer: [
      'Pas sans accord : la face extérieure des portes palières et les volets font partie de l’aspect de l’immeuble. Toute modification doit être validée en assemblée générale (voir le règlement de copropriété).',
    ],
    facts: [],
    swatches: [],
    documentId: null,
    openByDefault: false,
  },
  {
    id: 'fonctionnement-chauffage',
    theme: 'heating',
    question: 'Comment fonctionne le chauffage de la résidence ?',
    answer: [
      'Le chauffage est collectif : une chaudière gaz au sous-sol alimente les radiateurs de tous les logements.',
      'Chaque radiateur a un robinet thermostatique (molette de 1 à 5) : le 3 correspond à environ 20 °C. Ne fermez pas complètement les radiateurs d’une pièce inoccupée, mettez-les plutôt sur « ❄ » (hors-gel).',
    ],
    facts: [
      'En service du 15 oct. au 15 avril',
      'Consigne : 19 °C',
      'Répartiteurs relevés à distance',
    ],
    swatches: [],
    documentId: null,
    openByDefault: true,
  },
  {
    id: 'radiateur-froid',
    theme: 'heating',
    question: 'Mon radiateur reste froid en haut, que faire ?',
    answer: [
      'Il faut le purger : ouvrez doucement la petite vis en haut du radiateur avec une clé de purge, laissez sortir l’air jusqu’à ce qu’un filet d’eau apparaisse, puis refermez. Si le problème persiste, signalez-le au syndic.',
    ],
    facts: [],
    swatches: [],
    documentId: null,
    openByDefault: false,
  },
  {
    id: 'eau-chaude',
    theme: 'heating',
    question: 'L’eau chaude est-elle aussi collective ?',
    answer: [
      'Oui, elle est produite par la même chaudière, toute l’année. Votre consommation est mesurée par le compteur d’eau chaude dans votre gaine technique.',
    ],
    facts: [],
    swatches: [],
    documentId: null,
    openByDefault: false,
  },
  {
    id: 'jours-poubelles',
    theme: 'waste',
    question: 'Quels sont les jours de sortie des poubelles ?',
    answer: [
      'Ordures ménagères : lundi et jeudi. Tri sélectif : mercredi. Verre : borne au coin de la rue. Les encombrants vont en déchetterie ou sur rendez-vous auprès de la métropole.',
    ],
    facts: [],
    swatches: [],
    documentId: null,
    openByDefault: false,
  },
  {
    id: 'badge-supplementaire',
    theme: 'access',
    question: 'Comment obtenir un badge supplémentaire ?',
    answer: [
      'Faites la demande au syndic par e-mail en précisant votre numéro de lot. Le badge est facturé et remis sous une semaine environ.',
    ],
    facts: [],
    swatches: [],
    documentId: null,
    openByDefault: false,
  },
  {
    id: 'horaires-travaux',
    theme: 'community',
    question: 'À quelles heures peut-on faire des travaux bruyants ?',
    answer: [
      'En semaine de 8h30 à 12h et de 14h à 19h30, le samedi de 9h à 12h et de 15h à 19h, le dimanche et les jours fériés de 10h à 12h.',
    ],
    facts: [],
    swatches: [],
    documentId: null,
    openByDefault: false,
  },
]

export const practicalFactFixtures: z.input<typeof practicalFactSchema>[] = [
  {
    id: 'peinture-halls',
    label: 'Peinture des halls',
    value: 'Seigneurie « Lin clair », velours',
    detail: 'Soubassements « Grège » satin · plafonds RAL 9010',
  },
  {
    id: 'chauffage',
    label: 'Chauffage',
    value: 'Collectif, du 15 octobre au 15 avril, 19 °C',
    detail: 'Radiateur froid en haut ? Il faut le purger.',
  },
  {
    id: 'poubelles',
    label: 'Poubelles',
    value: 'Lundi et jeudi, tri le mercredi',
    detail: 'Verre : borne au coin de la rue',
  },
  {
    id: 'travaux-bruyants',
    label: 'Travaux bruyants',
    value: 'Semaine 8h30–12h et 14h–19h30',
    detail: 'Samedi 9h–12h, 15h–19h · dimanche 10h–12h',
  },
]
