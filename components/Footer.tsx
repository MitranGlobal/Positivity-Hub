import Logo from "@/components/ui/Logo";
import { nav, site } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white">
      <div className="container py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-display-lg" style={{ textWrap: "balance" }}>
            Your calmer, steadier self starts with one step.
          </h2>
          <a href="#pricing" className="btn-primary mt-8">
            Join the journey
          </a>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="self-start rounded-chip bg-white px-4 py-2">
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
          {site.name} is an educational well-being programme and is not a substitute for diagnosis or treatment by a qualified mental health professional.
        </p>
        <p className="mt-3 text-sm text-white/55">
          © {year} {site.by}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
