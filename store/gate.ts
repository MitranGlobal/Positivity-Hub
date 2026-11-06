import { create } from "zustand";

/**
 * Sign-up popup state. It opens when a visitor clicks a CTA (any link marked
 * `data-cta`) and remembers where that CTA was going, so the visitor can be
 * sent there after they submit. Buttons that aren't links (the VSL's play
 * button) pass an `onDone` action instead, which runs after a successful
 * sign-up.
 */
type GateState = {
  open: boolean;
  /** The clicked CTA's link (a URL or an on-page #anchor). */
  target: string | null;
  /** Runs after a successful sign-up, instead of following a link. */
  onDone: (() => void) | null;
  /** The element that opened the popup, so focus can go back to it. */
  opener: HTMLElement | null;
  openFor: (target: string | null, opts?: { onDone?: () => void; opener?: HTMLElement | null }) => void;
  close: () => void;
};

export const useGate = create<GateState>((set) => ({
  open: false,
  target: null,
  onDone: null,
  opener: null,
  openFor: (target, opts) => set({ open: true, target, onDone: opts?.onDone ?? null, opener: opts?.opener ?? null }),
  close: () => set({ open: false }),
}));
