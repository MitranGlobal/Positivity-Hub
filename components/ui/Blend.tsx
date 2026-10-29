/**
 * Soft hand-off between two sections.
 *
 * Sits at the very top of a section and starts in the previous section's
 * colour, easing into this section's colour. The many eased colour stops
 * make the edge read as a blur instead of a hard line. The section gives it
 * room with matching top padding (`blend-pad`), so text never sits on it.
 */

const colors = {
  stage: "#08090c",
  paper: "#f5f4ef",
  gold: "#e9c46a",
  // Top of the footer: black with its gold glow on top.
  footer: "#72591f",
} as const;
export type BlendColor = keyof typeof colors;

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
// Smooth ease-in-out so there is no visible start or end line.
const ease = (t: number) => t * t * (3 - 2 * t);

function gradient(from: BlendColor, to: BlendColor) {
  const a = hex(colors[from]);
  const b = hex(colors[to]);
  const stops = Array.from({ length: 13 }, (_, i) => {
    const t = i / 12;
    const k = ease(t);
    const rgb = a.map((v, j) => Math.round(v + (b[j] - v) * k));
    return `rgb(${rgb.join(",")}) ${Math.round(t * 100)}%`;
  });
  return `linear-gradient(to bottom, ${stops.join(", ")})`;
}

export default function Blend({ from, to }: { from: BlendColor; to: BlendColor }) {
  return <div aria-hidden="true" className="blend-band pointer-events-none absolute inset-x-0 top-0" style={{ background: gradient(from, to) }} />;
}
