import CardMarquee from "@/components/ui/CardMarquee";
import Reveal from "@/components/ui/Reveal";
import { struggles } from "@/lib/content";

/** The everyday challenges: heading left, intro right, then a moving row of photo cards. */
export default function Struggles() {
  return (
    <section aria-labelledby="struggles-title" className="overflow-hidden py-20 sm:py-28">
      <Reveal className="container grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
        <h2 id="struggles-title" className="section-title max-w-[16ch]">
          {struggles.title}
        </h2>
        <p className="max-w-[34rem] text-lg leading-relaxed text-ink-soft lg:justify-self-end">{struggles.lead}</p>
      </Reveal>

      <div className="mt-12">
        <CardMarquee items={struggles.items} label="Everyday challenges teens face" />
      </div>
    </section>
  );
}
