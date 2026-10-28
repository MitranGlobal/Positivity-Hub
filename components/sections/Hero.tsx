"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import phLogo from "@/public/positivity-hub-logo.png";
import Icon from "@/components/ui/Icon";
import { WavyBackground } from "@/components/ui/wavy-background";
import { hero, site } from "@/lib/content";
import { useLightbox } from "@/store/lightbox";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

// MiTran gold range for the waves, on the black stage.
const WAVE_COLORS = ["#e9c46a", "#c99b3a", "#f5d17a", "#8a6a1f", "#5a4512"];

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
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,12,0.88)_0%,rgba(8,9,12,0.6)_45%,rgba(8,9,12,0)_80%)]" aria-hidden="true" />

        <div className="container relative flex flex-1 flex-col justify-center pb-10 pt-10 sm:pt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12 lg:pb-14">
          <div className="max-w-[40rem]">
            <motion.div {...rise(0)} className="mb-5 lg:hidden">
              <Image src={phLogo} alt="MiTran Global #positivity hub, for ages 11 to 17" priority className="h-28 w-28 sm:h-32 sm:w-32" sizes="128px" />
            </motion.div>
            <motion.h1 {...rise(0)} className="font-display text-display-xl text-ivory">
              {hero.title}
            </motion.h1>
            <motion.p {...rise(1)} className="mt-6 max-w-[34rem] text-lg leading-relaxed text-ivory/80 sm:text-xl">
              {hero.lead}
            </motion.p>
            <motion.ul {...rise(2)} className="mt-7 grid max-w-[34rem] grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {hero.practices.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[15px] text-ivory">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
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
              {/* "Watch trailer" is hidden while site.showTrailer is false. */}
              {site.showTrailer && (
                <button type="button" className="btn-ghost border-white/25 text-ivory hover:border-white/60 hover:bg-white/10" onClick={() => openLightbox({ kind: "trailer", title: "Course trailer" })}>
                  <Icon name="play" className="h-4 w-4" />
                  Watch trailer
                </button>
              )}
            </motion.div>
            <motion.div {...rise(4)} className="mt-10">
              <p className="text-sm text-ivory/60">{hero.proofLabel}</p>
              <dl className="mt-3 flex flex-wrap gap-x-10 gap-y-4">
                {hero.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-3xl text-ivory">{s.value}</dd>
                    <dd className="text-sm text-ivory/60">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
          <motion.div {...rise(2)} className="hidden lg:block">
            <Image src={phLogo} alt="MiTran Global #positivity hub, for ages 11 to 17" priority className="h-auto w-[300px] drop-shadow-xl xl:w-[340px]" sizes="340px" />
          </motion.div>
        </div>

      </WavyBackground>
    </section>
  );
}
