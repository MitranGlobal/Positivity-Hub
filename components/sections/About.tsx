"use client";

import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { about, site } from "@/lib/content";
import { useLightbox } from "@/store/lightbox";

const pillarIcons = ["spark", "people", "leaf"] as const;

function TrailerArt() {
  // Illustrated poster: sun rising over calm water.
  return (
    <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e1015" />
          <stop offset="0.62" stopColor="#5a4512" />
          <stop offset="1" stopColor="#c99b3a" />
        </linearGradient>
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12141a" />
          <stop offset="1" stopColor="#08090c" />
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(#sky)" />
      <circle cx="400" cy="292" r="96" fill="#e9c46a" />
      <circle cx="400" cy="292" r="150" fill="#e9c46a" opacity="0.18" />
      <rect y="290" width="800" height="160" fill="url(#sea)" />
      <g stroke="#e9c46a" strokeLinecap="round" opacity="0.75">
        <path d="M330 318h140" strokeWidth="6" />
        <path d="M352 342h96" strokeWidth="5" opacity="0.7" />
        <path d="M372 364h56" strokeWidth="4" opacity="0.5" />
      </g>
      <g stroke="#f5f4ef" strokeLinecap="round" opacity="0.25" strokeWidth="3">
        <path d="M80 380h120M560 360h160M620 410h90M120 420h60" />
      </g>
    </svg>
  );
}

export default function About() {
  const open = useLightbox((s) => s.open);

  return (
    <section id="about" className="section bg-gold text-ink">
      <div className="container">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-display-lg text-ink" style={{ textWrap: "balance" }}>
            {about.title}
          </h2>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink/75">{about.lead}</p>
        </Reveal>

        {/* Video block: hidden while site.showTrailer is false (code kept for later). */}
        {site.showTrailer && (
        <Reveal className="mt-12">
          <button
            type="button"
            onClick={() => open({ kind: "trailer", title: "Course trailer" })}
            className="group relative block aspect-[16/10] w-full overflow-hidden rounded-panel text-left sm:aspect-video"
            aria-label={`Watch the course trailer (${about.trailer.length})`}
          >
            <TrailerArt />
            <span className="absolute inset-0 bg-stage/10 transition-colors group-hover:bg-stage/0" />
            <span className="absolute left-1/2 top-[42%] grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lift transition-transform duration-300 group-hover:scale-105 sm:h-24 sm:w-24">
              <Icon name="play" className="ml-1 h-8 w-8" />
            </span>
            <span className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 sm:bottom-6 sm:left-6 sm:right-6">
              <span className="rounded-chip bg-white/90 px-3 py-1.5 text-sm font-medium text-ink">{about.trailer.length}</span>
              <span className="rounded-chip bg-white/90 px-3 py-1.5 text-sm font-medium text-ink">{about.trailer.reach}</span>
            </span>
          </button>
        </Reveal>
        )}

        <Reveal stagger className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {about.pillars.map((p, i) => (
            <div key={p.title}>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-stage text-gold">
                <Icon name={pillarIcons[i]} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 max-w-[34ch] leading-relaxed text-ink/75">{p.body}</p>
            </div>
          ))}
        </Reveal>

        <p className="mt-14 max-w-prose text-lg font-medium leading-relaxed text-ink">{about.closing}</p>
      </div>
    </section>
  );
}
