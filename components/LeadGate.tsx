"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import logoLight from "@/public/mitran-global-logo-light.png";
import { LEAD_STORAGE_KEY, validateLead, type LeadErrors, type LeadField } from "@/lib/lead";
import { useGate } from "@/store/gate";

/**
 * Sign-up popup shown before the page can be used.
 *
 * It is rendered open in the server HTML, so the page is never usable before
 * the form appears. Returning visitors are recognised by a small script in
 * app/layout.tsx that hides it before first paint (no flash), and by the
 * effect below. While open, the page behind it is made inert and can't scroll.
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
    hint: "Outside India? Start with + and your country code.",
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
    /* Private mode or blocked storage: they'll simply see the form again next visit. */
  }
  document.documentElement.dataset.lead = "1";
}

export default function LeadGate() {
  const open = useGate((s) => s.open);
  const setOpen = useGate((s) => s.setOpen);
  const [values, setValues] = useState<Record<LeadField, string>>({ childName: "", parentName: "", mobile: "", email: "" });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const id = useId();

  // Returning visitor: close straight away.
  useEffect(() => {
    if (hasSignedUp()) setOpen(false);
  }, [setOpen]);

  // While open: lock scrolling, make the page behind inert, keep focus inside.
  useEffect(() => {
    if (!open || hasSignedUp()) return;
    const site = document.getElementById("site");
    site?.setAttribute("inert", "");
    site?.setAttribute("aria-hidden", "true");
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => firstInput.current?.focus(), 350);

    const onKey = (e: KeyboardEvent) => {
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
    };
  }, [open]);

  const update = (name: LeadField, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "saving") return;
    setFormError("");

    const result = validateLead(values);
    if (!result.ok) {
      setErrors(result.errors);
      const firstBad = fields.find((f) => result.errors[f.name]);
      if (firstBad) document.getElementById(`${id}-${firstBad.name}`)?.focus();
      return;
    }

    setStatus("saving");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot.current?.value ?? "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        rememberSignUp();
        setOpen(false);
        return;
      }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
        const firstBad = fields.find((f) => data.errors[f.name]);
        if (firstBad) document.getElementById(`${id}-${firstBad.name}`)?.focus();
        return;
      }
      setFormError(data.error || "We couldn’t save your details. Please try again.");
      setStatus("error");
    } catch {
      setFormError("We couldn’t reach the server. Check your internet connection and try again.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lead-gate"
          id="lead-gate"
          className="fixed inset-0 z-[80] overflow-y-auto bg-stage/90"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          <div className="flex min-h-full items-center justify-center px-4 py-10">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${id}-title`}
              aria-describedby={`${id}-desc`}
              className="w-full max-w-[440px] rounded-panel border border-white/10 bg-stage-card p-6 text-ivory shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:p-9"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={logoLight} alt="MiTran Global" className="h-10 w-auto" sizes="160px" priority />
              <h2 id={`${id}-title`} className="mt-6 font-display text-[28px] leading-tight text-ivory">
                Before you begin
              </h2>
              <p id={`${id}-desc`} className="mt-2 leading-relaxed text-ivory/70">
                Share a few details to see how we help teens handle pressure, build confidence and grow from within.
              </p>

              <form className="mt-7 space-y-4" onSubmit={onSubmit} noValidate>
                {fields.map((f, i) => {
                  const err = errors[f.name];
                  const inputId = `${id}-${f.name}`;
                  const describedBy = [err ? `${inputId}-error` : "", f.hint ? `${inputId}-hint` : ""].filter(Boolean).join(" ") || undefined;
                  return (
                    <div key={f.name}>
                      <label htmlFor={inputId} className="block text-sm font-medium text-ivory/85">
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
                        className={`mt-1.5 block h-12 w-full rounded-xl border bg-stage px-4 text-base text-ivory placeholder:text-ivory/30 transition-colors focus:outline-none focus:ring-2 focus:ring-gold ${
                          err ? "border-red-400/80" : "border-white/15 hover:border-white/30"
                        }`}
                      />
                      {f.hint && !err && (
                        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-ivory/50">
                          {f.hint}
                        </p>
                      )}
                      {err && (
                        <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-300">
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
                  <p role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {formError}
                  </p>
                )}

                <button type="submit" className="btn-primary mt-2 w-full disabled:cursor-wait disabled:opacity-80" disabled={status === "saving"} aria-busy={status === "saving"}>
                  {status === "saving" ? "Saving…" : "Continue to the page"}
                </button>
                <p className="text-center text-xs leading-relaxed text-ivory/50">We’ll use these details only to share Positivity Hub information with you.</p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
