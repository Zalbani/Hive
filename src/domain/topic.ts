import { z } from 'zod'

export const TopicStages = {
  REPORTED: 'reported',
  QUOTES: 'quotes',
  VOTE: 'vote',
  WORKS: 'works',
  DONE: 'done',
} as const

export type TopicStage = (typeof TopicStages)[keyof typeof TopicStages]

export const TOPIC_STAGE_ORDER: readonly TopicStage[] = [
  TopicStages.REPORTED,
  TopicStages.QUOTES,
  TopicStages.VOTE,
  TopicStages.WORKS,
  TopicStages.DONE,
]

export const worksScheduleSchema = z.object({
  startsOn: z.iso.date(),
  endsOn: z.iso.date(),
  notices: z.array(z.string().min(1)),
})

export const topicSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  shortTitle: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  area: z.string().min(1),
  stage: z.enum(TopicStages),
  stageNote: z.string().min(1).nullable(),
  updatedOn: z.iso.date(),
  works: worksScheduleSchema.nullable(),
})

export type Topic = z.infer<typeof topicSchema>
export type WorksSchedule = z.infer<typeof worksScheduleSchema>
