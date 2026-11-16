import type { Assembly } from './assembly'
import type { Consultation, ResidenceEvent } from './consultation'
import type { ResidenceDocument } from './document'
import type { Topic, WorksSchedule } from './topic'

export const HighlightKinds = {
  ASSEMBLY: 'assembly',
  WORKS: 'works',
  ACTION: 'action',
  SUMMARY: 'summary',
} as const

export interface AssemblyHighlight {
  kind: typeof HighlightKinds.ASSEMBLY
  assembly: Assembly
}

export interface WorksHighlight {
  kind: typeof HighlightKinds.WORKS
  topic: Topic
  schedule: WorksSchedule
}

export interface ActionHighlight {
  kind: typeof HighlightKinds.ACTION
  consultation: Consultation
}

export interface SummaryHighlight {
  kind: typeof HighlightKinds.SUMMARY
  activeTopics: Topic[]
  latestDocument: ResidenceDocument | null
  nextEvent: ResidenceEvent | null
}

export type Highlight = AssemblyHighlight | WorksHighlight | ActionHighlight | SummaryHighlight
