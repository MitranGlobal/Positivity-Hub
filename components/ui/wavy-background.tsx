"use client";
/**
 * WavyBackground — from Aceternity UI (registry: wavy-background).
 *
 * Adapted for this project; same props and look as the original, with fixes:
 * - The canvas is sized to its container (ResizeObserver) instead of the whole
 *   window, so it never overflows or gets cut off when the hero is taller or
 *   shorter than the viewport. It no longer overwrites `window.onresize`.
 * - The container is `relative overflow-hidden` so the canvas stays inside it.
 * - The noise function is created once, not on every render.
 * - The canvas draws at half resolution (the waves are blurred anyway) to keep
 *   the per-frame cost low on phones.
 * - Animation pauses when the hero is off-screen or `paused` is set, and draws a
 *   single still frame when the visitor prefers reduced motion.
 */
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  paused = false,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  paused?: boolean;
  [key: string]: unknown;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const noiseRef = useRef<ReturnType<typeof createNoise3D> | null>(null);
  const timeRef = useRef(0); // keeps the wave position when the effect restarts
  const [visible, setVisible] = useState(true);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Safari ignores ctx.filter, so the blur is applied with CSS there instead.
    setIsSafari(typeof window !== "undefined" && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome"));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (!noiseRef.current) noiseRef.current = createNoise3D();
    const noise = noiseRef.current;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = speed === "slow" ? 0.001 : 0.002;
    const waveColors = colors ?? ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];
    let w = 0;
    let h = 0;
    let animationId = 0;

    // The waves are heavily blurred, so drawing them at half resolution and letting
    // CSS scale the canvas up looks the same while cutting the per-frame cost ~4x.
    const SCALE = 0.5;
    const resize = () => {
      w = container.clientWidth;
      h = container.clientHeight;
      ctx.canvas.width = Math.max(1, Math.round(w * SCALE));
      ctx.canvas.height = Math.max(1, Math.round(h * SCALE));
      ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
      ctx.filter = `blur(${blur * SCALE}px)`;
    };

    const drawWave = (n: number) => {
      timeRef.current += step;
      const nt = timeRef.current;
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5); // waves sit at 50% of the container height
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const frame = () => {
      ctx.fillStyle = backgroundFill || "black";
      ctx.globalAlpha = waveOpacity || 0.5;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
    };

    const render = () => {
      frame();
      animationId = requestAnimationFrame(render);
    };

    const drawStill = () => {
      // Build up the trail so a still frame looks like the animated one.
      for (let k = 0; k < 12; k++) frame();
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced || paused || !visible) drawStill();
    });
    ro.observe(container);

    if (reduced || paused || !visible) drawStill();
    else render();

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, [blur, speed, waveWidth, backgroundFill, waveOpacity, colors, paused, visible]);

  return (
    <div ref={containerRef} className={cn("relative h-screen overflow-hidden flex flex-col items-center justify-center", containerClassName)}>
      <canvas
        className="absolute inset-0 z-0 h-full w-full"
        ref={canvasRef}
        aria-hidden="true"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
