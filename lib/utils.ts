import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn/ui-style class name helper (used by Aceternity UI components). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
