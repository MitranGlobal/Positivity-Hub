export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Positivity Hub, back to top">
      <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="#17324D" />
        <circle cx="16" cy="18.5" r="6.5" fill="#F5B83D" />
        <path d="M5 20.5h22" stroke="#EEF3F1" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[19px] text-ink">Positivity Hub</span>
        <span className="mt-0.5 block text-[11px] font-medium text-ink-faint">by Mitran Global</span>
      </span>
    </a>
  );
}
