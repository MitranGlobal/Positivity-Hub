import { create } from "zustand";

/** Whether the sign-up popup is currently covering the page. */
export const useGate = create<{ open: boolean; setOpen: (open: boolean) => void }>((set) => ({
  open: true,
  setOpen: (open) => set({ open }),
}));
