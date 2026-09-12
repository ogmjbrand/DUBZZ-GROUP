"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { divisions } from "@/lib/data/divisions";
import { ecosystemFlows, ecosystemShared } from "@/lib/data/group";
import { duration, ease } from "@/lib/motion/tokens";

/**
 * The Group's ecosystem, drawn as a system.
 *
 * The profile's central claim is that the five businesses are built to
 * strengthen one another, so five cards in a row actively contradicted the
 * content they carried — a grid says "unrelated items, same weight". This
 * draws the holding structure instead: one centre, five businesses, and a
 * visible line between each business and the centre that lights up when you
 * ask about it.
 *
 * One component covers every breakpoint rather than two divergent layouts.
 * Below `lg` it is a labelled spine — a column of nodes hanging off a single
 * vertical rule, which is the same diagram with the ring unrolled, and which
 * survives a 320px viewport without shrinking type. From `lg` the ring is
 * laid out radially in percentages inside an aspect-square frame, so it
 * scales fluidly instead of snapping between fixed sizes.
 */

const flowByKey = Object.fromEntries(ecosystemFlows.map((f) => [f.from, f]));

/** Radial coordinates, as percentages of the frame. Node 0 sits at the top. */
const ring = divisions.map((d, i) => {
  const angle = (-90 + i * (360 / divisions.length)) * (Math.PI / 180);
  return {
    key: d.key,
    x: 50 + Math.cos(angle) * 39,
    y: 50 + Math.sin(angle) * 39,
  };
});

