import type { Assembly } from './assembly'
import type { Consultation, ResidenceEvent } from './consultation'
import type { ResidenceDocument } from './document'
import { HighlightKinds, type Highlight } from './highlight'
import { TopicStages, type Topic } from './topic'
import { dateTimeToParisIsoDate, daysBetween } from '../utils/dates'

export const ASSEMBLY_WINDOW_DAYS = 30
export const WORKS_WINDOW_DAYS = 15

export interface HighlightSources {
  assemblies: Assembly[]
  topics: Topic[]
  consultations: Consultation[]
  documents: ResidenceDocument[]
  events: ResidenceEvent[]
}

export function selectHighlight(sources: HighlightSources, today: string): Highlight {
  const assembly = findUpcomingAssembly(sources.assemblies, today)
  if (assembly) return { kind: HighlightKinds.ASSEMBLY, assembly }

  const worksTopic = findCurrentWorks(sources.topics, today)
  if (worksTopic?.works) {
    return { kind: HighlightKinds.WORKS, topic: worksTopic, schedule: worksTopic.works }
  }

  const consultation = findOpenConsultation(sources.consultations, today)
  if (consultation) return { kind: HighlightKinds.ACTION, consultation }

  return {
    kind: HighlightKinds.SUMMARY,
    activeTopics: sources.topics.filter((topic) => topic.stage !== TopicStages.DONE),
    latestDocument: findLatestDocument(sources.documents),
    nextEvent: findNextEvent(sources.events, today),
  }
}

function findUpcomingAssembly(assemblies: Assembly[], today: string): Assembly | null {
  const upcoming = assemblies.filter((assembly) => {
    const daysLeft = daysBetween(today, dateTimeToParisIsoDate(assembly.heldAt))
    return daysLeft >= 0 && daysLeft <= ASSEMBLY_WINDOW_DAYS
  })
  return upcoming.toSorted((first, second) => first.heldAt.localeCompare(second.heldAt))[0] ?? null
}

function findCurrentWorks(topics: Topic[], today: string): Topic | null {
  const current = topics.filter((topic) => {
    if (topic.stage !== TopicStages.WORKS || topic.works === null) return false
    const daysUntilStart = daysBetween(today, topic.works.startsOn)
    const hasEnded = daysBetween(today, topic.works.endsOn) < 0
    return !hasEnded && daysUntilStart <= WORKS_WINDOW_DAYS
  })
  return current[0] ?? null
}

function findOpenConsultation(consultations: Consultation[], today: string): Consultation | null {
  const open = consultations.filter(
    (consultation) =>
      daysBetween(consultation.opensOn, today) >= 0 &&
      daysBetween(today, consultation.closesOn) >= 0,
  )
  return open[0] ?? null
}

function findLatestDocument(documents: ResidenceDocument[]): ResidenceDocument | null {
  const sorted = documents.toSorted((first, second) =>
    second.publishedOn.localeCompare(first.publishedOn),
  )
  return sorted[0] ?? null
}

function findNextEvent(events: ResidenceEvent[], today: string): ResidenceEvent | null {
  const upcoming = events.filter((event) => daysBetween(today, event.happensOn) >= 0)
  return (
    upcoming.toSorted((first, second) => first.happensOn.localeCompare(second.happensOn))[0] ?? null
  )
}
