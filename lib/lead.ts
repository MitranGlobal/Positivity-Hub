/**
 * Visitor details collected by the sign-up popup (components/LeadGate.tsx).
 * The same rules run in the browser (instant feedback) and on the server
 * (app/api/leads/route.ts), so nothing invalid is ever forwarded.
 */

export type LeadInput = {
  childName: string;
  parentName: string;
  mobile: string;
  email: string;
};

export type LeadField = keyof LeadInput;
export type LeadErrors = Partial<Record<LeadField, string>>;

/** Key in localStorage that remembers a visitor has already signed up. */
export const LEAD_STORAGE_KEY = "ph_lead_v1";

const NAME = /^[\p{L}\p{M}][\p{L}\p{M} .'-]{1,59}$/u;
// No spaces or quotes, and it can't start with = + - @ (spreadsheet formula injection
// if the destination is a Google Sheet or CSV export).
const EMAIL = /^(?![=+\-@])[^\s@"'<>()]+@[^\s@"'<>()]+\.[^\s@"'<>()]{2,}$/;

/**
 * Indian numbers can be typed as 10 digits (98765 43210), with a leading 0,
 * or with 91 / +91. Anything else must be international: + then 8–15 digits.
 * Returns the number in +<country><number> form, or null when it is invalid.
 */
export function normaliseMobile(raw: string): string | null {
  const trimmed = raw.trim();
  const digits = trimmed.replace(/[\s\-().]/g, "");
  if (digits.startsWith("+")) {
    const rest = digits.slice(1);
    if (!/^\d{8,15}$/.test(rest)) return null;
    if (rest.startsWith("91")) return /^91[6-9]\d{9}$/.test(rest) ? `+${rest}` : null;
    return `+${rest}`;
  }
  if (!/^\d+$/.test(digits)) return null;
  let local = digits;
  if (local.length === 11 && local.startsWith("0")) local = local.slice(1);
  if (local.length === 12 && local.startsWith("91")) local = local.slice(2);
  return /^[6-9]\d{9}$/.test(local) ? `+91${local}` : null;
}

export function validateLead(input: Partial<Record<LeadField, unknown>>): { ok: true; value: LeadInput } | { ok: false; errors: LeadErrors } {
  const str = (v: unknown) => (typeof v === "string" ? v : "").trim().replace(/\s+/g, " ");
  const childName = str(input.childName);
  const parentName = str(input.parentName);
  const email = str(input.email).toLowerCase();
  const mobile = normaliseMobile(typeof input.mobile === "string" ? input.mobile : "");

  const errors: LeadErrors = {};
  if (!childName) errors.childName = "Enter your child’s name.";
  else if (!NAME.test(childName)) errors.childName = "Use letters only, 2 to 60 characters.";
  if (!parentName) errors.parentName = "Enter your name.";
  else if (!NAME.test(parentName)) errors.parentName = "Use letters only, 2 to 60 characters.";
  if (!str(input.mobile)) errors.mobile = "Enter your mobile number.";
  else if (!mobile) errors.mobile = "Enter a 10-digit Indian mobile number, or + and your country code.";
  if (!email) errors.email = "Enter your email address.";
  else if (email.length > 254 || !EMAIL.test(email)) errors.email = "Enter a valid email address, like name@example.com.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { childName, parentName, mobile: mobile!, email } };
}
