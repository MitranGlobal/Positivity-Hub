import Image from "next/image";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import phLogo from "@/public/positivity-hub-logo.png";
import { program } from "@/lib/content";

/** Positivity Hub, introduced only after the problem, the cause and the approach. */
export default function Program() {
  return (
    <section id="programme" aria-labelledby="programme-title" className="section relative overflow-hidden bg-stage text-ivory">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_25%_45%,rgba(233,196,106,0.16),transparent_70%)]" aria-hidden="true" />
      <div className="container relative grid items-center gap-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-20">
        <Reveal className="mx-auto lg:mx-0">
          <div className="relative grid place-items-center">
            <span className="absolute inset-[-14%] animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-gold/40" aria-hidden="true" />
            <Image src={phLogo} alt="MiTran Global #positivity hub, for ages 11 to 17" className="relative h-auto w-[220px] drop-shadow-2xl sm:w-[280px] lg:w-[340px]" sizes="(min-width: 1024px) 340px, 280px" />
          </div>
        </Reveal>

        <Reveal>
          <p className="text-lg text-gold-bright">{program.bridge}</p>
          <h2 id="programme-title" className="mt-3 font-display text-display-lg text-ivory" style={{ textWrap: "balance" }}>
            {program.name}
          </h2>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ivory/80">{program.lead}</p>

          <ul className="mt-8 grid max-w-[36rem] grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {program.practices.map((p) => (
              <li key={p} className="flex items-center gap-3 text-ivory">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                  <Icon name="check" className="h-3.5 w-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-8 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-ivory/60">{program.proofLabel}</p>
              <dl className="mt-3 flex flex-wrap gap-x-10 gap-y-4">
                {program.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-3xl text-ivory">{s.value}</dd>
                    <dd className="text-sm text-ivory/60">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <a href="#pricing" className="btn-primary self-start sm:self-auto">
              {program.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
