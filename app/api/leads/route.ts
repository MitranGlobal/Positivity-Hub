import { NextResponse } from "next/server";
import { clarity } from "@/lib/clarity";
import { validateLead } from "@/lib/lead";

/**
 * Receives the sign-up popup's details, checks them again, and submits them
 * to the ClarityConvert "Contact Form" (see lib/clarity.ts).
 */

const MAX_BODY_BYTES = 4_000;
const FORWARD_TIMEOUT_MS = 10_000;

/** Accept only plain http(s) URLs, trimmed, for the attribution fields. */
function safeUrl(value: unknown, mustBeHost?: string): string | undefined {
  if (typeof value !== "string" || value.length > 1_000) return undefined;
  try {
    const u = new URL(value);
    if (u.protocol !== "https:" && u.protocol !== "http:") return undefined;
    if (mustBeHost && u.host !== mustBeHost) return undefined;
    return u.toString();
  } catch {
    return undefined;
  }
}

export async function POST(req: Request) {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";

  // Only accept submissions sent from this site's own pages.
  const origin = req.headers.get("origin");
  if (origin) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {
      /* malformed Origin header */
    }
    if (originHost !== host) {
      return NextResponse.json({ ok: false, error: "Not allowed." }, { status: 403 });
    }
  }

  // Refuse oversized bodies before reading them.
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
  }
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field. Pretend success so bots move on.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }
  const lead = result.value;

  // Attribution: the page the visitor landed on (with any UTMs) must be this
  // site; the referrer is wherever they came from (an ad, Google, WhatsApp…).
  const landingPage = safeUrl(body.landingPage, host) ?? safeUrl(req.headers.get("referer"), host);
  const referrer = safeUrl(body.referrer);
  const idempotencyKey =
    typeof body.idempotencyKey === "string" && /^[A-Za-z0-9-]{8,64}$/.test(body.idempotencyKey) ? body.idempotencyKey : undefined;

  const payload = {
    subAccountId: clarity.subAccountId,
    formId: clarity.formId,
    answers: {
      [clarity.fields.childName]: lead.childName,
      [clarity.fields.parentName]: lead.parentName,
      [clarity.fields.mobile]: lead.mobile,
      [clarity.fields.email]: lead.email,
    },
    meta: { referrer: referrer ?? "", landingPage: landingPage ?? "" },
    ...(idempotencyKey ? { idempotencyKey } : {}),
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FORWARD_TIMEOUT_MS);
  try {
    const res = await fetch(clarity.apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: clarity.apiKey },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: unknown };
    if (!res.ok || data.success !== true) {
      // Log the reason only — never the visitor's details.
      console.error(`[leads] ClarityConvert rejected a sign-up (HTTP ${res.status}):`, typeof data.error === "string" ? data.error.slice(0, 200) : "no reason given");
      return NextResponse.json({ ok: false, error: "We couldn’t save your details. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] Could not reach ClarityConvert:", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "We couldn’t save your details. Please try again." }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}
