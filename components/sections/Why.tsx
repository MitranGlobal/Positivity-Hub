import Reveal from "@/components/ui/Reveal";
import { why } from "@/lib/content";

/**
 * The root cause. A target-like diagram: the usual fixes sit on the outer ring,
 * the untrained skill sits in the gold core they never reach. Then the
 * escalation track shows the pressure growing year by year.
 */

// The four outside fixes sit on the dashed ring at its diagonals, so the
// labels stay inside the diagram's square at every width.
const ringSpots = [
  { left: "18.9%", top: "18.9%" },
  { left: "81.1%", top: "18.9%" },
  { left: "81.1%", top: "81.1%" },
  { left: "18.9%", top: "81.1%" },
];

function Core() {
  return (
    <div className="grid aspect-square w-full place-items-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_40%_30%,#f5d17a,#e9c46a_45%,#c99b3a)] p-[13%] text-center text-ink shadow-glow">
        <div>
          <p className="font-display text-lg leading-tight lg:text-xl">{why.insideTitle}</p>
          <ul className="mt-3 space-y-1.5 text-[13px] font-medium leading-snug lg:text-sm">
            {why.inside.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="section relative overflow-hidden bg-stage text-ivory">
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <h2 id="why-title" className="font-display text-display-lg text-ivory" style={{ textWrap: "balance" }}>
              {why.title}
            </h2>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-ivory/75">{why.lead}</p>
            <p className="mt-8 max-w-prose border-l-2 border-gold pl-5 text-lg leading-relaxed text-ivory">{why.relief}</p>
          </Reveal>

          {/* Desktop and tablet: the target diagram */}
          <Reveal className="relative mx-auto hidden aspect-square w-full max-w-[480px] sm:block">
            <div className="absolute inset-[6%] rounded-full border border-dashed border-ivory/25" aria-hidden="true" />
            <div className="absolute inset-[17%] rounded-full border border-ivory/10" aria-hidden="true" />
            <ul aria-label="What most fixes work on">
              {why.outside.map((t, i) => (
                <li key={t} style={ringSpots[i]} className="absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-ivory/20 bg-stage-card px-4 py-2 text-sm text-ivory/70">
                  {t}
                </li>
              ))}
            </ul>
            <div className="absolute inset-[20%]">
              <Core />
            </div>
          </Reveal>

          {/* Phones: the same idea, stacked */}
          <Reveal className="sm:hidden">
            <p className="text-sm text-ivory/60">What most fixes work on</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {why.outside.map((t) => (
                <li key={t} className="rounded-full border border-ivory/20 bg-stage-card px-4 py-2 text-sm text-ivory/70">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mx-auto mt-8 w-[min(100%,320px)]">
              <Core />
            </div>
          </Reveal>
        </div>

        {/* Escalation: the same untrained skill meets bigger pressure every year */}
        <Reveal className="mt-20 sm:mt-24">
          <h3 className="font-display text-display-md text-ivory">{why.escalationTitle}</h3>
          <ol className="relative mt-10 grid gap-8 sm:grid-cols-4 sm:gap-4">
            <span className="absolute left-[11px] top-3 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-ivory/20 to-gold sm:left-3 sm:right-3 sm:top-[11px] sm:h-px sm:w-auto sm:bg-gradient-to-r" aria-hidden="true" />
            {why.escalation.map((e, i) => {
              const size = [10, 14, 18, 24][i];
              const glow = ["", "", "shadow-[0_0_20px_rgba(233,196,106,0.35)]", "shadow-[0_0_32px_rgba(233,196,106,0.55)]"][i];
              return (
                <li key={e.what} className="relative flex gap-5 sm:block">
                  <span className="grid h-6 w-6 shrink-0 place-items-center" aria-hidden="true">
                    <span className={`block rounded-full bg-gold ${glow}`} style={{ width: size, height: size, opacity: 0.45 + i * 0.18 }} />
                  </span>
                  <div className="sm:mt-5">
                    <p className="text-sm text-ivory/55">{e.when}</p>
                    <p className="mt-1 text-lg font-semibold text-ivory sm:text-xl">{e.what}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
