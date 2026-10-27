import Price from "@/components/ui/Price";
import BenefitList from "@/components/ui/BenefitList";
import Reveal from "@/components/ui/Reveal";
import { plan, pricing, site } from "@/lib/content";

export default function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section bg-white">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 id="pricing-title" className="section-title">
            {pricing.title}
          </h2>
          <p className="section-lead mx-auto">{pricing.lead}</p>
        </Reveal>

        <Reveal className="mx-auto mt-14 max-w-xl">
          <article aria-labelledby="plan-title" className="rounded-panel bg-ink p-7 text-white shadow-lift sm:p-10">
            <h3 id="plan-title" className="font-display text-display-md text-white">
              {plan.name}
            </h3>
            <p className="mt-2 text-white/70">{plan.tagline}</p>
            <div className="mt-6">
              <Price price={plan.price} was={plan.was} tone="light" />
            </div>
            <div className="h-8" aria-hidden="true" />
            <BenefitList groups={plan.groups} tone="light" />
            <a href={site.registerUrl} className="btn-primary mt-10 w-full">
              {plan.cta}
            </a>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
