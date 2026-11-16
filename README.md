# Hive

Portail des résidents d'une copropriété (exemple : résidence « Harmony »). Astro 7 en rendu serveur (adaptateur Node standalone), CSS vanilla avec des tokens, Zod, données fictives. Même stack et mêmes conventions que Keimelion/Landing.

## Prérequis

Node 24 (`.nvmrc`), npm.

## Commandes

```sh
cp .env.example .env
npm install
npm run dev        # http://localhost:4321, code d'accès dans .env (RESIDENCE_ACCESS_CODE)
npm run lint
npm run typecheck
npm run build && npm run preview
```

## Accès

Tout le site est protégé par un code de résidence (`src/middleware.ts`, page `/acces`). Le cookie de session est signé (HMAC) et valable 90 jours.

- Changer `SESSION_SECRET` déconnecte tout le monde.
- Changer `RESIDENCE_ACCESS_CODE` bloque les nouvelles connexions avec l'ancien code.
- Les PDF sont dans `private/documents/` (jamais dans `public/`) et servis par `/documents/[id]` derrière la session.

## Données

`src/domain/` : schémas Zod et types. `src/data/fixtures/` : données fictives. `src/data/*.ts` : fonctions asynchrones d'accès, à remplacer par des appels à l'API le jour venu sans toucher aux pages.

`DEMO_NOW` fige la date du jour pour voir chaque variante du bloc « À la une » : `2026-03-06` (AG), `2026-04-22` (travaux), `2026-06-10` (consultation), vide (résumé).
