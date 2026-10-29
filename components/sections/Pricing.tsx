import Blend from "@/components/ui/Blend";
import Price from "@/components/ui/Price";
import BenefitList from "@/components/ui/BenefitList";
import Reveal from "@/components/ui/Reveal";
import { plan, pricing, site } from "@/lib/content";

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section blend-pad relative bg-gold">
      <Blend from="paper" to="gold" />
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="pricing-title" className="section-title">
            {pricing.title}
          </h2>
          <p className="section-lead mx-auto text-ink/75">{pricing.lead}</p>
        </Reveal>

        <Reveal className="mx-auto mt-14 max-w-xl">
          <article aria-labelledby="plan-title" className="rounded-panel bg-white p-7 text-ink shadow-[0_40px_80px_-40px_rgba(8,9,12,0.45)] sm:p-10">
            <h3 id="plan-title" className="font-display text-display-md text-ink">
              {plan.name}
            </h3>
            <p className="mt-2 text-ink-soft">{plan.tagline}</p>
            <div className="mt-6">
              <Price price={plan.price} was={plan.was} tone="ink" />
            </div>
            <div className="h-8" aria-hidden="true" />
            <BenefitList groups={plan.groups} tone="ink" />
            <a href={site.registerUrl} className="btn-ink mt-10 w-full">
              {plan.cta}
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
