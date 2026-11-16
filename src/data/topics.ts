import { topicSchema, type Topic } from '../domain/topic'
import { topicFixtures } from './fixtures/topics'

export async function getTopics(): Promise<Topic[]> {
  return Promise.resolve(topicSchema.array().parse(topicFixtures))
}

export function getTopicHref(id: string): string {
  return `/sujets-en-cours#${id}`
}
