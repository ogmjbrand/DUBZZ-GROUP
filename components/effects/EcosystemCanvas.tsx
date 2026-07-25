"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// ssr:false keeps three/@react-three/fiber/drei out of the server render *and*
// out of the initial client bundle -- they arrive in their own chunk, only on
// devices that pass the capability gate below.
const EcosystemScene = dynamic(() => import("./EcosystemScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Capability gate for the 3D hero centrepiece.
 *
 * The scene is an enhancement, never the content: the hero reads completely
 * without it, carried by the CinematicVideo film underneath. So this refuses to
 * load it wherever it would cost more than it returns — and the refusal is
 * silent, because a degraded 3D scene looks worse than none at all.
 */
export default function EcosystemCanvas() {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Phones and small tablets get the film alone. A five-mesh scene is
    // affordable there, but it competes with LCP on exactly the connections
    // least able to absorb another ~150KB of JS.
    if (window.innerWidth < 1024) return;

    // Coarse low-end signals. Both are advisory and absent in some browsers,
    // so treat missing values as capable rather than blocking on them.
    const cores = navigator.hardwareConcurrency;
    if (typeof cores === "number" && cores <= 4) return;

    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    if (typeof memory === "number" && memory <= 4) return;

    // Deferring past first paint keeps the 3D chunk from competing with the
    // hero's LCP, and means this setState is not synchronous within the effect.
    const id = requestAnimationFrame(() => setMount(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mount) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <EcosystemScene />
    </div>
  );
}
