export const Tones = {
  PEACH: 'peach',
  ROSE: 'rose',
  SAGE: 'sage',
  LILAC: 'lilac',
  MUSTARD: 'mustard',
  NEUTRAL: 'neutral',
  INK: 'ink',
} as const

export type Tone = (typeof Tones)[keyof typeof Tones]
