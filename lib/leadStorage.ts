import { LEAD_STORAGE_KEY } from "@/lib/lead";

/** Browser-only helpers: whether this visitor already signed up on this device. */
export function hasSignedUp() {
  try {
    return window.localStorage.getItem(LEAD_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

export function rememberSignUp() {
  try {
    window.localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify({ at: new Date().toISOString() }));
  } catch {
    /* Private mode or blocked storage: they'll see the popup again next time. */
  }
}
