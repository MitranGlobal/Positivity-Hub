import Reveal from "@/components/ui/Reveal";
import { struggles } from "@/lib/content";

export default function Struggles() {
  return (
    <section aria-labelledby="struggles-title" className="section">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="struggles-title" className="section-title">
            {struggles.title}
          </h2>
          <p className="section-lead">{struggles.lead}</p>
        </Reveal>
        <Reveal as="ul" stagger className="divide-y divide-mist-line border-y border-mist-line">
          {struggles.items.map((s) => (
            <li key={s.q} className="grid gap-2 py-7 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-8 sm:py-9">
              <h3 className="font-display text-display-md text-ink">{s.q}</h3>
              <p className="leading-relaxed text-ink-soft sm:pt-1.5">{s.a}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
