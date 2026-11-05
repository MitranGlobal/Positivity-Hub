import { create } from "zustand";

/**
 * Sign-up popup state. It opens when a visitor clicks a CTA (any link marked
 * `data-cta`) and remembers where that CTA was going, so the visitor can be
 * sent there after they submit.
 */
type GateState = {
  open: boolean;
  /** The clicked CTA's link (a URL or an on-page #anchor). */
  target: string | null;
  openFor: (target: string) => void;
  close: () => void;
};

export const useGate = create<GateState>((set) => ({
  open: false,
  target: null,
  openFor: (target) => set({ open: true, target }),
  close: () => set({ open: false }),
}));
