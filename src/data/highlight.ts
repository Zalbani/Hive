import { assemblySchema } from '../domain/assembly'
import { consultationSchema, residenceEventSchema } from '../domain/consultation'
import type { Highlight } from '../domain/highlight'
import { selectHighlight } from '../domain/select-highlight'
import { getDocuments } from './documents'
import { assemblyFixtures } from './fixtures/assemblies'
import { consultationFixtures, eventFixtures } from './fixtures/consultations'
import { getTopics } from './topics'

export async function getHighlight(today: string): Promise<Highlight> {
  const [topics, documents] = await Promise.all([getTopics(), getDocuments()])
  return selectHighlight(
    {
      assemblies: assemblySchema.array().parse(assemblyFixtures),
      consultations: consultationSchema.array().parse(consultationFixtures),
      events: residenceEventSchema.array().parse(eventFixtures),
      topics,
      documents,
    },
    today,
  )
}
