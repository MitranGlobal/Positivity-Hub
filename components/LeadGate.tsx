"use client";

import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import logoLight from "@/public/mitran-global-logo-light.png";
import { LEAD_STORAGE_KEY, validateLead, type LeadErrors, type LeadField } from "@/lib/lead";
import { useGate } from "@/store/gate";

/**
 * Sign-up popup, opened by CTA buttons.
 *
 * Any link marked `data-cta` is intercepted: the popup pops in, and once the
 * visitor submits, they continue to wherever that CTA was going (the checkout
 * link, or a section of this page). Visitors who already signed up on this
 * browser skip the popup and go straight through. Without JavaScript the CTAs
 * are plain links, so nobody is ever stuck.
 */

const fields: { name: LeadField; label: string; type: string; autoComplete: string; inputMode?: "tel" | "email"; placeholder: string; hint?: string }[] = [
  { name: "childName", label: "Child’s name", type: "text", autoComplete: "off", placeholder: "e.g. Aarav" },
  { name: "parentName", label: "Parent’s name", type: "text", autoComplete: "name", placeholder: "e.g. Priya Sharma" },
  {
    name: "mobile",
    label: "Mobile number",
    type: "tel",
    autoComplete: "tel",
    inputMode: "tel",
    placeholder: "e.g. 98765 43210",
  },
  { name: "email", label: "Email", type: "email", autoComplete: "email", inputMode: "email", placeholder: "e.g. priya@example.com" },
];

type Status = "idle" | "saving" | "error";

