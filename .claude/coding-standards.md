# Coding Standards — Hive

These standards apply to all TypeScript and `.astro` source code in Hive. The Dev agent follows them when implementing and enforces them during its own self-review pass.

The universal TypeScript section below is the one shared by the Keimelion repos (API, Backoffice, Landing), kept identical on purpose. The Hive-specific Astro rules are appended at the end. Examples above may mention Keimelion endpoints: the rule is what counts, not the example.

---

## Strict inputs and outputs

### Explicit return types on every function

All functions — exported or private — must declare their return type explicitly. Never rely on inference for function signatures.

```typescript
// ❌
async function fetchWaitlistCount(baseUrl: string) {
  const response = await fetch(`${baseUrl}/v1/public/waitlist/count`)
  return response.json()
}

// ✅
async function fetchWaitlistCount(baseUrl: string): Promise<WaitlistCount> {
  const response = await fetch(`${baseUrl}/v1/public/waitlist/count`)
  const parsed = waitlistCountSchema.parse(await response.json())
  return parsed
}
```

### Avoid optional properties — prefer explicit types

`field?: string` means the field may be completely absent from the object. This is ambiguous: does it mean "not yet set", "not applicable", or "forgotten"? Be explicit instead.

- Use **required fields** on domain types — if a value must exist after creation, it is required
- Use **separate input types** for creation/update where some fields are genuinely optional
- Use **`T | null`** (not `T | undefined`) when a value is intentionally absent — `null` is deliberate, `undefined` is accidental

### Validate all external inputs with Zod at the boundary

Every input entering the app from outside — form submissions, API responses, URL params, `localStorage` — must be validated with a Zod schema at the boundary. Downstream code receives already-typed, already-validated data.

```typescript
// ❌ — API response consumed without validation
const response = await fetch(`${env.PUBLIC_API_BASE_URL}/v1/public/waitlist/count`)
const payload = await response.json()
return payload.count

// ✅ — Zod parses at the boundary, caller receives clean types
const waitlistCountSchema = z.object({ count: z.number().int().nonnegative() })
type WaitlistCount = z.infer<typeof waitlistCountSchema>

async function fetchWaitlistCount(baseUrl: string): Promise<WaitlistCount> {
  const response = await fetch(`${baseUrl}/v1/public/waitlist/count`)
  return waitlistCountSchema.parse(await response.json())
}
```

### `null` over `undefined` for intentional absence

`undefined` means a value was never set. `null` means it was explicitly set to nothing. In domain types, use `null` for intentional absence — it is deliberate and serializes correctly in JSON (`undefined` disappears).

---

## Early return — no `else`

Fail fast. Handle error cases and guard clauses first, then write the happy path without nesting. **`else` is never allowed** — if the `if` block returns, the `else` is redundant; if it doesn't, extract a function.

```typescript
// ❌
function resolveLocaleLabel(locale: string | null): string {
  if (locale) {
    if (locale === 'fr') {
      return 'Français'
    } else {
      return 'English'
    }
  } else {
    return 'Français'
  }
}

// ✅
function resolveLocaleLabel(locale: string | null): string {
  if (locale === null || locale === 'fr') return 'Français'
  return 'English'
}
```

---

## No abbreviations

Use full, descriptive names. Abbreviations save keystrokes but cost clarity.

| ❌ Avoid | ✅ Use |
|---|---|
| `req`, `res` | `request`, `response` |
| `err` | `error` |
| `usr`, `u` | `user` |
| `msg` | `message` |
| `val` | `value` |
| `ctx` | `context` |
| `cb` | `callback` |
| `idx`, `i` | use descriptive loop variable or `.map()` / `.filter()` |
| `e` (in handlers) | `event` |

Exception: well-known, unambiguous domain acronyms (`id`, `url`, `uuid`, `http`, `html`, `svg`, `css`, `seo`, `og`) are acceptable.

---

## No comments — self-explaining names

