"use client";

import { useEffect, useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Animate direct children one after another instead of the wrapper. */
  stagger?: boolean;
  delay?: number;
  y?: number;
};

/**
 * Scroll-reveal wrapper (GSAP + ScrollTrigger).
 * Content is fully visible in the server HTML; the hidden "from" state is only
 * applied on the client just before paint, and skipped for reduced motion.
 */
export default function Reveal({ children, as: Tag = "div", className, id, stagger = false, delay = 0, y = 28 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.09 : 0,
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger, delay, y]);

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
