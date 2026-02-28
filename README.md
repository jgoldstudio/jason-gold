# jason.gold

Minimalist, contemplative journal site with Substack integration.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS

## Features
- `/`: Hero line + latest 3 Substack posts + links to Journal/Archive/Substack
- `/journal`: Full RSS feed as a date-first log, "Read on Substack" links, subscribe module every 6 entries, progressive loading
- `/archive`: Local-content project/experiment grid with progressive loading and optional detail pages
- Server-side RSS fetching with ISR revalidation (45 minutes)
- Typed RSS model (`id`, `title`, `url`, `date`, `excerpt`)

## Local Setup
1. Install dependencies:
```bash
npm install
```
2. Create env file:
```bash
cp .env.local.example .env.local
```
3. Set `SUBSTACK_RSS_URL` in `.env.local`:
```bash
SUBSTACK_RSS_URL=https://your-publication.substack.com/feed
```
4. Run dev server:
```bash
npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000)

## Production Build
```bash
npm run build
npm run start
```

## Deploy To Vercel
1. Push this project to GitHub.
2. In Vercel, import the repo.
3. Add environment variable:
   - `SUBSTACK_RSS_URL`
4. Deploy.

Vercel will use ISR for feed refresh (`revalidate: 2700`, 45 minutes).

## Project Structure
```text
app/
  page.tsx
  journal/page.tsx
  archive/page.tsx
  archive/[slug]/page.tsx
components/
  journal/JournalFeedClient.tsx
  archive/ArchiveGridClient.tsx
  SubscribeModule.tsx
content/
  archive.ts
lib/
  substack.ts
  types.ts
  date.ts
  text.ts
```
