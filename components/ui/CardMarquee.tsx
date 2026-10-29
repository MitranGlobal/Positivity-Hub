import Image from "next/image";
import type { CardShape } from "@/lib/content";

type Item = { q: string; a: string; image: string; shape: CardShape };

// Card widths follow each photo's shape so nothing gets awkwardly cropped.
const widths: Record<CardShape, string> = {
  wide: "w-[80vw] sm:w-[480px] lg:w-[560px]",
  tall: "w-[70vw] sm:w-[300px] lg:w-[320px]",
  square: "w-[76vw] sm:w-[400px] lg:w-[420px]",
};
const sizes: Record<CardShape, string> = {
  wide: "(min-width: 1024px) 560px, (min-width: 640px) 480px, 80vw",
  tall: "(min-width: 1024px) 320px, (min-width: 640px) 300px, 70vw",
  square: "(min-width: 1024px) 420px, (min-width: 640px) 400px, 76vw",
};

/**
 * Endless, always-moving row of photo cards with a text overlay
 * (adapted from the MiTran Global Parent Live Sessions page).
 * The row is rendered twice so the loop is seamless; it pauses while
 * someone hovers or tabs into it so the text can be read.
 */
export default function CardMarquee({ items, label }: { items: Item[]; label: string }) {
  // With only a few items, repeat them so one copy of the row is always wider than the screen.
  const loop = items.length < 6 ? [...items, ...items] : items;

  const row = (hidden: boolean) => (
    <ul className="flex gap-5 pr-5" aria-hidden={hidden || undefined}>
      {loop.map((item, i) => {
        const dup = hidden || i >= items.length;
        return (
          <li
            key={`${item.q}-${i}`}
            className={`relative h-[400px] shrink-0 overflow-hidden rounded-[20px] bg-stage sm:h-[380px] ${widths[item.shape]}`}
            aria-hidden={dup || undefined}
          >
            <Image src={item.image} alt="" fill sizes={sizes[item.shape]} className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/5" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
              <h3 className="max-w-[22ch] font-display text-[22px] leading-tight text-ivory md:text-2xl">{item.q}</h3>
              <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-ivory/85">{item.a}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div role="region" aria-label={label} className="group">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