If you feel the need to explain what code does, the code is wrong. Rename functions, variables, or extract a helper — never annotate. This applies to "what" comments *and* "why" comments: a block explaining why we defer analytics until after consent should be replaced by a named helper like `loadAnalyticsAfterConsent()`, not documented in prose.

The only acceptable comments are:
- Workarounds for external library bugs (with a link to the issue)
- Non-obvious legal, compliance, or accessibility requirements
- A single top-comment on `src/config/env.ts` warning that `PUBLIC_*` is shipped to the client bundle

---

## Minimal parameters

- **Max 3 parameters** for a function. Beyond that, group related params into an object.
- Boolean parameters are a smell — they usually mean the function does two things. Split it.

---

## Maximum function length: 25 lines

A function body should not exceed 25 lines (excluding the signature and closing brace). If it does, extract sub-functions with descriptive names. This applies to `.astro` component scripts too — extract sub-components rather than growing a single component.

---

## Single responsibility

Each function does exactly one thing. The name should describe it completely without "and" or "or".

---

## `switch/case` over `if/else if` chains

When branching on a single value with 3 or more cases, use `switch/case`. It is more readable and exhaustiveness-checkable by TypeScript.

Combined with TypeScript's exhaustiveness checking: if `default` should never be reached, use `satisfies never` to get a compile error when a case is missing.

---

## Shared enums — no magic strings or numbers

Never use raw string or number literals for values that carry semantic meaning. Define a `const` object with `as const` and derive the type from it.

```typescript
// ❌
if (locale === 'fr') { ... }

// ✅ — define once, reuse everywhere
export const Locales = {
  FR: 'fr',
  EN: 'en',
} as const

export type Locale = (typeof Locales)[keyof typeof Locales]

if (locale === Locales.FR) { ... }
```

For enums that are also used by the API, mirror the API's `shared/enums/*` definitions here (do not import the API module — the Landing is kept decoupled). Keep the string values identical so the wire protocol matches.

---

## No magic numbers or strings — local constants

Any literal that is not immediately obvious from context must be named. Define it as a `const` at the top of the file.

```typescript
// ❌
if (email.length > 254) { ... }
setTimeout(callback, 3000)

// ✅
const MAX_EMAIL_LENGTH = 254
const WAITLIST_SUCCESS_TOAST_MS = 3000

if (email.length > MAX_EMAIL_LENGTH) { ... }
setTimeout(callback, WAITLIST_SUCCESS_TOAST_MS)
```

---

## `const` over `let`, never `var`

Default to `const`. Use `let` only when the variable genuinely needs to be reassigned. If you find yourself reaching for `let`, first ask whether a `.map()` / `.filter()` / ternary would remove the need for mutation.

`var` is never acceptable.

---

## Array methods over `for` loops

Prefer declarative array methods over imperative loops. They express intent, not mechanics. Use `.map()`, `.filter()`, `.find()`, `.some()`, `.every()`, `.reduce()`. A `for` loop is acceptable only when you need `break` / `continue` semantics that can't be expressed otherwise.

---

## No nested ternaries

A single ternary for a simple inline condition is fine (including inside `.astro` templates). Two levels of nesting: extract a function or a sub-component.

---

## `async/await` only — no `.then()` / `.catch()`

All async code uses `async/await`. Never chain `.then()` or `.catch()` — it mixes paradigms and makes control flow harder to follow.

---

## Named exports only — no default exports

Always use named exports. Default exports make refactoring harder (the import name is not enforced) and reduce discoverability.

**Exception**: `.astro` components are inherently default-exported (the file *is* the component). Within an `.astro` file, named exports in the frontmatter follow the general rule.

---

## No `any` in template literals — explicit types only

`@typescript-eslint/restrict-template-expressions` forbids values typed as `any`, `null`, `undefined`, or object types inside template literals. Only `string`, `number`, `boolean`, and `bigint` are allowed directly.

Fix by narrowing, converting, or using the `URL` constructor for URL interpolation:

