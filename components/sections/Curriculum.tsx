import Icon from "@/components/ui/Icon";
import Price from "@/components/ui/Price";
import BenefitList from "@/components/ui/BenefitList";
import Reveal from "@/components/ui/Reveal";
import { curriculum, plans, site } from "@/lib/content";

export default function Curriculum() {
  const featured = plans.find((p) => p.featured)!;
  return (
    <section id="course" aria-labelledby="course-title" className="section bg-white">
      <div className="container">
        <Reveal className="max-w-3xl">
          <h2 id="course-title" className="section-title">
            {curriculum.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:gap-14">
          <Reveal className="lg:self-start">
            <div className="rounded-panel bg-mist p-7 sm:p-10">
              <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
                {curriculum.paragraphs.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
              <div className="mt-8 space-y-3 border-t border-mist-line pt-7">
                {curriculum.emphasis.map((t) => (
                  <p key={t} className="font-display text-xl leading-snug text-ink sm:text-2xl">
                    {t}
                  </p>
                ))}
              </div>
              <a href={site.registerUrl} className="btn-ink mt-8">
                Register now
              </a>
            </div>
          </Reveal>

          <aside aria-label="Course price" className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-panel bg-ink p-7 text-white shadow-lift sm:p-9">
              <p className="text-white/70">{featured.name}</p>
              <div className="mt-4">
                <Price price={featured.price} was={featured.was} tone="light" />
              </div>
              <div className="mt-7">
                <BenefitList groups={featured.groups} tone="light" compact />
              </div>
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
