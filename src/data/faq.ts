import {
  faqEntrySchema,
  practicalFactSchema,
  type FaqEntry,
  type PracticalFact,
} from '../domain/faq'
import { faqFixtures, practicalFactFixtures } from './fixtures/faq'

export async function getFaqEntries(): Promise<FaqEntry[]> {
  return Promise.resolve(faqEntrySchema.array().parse(faqFixtures))
}

export async function getPracticalFacts(): Promise<PracticalFact[]> {
  return Promise.resolve(practicalFactSchema.array().parse(practicalFactFixtures))
}