function hasSignedUp() {
  try {
    return window.localStorage.getItem(LEAD_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

function rememberSignUp() {
  try {
    window.localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify({ at: new Date().toISOString() }));
  } catch {
    /* Private mode or blocked storage: they'll see the popup again next time. */
  }
}

/** Send the visitor where the CTA was going: another site, or a section of this page. */
function go(target: string) {
  if (target.startsWith("#")) {
    const el = document.getElementById(decodeURIComponent(target.slice(1)));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", target);
    }
    return;
  }
  window.location.assign(target);
}

const newAttemptKey = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export default function LeadGate() {
  const { open, target, openFor, close } = useGate();
  const reduced = useReducedMotion();
  const [values, setValues] = useState<Record<LeadField, string>>({ childName: "", parentName: "", mobile: "", email: "" });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const attemptKey = useRef(newAttemptKey());
  const id = useId();

  // Intercept every CTA click (capture phase, so it runs before the link navigates).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[data-cta]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || hasSignedUp()) return; // already signed up: let the link work as normal
      e.preventDefault();
      opener.current = link;
      openFor(href);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [openFor]);

  // Kept in a ref so `dismiss` stays stable and the open/close effect below
  // doesn't re-run (and jump focus) every time the status changes.
  const saving = useRef(false);
  saving.current = status === "saving";
  const dismiss = useCallback(() => {
    if (saving.current) return;
    close();
  }, [close]);

  // While open: lock scrolling, make the page behind inert, keep focus inside, Escape closes.
  useEffect(() => {
    if (!open) return;
    const site = document.getElementById("site");
    site?.setAttribute("inert", "");
    site?.setAttribute("aria-hidden", "true");
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => firstInput.current?.focus(), 200);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        dismiss();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>("input:not([tabindex='-1']), button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      site?.removeAttribute("inert");
      site?.removeAttribute("aria-hidden");
      document.documentElement.style.overflow = prevOverflow;
      // Return focus to the CTA that opened the popup.
      opener.current?.focus({ preventScroll: true });
    };
  }, [open, dismiss]);

  const update = (name: LeadField, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const focusFirstError = (errs: LeadErrors) => {
    const firstBad = fields.find((f) => errs[f.name]);
    if (firstBad) document.getElementById(`${id}-${firstBad.name}`)?.focus();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "saving") return;
    setFormError("");

    const result = validateLead(values);
    if (!result.ok) {
      setErrors(result.errors);
      focusFirstError(result.errors);
      return;
    }

    setStatus("saving");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          company: honeypot.current?.value ?? "",
          // Attribution for ClarityConvert: this page (with any UTMs) and where the visitor came from.
          landingPage: window.location.href,
          referrer: document.referrer,
          // Same key on a retry, so a double tap or flaky network can't create two submissions.
          idempotencyKey: attemptKey.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        rememberSignUp();
        attemptKey.current = newAttemptKey();
        setStatus("idle");
        opener.current = null; // don't pull focus back to the CTA; we're moving on
        close();
        if (target) window.setTimeout(() => go(target), target.startsWith("#") ? 250 : 0);
        return;
      }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        focusFirstError(data.errors);
        return;
      }
      setFormError(data.error || "We couldn’t save your details. Please try again.");
      setStatus("error");
    } catch {
      setFormError("We couldn’t reach the server. Check your internet connection and try again.");
      setStatus("error");
    }
  };

  const goingToCheckout = !!target && !target.startsWith("#");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lead-gate"
          id="lead-gate"
          className="fixed inset-0 z-[80] overflow-y-auto bg-stage/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) dismiss();
          }}
        >
          <div
            className="flex min-h-full items-center justify-center px-4 py-8"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) dismiss();
            }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${id}-title`}
              aria-describedby={`${id}-desc`}
              className="relative w-full max-w-[380px] rounded-[22px] border border-white/10 bg-stage-card p-6 text-ivory shadow-[0_30px_90px_-25px_rgba(0,0,0,0.9)] sm:p-7"
              // Pop in: a quick springy scale-up from slightly small.
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 12 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 6, transition: { duration: 0.16 } }}
              transition={reduced ? { duration: 0.15 } : { type: "spring", stiffness: 420, damping: 26, mass: 0.8 }}
            >
              <button
                type="button"
                onClick={dismiss}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-ivory/60 transition-colors hover:bg-white/10 hover:text-ivory"
                aria-label="Close"
              >
                <Icon name="close" className="h-4 w-4" />
              </button>

              <Image src={logoLight} alt="MiTran Global" className="h-7 w-auto" sizes="120px" />
              <h2 id={`${id}-title`} className="mt-4 font-display text-[22px] leading-tight text-ivory">
                Almost there
              </h2>
              <p id={`${id}-desc`} className="mt-1.5 text-sm leading-relaxed text-ivory/65">
                {goingToCheckout ? "Share a few details and we’ll take you straight to registration." : "Share a few details to continue."}
              </p>

              <form className="mt-5 space-y-3" onSubmit={onSubmit} noValidate>
                {fields.map((f, i) => {
                  const err = errors[f.name];
                  const inputId = `${id}-${f.name}`;
                  const describedBy = [err ? `${inputId}-error` : "", f.hint ? `${inputId}-hint` : ""].filter(Boolean).join(" ") || undefined;
                  return (
                    <div key={f.name}>
                      <label htmlFor={inputId} className="block text-[13px] font-medium text-ivory/80">
                        {f.label}
                      </label>
                      <input
                        ref={i === 0 ? firstInput : undefined}
                        id={inputId}
                        name={f.name}
                        type={f.type}
                        inputMode={f.inputMode}
                        autoComplete={f.autoComplete}
                        placeholder={f.placeholder}
                        value={values[f.name]}
                        onChange={(e) => update(f.name, e.target.value)}
                        aria-invalid={err ? true : undefined}
                        aria-describedby={describedBy}
                        maxLength={f.name === "email" ? 254 : 60}
                        required
                        className={`mt-1 block h-10 w-full rounded-lg border bg-stage px-3.5 text-[15px] text-ivory placeholder:text-ivory/30 transition-colors focus:outline-none focus:ring-2 focus:ring-gold ${
                          err ? "border-red-400/80" : "border-white/15 hover:border-white/30"
                        }`}
                      />
                      {f.hint && !err && (
                        <p id={`${inputId}-hint`} className="mt-1 text-[11px] text-ivory/45">
                          {f.hint}
                        </p>
                      )}
                      {err && (
                        <p id={`${inputId}-error`} className="mt-1 text-xs text-red-300">
                          {err}
                        </p>
                      )}
                    </div>
                  );
                })}

                {/* Honeypot for bots: hidden from people and screen readers. */}
                <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor={`${id}-company`}>Company</label>
                  <input ref={honeypot} id={`${id}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {formError && (
                  <p role="alert" className="rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-[13px] text-red-200">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary mt-1 min-h-[44px] w-full disabled:cursor-wait disabled:opacity-80"
                  disabled={status === "saving"}
                  aria-busy={status === "saving"}
                >
                  {status === "saving" ? "Saving…" : "Continue"}
                </button>
                <p className="text-center text-[11px] leading-relaxed text-ivory/45">We’ll use these details only to share Positivity Hub information with you.</p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
