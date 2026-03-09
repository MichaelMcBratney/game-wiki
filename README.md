# Game Wiki

A high-performance Game Wiki built with **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, **Prisma ORM**, and **PostgreSQL**.

## Features

- **ISR** (Incremental Static Regeneration) for fast page loads
- **Markdown** with GFM and **Wikilinks** (`[[Page Name]]` → `/wiki/page-name`)
- **Version history** with revert support
- **Global search** (SQL `ILIKE`; ready to swap for Algolia)
- **Infobox** components for game stats (items, bosses, maps)
- Dark, high-fantasy/sci-fi theme

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure database**

   Copy `.env.example` to `.env` and set your PostgreSQL URL:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/game_wiki?schema=public"
   ```

3. **Initialize database**

   ```bash
   npm run db:generate
   npm run db:push
   npx prisma db seed
   ```

4. **Run dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). You’ll be redirected to `/wiki`.

## Project structure

- `app/wiki/[slug]` – Page view (ISR)
- `app/wiki/[slug]/edit` – Edit page
- `app/wiki/[slug]/history` – Revision history & revert
- `app/wiki/search` – Search results
- `components/wiki` – Infobox, Editor, MarkdownRenderer, RevisionHistory
- `lib` – `prisma.ts`, `markdown-parser.ts` (Wikilink preprocessing)
- `prisma/schema.prisma` – Page, Revision, Category, Media

## Wikilinks

In markdown, use `[[Page Title]]` to link to `/wiki/page-title`. Optional display text: `[[Page Title|Custom label]]`.
