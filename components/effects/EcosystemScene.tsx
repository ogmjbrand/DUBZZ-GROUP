"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import { divisions } from "@/lib/data/divisions";

/**
 * The hero centrepiece: one monolith per division, arranged on a shared arc and
 * lit by a single warm key.
 *
 * The composition is the argument the page is making — five distinct houses,
 * each its own material and tint, all resolved by one light. That is why it is
 * geometry rather than an abstract particle field: the light source *is* the
 * "one standard", so the scene says what the headline says.
 *
 * Loaded only through EcosystemCanvas, which dynamic-imports it so three,
 * @react-three/fiber and drei stay out of the initial bundle.
 */

const COUNT = divisions.length;
/** Radians between monoliths on the arc. */
const SPREAD = 0.42;
const RADIUS = 5.2;

function Monolith({
  index,
  color,
}: {
  index: number;
  color: string;
}) {
  const ref = useRef<Mesh>(null);

  // Centre the arc on zero so the group reads as symmetrical.
  const angle = (index - (COUNT - 1) / 2) * SPREAD;
  const position: [number, number, number] = [
    Math.sin(angle) * RADIUS,
    // Slight vertical scatter stops the row reading as a picket fence.
    (index % 2 === 0 ? 0.22 : -0.22),
    Math.cos(angle) * RADIUS - RADIUS,
  ];
  const height = 3.1 + (index % 3) * 0.42;

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    // Each monolith breathes on its own phase, so the group never pulses in
    // unison — that synchronisation is what makes CSS-driven 3D look cheap.
    const t = clock.getElapsedTime();
    mesh.position.y = position[1] + Math.sin(t * 0.34 + index * 1.3) * 0.14;
    mesh.rotation.y = Math.sin(t * 0.16 + index) * 0.14;
  });

  return (
    <RoundedBox
      ref={ref}
      args={[0.92, height, 0.92]}
      radius={0.045}
      smoothness={3}
      position={position}
      castShadow={false}
      receiveShadow={false}
    >
      <meshPhysicalMaterial
        color={color}
        metalness={0.86}
        roughness={0.22}
        reflectivity={0.7}
        clearcoat={0.5}
        clearcoatRoughness={0.3}
      />
    </RoundedBox>
  );
}

function Ensemble({
  pointer,
}: {
  pointer: React.RefObject<{ x: number; y: number }>;
}) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    // Read the ref inside the frame loop, never during render.
    const { x, y } = pointer.current;
    // Continuous drift plus damped pointer lean. Lerping toward the target
    // rather than assigning it keeps the parallax weighted instead of twitchy.
    g.rotation.y += delta * 0.045;
    g.rotation.x += (y * 0.09 - g.rotation.x) * 0.04;
    g.position.x += (x * 0.7 - g.position.x) * 0.04;
  });

  return (
    <group ref={group}>
      {divisions.map((d, i) => (
        <Monolith key={d.key} index={i} color={d.accentHex} />
      ))}
    </group>
  );
}

export default function EcosystemScene() {
  // Mutable rather than state: pointer updates at input frequency and must not
  // trigger React renders — useFrame reads it directly each frame.
  const pointer = useRef({ x: 0, y: 0 });

  const onPointerMove = useMemo(
    () => (e: React.PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      pointer.current.x = (e.clientX / innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / innerHeight) * 2 - 1;
    },
    []
  );

  return (
    <div className="absolute inset-0" onPointerMove={onPointerMove}>
      <Canvas
        // Clamped DPR: uncapped devicePixelRatio on a 3x phone renders ~9x the
        // pixels for no perceptible gain and is the usual cause of jank here.
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.4, 7.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        {/* One warm key from upper left -- the single source the whole
            Cinematic Noir lighting model is built on. */}
        <directionalLight position={[-5, 6, 4]} intensity={2.6} color="#ffd98a" />
        {/* A cool rim at low intensity to separate silhouettes from the
            near-black ground without implying a second source. */}
        <directionalLight position={[6, -2, -4]} intensity={0.5} color="#7f93b5" />
        <ambientLight intensity={0.16} />
        <Ensemble pointer={pointer} />
      </Canvas>
    </div>
  );
}