```typescript
// ❌
const endpoint = `${import.meta.env.PUBLIC_API_BASE_URL}/v1/public/waitlist`

// ✅ — go through the Zod-validated env wrapper and use URL constructor
import { env } from '@/config/env'
const endpoint = new URL('/v1/public/waitlist', env.PUBLIC_API_BASE_URL).href
```

---

## `??` over `||` for nullish coalescing

Use `??` when you want to fall back only on `null` or `undefined`. `||` also coerces `0`, `""`, and `false` — which is almost never what you want in business logic.

---

## Natural reading order

Functions in a file should read top-to-bottom in the order a reader would want to understand them:

1. **The exported component or main function first** — what the module is *for*
2. **Private helpers after** — implementation details, in the order they are called

A reader opening the file sees the intent at the top and drills into details below. In an `.astro` file, the frontmatter block is the module header: imports first, then exported `const Props`, then local helpers, then the template.

---

## Naming conventions

- **Functions**: `verb + noun` in camelCase — `fetchWaitlistCount`, `submitWaitlist`, `buildCanonicalUrl`
- **Astro components**: PascalCase noun — `Hero`, `WaitlistForm`, `BaseLayout`
- **Booleans**: `is` / `has` / `can` prefix — `isValidEmail`, `hasOptedIn`, `canSubmit`
- **Interfaces**: PascalCase noun — `WaitlistInput`, `WaitlistResult`; component props: `<ComponentName>Props`
- **Constants**: SCREAMING_SNAKE_CASE for true constants — `MAX_EMAIL_LENGTH`
- **File names**: kebab-case matching the exported symbol — `hero.astro` exports `Hero`, `waitlist-form.ts` is the client-island script for `waitlist-form.astro`
- **i18n keys**: dot-separated kebab-case — `hero.title`, `waitlist.submit.success`
- No single-letter variables except in well-understood math contexts

---

## API payload keys — camelCase everywhere

All keys in HTTP request bodies, response bodies, and query params consumed from the Keimelion API are **camelCase**. This matches TypeScript identifiers so the same key flows through the whole call chain without any rename layer.

The only place snake_case ever appears is in URL path segments (`/public/waitlist`) — that's a REST convention, not a data convention.

---

## Specific error codes — no generic fallbacks

When surfacing an API error to the UI, distinguish specific failure modes from generic ones. The Keimelion API's `ApiError` responses come with a `code` field — use it to show a targeted message.

```typescript
// ❌
if (error) showToast(t('waitlist.error.generic'))

// ✅
switch (error?.code) {
  case 'EMAIL_ALREADY_REGISTERED':
    return showToast(t('waitlist.error.already_registered'))
  case 'RATE_LIMITED':
    return showToast(t('waitlist.error.rate_limited'))
  default:
    return showToast(t('waitlist.error.generic'))
}
```

---

## Trust the validation layer

Components receive already-validated, already-typed data from Zod parsers or from the API's typed response. Do not re-check constraints downstream.

- If a Zod form schema guarantees `email` is lowercased, do not lowercase it again before display
- If the API guarantees `createdAt` is an ISO string, do not re-parse it as a Date before passing it to the next function

---

## Normalise inputs at the Zod boundary

Data normalisation (lowercasing emails, trimming whitespace) belongs in the Zod schema via `.transform()` or `.trim()`, not in templates or scripts.

```typescript
// ✅ — normalised once at the boundary
const waitlistInputSchema = z.object({
  email: z.string().email().transform((value) => value.toLowerCase().trim()),
  consent: z.literal(true),
})
```

---

## Avoid overkill interfaces

Do not create an interface for a shape used in exactly one place. Inline the type or pass values directly.

---

## Prefer inline over premature dispatchers

A `Record<K, V>` lookup table or a helper function is worth its abstraction only when it removes real duplication. A 2-entry dispatcher for two mutually-exclusive branches is not real duplication — it is ceremony.

