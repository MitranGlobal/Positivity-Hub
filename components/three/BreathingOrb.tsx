"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sparkles } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { breathState } from "@/lib/breath";

function Orb({ still }: { still: boolean }) {
  const group = useRef<Group>(null);
  const halo = useRef<Mesh>(null);

  useFrame((state) => {
    const { fill } = breathState();
    const s = still ? 0.94 : 0.8 + fill * 0.2;
    if (group.current) {
      group.current.scale.setScalar(s);
      group.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
    if (halo.current) {
      const h = still ? 1.15 : 1.0 + fill * 0.3;
      halo.current.scale.setScalar(h);
      const mat = halo.current.material as unknown as { opacity: number };
      mat.opacity = 0.1 + fill * 0.14;
    }
  });

  return (
    <>
      <mesh ref={halo} position={[0, 0, -0.6]}>
        <circleGeometry args={[1.45, 64]} />
        <meshBasicMaterial color="#F5B83D" transparent opacity={0.15} depthWrite={false} />
      </mesh>
      <group ref={group}>
        <mesh>
          <sphereGeometry args={[1.25, 96, 96]} />
          <MeshDistortMaterial color="#F5B83D" emissive="#F08A24" emissiveIntensity={0.18} roughness={0.35} metalness={0.05} distort={still ? 0 : 0.14} speed={still ? 0 : 0.9} />
        </mesh>
      </group>
      {!still && <Sparkles count={46} scale={[5.5, 4.2, 2]} size={2.6} speed={0.25} opacity={0.7} color="#2F7F7A" />}
    </>
  );
}

export default function BreathingOrb({ still = false, active = true }: { still?: boolean; active?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={still || !active ? "demand" : "always"}
      aria-hidden="true"
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[-3, 4, 5]} intensity={1.6} color="#FFF6E0" />
      <directionalLight position={[4, -2, -3]} intensity={0.8} color="#2F7F7A" />
      <Orb still={still} />
    </Canvas>
  );
}
