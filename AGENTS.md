# AGENTS.md

## Site Intent
`jason.gold` is a minimalist, contemplative journal + archive.

Core goals:
- Preserve calm: minimal UI, generous whitespace, and low visual noise.
- Keep reading primary: typography-first layouts with clear hierarchy.
- Prefer timeless over trendy: avoid heavy effects, novelty interactions, and decorative complexity.

## Build Rules
- Use Next.js App Router + TypeScript + Tailwind.
- Prefer server components and server-side data fetching.
- Keep client JavaScript minimal and purposeful.
- Keep pages fast and accessible (semantic HTML, keyboard-friendly controls, meaningful labels).
- Dates should be mono-styled and easy to scan.
- RSS fetches must use `SUBSTACK_RSS_URL` and ISR revalidation between 30 and 60 minutes.
- Normalize RSS entries into the typed model:
  - `id`, `title`, `url`, `date`, `excerpt`
- Excerpts should be plain text and concise.

## UI Rules
- No heavy animation.
- Avoid dense card UIs and crowded layouts.
- Maintain restrained color usage and strong contrast.
- External links should clearly indicate destination intent (context + accessible link text).

## Content Rules
- `/journal`: chronological, date-first log.
- Include a Substack call-to-action module every 6 journal entries.
- `/archive`: local-content-driven project grid with progressive loading.
- Detail pages are optional and only for entries with useful long-form context.
