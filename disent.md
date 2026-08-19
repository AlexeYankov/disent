# disent

**One-line summary:** Next.js countries browser with infinite scroll and detail pages — FSD-inspired structure with incomplete SSR and several correctness gaps.

**Skill level:** Junior (upper junior / approaching middle)

## Tech stack

| Layer | Choices |
|--------|---------|
| Framework | Next.js 14.2 (App Router) |
| UI | React 18, Chakra UI 2, SCSS modules |
| Data | TanStack React Query 5, Axios |
| State | Zustand (persist → sessionStorage) |
| Language | TypeScript 5 (`strict: true`) |
| Tooling | ESLint, Prettier |

## What it does

1. Main page — fetches all countries, responsive grid of cards, loads 20 at a time via scroll
2. Country detail — area, population, status, region keyed by concatenated country codes
3. Custom 404 page
4. Global shell with Chakra dark theme, toast notifications, app-level loader

Data source: REST Countries API v3.1

## Architecture notes

FSD-inspired structure:

```
src/
├── app/              # Next.js routes (thin wrappers)
├── clientPages/      # 'use client' page implementations
├── entities/         # Zustand stores, types, sample JSON
└── shared/
    ├── api/          # Axios + React Query hooks
    ├── helpers/      # custom hooks (loading, infinite scroll)
    ├── layouts/      # root layout wrapper
    ├── provider/     # Chakra + QueryClient + toasts
    └── ui/           # reusable components
```

- SSR prefetch exists in `layout.tsx` but `dehydratedState` is passed as `{}` — prefetch wasted
- Zustand duplicates React Query cache for countries
- Country detail reads from Zustand, not URL/API — breaks on cold navigation
- Dead code: `useStore.ts`, unused packages (`framer-motion`, `use-dehydrated-state`)

## Strengths

- Modern relevant stack (App Router, React Query, Zustand, TypeScript, Chakra)
- Clear folder intent — separation of routes, pages, entities, shared code
- Typed API layer with Axios instance and env-based base URL
- Responsive UI with SCSS grid breakpoints
- Custom polished CSS loader animation
- Error UX attempt with toast on fetch error and dedicated 404
- Tooling baseline: ESLint, Prettier, strict TS, path aliases

## Weaknesses / gaps

- Broken SSR hydration — prefetch runs but state never dehydrated
- Country detail fragility — no guard if country not found; depends on Zustand not per-route fetch
- Anti-patterns: `filter` instead of `.find()`, assignment inside Zustand `set()`, array index as React key
- Weak typing — `CardKit` uses `props: any`; capital is array but rendered as scalar
- Naming typos: `countri-store`, `useInifinity`, `BASE_PUBLICK_URL`
- Dead/unused code and duplicate lockfiles (`package-lock.json` + `pnpm-lock.yaml`)
- No tests; default create-next-app README
- `.env.local` not gitignored

## Growth points

1. Implement proper React Query dehydration; fetch country details server-side or via dedicated query
2. Replace `any`, add null/loading/error states, use stable keys (`cca3`), handle "country not found"
3. Add RTL tests for `CardKit`, `useGetCountries`, and page flows; one E2E for list → detail
4. Remove dead code, fix naming, document env vars, choose one package manager
5. Fix scroll listener cleanup bug; use Intersection Observer for infinite scroll; add error boundaries
