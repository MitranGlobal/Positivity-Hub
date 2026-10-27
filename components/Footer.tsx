import Logo from "@/components/ui/Logo";
import { helpline, nav, site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white">
      <div className="container py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-display-lg" style={{ textWrap: "balance" }}>
              Your calmer, steadier self starts with one step.
            </h2>
            <a href="#pricing" className="btn-primary mt-8">
              Join the journey
            </a>
          </div>
          <div className="rounded-panel border border-white/15 p-6 sm:p-8">
            <p className="font-semibold">Need to talk to someone now?</p>
            <p className="mt-2 leading-relaxed text-white/70">{helpline.note}</p>
            <p className="mt-4 flex flex-wrap gap-3">
              {helpline.numbers.map((n) => (
                <a key={n} href={`tel:${n.replace(/-/g, "")}`} className="rounded-full bg-white/10 px-4 py-2 font-semibold hover:bg-white/20">
                  {n}
                </a>
              ))}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="rounded-chip bg-mist px-3 py-2 self-start">
            <Logo />
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-white/80">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white">
                {n.label}
              </a>
            ))}
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
          </nav>
        </div>
        <p className="mt-8 max-w-prose text-sm leading-relaxed text-white/55">
          {site.name} is an educational wellbeing course and is not a substitute for diagnosis or treatment by a qualified mental health professional.
        </p>
        <p className="mt-3 text-sm text-white/55">
          © {year} {site.by}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