Prefer the direct form until the case count justifies the table (typically 4+ genuinely-similar cases). "We might add more later" is not a reason.

---

## Delete unused exports — do not hoard scaffolding

An export with no consumer is dead code, even if it looks like it *might* be needed later. Delete it; recreate it when the actual consumer arrives. Git history is the scaffolding archive — the working tree is not.

---

## Private helpers — ordering within the private section

Within the private section of a file (after all exported functions and components), order helpers in the order they are first called — top to bottom mirrors the call flow.

---

# Astro / Hive addendum

The rules below are Hive-specific and complement the general TypeScript rules above. Where they conflict with the general rules, these take precedence.

## Rendered on request, behind the residence code

Every route is rendered on request (`output: 'server'`, `@astrojs/node` standalone). `src/middleware.ts` checks the signed session cookie on every route except `/acces`, `/robots.txt`, `/favicon.svg` and `/_astro/*`. A new public route must be added to its allowlist on purpose, never by accident.

- Private files (PDF) live in `private/`, never in `public/`, and are served by a route behind the middleware.
- Every response is `Cache-Control: private, no-store` and `X-Robots-Tag: noindex, nofollow`.
- `robots.txt` disallows everything. No sitemap.

## Static-first — no JS runtime by default

Every `.astro` component ships as HTML + CSS. Add a `<script>` block only when the behaviour is impossible without JS (list filters). `<details>`, plain `<form method="post">` and links do the rest.

Controls that only work with JS (filter buttons) render with `hidden` + `data-filter-controls` and are revealed by the script, so a no-JS visitor never sees a dead control. Hydration frameworks (React, Vue, Svelte) are not installed.

## Data — domain, fixtures, access functions

- `src/domain/`: Zod schemas, types, enums and pure domain logic (e.g. `selectHighlight`). No I/O.
- `src/data/fixtures/`: fake data, typed with `satisfies z.input<typeof schema>`.
- `src/data/*.ts`: **async** access functions (`getDocuments()`, `getTopics()`…) that validate with Zod. They are the only door to data: when the API arrives, only their bodies change.
- Pages call the access functions in their frontmatter and pass results to components through props. A component never reads a data source itself.
- Presentation mappings (category → tone) live in `src/domain/presentation.ts`, not in the data.
- "Today" comes from `getToday()` (`src/data/clock.ts`), never from `new Date()` in a page: `DEMO_NOW` must be able to pin it.

## Components — one file per component

Components are flat files in kebab-case under `src/components/` (`site-header.astro`, `topic-list.astro`). Split a sibling `.ts` file only when the frontmatter or the script grows past ~30 lines. Constants shared between components live in a `.ts` module (`src/utils/routes.ts`), never as value exports of a `.astro` file.

## Shared building blocks — reuse before writing

- `tone-card.astro`: coloured card (badge, title, decorative glow) — topic and document cards.
- `document-row.astro`: clickable document row (full or compact) — every document list.
- `filter-buttons.astro` + `src/scripts/list-filter.ts`: category filters (`data-filter-root`, `data-filter-item`, `data-filter-key`).
- `icon.astro` + `src/utils/icons.ts`: every stroke icon; never paste an SVG path in a component.
- `highlight-frame.astro`: frame of every « À la une » variant (kicker, title, lead, actions slot).
- `src/utils/http.ts`: HTTP status codes.

A new card, row, list or icon goes through these. If one doesn't fit, extend it instead of copying it.

## Motion

- Page changes use cross-document View Transitions (`@view-transition` in `base.css`, no JS). Header, footer and the mobile tab bar are their own layers; the content fades and rises.
- Only `transform`, `opacity`, colours and shadows are animated, with the `--duration-*` and `--ease-out` tokens.
- Everything is disabled under `prefers-reduced-motion: reduce`.
- Hover effects only where a pointer exists (`@media (hover: hover)` for touch-heavy components like the tab bar); hover colours follow the item's tone.

