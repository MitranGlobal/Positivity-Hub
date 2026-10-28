"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Icon from "@/components/ui/Icon";
import { useLightbox } from "@/store/lightbox";
import { about, site } from "@/lib/content";

export default function Lightbox() {
  const { content, close } = useLightbox();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  // Keep the overlay mounted while it fades out, then unmount it once the
  // closing animation has finished (deterministic, no presence bookkeeping).
  const [mounted, setMounted] = useState(false);
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (content) {
      setMounted(true);
      setTitle(content.title);
    }
  }, [content]);
  const isOpen = content !== null;

  useEffect(() => {
    if (!content) return;
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button, a[href], video, [tabindex]:not([tabindex='-1'])");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [content, close]);

  if (!mounted && !isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-stage/85 p-4 sm:p-8"
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: isOpen ? 0.25 : 0.2 }}
      onAnimationComplete={() => {
        if (!isOpen) setMounted(false);
      }}
      onClick={close}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={content?.title ?? title}
        className="relative w-full max-w-4xl"
        initial={{ scale: 0.94, y: 16 }}
        animate={isOpen ? { scale: 1, y: 0 } : { scale: 0.97, y: 8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          className="absolute -top-14 right-0 grid h-11 w-11 place-items-center rounded-full bg-white text-ink"
          aria-label="Close trailer"
        >
          <Icon name="close" />
        </button>
        <div className={`w-full overflow-hidden rounded-panel bg-stage-card ${site.trailerSrc ? "aspect-video" : "sm:aspect-video"}`}>
          {site.trailerSrc ? (
            isOpen && (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video src={site.trailerSrc} controls autoPlay playsInline className="h-full w-full object-contain" />
            )
          ) : (
            <div className="grid h-full place-items-center px-6 py-12 text-center text-ivory">
              <div>
                <p className="font-display text-display-md">The {about.trailer.length} is on its way</p>
                <p className="mx-auto mt-3 max-w-md text-ivory/70">The full preview will be available here soon. In the meantime, you can see everything the program includes.</p>
                <a href="#pricing" onClick={close} className="btn-primary mt-6">
                  See what&apos;s included
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
