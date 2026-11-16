import {
  councilMemberSchema,
  emergencySchema,
  providerSchema,
  syndicSchema,
  type CouncilMember,
  type Emergency,
  type Provider,
  type Syndic,
} from '../domain/contact'
import {
  councilMemberFixtures,
  emergencyFixtures,
  providerFixtures,
  syndicFixture,
} from './fixtures/contacts'

export interface ResidenceContacts {
  syndic: Syndic
  emergencies: Emergency[]
  councilMembers: CouncilMember[]
  providers: Provider[]
}

export async function getContacts(): Promise<ResidenceContacts> {
  return Promise.resolve({
    syndic: syndicSchema.parse(syndicFixture),
    emergencies: emergencySchema.array().parse(emergencyFixtures),
    councilMembers: councilMemberSchema.array().parse(councilMemberFixtures),
    providers: providerSchema.array().parse(providerFixtures),
  })
}
