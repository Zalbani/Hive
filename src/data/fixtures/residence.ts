import type { z } from 'zod'
import type { residenceSchema } from '../../domain/residence'

export const residenceFixture = {
  name: 'Harmony',
  city: 'Lyon',
  district: '7e',
  syndicName: 'Cabinet Meridian Gestion',
  councilEmail: 'conseil-syndical@harmony.example.org',
  totalLots: 48,
  nextAssemblyNote: 'Prochaine assemblée générale au printemps 2027, date à fixer.',
  links: {
    sharedSpacesBooking: 'https://reservation.example.org/harmony',
    visitorParking: 'https://parking.example.org/harmony',
    residentsGroup: 'https://chat.example.org/harmony-residents',
  },
} satisfies z.input<typeof residenceSchema>
