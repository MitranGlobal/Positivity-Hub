import { site } from "@/lib/content";

/** Shared clock origin so the 3D orb and the text caption breathe in sync. */
const origin = typeof performance !== "undefined" ? performance.now() : 0;
const { inhale, exhale } = site.breath;
export const BREATH_CYCLE = inhale + exhale;

const ease = (t: number) => 0.5 - Math.cos(Math.PI * t) / 2;

/** Returns phase and a 0..1 "fullness" of the lungs at the current moment. */
export function breathState(now = performance.now()) {
  const t = ((now - origin) / 1000) % BREATH_CYCLE;
  if (t < inhale) return { phase: "in" as const, fill: ease(t / inhale), remaining: Math.ceil(inhale - t) };
  const e = (t - inhale) / exhale;
  return { phase: "out" as const, fill: 1 - ease(e), remaining: Math.ceil(exhale - (t - inhale)) };
}
