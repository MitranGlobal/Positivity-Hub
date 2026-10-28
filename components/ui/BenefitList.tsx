import Icon from "@/components/ui/Icon";
import type { BenefitGroup } from "@/lib/content";

/** Renders one or more benefit groups ("What your child receives", "Bonus"). */
export default function BenefitList({ groups, tone = "ink", compact = false }: { groups: BenefitGroup[]; tone?: "ink" | "light"; compact?: boolean }) {
  const dark = tone === "light";
  return (
    <div className="space-y-7">
      {groups.map((g) => (
        <div key={g.heading}>
          <p className={`mb-4 text-sm font-semibold ${dark ? "text-gold" : "text-gold-text"}`}>{g.heading}</p>
          <ul className="space-y-4">
            {g.items.map((b) => (
              <li key={b.title} className="flex items-start gap-3">
                <Icon name="check" className={`mt-0.5 h-5 w-5 shrink-0 ${dark ? "text-gold" : "text-gold-deep"}`} />
                <div className="min-w-0">
                  <p className="font-semibold">{b.title}</p>
                  {!compact && b.detail && <p className={`mt-1 text-sm leading-relaxed ${dark ? "text-ivory/70" : "text-ink-soft"}`}>{b.detail}</p>}
                  {!compact && b.list && (
                    <ul className={`mt-1 text-sm leading-relaxed ${dark ? "text-ivory/70" : "text-ink-soft"}`}>
                      {b.list.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
