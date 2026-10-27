"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { hero } from "@/lib/content";
import { breathState } from "@/lib/breath";
import { useLightbox } from "@/store/lightbox";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

const BreathingOrb = dynamic(() => import("@/components/three/BreathingOrb"), {
  ssr: false,
  loading: () => <CssOrb />,
});

function CssOrb() {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className="aspect-square w-[52%] animate-breathe rounded-full bg-[radial-gradient(circle_at_35%_30%,#FFE3A3,#F5B83D_55%,#E0912A)] shadow-glow" />
    </div>
  );
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function BreathCaption({ still }: { still: boolean }) {
  const [state, setState] = useState<{ phase: "in" | "out"; remaining: number }>({ phase: "in", remaining: 4 });
  useEffect(() => {
    if (still) return;
    const id = window.setInterval(() => {
      const s = breathState();
      setState((prev) => (prev.phase === s.phase && prev.remaining === s.remaining ? prev : { phase: s.phase, remaining: s.remaining }));
    }, 200);
    return () => window.clearInterval(id);
  }, [still]);

  if (still) {
    return <p className="text-sm text-ink-soft">Take one slow breath before you scroll.</p>;
  }
  return (
    <p className="text-sm text-ink-soft" aria-hidden="true">
      <span className="font-semibold text-ink">{state.phase === "in" ? "Breathe in" : "Breathe out"}</span>
      <span className="ml-2 inline-block w-4 tabular-nums">{state.remaining}</span>
    </p>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const openLightbox = useLightbox((s) => s.open);
  const lightboxOpen = useLightbox((s) => s.content !== null);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [active, setActive] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => setWebgl(hasWebGL()), []);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const rise = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_72%_38%,rgba(47,127,122,0.14),transparent_72%)]" aria-hidden="true" />
      <div className="container relative grid items-center gap-4 pb-14 pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pb-20 lg:pt-14">
        <div className="order-2 lg:order-1">
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
            <button type="button" className="btn-ghost" onClick={() => openLightbox({ kind: "trailer", title: "Course trailer" })}>
              <Icon name="play" className="h-4 w-4" />
              Watch trailer
            </button>
          </motion.div>
          <motion.div {...rise(4)} className="mt-10">
            <p className="text-sm text-ink-faint">{hero.proofLabel}</p>
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

        <div className="order-1 flex flex-col items-center lg:order-2">
          <div ref={stageRef} className="relative aspect-square w-full max-w-[230px] sm:max-w-[340px] lg:max-w-[520px]">
            {webgl ? <BreathingOrb still={reduced} active={active && !lightboxOpen} /> : <CssOrb />}
          </div>
          <div className="-mt-2 text-center lg:-mt-6">
            <BreathCaption still={reduced} />
          </div>
        </div>
      </div>

      <div className="container relative pb-6">
        <ul className="grid gap-px overflow-hidden rounded-panel border border-mist-line bg-mist-line sm:grid-cols-3">
          {hero.outcomes.map((o) => (
            <li key={o.title} className="bg-white/80 px-6 py-5 backdrop-blur-sm">
              <p className="font-display text-xl text-ink">{o.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{o.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
