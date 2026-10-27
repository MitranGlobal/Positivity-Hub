# Positivity Hub

Single-page site for the Positivity Hub online mental wellness course by Mitran Global.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS v3 — design tokens in `tailwind.config.ts`
- Aceternity UI Wavy Background — hero background (`components/ui/wavy-background.tsx`, canvas + `simplex-noise`)
- Framer Motion — nav, mobile drawer, testimonials, lightbox, quiz transitions
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

All copy, prices and plan benefits live in `lib/content.ts`.

Before launch, fill in:

- `plans[].checkoutUrl` — the payment link for each plan (e.g. a Razorpay payment page). Until set, the plan buttons stay on the pricing section.
- `site.trailerSrc` — the trailer video URL (or put `trailer.mp4` in `/public` and use `"/trailer.mp4"`). Until set, "Watch trailer" shows a "coming soon" panel.
- `testimonials.items` — replace with verified reviews from real participants.

## Deploy to Vercel

Import this repository at vercel.com/new. The defaults (Framework: Next.js, `npm run build`) work as-is; no environment variables are needed.

## Notes

- Respects `prefers-reduced-motion`: the hero waves render as a still frame, reveals and transitions are disabled.
- The wave animation pauses when the hero is off-screen or the trailer popup is open.
- `lib/utils.ts` provides the shadcn-style `cn()` helper Aceternity components expect. The project uses Tailwind v3 and has no `components.json`, so add further Aceternity/shadcn components by copying their files rather than with the shadcn CLI.
