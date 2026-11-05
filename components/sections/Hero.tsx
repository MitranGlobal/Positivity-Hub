"use client";

import { motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { WavyBackground } from "@/components/ui/wavy-background";
import { hero, site } from "@/lib/content";
import { useLightbox } from "@/store/lightbox";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

// MiTran gold range for the waves, on the black stage.
const WAVE_COLORS = ["#e9c46a", "#c99b3a", "#f5d17a", "#8a6a1f", "#5a4512"];

/**
 * Opens on the problem, not the product. The last line acts out the moment:
 * shortly after the page loads it blurs away, holds, then comes back into focus.
 */
export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const openLightbox = useLightbox((s) => s.open);
  const lightboxOpen = useLightbox((s) => s.content !== null);

  const rise = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  });

  const [first, second, blank] = hero.lines;

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
        paused={lightboxOpen}
      >
        {/* Soft wash keeps the copy legible where the waves pass behind it. */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_50%,rgba(8,9,12,0.88)_0%,rgba(8,9,12,0.6)_55%,rgba(8,9,12,0.15)_100%)]" aria-hidden="true" />

        <div className="container relative flex flex-1 flex-col items-center justify-center pb-16 pt-10 text-center sm:pt-14">
          <div className="mx-auto flex max-w-[52rem] flex-col items-center">
            <motion.p {...rise(0)} className="flex max-w-[48rem] items-center justify-center gap-3 text-base text-ivory/75 sm:text-lg">
              <span className="hidden h-px w-8 shrink-0 bg-gold sm:block" aria-hidden="true" />
              {hero.audience}
              <span className="hidden h-px w-8 shrink-0 bg-gold sm:block" aria-hidden="true" />
            </motion.p>

            <h1 className="mt-6 font-display text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[1.12] tracking-[-0.015em] text-ivory">
              <motion.span {...rise(1)} className="block">
                {first}
              </motion.span>
              <motion.span {...rise(2)} className="block">
                {second}
              </motion.span>
              <motion.span {...rise(3)} className="block">
                <motion.span
                  className="inline-block"
                  animate={
                    reduced
                      ? undefined
                      : { filter: ["blur(0px)", "blur(0px)", "blur(14px)", "blur(14px)", "blur(0px)"], opacity: [1, 1, 0.12, 0.12, 1] }
                  }
                  transition={{ duration: 3.4, delay: 1.4, times: [0, 0.2, 0.42, 0.72, 1], ease: "easeInOut" }}
                >
                  {blank}
                </motion.span>
              </motion.span>
            </h1>

            <motion.p {...rise(4)} className="mt-7 max-w-[38rem] text-base leading-relaxed text-ivory/80 sm:text-lg" style={{ textWrap: "pretty" }}>
              {hero.lead}
            </motion.p>

            <motion.div {...rise(5)} className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="#why" className="btn-primary">
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
