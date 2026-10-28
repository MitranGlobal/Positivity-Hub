"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import { nav, site } from "@/lib/content";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const menuBtn = menuBtnRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      menuBtn?.focus();
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled ? "bg-stage shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]" : "bg-stage"
        }`}
      >
        <div className="container flex h-[72px] items-center justify-between gap-4">
          <Logo onDark />
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-[15px] font-medium text-ivory/80 transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <a href={site.registerUrl} className="btn-primary ml-3 min-h-[44px] px-5">
              Register now
            </a>
          </nav>
          <button
            ref={menuBtnRef}
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full text-ivory hover:bg-white/10 md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-50 bg-black/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(86vw,340px)] flex-col bg-stage px-6 pb-8 pt-4 text-ivory shadow-lift md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%", transition: { duration: 0.25, ease: [0.4, 0, 1, 1] } }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex h-14 items-center justify-end">
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <Icon name="close" className="h-6 w-6" />
                </button>
              </div>
              <nav aria-label="Mobile" className="mt-4 flex flex-col">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-white/10 py-4 font-display text-2xl text-ivory"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
              <a href={site.registerUrl} onClick={() => setOpen(false)} className="btn-primary mt-auto w-full">
                Register now
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
