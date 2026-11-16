import fr from './fr.json' with { type: 'json' }

export const Locales = {
  FR: 'fr',
} as const

export type Locale = (typeof Locales)[keyof typeof Locales]

export type Translation = typeof fr

export interface PluralForms {
  one: string
  other: string
}

type TemplateValues = Record<string, string | number>

const catalogues: Record<Locale, Translation> = {
  [Locales.FR]: fr,
}

const pluralRules = new Intl.PluralRules(Locales.FR)
const PLACEHOLDER_PATTERN = /\{(\w+)\}/g

export function getTranslation(locale: Locale): Translation {
  return catalogues[locale]
}

export function format(template: string, values: TemplateValues): string {
  return template.replace(PLACEHOLDER_PATTERN, (placeholder, key: string) => {
    const value = values[key]
    return value === undefined ? placeholder : String(value)
  })
}

export function formatPlural(forms: PluralForms, count: number): string {
  const template = pluralRules.select(count) === 'one' ? forms.one : forms.other
  return format(template, { count })
}
