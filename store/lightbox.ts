import { create } from "zustand";

type LightboxContent = { kind: "trailer"; title: string } | null;

type LightboxState = {
  content: LightboxContent;
  open: (content: NonNullable<LightboxContent>) => void;
  close: () => void;
};

export const useLightbox = create<LightboxState>((set) => ({
  content: null,
  open: (content) => set({ content }),
  close: () => set({ content: null }),
}));
