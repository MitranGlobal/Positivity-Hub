"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content";

const avatarTones = ["bg-gold text-ink", "bg-stage text-ivory", "bg-mist-deep text-ink", "bg-gold-deep text-ink"];
const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

const slide = {
  enter: (d: number) => ({ opacity: 0, x: d * 40 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -40 }),
};

export default function Testimonials() {
  const items = testimonials.items;
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);

  const go = (next: number) => {
    const n = (next + items.length) % items.length;
    setState([n, next > index ? 1 : -1]);
  };
  const t = items[index];

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section">
      <div className="container">
        <Reveal className="max-w-3xl">
          <h2 id="reviews-title" className="section-title">
            {testimonials.title}
          </h2>
          <p className="section-lead">{testimonials.lead}</p>
        </Reveal>

        <div className="mt-12 rounded-panel bg-white p-6 shadow-lift sm:p-10 lg:p-14">
          <div className="grid" aria-live="polite">
            {/* Invisible sizer: reserves the height of the longest testimonial so the card never jumps. */}
            {items.map((it) => (
              <div key={it.name} className="invisible col-start-1 row-start-1" aria-hidden="true">
                <Quote item={it} tone={avatarTones[0]} />
              </div>
            ))}
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={t.name}
                className="col-start-1 row-start-1"
                custom={dir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(index + 1);
                  else if (info.offset.x > 60) go(index - 1);
                }}
              >
                <Quote item={t} tone={avatarTones[index % avatarTones.length]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-5 border-t border-mist-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a testimonial">
              {items.map((it, i) => (
                <button
                  key={it.name}
                  type="button"
                  onClick={() => go(i)}
                  aria-pressed={i === index}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    i === index ? "bg-ink text-ivory" : "bg-mist-deep text-ink-soft hover:text-ink"
                  }`}
                >
                  {it.name.split(" ")[0]}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(index - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 hover:border-ink" aria-label="Previous testimonial">
                <Icon name="arrow-left" />
              </button>
              <button type="button" onClick={() => go(index + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 hover:border-ink" aria-label="Next testimonial">
                <Icon name="arrow-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quote({ item, tone }: { item: (typeof testimonials.items)[number]; tone: string }) {
  return (
    <figure className="select-none">
      <blockquote className="text-[17px] leading-relaxed text-ink sm:font-display sm:text-[clamp(1.1rem,1.8vw,1.45rem)] sm:leading-[1.5]" style={{ textWrap: "pretty" }}>
        “{item.quote}”
      </blockquote>
      <figcaption className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
        <span className="flex items-center gap-3">
          {item.photo ? (
            <Image src={item.photo} alt={item.name} width={56} height={56} className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-gold shadow-md" />
          ) : (
            <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-full font-semibold ${tone}`} aria-hidden="true">
              {initials(item.name)}
            </span>
          )}
          <span>
            <span className="block font-semibold text-ink">{item.name}</span>
            <span className="block text-sm text-ink-soft">{item.role}</span>
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
