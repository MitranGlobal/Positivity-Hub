import { formatINR } from "@/lib/content";

export default function Price({ price, was, size = "lg", tone = "ink" }: { price: number; was?: number; size?: "lg" | "xl"; tone?: "ink" | "light" }) {
  const save = was ? was - price : 0;
  const pct = was ? Math.round((save / was) * 100) : 0;
  const main = tone === "light" ? "text-white" : "text-ink";
  const muted = tone === "light" ? "text-white/60" : "text-ink-faint";
  return (
    <div>
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className={`font-display ${size === "xl" ? "text-6xl" : "text-5xl"} leading-none ${main}`}>{formatINR(price)}</span>
        {was && (
          <s className={`text-xl ${muted}`}>
            <span className="sr-only">was </span>
            {formatINR(was)}
          </s>
        )}
      </p>
      <p className={`mt-2 text-sm ${muted}`}>One-time payment</p>
      {was && (
        <p className={`mt-3 inline-flex rounded-chip px-2.5 py-1 text-sm font-semibold ${tone === "light" ? "bg-marigold text-ink" : "bg-marigold-soft text-ink"}`}>
          Save {formatINR(save)} ({pct}% off)
        </p>
      )}
    </div>
  );
}
