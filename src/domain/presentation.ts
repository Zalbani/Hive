import { ProviderCategories, type ProviderCategory } from './contact'
import { DocumentCategories, type DocumentCategory } from './document'
import { FaqThemes, type FaqTheme } from './faq'
import { Tones, type Tone } from './tone'
import { TopicStages, type TopicStage } from './topic'

export const DOCUMENT_CATEGORY_TONES: Record<DocumentCategory, Tone> = {
  [DocumentCategories.ASSEMBLY]: Tones.PEACH,
  [DocumentCategories.REGULATION]: Tones.ROSE,
  [DocumentCategories.TECHNICAL]: Tones.SAGE,
  [DocumentCategories.REFERENCES]: Tones.MUSTARD,
  [DocumentCategories.FINANCES]: Tones.LILAC,
}

export const TOPIC_STAGE_TONES: Record<TopicStage, Tone> = {
  [TopicStages.REPORTED]: Tones.LILAC,
  [TopicStages.QUOTES]: Tones.PEACH,
  [TopicStages.VOTE]: Tones.ROSE,
  [TopicStages.WORKS]: Tones.SAGE,
  [TopicStages.DONE]: Tones.NEUTRAL,
}

export const FAQ_THEME_TONES: Record<FaqTheme, Tone> = {
  [FaqThemes.PAINT]: Tones.PEACH,
  [FaqThemes.HEATING]: Tones.LILAC,
  [FaqThemes.WASTE]: Tones.SAGE,
  [FaqThemes.ACCESS]: Tones.ROSE,
  [FaqThemes.COMMUNITY]: Tones.MUSTARD,
}

export const PROVIDER_CATEGORY_TONES: Record<ProviderCategory, Tone> = {
  [ProviderCategories.HEATING]: Tones.LILAC,
  [ProviderCategories.ELEVATOR]: Tones.PEACH,
  [ProviderCategories.CLEANING]: Tones.ROSE,
  [ProviderCategories.GREEN_SPACES]: Tones.SAGE,
  [ProviderCategories.WASTE]: Tones.NEUTRAL,
}

export const COUNCIL_AVATAR_TONES: readonly Tone[] = [Tones.LILAC, Tones.PEACH, Tones.ROSE]