## `.astro` frontmatter structure

1. `import` statements
2. `interface Props`
3. `Astro.props` destructuring
4. Local constants and pure helpers
5. Values computed from props

Keep it short: logic over ~15 lines belongs in `src/utils/` or `src/domain/`.

## i18n — zero hardcoded user-visible strings

- The site is French only, but every visible string lives in `src/i18n/fr.json` and goes through `src/i18n/t.ts` (`getTranslation`, `format`, `formatPlural`), so another locale stays possible.
- Keys are nested camelCase objects (`highlight.assembly.agenda`).
- Data (titles, descriptions) stays in the fixtures; interface labels (buttons, headings) stay in the catalogue.

## Env access

- `src/config/server-env.ts` is the only module that imports `astro:env/server`. It re-validates with Zod and exports `serverEnv`. Secrets are declared in `astro.config.mjs` with `access: 'secret'` so they are read at runtime, not inlined at build.
- `src/config/env.ts` is the only module that reads `import.meta.env`.
- Every new variable goes into the schema, `.env.example` (with a one-line comment) and the README.
- Never put a secret behind `PUBLIC_*`.

## No raw `fetch` in `.astro` templates

When the API arrives, calls go through helpers under `src/data/` that read the base URL from the config, parse the response with Zod at the boundary and return `Result<T, ApiError>`-style values instead of throwing.

## Forms — explicit states

Forms are plain HTML posts handled server-side (`/acces`, `/deconnexion`), with explicit states (`'idle' | 'error'`) and an inline error tied to the field with `aria-describedby`. Astro's origin check stays on: never disable `security.checkOrigin`.

## Fonts — Fontsource only, no Google Fonts

Plus Jakarta Sans via `@fontsource/plus-jakarta-sans`, imported from `src/styles/base.css`, latin subset, only the weights in use (400, 600, 700, 800). Preload only the two main weights.

## Design tokens live on `:root`

All colours, spacing, radii, shadows, gradients and the type scale are custom properties in `src/styles/tokens.css`, measured on the mockups. No hex colour and no raw px spacing in a component (a one-off size from the mockup is acceptable when no token fits; add a token as soon as it repeats).

Colour families go through `data-tone="peach|rose|sage|lilac|mustard|neutral|ink"`, which sets `--tone-bg`, `--tone-fg`, `--tone-tint`, `--tone-dot` and `--tone-accent`. Components use the `--tone-*` variables, never a family directly when a tone fits.

## CSS — scoped `<style>` by default

Scoped styles for anything component-specific. Global rules and shared primitives (`.h-btn`, `.h-badge`, `.h-tag`, `.h-panel`, `.h-list-card`, `.h-card-grid`, `.h-filter`, `.h-tile`, `.h-page-title`, `.h-subheading`…) live in `src/styles/base.css` with the `h-` prefix. No Tailwind, no CSS-in-JS. BEM-like names inside a component.

## Accessibility is not optional

- Buttons are `<button>`, links are `<a>`, inputs have a `<label>`.
- Contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text.
- Visible focus on every interactive element.
- One `<h1>` per page, no skipped levels.
- Links opening a new tab say so (`external-link-hint.astro`).
- Purely visual progress bars are `aria-hidden` and doubled by a visually hidden sentence.
- `prefers-reduced-motion` honoured.

## Performance budget — Lighthouse mobile ≥ 90

90 or higher on Performance, Accessibility and Best Practices for every page touched (SEO is irrelevant: the portal is noindex). No client bundle over 100 KB gzipped.

## Never render user-controlled HTML

Never pass user-controlled strings to `set:html`.

## Deployment — self-hosted

Docker image built from `Dockerfile` (`@astrojs/node` standalone, port 3003), with `private/` copied next to `dist/`. Behind a reverse proxy that keeps the `Host` header (otherwise the origin check rejects the access form). Security headers (CSP, HSTS, Referrer-Policy) belong in the proxy.
