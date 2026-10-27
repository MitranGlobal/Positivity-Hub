import Icon from "@/components/ui/Icon";
import Price from "@/components/ui/Price";
import Reveal from "@/components/ui/Reveal";
import { curriculum, plans } from "@/lib/content";

export default function Curriculum() {
  const featured = plans.find((p) => p.featured)!;
  return (
    <section id="course" aria-labelledby="course-title" className="section bg-white">
      <div className="container">
        <Reveal className="max-w-3xl">
          <h2 id="course-title" className="section-title">
            {curriculum.title}
          </h2>
          <p className="section-lead">{curriculum.lead}</p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:gap-14">
          <Reveal as="ol" stagger className="space-y-3">
            {curriculum.modules.map((m, i) => (
              <li key={m.title} className="flex flex-col gap-1.5 rounded-tile bg-mist px-5 py-5 sm:flex-row sm:gap-5 sm:px-7 sm:py-6">
                <span className="shrink-0 pt-0.5 text-sm sm:w-16 font-semibold text-lagoon-deep">Module {i + 1}</span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-ink sm:text-xl">{m.title}</h3>
                  <p className="mt-1 leading-relaxed text-ink-soft">{m.body}</p>
                </div>
              </li>
            ))}
          </Reveal>

          <aside aria-label="Course price" className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-panel bg-ink p-7 text-white shadow-lift sm:p-9">
              <p className="text-white/70">{featured.name}, all five modules</p>
              <div className="mt-4">
                <Price price={featured.price} was={featured.was} tone="light" />
              </div>
              <ul className="mt-7 space-y-3">
                {["Lifetime access", "Certificate included", "24/7 support"].map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <Icon name="check" className="h-5 w-5 shrink-0 text-marigold" />
                    {b}
                  </li>
                ))}
              </ul>
              <a href="#pricing" className="btn-primary mt-8 w-full">
                Start your journey
              </a>
              <p className="mt-4 flex items-center justify-center gap-2 text-sm text-white/70">
                <Icon name="shield" className="h-4 w-4" />
                30-day money-back guarantee
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
