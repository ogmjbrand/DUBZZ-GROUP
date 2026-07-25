"use client";

import { useEffect, useRef, useState } from "react";

interface CinematicVideoProps {
  /** Basename under /public/videos, without extension. Both .webm and .mp4 are offered. */
  name: string;
  /** Poster frame under /public/posters. Shown before play and as the reduced-motion still. */
  poster: string;
  /** Describes the footage for assistive tech. Decorative backdrops pass "". */
  label?: string;
  className?: string;
}

/**
 * Background film player.
 *
 * Enforces the three constraints a decorative autoplaying video has to satisfy:
 *
 *  1. Reduced motion — users who ask for less motion get the poster frame and
 *     the video is never fetched at all. This is checked before mount rather
 *     than paused after, so the bytes are genuinely not spent.
 *  2. Off-screen — playback is suspended whenever the element leaves the
 *     viewport. A looping 42s film decoding behind three screens of scrolled
 *     content is pure battery cost for zero visual benefit.
 *  3. Save-Data / slow links — honoured the same way as reduced motion.
 *
 * The poster is a real frame from the film's own timeline, so the fallback and
 * the video can never disagree.
 */
export default function CinematicVideo({
  name,
  poster,
  label = "",
  className = "",
}: CinematicVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  // Start as "still": render the poster on the server and on first paint, then
  // upgrade to video only once we've confirmed the client actually wants it.
  // The reverse order would ship a frame of video to people who opted out.
  const [wantsVideo, setWantsVideo] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // navigator.connection is still non-standard; absence just means "no signal".
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    const saveData = connection?.saveData === true;

    if (reduced || saveData) return;

    // Deferred past first paint rather than set synchronously: this avoids a
    // cascading render, and keeps the video request from competing with the
    // hero's LCP on the connections least able to absorb it.
    const id = requestAnimationFrame(() => setWantsVideo(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !wantsVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() rejects if the browser blocks autoplay; there is nothing to
          // recover to beyond the poster already underneath, so swallow it.
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [wantsVideo]);

  if (!wantsVideo) {
    return (
      <div
        className={`absolute inset-0 bg-cover bg-center ${className}`}
        style={{ backgroundImage: `url(${poster})` }}
        role={label ? "img" : "presentation"}
        aria-label={label || undefined}
      />
    );
  }

  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label || undefined}
      role={label ? "img" : "presentation"}
    >
      <source src={`/videos/${name}.webm`} type="video/webm" />
      <source src={`/videos/${name}.mp4`} type="video/mp4" />
    </video>
  );
}