export default function EcosystemDiagram() {
  // Nothing is selected until the visitor asks, so the diagram first reads as
  // a whole rather than pushing one business forward.
  const [active, setActive] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const activeDivision = divisions.find((d) => d.key === active) ?? null;
  const activeFlow = active ? flowByKey[active] : null;

  return (
    <div>
      {/* ——— The diagram ——— */}
      <div className="relative">
        {/* Spine layout — the default, and the whole story below lg. */}
        <ol className="relative space-y-3 lg:hidden">
          <li className="relative pl-10">
            <span aria-hidden className="absolute left-[13px] top-8 h-[calc(100%+0.75rem)] w-px bg-gradient-to-b from-gold/60 to-gold/10" />
            <span aria-hidden className="absolute left-2 top-2.5 h-3 w-3 rounded-full bg-gold shadow-[0_0_16px_rgba(212,175,55,0.7)]" />
            <p className="overline-label text-[10px] text-gold">The Holding Company</p>
            <p className="mt-1 font-display text-2xl text-white">Dubbz Group</p>
          </li>

          {divisions.map((d, i) => {
            const flow = flowByKey[d.key];
            const isActive = active === d.key;
            return (
              <li key={d.key} className="relative pl-10">
                {i < divisions.length - 1 ? (
                  <span aria-hidden className="absolute left-[13px] top-0 h-[calc(100%+0.75rem)] w-px bg-white/10" />
                ) : (
                  <span aria-hidden className="absolute left-[13px] top-0 h-6 w-px bg-white/10" />
                )}
                <span
                  aria-hidden
                  className="absolute left-[13px] top-6 h-px w-5 transition-colors duration-300"
                  style={{ background: isActive ? d.accent : "rgba(255,255,255,0.14)" }}
                />
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActive(isActive ? null : d.key)}
                  className="w-full rounded-lg border border-white/10 bg-surface px-5 py-4 text-left transition-colors duration-300 hover:border-white/25"
                  style={isActive ? { borderColor: d.accent } : undefined}
                >
                  {/* Stacked at the narrow end: side by side, a two-word
                      business name and a two-word contribution both wrap and
                      the row reads as four ragged lines. */}
                  <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <span className="font-display text-lg leading-tight text-white">{d.name}</span>
                    <span
                      className="font-label text-[10px] font-semibold uppercase tracking-[0.18em]"
                      style={{ color: d.accent }}
                    >
                      {flow.contribution}
                    </span>
                  </span>
                  <AnimatePresence initial={false}>
                    {isActive ? (
                      <motion.span
                        initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        animate={reduced ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                        exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: duration.base, ease: ease.luxe }}
                        className="block overflow-hidden"
                      >
                        <span className="mt-3 block text-sm leading-relaxed text-neutral">
                          {flow.detail}
                        </span>
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Radial layout — lg and up. */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Capped: past ~560px the ring stops reading as a diagram and
              starts reading as five widely separated labels. */}
          <div className="relative col-span-7 mx-auto aspect-square w-full max-w-[560px]">
            {/* Connectors. Decorative: every relationship they draw is stated
                in the buttons and the panel beside them. */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >
              <circle cx="50" cy="50" r="39" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.15" />
              {ring.map((node) => {
                const d = divisions.find((x) => x.key === node.key)!;
                const isActive = active === node.key;
                return (
                  <line
                    key={node.key}
                    x1="50"
                    y1="50"
                    x2={node.x}
                    y2={node.y}
                    stroke={isActive ? d.accentHex : "rgba(255,255,255,0.12)"}
                    strokeWidth={isActive ? 0.4 : 0.18}
                    className="transition-all duration-500 ease-luxe"
                  />
                );
              })}
            </svg>

            {/* Centre */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span aria-hidden className="light-above absolute -inset-16 -z-10" />
              <p className="overline-label text-[10px] text-gold">The Holding Company</p>
              <p className="mt-2 font-display text-4xl leading-none text-white xl:text-5xl">
                Dubbz
                <br />
                Group
              </p>
            </div>

            {/* Businesses */}
            {ring.map((node) => {
              const d = divisions.find((x) => x.key === node.key)!;
              const flow = flowByKey[node.key];
              const isActive = active === node.key;
              return (
                <button
                  key={node.key}
                  type="button"
                  aria-pressed={isActive}
                  onMouseEnter={() => setActive(node.key)}
                  onFocus={() => setActive(node.key)}
                  onClick={() => setActive(node.key)}
                  className="absolute w-44 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-surface/90 px-4 py-3 text-center backdrop-blur-sm transition-all duration-500 ease-luxe hover:scale-[1.04]"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    borderColor: isActive ? d.accent : "rgba(255,255,255,0.12)",
                    boxShadow: isActive ? `0 0 40px -12px ${d.accentHex}66` : "none",
                  }}
                >
                  <span className="block font-display text-base leading-tight text-white">{d.name}</span>
                  <span
                    className="mt-1 block font-label text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300"
                    style={{ color: isActive ? d.accent : "rgba(255,255,255,0.62)" }}
                  >
                    {flow.contribution}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel. Announced politely so the change is not silent for
              anyone tabbing the ring rather than reading it. */}
          <div className="col-span-5">
            <div aria-live="polite" className="min-h-[13rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active ?? "idle"}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: duration.base, ease: ease.luxe }}
                >
                  {activeDivision && activeFlow ? (
                    <>
                      <p className="overline-label text-[10px]" style={{ color: activeDivision.accent }}>
                        {activeFlow.contribution}
                      </p>
                      <p className="mt-4 font-display text-3xl text-white">{activeDivision.name}</p>
                      <p className="mt-4 leading-relaxed text-neutral">{activeFlow.detail}</p>
                      <Link
                        href={activeDivision.href}
                        className="mt-6 inline-flex items-center gap-2 font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-gold transition-colors hover:text-gold-bright"
                      >
                        Visit {activeDivision.short}
                        <span aria-hidden>→</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="overline-label text-[10px] text-gold">One Vision. Multiple Businesses.</p>
                      <p className="mt-4 font-display text-3xl leading-tight text-white">
                        The advantage is not the businesses. It is the way they work together.
                      </p>
                      <p className="mt-4 leading-relaxed text-neutral">
                        Each business is built to stand on its own — and to make
                        the other four stronger. Select one to see what it
                        contributes to the rest.
                      </p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ——— Shared foundation ——— */}
      <div className="mt-14 border-t border-white/10 pt-8">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {ecosystemShared.map((item) => (
            <li
              key={item}
              className="font-label text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
