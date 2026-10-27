type IconName = "clock" | "spark" | "people" | "check" | "play" | "close" | "menu" | "arrow-left" | "arrow-right" | "plus" | "shield" | "leaf" | "book";

const paths: Record<IconName, JSX.Element> = {
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  spark: <path d="M12 3.5l1.9 5.2 5.6.3-4.4 3.5 1.5 5.4L12 14.8l-4.6 3.1 1.5-5.4-4.4-3.5 5.6-.3z" />,
  people: (
    <>
      <circle cx="9" cy="9" r="3" />
      <circle cx="16.5" cy="10" r="2.3" />
      <path d="M3.5 19c.6-3 2.8-4.6 5.5-4.6s4.9 1.6 5.5 4.6M14.6 14.7c2.6-.5 5 .9 5.6 3.8" />
    </>
  ),
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  play: <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  menu: <path d="M4 8h16M4 16h16" />,
  "arrow-left": <path d="M15 5l-7 7 7 7" />,
  "arrow-right": <path d="M9 5l7 7-7 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  shield: <path d="M12 3.5l7 2.8v5.2c0 4.3-3 7.7-7 9-4-1.3-7-4.7-7-9V6.3z M8.8 12l2.3 2.3 4.2-4.4" />,
  leaf: <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14zM5 19l7-7" />,
  book: <path d="M12 6.5c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5m0-13c2-1.5 5-2 8-1.5v13c-3-.5-6 0-8 1.5m0-13v13" />,
};

export default function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
