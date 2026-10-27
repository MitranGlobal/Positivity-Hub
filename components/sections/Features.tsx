import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import { features } from "@/lib/content";

export default function Features() {
  return (
    <section aria-label="Why Positivity Hub" className="py-14 sm:py-20">
      <Reveal stagger className="container grid gap-10 sm:grid-cols-3 sm:gap-8">
        {features.map((f) => (
          <div key={f.title} className="border-t-2 border-ink pt-6">
            <Icon name={f.icon} className="h-7 w-7 text-lagoon" />
            <h2 className="mt-4 text-xl font-semibold text-ink">{f.title}</h2>
            <p className="mt-2 max-w-[32ch] leading-relaxed text-ink-soft">{f.body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
