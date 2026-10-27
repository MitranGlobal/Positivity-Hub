import Icon from "@/components/ui/Icon";
import Price from "@/components/ui/Price";
import BenefitList from "@/components/ui/BenefitList";
import Reveal from "@/components/ui/Reveal";
import { plans, pricing } from "@/lib/content";

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

        <Reveal stagger className="mx-auto mt-14 grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
          {plans.map((plan) => {
            const dark = !!plan.featured;
            const href = plan.checkoutUrl || "#pricing";
            return (
              <article
                key={plan.id}
                aria-labelledby={`plan-${plan.id}`}
                className={`relative flex flex-col rounded-panel p-7 sm:p-9 ${dark ? "bg-ink text-white shadow-lift md:order-2" : "border border-mist-line bg-mist md:order-1"}`}
              >
                {dark && <span className="absolute -top-3.5 left-7 rounded-full bg-marigold px-3.5 py-1 text-sm font-semibold text-ink sm:left-9">Most popular</span>}
                <h3 id={`plan-${plan.id}`} className={`font-display text-display-md ${dark ? "text-white" : "text-ink"}`}>
                  {plan.name}
                </h3>
                <p className={`mt-2 md:min-h-[3rem] ${dark ? "text-white/70" : "text-ink-soft"}`}>{plan.tagline}</p>
                <div className="mt-6">
                  <Price price={plan.price} was={plan.was} tone={dark ? "light" : "ink"} />
                </div>
                <div className="h-8" aria-hidden="true" />
                <BenefitList groups={plan.groups} tone={dark ? "light" : "ink"} />
                {plan.notIncluded && (
                  <div className="mt-7">
                    <p className="mb-3 text-sm font-semibold text-ink-faint">{plan.notIncluded.heading}</p>
                    <ul className="space-y-2.5 text-ink-faint">
                      {plan.notIncluded.items.map((b) => (
                        <li key={b.title} className="flex items-start gap-3">
                          <span className="mt-[9px] h-px w-3 shrink-0 bg-current" aria-hidden="true" />
                          <span>
                            <span className="sr-only">Not included: </span>
                            {b.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="min-h-9 flex-1" aria-hidden="true" />
                <a href={href} className={`${dark ? "btn-primary" : "btn-ink"} w-full`} data-plan={plan.id}>
                  {plan.cta}
                </a>
              </article>
            );
          })}
        </Reveal>

        <div className="mt-10 text-center text-sm text-ink-soft">
          <p className="inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {pricing.assurances.map((a) => (
              <span key={a} className="inline-flex items-center gap-2">
                <Icon name="shield" className="h-4 w-4 text-lagoon" />
                {a}
              </span>
            ))}
          </p>
          <p className="mt-3">{pricing.closing}</p>
        </div>
      </div>
    </section>
  );
}
