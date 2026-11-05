import { NextResponse } from "next/server";
import { validateLead } from "@/lib/lead";

/**
 * Receives the sign-up popup's details and forwards them to LEAD_WEBHOOK_URL
 * (a Google Sheets Apps Script, Zapier/Make webhook, or your CRM's inbound
 * webhook). Set it in Vercel → Project → Settings → Environment Variables.
 */

const MAX_BODY_BYTES = 4_000;
const FORWARD_TIMEOUT_MS = 8_000;

export async function POST(req: Request) {
  // Only accept submissions sent from this site's own pages.
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin && host) {
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

  const lead = {
    ...result.value,
    submittedAt: new Date().toISOString(),
    source: "positivity-hub-landing",
    // Taken from the request, not the form body, so it can't carry injected text.
    page: (req.headers.get("referer") ?? "").slice(0, 300) || undefined,
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    // Not configured yet: let the visitor in, but make the gap loud in the server logs.
    // No personal details in logs.
    console.error(`[leads] LEAD_WEBHOOK_URL is not set; a sign-up at ${lead.submittedAt} was not saved.`);
    return NextResponse.json({ ok: true, stored: false });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FORWARD_TIMEOUT_MS);
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("[leads] Could not forward sign-up:", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "We couldn’t save your details. Please try again." }, { status: 502 });
  } finally {
    clearTimeout(timer);
  }
}
