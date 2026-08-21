"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { roadmap } from "@/lib/data/group";
import { duration, ease } from "@/lib/motion/tokens";

/**
 * The Five-Year Strategic Roadmap as a selectable progression.
 *
 * Rendered on paper rather than midnight: the roadmap is the most
 * document-like thing the Group publishes, and it is also where the page most
 * needs to break its own rhythm after a long dark run.
 *
 * The years are a tablist because that is exactly what they are — one visible
 * panel, five labels, arrow keys between them. Reimplementing that with divs
 * and click handlers would lose keyboard support that comes free here.
 */
export default function RoadmapTimeline() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const active = roadmap[index];

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % roadmap.length);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + roadmap.length) % roadmap.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setIndex(roadmap.length - 1);
    }
  };

  return (
    <div>
      {/* The rail. Horizontally scrollable on narrow viewports so five years
          never compress into unreadable type or push the page sideways. */}
      <div
        role="tablist"
        aria-label="Five-year strategic roadmap"
        onKeyDown={onKeyDown}
        className="-mx-6 flex snap-x snap-mandatory overflow-x-auto px-6 pb-1 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {roadmap.map((phase, i) => {
          const isActive = i === index;
          return (
            <button
              key={phase.year}
              role="tab"
              id={`roadmap-tab-${phase.year}`}
              aria-selected={isActive}
              aria-controls={`roadmap-panel-${phase.year}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setIndex(i)}
              className="group relative shrink-0 snap-start border-t-2 pt-5 pr-10 text-left transition-colors duration-500 ease-luxe sm:flex-1 sm:pr-4"
              style={{
                borderTopColor: isActive ? "var(--color-gold)" : "rgba(10,10,10,0.14)",
              }}
            >
              <span
                className={`block font-display text-2xl transition-colors duration-500 sm:text-3xl ${
                  isActive ? "text-ink" : "text-ink/35 group-hover:text-ink/60"
                }`}
              >
                {phase.year}
              </span>
              <span
                className={`mt-1 block font-label text-[9px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${
                  isActive ? "text-gold-deep" : "text-ink/30 group-hover:text-ink/50"
                }`}
              >
                {phase.phase}
              </span>
            </button>
          );
        })}
      </div>

      {/* The panel */}
      {/* Reserved height stops the section jumping as phases change, but only
          as much as the longest phase actually needs. */}
      <div className="mt-12 min-h-[13rem] sm:min-h-[11rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.year}
            role="tabpanel"
            id={`roadmap-panel-${active.year}`}
            aria-labelledby={`roadmap-tab-${active.year}`}
            tabIndex={0}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: duration.base, ease: ease.luxe }}
            className="grid gap-8 md:grid-cols-12"
          >
            <div className="md:col-span-4">
              <p className="font-display text-[clamp(3.5rem,10vw,6rem)] leading-none text-ink">
                {active.year}
              </p>
              <p className="mt-2 font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-deep">
                {active.focus}
              </p>
            </div>
            <div className="md:col-span-8">
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                {active.phase}
              </p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                {active.body}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
