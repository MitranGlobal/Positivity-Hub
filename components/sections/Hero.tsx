"use client";

import { motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { WavyBackground } from "@/components/ui/wavy-background";
import { hero } from "@/lib/content";
import { useLightbox } from "@/store/lightbox";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

// Brand palette for the waves: lagoon, marigold, sea-glass, blush, deep lagoon.
const WAVE_COLORS = ["#2F7F7A", "#F5B83D", "#9CC9C2", "#F6D3C4", "#1F5C58"];

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const openLightbox = useLightbox((s) => s.open);
  const lightboxOpen = useLightbox((s) => s.content !== null);

  const rise = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="top" aria-label="Introduction">
      <WavyBackground
        containerClassName="h-auto min-h-[100svh] items-stretch justify-start pt-[72px]"
        className="flex w-full flex-1 flex-col"
        colors={WAVE_COLORS}
        backgroundFill="#EEF3F1"
        waveOpacity={0.5}
        waveWidth={46}
        blur={10}
        speed="slow"
        paused={lightboxOpen}
      >
        {/* Soft wash keeps the copy legible where the waves pass behind it. */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(238,243,241,0.92)_0%,rgba(238,243,241,0.7)_45%,rgba(238,243,241,0)_80%)]" aria-hidden="true" />

        <div className="container relative flex flex-1 flex-col justify-center pb-10 pt-10 sm:pt-14 lg:pb-14">
          <div className="max-w-[40rem]">
            <motion.h1 {...rise(0)} className="font-display text-display-xl text-ink">
              <span className="block">{hero.title[0]}</span>
              <span className="block text-lagoon-deep">{hero.title[1]}</span>
            </motion.h1>
            <motion.p {...rise(1)} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ink-soft sm:text-xl">
              {hero.lead}
            </motion.p>
            <motion.ul {...rise(2)} className="mt-7 grid max-w-[34rem] grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {hero.practices.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[15px] text-ink">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lagoon/15 text-lagoon-deep">
                    <Icon name="check" className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </motion.ul>
            <motion.div {...rise(3)} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#pricing" className="btn-primary shadow-glow">
                Join the journey
              </a>
              <button type="button" className="btn-ghost bg-white/60" onClick={() => openLightbox({ kind: "trailer", title: "Course trailer" })}>
                <Icon name="play" className="h-4 w-4" />
                Watch trailer
              </button>
            </motion.div>
            <motion.div {...rise(4)} className="mt-10">
              <p className="text-sm text-ink-soft">{hero.proofLabel}</p>
              <dl className="mt-3 flex flex-wrap gap-x-10 gap-y-4">
                {hero.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-3xl text-ink">{s.value}</dd>
                    <dd className="text-sm text-ink-soft">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>

        <div className="container relative pb-6">
          <ul className="grid gap-px overflow-hidden rounded-panel border border-mist-line bg-mist-line sm:grid-cols-3">
            {hero.outcomes.map((o) => (
              <li key={o.title} className="bg-white/90 px-6 py-5">
                <p className="font-display text-xl text-ink">{o.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{o.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </WavyBackground>
    </section>
  );
}
