"use client";

import { useRef, useState, type ReactNode } from "react";
import Icon from "@/components/ui/Icon";
import { site } from "@/lib/content";
import { hasSignedUp } from "@/lib/leadStorage";
import { useGate } from "@/store/gate";

type Phase = "locked" | "tap" | "playing";

/**
 * The VSL, behind the sign-up popup.
 *
 * Until the visitor signs up, the video has no source at all, only its still,
 * so it can't be played from the page. The play button and the "Watch now!"
 * button both open the popup; once it's submitted the source is attached and
 * the video starts. Visitors who already signed up on this device play it
 * straight away.
 */
export default function VslPlayer({ backdrop }: { backdrop?: ReactNode }) {
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("locked");
  const openFor = useGate((s) => s.openFor);

  // Attach the source and play. Done directly on the element (not through
  // React state) so it happens inside the visitor's click, which is what lets
  // the browser start a video with sound.
  const play = () => {
    const v = video.current;
    if (!v) return;
    if (!v.getAttribute("src")) {
      v.src = site.vsl.src;
      v.preload = "auto";
    }
    v.controls = true;
    setPhase("playing");
    v.play().catch(() => {
      // The browser wanted one more tap (the save took a while). It's unlocked
      // now, so the play button just plays.
      v.controls = false;
      setPhase("tap");
    });
  };

  const request = (opener: HTMLElement) => {
    if (phase !== "locked" || hasSignedUp()) {
      play();
      return;
    }
    openFor(null, { onDone: play, opener });
  };

  const onWatchNow = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = frame.current?.getBoundingClientRect();
    if (rect && (rect.top < 0 || rect.bottom > window.innerHeight)) {
      frame.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    request(e.currentTarget);
  };

  return (
    <div>
      <div ref={frame} className="relative aspect-video w-full overflow-hidden rounded-panel bg-stage shadow-lift">
        {backdrop}
        <video
          ref={video}
          poster={site.vsl.poster}
          preload="none"
          playsInline
          controlsList="nodownload"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          aria-label={site.vsl.title}
          className="absolute inset-0 h-full w-full bg-transparent object-cover"
        />

        {phase !== "playing" && (
          <button
            type="button"
            onClick={(e) => request(e.currentTarget)}
            className="group absolute inset-0 grid place-items-center bg-stage/25 transition-colors hover:bg-stage/10 focus-visible:outline-none"
            aria-label={`Play the video: ${site.vsl.title}`}
          >
            <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gold-gradient text-ink shadow-glow transition-transform duration-300 group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-ivory sm:h-24 sm:w-24">
              {/* Soft pulse so the play button reads as the thing to press. */}
              <span className="absolute inset-0 animate-ping rounded-full bg-gold/40 motion-reduce:hidden" style={{ animationDuration: "2.4s" }} aria-hidden="true" />
              <Icon name="play" className="relative ml-1 h-7 w-7 sm:h-9 sm:w-9" />
            </span>
          </button>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <button type="button" onClick={onWatchNow} className="btn-ink min-h-[48px] px-8 text-base">
          <Icon name="play" className="h-4 w-4" />
          {site.vsl.cta}
        </button>
      </div>
    </div>
  );
}
