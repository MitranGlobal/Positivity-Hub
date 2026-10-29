import Blend from "@/components/ui/Blend";
import Logo from "@/components/ui/Logo";
import { nav, site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-stage text-ivory">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-32 sm:top-44 bg-[linear-gradient(180deg,rgba(201,155,58,0.55)_0%,rgba(233,196,106,0.25)_35%,rgba(8,9,12,0.35)_65%,#000_100%)]" aria-hidden="true" />
      <Blend from="paper" to="footer" />
      <div className="container blend-pad relative pb-16 sm:pb-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-display-lg text-ivory [text-shadow:0_4px_40px_rgba(0,0,0,0.35)]" style={{ textWrap: "balance" }}>
            Your teen’s journey to confidence and emotional strength starts here.
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="self-start">
            <Logo onDark />
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-ivory/80">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-gold">
                {n.label}
              </a>
            ))}
            <a href="#pricing" className="hover:text-gold">
              Pricing
            </a>
          </nav>
        </div>
        <p className="mt-8 max-w-prose text-sm leading-relaxed text-ivory/55">
          {site.name} is an educational well-being program and is not a substitute for diagnosis or treatment by a qualified mental health professional.
        </p>
        <p className="mt-3 text-sm text-ivory/55">
          © {year} {site.by}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
