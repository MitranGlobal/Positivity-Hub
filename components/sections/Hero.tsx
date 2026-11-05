"use client";

import { motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { WavyBackground } from "@/components/ui/wavy-background";
import { hero, site } from "@/lib/content";
import { useLightbox } from "@/store/lightbox";
import { useGate } from "@/store/gate";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

// MiTran gold range for the waves, on the black stage.
const WAVE_COLORS = ["#e9c46a", "#c99b3a", "#f5d17a", "#8a6a1f", "#5a4512"];

/**
 * Opens on the parent's question, not the product, following the start of the
 * Positivity Hub VSL. The waves stay in the background.
 */
export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const openLightbox = useLightbox((s) => s.open);
  const lightboxOpen = useLightbox((s) => s.content !== null);
  const gateOpen = useGate((s) => s.open);

  const rise = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  });

  const [ask, world] = hero.question;

  return (
    <section id="top" aria-label="Introduction" className="bg-stage">
      <WavyBackground
        containerClassName="h-auto min-h-[100svh] items-stretch justify-start bg-stage pt-[72px]"
        className="flex w-full flex-1 flex-col"
        colors={WAVE_COLORS}
        backgroundFill="#08090c"
        waveOpacity={0.45}
        waveWidth={46}
        blur={10}
        speed="slow"
        paused={lightboxOpen || gateOpen}
      >
        {/* Soft wash keeps the copy legible where the waves pass behind it. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_50%,rgba(8,9,12,0.88)_0%,rgba(8,9,12,0.6)_55%,rgba(8,9,12,0.15)_100%)]" aria-hidden="true" />

        <div className="container relative flex flex-1 flex-col items-center justify-center pb-16 pt-10 text-center sm:pt-14">
          <div className="mx-auto flex max-w-[52rem] flex-col items-center">
            <motion.p {...rise(0)} className="flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold sm:text-[15px]">
              <span className="hidden h-px w-8 shrink-0 bg-gold/70 sm:block" aria-hidden="true" />
              {hero.audience}
              <span className="hidden h-px w-8 shrink-0 bg-gold/70 sm:block" aria-hidden="true" />
            </motion.p>

            <h1 className="mt-6 font-display text-[clamp(1.75rem,5vw,3.75rem)] leading-[1.08] tracking-[-0.015em] text-ivory" style={{ textWrap: "balance" }}>
              <motion.span {...rise(1)} className="block">
                {ask}
              </motion.span>
              <motion.span {...rise(2)} className="block text-gold">
                {world}
              </motion.span>
            </h1>

            {/* The two patterns parents notice: effort on one side, the drop on the other. */}
            <motion.ul {...rise(3)} className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-0" aria-label="What parents notice">
              {hero.signs.map(([effort, drop], i) => (
                <li key={effort} className={`flex flex-wrap items-baseline justify-center gap-x-2 font-display text-lg sm:text-xl ${i > 0 ? "sm:border-l sm:border-gold/40 sm:pl-6" : "sm:pr-6"}`}>
                  <span className="whitespace-nowrap text-ivory/60">{effort}</span>
                  <span className="whitespace-nowrap text-ivory">{drop}</span>
                </li>
              ))}
            </motion.ul>

            <motion.p {...rise(4)} className="mt-7 max-w-[36rem] text-base leading-relaxed text-ivory/80 sm:text-lg" style={{ textWrap: "pretty" }}>
              {hero.lead}
            </motion.p>

            <motion.div {...rise(5)} className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a data-cta href="#challenges" className="btn-primary">
                {hero.cta}
                <Icon name="arrow-right" className="h-4 w-4 rotate-90" />
              </a>
              {/* "Watch trailer" is hidden while site.showTrailer is false. */}
              {site.showTrailer && (
                <button type="button" className="btn-ghost border-white/25 text-ivory hover:border-white/60 hover:bg-white/10" onClick={() => openLightbox({ kind: "trailer", title: "Course trailer" })}>
                  <Icon name="play" className="h-4 w-4" />
                  Watch trailer
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </WavyBackground>
    </section>
  );
}
