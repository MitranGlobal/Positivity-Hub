# Positivity Hub

Single-page site for the Positivity Hub online mental wellness course by Mitran Global.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS v3 — design tokens in `tailwind.config.ts`
- Aceternity UI Wavy Background — hero background (`components/ui/wavy-background.tsx`, canvas + `simplex-noise`)
- Framer Motion — nav, mobile drawer, testimonials, lightbox
- GSAP + ScrollTrigger — scroll reveals (`components/ui/Reveal.tsx`)
- Zustand — lightbox state (`store/lightbox.ts`)
- Vercel — deployment target

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
npm run typecheck
```

## Editing content

All copy, the price and the program benefits live in `lib/content.ts`.

Before launch, fill in:

- `site.registerUrl` — the checkout link used by every Register now / Enroll now button.
- `site.showTrailer` — the video block, "Watch trailer" button and trailer popup are hidden (`false`). Set to `true` to bring them back, and set `site.trailerSrc` to the video URL (or put `trailer.mp4` in `/public` and use `"/trailer.mp4"`).

## Deploy to Vercel

Import this repository at vercel.com/new. The defaults (Framework: Next.js, `npm run build`) work as-is; no environment variables are needed.

## Notes

- Respects `prefers-reduced-motion`: the hero waves render as a still frame, reveals and transitions are disabled.
- The wave animation pauses when the hero is off-screen or the trailer popup is open.
- `lib/utils.ts` provides the shadcn-style `cn()` helper Aceternity components expect. The project uses Tailwind v3 and has no `components.json`, so add further Aceternity/shadcn components by copying their files rather than with the shadcn CLI.
