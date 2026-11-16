import type { z } from 'zod'
import type {
  councilMemberSchema,
  emergencySchema,
  providerSchema,
  syndicSchema,
} from '../../domain/contact'

export const syndicFixture = {
  name: 'Cabinet Meridian Gestion',
  initials: 'MG',
  managerName: 'Mme Claire Laurent',
  phone: '04 78 00 00 01',
  email: 'contact@meridian-gestion.example.org',
  openingHours: 'Lun–ven · 9h–12h30, 14h–18h',
  shortOpeningHours: 'Lun–ven, 9h–18h',
} satisfies z.input<typeof syndicSchema>

export const emergencyFixtures: z.input<typeof emergencySchema>[] = [
  {
    id: 'fuite',
    label: 'Fuite, dégât des eaux',
    contactName: 'Astreinte syndic, 24h/24',
    phone: '04 78 00 00 02',
    pinnedOnHome: true,
  },
  {
    id: 'chauffage',
    label: 'Panne de chauffage',
    contactName: 'Thermi Services',
    phone: '04 78 00 00 03',
    pinnedOnHome: true,
  },
  {
    id: 'ascenseur',
    label: 'Ascenseur bloqué',
    contactName: 'Bouton d’appel en cabine, 24h/24',
    phone: null,
    pinnedOnHome: false,
  },
  {
    id: 'secours',
    label: 'Pompiers · Samu · Police',
    contactName: '18 · 15 · 17 — ou 112',
    phone: null,
    pinnedOnHome: false,
  },
]

export const councilMemberFixtures: z.input<typeof councilMemberSchema>[] = [
  {
    id: 'rossi',
    displayName: 'M. Rossi',
    initials: 'MR',
    role: 'president',
    building: 'Bât. A',
    follows: ['travaux', 'relations avec le syndic'],
    email: 'rossi@harmony.example.org',
  },
  {
    id: 'da-silva',
    displayName: 'Mme Da Silva',
    initials: 'DS',
    role: 'member',
    building: 'Bât. B',
    follows: ['budget', 'appels de fonds'],
    email: 'da-silva@harmony.example.org',
  },
  {
    id: 'aubert',
    displayName: 'M. Aubert',
    initials: 'MA',
    role: 'member',
    building: 'Bât. C',
    follows: ['espaces verts', 'salle commune'],
    email: 'aubert@harmony.example.org',
  },
]

export const providerFixtures: z.input<typeof providerSchema>[] = [
  {
    id: 'thermi-services',
    category: 'heating',
    name: 'Thermi Services',
    service: 'chaudière collective',
    phone: '04 78 00 00 03',
  },
  {
    id: 'ascenseurs-du-sud',
    category: 'elevator',
    name: 'Ascenseurs du Sud',
    service: 'contrat d’entretien',
    phone: '04 78 00 00 04',
  },
  {
    id: 'net-oliv',
    category: 'cleaning',
    name: 'Net’Oliv',
    service: 'parties communes, mardi et vendredi',
    phone: '06 00 00 00 05',
  },
  {
    id: 'jardins-d-oc',
    category: 'green-spaces',
    name: 'Jardins d’Oc',
    service: 'passage tous les 15 jours',
    phone: '04 78 00 00 06',
  },
  {
    id: 'metropole',
    category: 'waste',
    name: 'Métropole',
    service: 'encombrants sur rendez-vous',
    phone: '08 00 00 00 07',
  },
]
